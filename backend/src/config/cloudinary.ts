import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';
import logger from '../common/utils/logger';

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  secure: true,
});

// Safe diagnostic. It confirms that Render/local loaded the variables
// without ever printing the actual credentials.
logger.info(
  `[CLOUDINARY] Config loaded: ` +
    `cloud_name=${Boolean(env.cloudinary.cloudName)}, ` +
    `api_key=${Boolean(env.cloudinary.apiKey)}, ` +
    `api_secret=${Boolean(env.cloudinary.apiSecret)}`
);

export interface UploadResult {
  url: string;
  publicId: string;
}

/**
 * Serializes an error safely for logging.
 * Never logs values whose property names look like secrets/tokens/passwords.
 */
function serializeError(error: unknown): string {
  if (error instanceof Error) {
    const extraProperties: Record<string, unknown> = {};

    for (const key of Object.getOwnPropertyNames(error)) {
      const lowerKey = key.toLowerCase();

      if (
        lowerKey.includes('secret') ||
        lowerKey.includes('password') ||
        lowerKey.includes('token') ||
        lowerKey.includes('authorization')
      ) {
        continue;
      }

      try {
        extraProperties[key] = (error as unknown as Record<string, unknown>)[
          key
        ];
      } catch {
        // Ignore properties that cannot be read.
      }
    }

    return JSON.stringify(
      {
        name: error.name,
        message: error.message,
        stack: error.stack,
        ...extraProperties,
      },
      null,
      2
    );
  }

  if (typeof error === 'object' && error !== null) {
    try {
      return JSON.stringify(
        error,
        Object.getOwnPropertyNames(error),
        2
      );
    } catch {
      return String(error);
    }
  }

  return String(error);
}

/**
 * Uploads a buffer (from multer memory storage) to Cloudinary via an
 * upload stream, so we never write the file to disk first.
 *
 * Cloudinary credentials are configured server-side, so this is a
 * signed authenticated upload.
 */
export function uploadBuffer(
  buffer: Buffer,
  {
    folder = 'agri-marketplace',
    resourceType = 'image',
  }: {
    folder?: string;
    resourceType?: 'image' | 'video' | 'raw' | 'auto';
  } = {}
): Promise<UploadResult> {
  return new Promise((resolve) => {
    let resolved = false;

    /**
     * Temporary fallback used so the application continues operating
     * while Cloudinary is being diagnosed.
     *
     * WARNING:
     * A data URI can become very large and should not be considered
     * permanent production storage.
     */
    const fallback = (reason: string) => {
      if (resolved) return;

      resolved = true;

      logger.error(
        `[CLOUDINARY] Upload failed.\n` +
          `Reason: ${reason}\n` +
          `Cloud name configured: ${Boolean(env.cloudinary.cloudName)}\n` +
          `API key configured: ${Boolean(env.cloudinary.apiKey)}\n` +
          `API secret configured: ${Boolean(env.cloudinary.apiSecret)}\n` +
          `Folder: ${folder}\n` +
          `Resource type: ${resourceType}\n` +
          `Buffer size: ${buffer.length} bytes`
      );

      logger.warn(
        '[CLOUDINARY] Falling back to inline data URI. ' +
          'This fallback is temporary and should be removed after ' +
          'the Cloudinary configuration is fixed.'
      );

      // PNG magic bytes: 89 50 4E 47
      const isPng = buffer
        .toString('hex', 0, 4)
        .toLowerCase()
        .startsWith('89504e47');

      const mimeType = isPng ? 'image/png' : 'image/jpeg';

      const dataUrl = `data:${mimeType};base64,${buffer.toString(
        'base64'
      )}`;

      resolve({
        url: dataUrl,
        publicId: `fallback_${Date.now()}_${Math.random()
          .toString(36)
          .substring(2, 7)}`,
      });
    };

    try {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
        },
        (error, result) => {
          if (error || !result) {
            const errorDetails = error
              ? serializeError(error)
              : 'Cloudinary returned no result and no error.';

            logger.error(
              `[CLOUDINARY] Upload callback returned an error:\n${errorDetails}`
            );

            return fallback(errorDetails);
          }

          if (resolved) return;

          resolved = true;

          logger.info(
            `[CLOUDINARY] Upload successful: ` +
              `public_id=${result.public_id}, ` +
              `secure_url=${result.secure_url}`
          );

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      );

      /**
       * Stream-level errors can occur independently of the callback.
       * This captures network/HTTP/Cloudinary stream failures as well.
       */
      uploadStream.on('error', (error) => {
        const errorDetails = serializeError(error);

        logger.error(
          `[CLOUDINARY] Upload stream error:\n${errorDetails}`
        );

        fallback(errorDetails);
      });

      uploadStream.end(buffer);
    } catch (error) {
      const errorDetails = serializeError(error);

      logger.error(
        `[CLOUDINARY] Exception while creating upload stream:\n${errorDetails}`
      );

      fallback(errorDetails);
    }
  });
}

/**
 * Deletes an asset from Cloudinary.
 */
export function deleteAsset(
  publicId?: string | null,
  resourceType: 'image' | 'video' | 'raw' = 'image'
) {
  if (!publicId) {
    return Promise.resolve();
  }

  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}

export { cloudinary };