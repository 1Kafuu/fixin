"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Camera, Plus, Trash2 } from "lucide-react";

interface PartReplaced {
  id: string;
  name: string;
  quantity: number;
  price: number;
  photoUrl?: string;
}

interface ServiceReportFormProps {
  orderId: string;
  estimatedPrice: number;
  onSubmit?: (data: FormData) => Promise<void>;
}

export function ServiceReportForm({ orderId, estimatedPrice, onSubmit }: ServiceReportFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actualDamage, setActualDamage] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [partsReplaced, setPartsReplaced] = useState<PartReplaced[]>([]);
  const [additionalCost, setAdditionalCost] = useState("");

  const addPart = () => {
    setPartsReplaced([
      ...partsReplaced,
      { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 },
    ]);
  };

  const removePart = (id: string) => {
    setPartsReplaced(partsReplaced.filter((p) => p.id !== id));
  };

  const updatePart = (id: string, field: keyof PartReplaced, value: string | number) => {
    setPartsReplaced(
      partsReplaced.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const totalPartsCost = partsReplaced.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const additionalCostNum = parseFloat(additionalCost) || 0;
  const totalCost = estimatedPrice + totalPartsCost + additionalCostNum;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actualDamage || !actionsTaken) return;

    setIsSubmitting(true);
    try {
      const formData = {
        orderId,
        actualDamage,
        actionsTaken,
        partsReplaced,
        additionalCost: additionalCostNum,
        totalCost,
      };

      if (onSubmit) {
        await onSubmit(formData as any);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push("/technician/order");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Deskripsi Kerusakan Nyata <span className="text-red-500">*</span>
        </label>
        <textarea
          value={actualDamage}
          onChange={(e) => setActualDamage(e.target.value)}
          placeholder="Jelaskan kerusakan yang sebenarnya ditemukan..."
          rows={3}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Tindakan yang Diambil <span className="text-red-500">*</span>
        </label>
        <textarea
          value={actionsTaken}
          onChange={(e) => setActionsTaken(e.target.value)}
          placeholder="Jelaskan tindakan perbaikan yang dilakukan..."
          rows={3}
          className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium">Suku Cadang yang Diganti</label>
          <Button type="button" variant="outline" size="sm" onClick={addPart}>
            <Plus className="h-4 w-4 mr-1" />
            Tambah
          </Button>
        </div>

        {partsReplaced.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center border border-dashed border-border rounded-lg">
            Belum ada suku cadang yang diganti
          </p>
        ) : (
          <div className="space-y-3">
            {partsReplaced.map((part) => (
              <div key={part.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Nama Part</label>
                    <input
                      type="text"
                      value={part.name}
                      onChange={(e) => updatePart(part.id, "name", e.target.value)}
                      placeholder="Contoh: LCD Screen"
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <label className="text-xs text-muted-foreground">Qty</label>
                    <input
                      type="number"
                      value={part.quantity}
                      onChange={(e) => updatePart(part.id, "quantity", parseInt(e.target.value) || 1)}
                      min={1}
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground">Harga</label>
                    <input
                      type="number"
                      value={part.price}
                      onChange={(e) => updatePart(part.id, "price", parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removePart(part.id)}
                    className="flex items-center justify-center h-10 w-10 rounded-md text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    <Camera className="h-4 w-4" />
                    Unggah Foto
                  </button>
                  {part.photoUrl && (
                    <p className="text-xs text-emerald-600 mt-1">✓ Foto terunggah</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Biaya Tambahan</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
          <input
            type="number"
            value={additionalCost}
            onChange={(e) => setAdditionalCost(e.target.value)}
            placeholder="0"
            className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Estimasi Awal</span>
          <span>{formatCurrency(estimatedPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Biaya Suku Cadang</span>
          <span>{formatCurrency(totalPartsCost)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Biaya Tambahan</span>
          <span>{formatCurrency(additionalCostNum)}</span>
        </div>
        <div className="border-t border-border pt-2 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-primary">{formatCurrency(totalCost)}</span>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting || !actualDamage || !actionsTaken} className="w-full">
        {isSubmitting ? "Menyimpan..." : "Kirim Laporan"}
      </Button>
    </form>
  );
}
