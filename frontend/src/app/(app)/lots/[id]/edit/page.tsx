"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { RoleProtectedPage } from "@/components/RoleProtectedPage";
import { PageHeader } from "@/components/ui/stat-card";
import { Alert, Card, FieldError, FieldHint, Label } from "@/components/ui/primitives";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LoadingBlock, ErrorBlock } from "@/components/StateBlocks";
import { useFarmerProfileQuery } from "@/hooks/useFarmerProfile";
import { useCropsQuery } from "@/hooks/useReferenceData";
import { lotApi } from "@/services/lotApi";
import { ApiRequestError } from "@/types/api";
import type { QuantityUnit } from "@/types/domain";

const KG_PER_UNIT: Record<QuantityUnit, number> = { KG: 1, QTL: 100, TONNE: 1000 };
const UNIT_LABEL: Record<QuantityUnit, string> = { KG: "KG", QTL: "QTL", TONNE: "TONNE" };

function toKg(value: number, unit: QuantityUnit) {
  return value * KG_PER_UNIT[unit];
}

function fromKg(valueKg: number, unit: QuantityUnit) {
  return valueKg / KG_PER_UNIT[unit];
}

function cleanNumber(value: number) {
  if (!Number.isFinite(value)) return "";
  return Number(value.toFixed(3)).toString();
}

function EditLotContent({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const lotQuery = useQuery({ queryKey: ["lots", id], queryFn: () => lotApi.get(id) });
  const profileQuery = useFarmerProfileQuery();
  const cropsQuery = useCropsQuery();

  const [farmId, setFarmId] = React.useState("");
  const [cropId, setCropId] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unit, setUnit] = React.useState<QuantityUnit>("QTL");
  const [variety, setVariety] = React.useState("");
  const [harvestDate, setHarvestDate] = React.useState("");
  const [availabilityDate, setAvailabilityDate] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [fieldError, setFieldError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const lot = lotQuery.data;
    if (!lot) return;
    setFarmId(lot.farm?.id ?? "");
    setCropId(lot.crop?.id ?? "");
    setQuantity(String(lot.quantity.value));
    setUnit(lot.quantity.unit);
    setVariety(lot.variety ?? "");
    setHarvestDate(lot.harvestDate ? new Date(lot.harvestDate).toISOString().slice(0, 10) : "");
    setAvailabilityDate(new Date(lot.availabilityDate).toISOString().slice(0, 10));
  }, [lotQuery.data]);

  const farms = profileQuery.data?.farms ?? [];
  const numericQuantity = Number(quantity);
  const quantityKg = Number.isFinite(numericQuantity) && numericQuantity > 0 ? toKg(numericQuantity, unit) : null;

  const equivalentUnits = (target: QuantityUnit) =>
    quantityKg === null ? "—" : `${cleanNumber(fromKg(quantityKg, target))} ${UNIT_LABEL[target]}`;

  const save = useMutation({
    mutationFn: () => lotApi.updateDraft(id, {
      farmId: farmId || undefined,
      cropId,
      quantity: numericQuantity,
      unit,
      variety: variety.trim() || undefined,
      harvestDate: harvestDate || undefined,
      availabilityDate,
    }),
    onSuccess: (updated) => {
      queryClient.setQueryData(["lots", id], updated);
      queryClient.invalidateQueries({ queryKey: ["lots"] });
      router.push(`/lots/${id}`);
    },
    onError: (e) => setError(e instanceof ApiRequestError ? e.message : "We couldn't save the lot. Please try again."),
  });

  const validate = () => {
    setFieldError(null);
    setError(null);
    if (!farmId) return "Please select a farm.";
    if (!cropId) return "Please select a crop.";
    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) return "Enter a quantity greater than 0.";
    if (numericQuantity > 1_000_000) return "Enter a realistic quantity (maximum 1,000,000 in the selected unit).";
    if (!availabilityDate) return "Please choose when this lot will be available.";
    if (harvestDate && harvestDate > availabilityDate) return "Harvest date must be on or before the availability date.";
    return null;
  };

  if (lotQuery.isLoading || profileQuery.isLoading || cropsQuery.isLoading) return <LoadingBlock />;
  if (lotQuery.isError || !lotQuery.data) return <ErrorBlock message="Couldn't load this lot." onRetry={() => lotQuery.refetch()} />;
  if (lotQuery.data.status !== "DRAFT") {
    return <Alert variant="info">Only draft lots can be edited. This lot is already {lotQuery.data.status.replace(/_/g, " ")}.</Alert>;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader
        title="Edit lot"
        description="Change the quantity, unit, crop details, or dates. Quantity is always saved internally in KG, so changing units will not change the actual amount of produce."
        breadcrumb={<button className="hover:underline" onClick={() => router.push(`/lots/${id}`)}><ArrowLeft className="mr-1 inline h-4 w-4" />Back to lot</button>}
      />

      <Card>
        {(error || fieldError) && <Alert variant="error" className="mb-5">{error ?? fieldError}</Alert>}

        <div className="space-y-5">
          <div>
            <Label htmlFor="farm">Farm</Label>
            <Select id="farm" value={farmId} onChange={(e) => setFarmId(e.target.value)}>
              <option value="">Select a farm</option>
              {farms.map((f) => <option key={f.id} value={f.id}>{f.name || f.village} — {f.district.name}</option>)}
            </Select>
          </div>

          <div>
            <Label htmlFor="crop">Crop</Label>
            <Select id="crop" value={cropId} onChange={(e) => setCropId(e.target.value)}>
              <option value="">Select a crop</option>
              {(cropsQuery.data ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </div>

          <div>
            <Label>Quantity</Label>
            <div className="grid grid-cols-[1fr_150px] gap-3">
              <Input
                id="quantity"
                type="number"
                min="0.001"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 50"
                aria-label="Quantity"
              />
              <Select value={unit} onChange={(e) => setUnit(e.target.value as QuantityUnit)} aria-label="Quantity unit">
                <option value="KG">Kilograms (KG)</option>
                <option value="QTL">Quintal (QTL)</option>
                <option value="TONNE">Tonne</option>
              </Select>
            </div>
            <FieldHint>
              The amount stays the same when you change units. Example: 5 QTL = 500 KG = 0.5 TONNE.
            </FieldHint>
            <FieldError>{fieldError && fieldError.includes("quantity") ? fieldError : undefined}</FieldError>
          </div>

          <div className="rounded-2xl border border-border bg-secondary/40 p-4">
            <div className="mb-3 flex items-center gap-2 font-semibold">
              <RefreshCw className="h-4 w-4" /> Quantity conversion preview
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              {(["KG", "QTL", "TONNE"] as QuantityUnit[]).map((target) => (
                <div key={target} className="rounded-xl border border-border bg-background p-3">
                  <div className="text-xs text-muted-foreground">{target}</div>
                  <div className="mt-1 font-bold">{equivalentUnits(target)}</div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Stored amount: {quantityKg === null ? "—" : `${cleanNumber(quantityKg)} KG`}. This is the value used by matching, logistics, storage, and aggregation calculations.
            </p>
          </div>

          <div>
            <Label htmlFor="variety">Variety (optional)</Label>
            <Input id="variety" value={variety} onChange={(e) => setVariety(e.target.value)} placeholder="e.g. Basmati 1121" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="harvestDate">Harvest date (optional)</Label>
              <Input id="harvestDate" type="date" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="availabilityDate">Available from</Label>
              <Input id="availabilityDate" type="date" value={availabilityDate} onChange={(e) => setAvailabilityDate(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button
              className="w-auto px-5"
              isLoading={save.isPending}
              onClick={() => {
                const validationError = validate();
                if (validationError) {
                  setFieldError(validationError);
                  return;
                }
                save.mutate();
              }}
            >
              Save changes
            </Button>
            <Button variant="outline" className="w-auto px-5" onClick={() => router.push(`/lots/${id}`)} disabled={save.isPending}>
              Cancel
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function EditLotPage() {
  const params = useParams<{ id: string }>();
  return (
    <RoleProtectedPage role="FARMER">
      <EditLotContent id={params.id} />
    </RoleProtectedPage>
  );
}
