import{r as e}from"./rolldown-runtime-hePW80VL.js";import{In as t,Pn as n}from"./vendor-C7U2VwCD.js";import{r}from"./api-DPxjCZ-3.js";import{U as i}from"./index-C_2mt7S3.js";var a=e(t(),1),o=n(),s=null;function c(){return window.google?.accounts?.id?Promise.resolve(!0):(s||=new Promise(e=>{let t=document.createElement(`script`);t.src=`https://accounts.google.com/gsi/client`,t.async=!0,t.defer=!0,t.onload=()=>e(!0),t.onerror=()=>e(!1),document.body.appendChild(t)}),s)}function l({onSuccess:e,onError:t}){let n=(0,a.useRef)(null),{loginWithGoogle:s}=i(),[l,u]=(0,a.useState)(!1),[d,f]=(0,a.useState)(!1),p=`1072085400751-lpc2md6kq1eelsu6q0udc88nvmtj5655.apps.googleusercontent.com`;return(0,a.useEffect)(()=>{let i=!1;return c().then(a=>{i||!a||!window.google||!n.current||(window.google.accounts.id.initialize({client_id:p,callback:async n=>{f(!0);try{await s(n.credential),e()}catch(e){t?.(r(e,`Could not sign in with Google.`))}finally{f(!1)}}}),window.google.accounts.id.renderButton(n.current,{type:`standard`,theme:`outline`,size:`large`,width:Math.min(320,n.current.offsetWidth||320),text:`continue_with`,shape:`pill`}),u(!0))}),()=>{i=!0}},[p]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(`div`,{className:`flex flex-col items-center`,children:(0,o.jsxs)(`div`,{className:`relative w-full max-w-[320px]`,children:[(0,o.jsx)(`div`,{ref:n,className:l?``:`h-11 w-full animate-pulse rounded-full bg-surface-sunk`,"aria-hidden":d}),d&&(0,o.jsxs)(`div`,{role:`status`,"aria-live":`polite`,className:`
                absolute inset-0
                z-20
                flex items-center justify-center
                gap-3
                rounded-full
                bg-surface/95
                backdrop-blur-sm
              `,children:[(0,o.jsx)(`span`,{className:`
                  h-5 w-5
                  animate-spin
                  rounded-full
                  border-2
                  border-brand-200
                  border-t-brand-600
                `,"aria-hidden":`true`}),(0,o.jsx)(`span`,{className:`text-sm font-semibold text-ink-700`,children:`Signing you in…`})]})]})}),d&&(0,o.jsx)(`div`,{className:`
            fixed inset-0
            z-[9999]
            flex items-center justify-center
            bg-black/20
            backdrop-blur-sm
          `,role:`status`,"aria-live":`polite`,children:(0,o.jsxs)(`div`,{className:`
              flex min-w-[280px]
              flex-col items-center
              rounded-2xl
              bg-surface
              px-8 py-7
              shadow-2xl
            `,children:[(0,o.jsx)(`div`,{className:`
                mb-4
                h-10 w-10
                animate-spin
                rounded-full
                border-4
                border-brand-200
                border-t-brand-600
              `}),(0,o.jsx)(`p`,{className:`text-base font-semibold text-ink-900`,children:`Signing you in`}),(0,o.jsx)(`p`,{className:`mt-1 text-center text-sm text-ink-500`,children:`Please wait while we securely sign you in…`})]})})]})}export{l as t};