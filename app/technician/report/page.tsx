"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Plus, Trash2, FileText, Wrench, Package, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/admin/Modal";
import { cn } from "@/lib/utils";

const PENDING_ORDERS = [
  { id: "1", customerName: "Budi Santoso", serviceType: "Perbaikan Laptop", device: "HP Pavilion 15", estimatedPrice: 500000 },
  { id: "2", customerName: "Siti Rahayu", serviceType: "Ganti LCD", device: "Dell XPS 13", estimatedPrice: 1200000 },
];

interface PartReplaced {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export default function ReportPage() {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [actualDamage, setActualDamage] = useState("");
  const [actionsTaken, setActionsTaken] = useState("");
  const [partsReplaced, setPartsReplaced] = useState<PartReplaced[]>([]);
  const [additionalCost, setAdditionalCost] = useState("");

  const selectedOrder = PENDING_ORDERS.find((o) => o.id === selectedOrderId);
  const estimatedPrice = selectedOrder?.estimatedPrice || 0;

  const totalPartsCost = partsReplaced.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const additionalCostNum = parseFloat(additionalCost) || 0;
  const totalCost = estimatedPrice + totalPartsCost + additionalCostNum;

  const addPart = () => {
    setPartsReplaced([...partsReplaced, { id: crypto.randomUUID(), name: "", quantity: 1, price: 0 }]);
  };

  const removePart = (id: string) => {
    setPartsReplaced(partsReplaced.filter((p) => p.id !== id));
  };

  const updatePart = (id: string, field: keyof PartReplaced, value: string | number) => {
    setPartsReplaced(partsReplaced.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Buat Laporan Servis</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Lengkapi laporan hasil servis untuk pelanggan
        </p>
      </div>

      {!selectedOrderId ? (
        /* Order Selection Card */
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Pilih Pesanan</h3>
          </div>
          <div className="space-y-4">
            {PENDING_ORDERS.map((order) => (
              <button
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className="w-full text-left flex items-start gap-4 rounded-lg border border-border p-4 hover:border-blue-500 hover:bg-blue-50/30 transition-all"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                  <Wrench className="h-5 w-5 text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{order.serviceType}</p>
                  <p className="text-sm text-muted-foreground">{order.device}</p>
                  <p className="text-sm text-muted-foreground mt-1">👤 {order.customerName}</p>
                </div>
                <p className="text-blue-500 font-semibold shrink-0">{formatCurrency(order.estimatedPrice)}</p>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Report Form */
        <div className="space-y-4">
          {/* Order Summary Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <Wrench className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{selectedOrder?.serviceType}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder?.device}</p>
              </div>
              <button
                onClick={() => setSelectedOrderId(null)}
                className="text-sm text-blue-500 hover:underline"
              >
                Ganti
              </button>
            </div>
          </div>

          {/* Damage Description Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Deskripsi Kerusakan Nyata</h3>
              <span className="text-red-500">*</span>
            </div>
            <textarea
              value={actualDamage}
              onChange={(e) => setActualDamage(e.target.value)}
              placeholder="Jelaskan kerusakan yang sebenarnya ditemukan..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Actions Taken Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Tindakan yang Diambil</h3>
              <span className="text-red-500">*</span>
            </div>
            <textarea
              value={actionsTaken}
              onChange={(e) => setActionsTaken(e.target.value)}
              placeholder="Jelaskan tindakan perbaikan yang dilakukan..."
              rows={3}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Parts Replaced Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold text-foreground">Suku Cadang yang Diganti</h3>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addPart} className="gap-1">
                <Plus className="h-4 w-4" />
                Tambah
              </Button>
            </div>

            {partsReplaced.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center border border-dashed border-border rounded-lg">
                Belum ada suku cadang yang diganti
              </p>
            ) : (
              <div className="space-y-3">
                {partsReplaced.map((part, index) => (
                  <div key={part.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground">Nama Part #{index + 1}</label>
                        <input
                          type="text"
                          value={part.name}
                          onChange={(e) => updatePart(part.id, "name", e.target.value)}
                          placeholder="Contoh: LCD Screen"
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="w-20">
                        <label className="text-xs text-muted-foreground">Qty</label>
                        <input
                          type="number"
                          value={part.quantity}
                          onChange={(e) => updatePart(part.id, "quantity", parseInt(e.target.value) || 1)}
                          min={1}
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground">Harga</label>
                        <input
                          type="number"
                          value={part.price}
                          onChange={(e) => updatePart(part.id, "price", parseInt(e.target.value) || 0)}
                          placeholder="0"
                          className="w-full mt-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
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
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Additional Cost Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Biaya Tambahan</h3>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rp</span>
              <input
                type="number"
                value={additionalCost}
                onChange={(e) => setAdditionalCost(e.target.value)}
                placeholder="0"
                className="w-full rounded-lg border border-input bg-background pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Summary Card */}
          <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4">Ringkasan Biaya</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Estimasi Awal</span>
                <span>{formatCurrency(estimatedPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Biaya Suku Cadang</span>
                <span>{formatCurrency(totalPartsCost)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Biaya Tambahan</span>
                <span>{formatCurrency(additionalCostNum)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-blue-500">{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!actualDamage || !actionsTaken}
            className="w-full"
          >
            Kirim Laporan
          </Button>
        </div>
      )}

      {/* Success Modal */}
      <Modal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} size="sm">
        <div className="text-center py-6">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">Laporan Terkirim</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Laporan servis berhasil dikirim. Menunggu persetujuan dari pelanggan.
          </p>
          <Button onClick={() => router.push("/technician/order")} className="mt-6 w-full">
            Kembali ke Pesanan
          </Button>
        </div>
      </Modal>
    </div>
  );
}
