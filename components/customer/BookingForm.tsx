// components/customer/BookingForm.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import { FormInput, FormTextarea, FormSelect, DateTimePicker, LocationPicker } from "@/components/customer";
import { Button } from "@/components/ui/button";

export type BookingType = "pickup" | "home";

export interface BookingFormData {
  deviceName: string;
  damageDescription: string;
  address: string;
  addressCoordinates: { lat: number; lng: number } | null;
  pickupTime: Date | null;
  contactPhone: string;
  contactName: string;
}

export interface BookingFormProps {
  bookingType: BookingType;
  initialData?: Partial<BookingFormData>;
  onSubmit: (data: BookingFormData) => void;
  isSubmitting?: boolean;
  disabled?: boolean;
  className?: string;
}

const deviceTypeOptions = [
  { value: "laptop", label: "Laptop" },
  { value: "pc", label: "PC Desktop" },
  { value: "other", label: "Lainnya" },
];

const defaultPickupCost = 15000;
const defaultCheckupCost = 25000;

export function BookingForm({ bookingType, initialData, onSubmit, isSubmitting, disabled, className }: BookingFormProps) {
  const [formData, setFormData] = React.useState<BookingFormData>({
    deviceName: initialData?.deviceName ?? "",
    damageDescription: initialData?.damageDescription ?? "",
    address: initialData?.address ?? "",
    addressCoordinates: initialData?.addressCoordinates ?? null,
    pickupTime: initialData?.pickupTime ?? null,
    contactPhone: initialData?.contactPhone ?? "",
    contactName: initialData?.contactName ?? "",
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [touched, setTouched] = React.useState<Partial<Record<keyof BookingFormData, boolean>>>({});

  const validate = React.useCallback((data: BookingFormData): Partial<Record<keyof BookingFormData, string>> => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    if (!data.deviceName.trim()) newErrors.deviceName = "Nama perangkat wajib diisi";
    if (!data.damageDescription.trim()) newErrors.damageDescription = "Deskripsi kerusakan wajib diisi";
    else if (data.damageDescription.trim().length < 10) newErrors.damageDescription = "Deskripsi minimal 10 karakter";
    if (!data.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!data.pickupTime) newErrors.pickupTime = "Waktu penjemputan/kunjungan wajib dipilih";
    if (!data.contactPhone.trim()) newErrors.contactPhone = "Nomor telepon wajib diisi";
    else if (!/^[\d\s\-+()]{8,}$/.test(data.contactPhone)) newErrors.contactPhone = "Nomor telepon tidak valid";
    if (!data.contactName.trim()) newErrors.contactName = "Nama lengkap wajib diisi";
    return newErrors;
  }, []);

  const isOutOfRadius = React.useMemo(() => {
    if (!formData.addressCoordinates) return false;
    const storeLocation = { lat: -6.2088, lng: 106.8456 };
    const distance = calculateHaversine(formData.addressCoordinates, storeLocation);
    return distance > 25;
  }, [formData.addressCoordinates]);

  const cost = React.useMemo(() => ({
    pickup: bookingType === "pickup" ? defaultPickupCost : 0,
    checkup: defaultCheckupCost,
    total: (bookingType === "pickup" ? defaultPickupCost : 0) + defaultCheckupCost,
  }), [bookingType]);

  const handleChange = <K extends keyof BookingFormData>(field: K, value: BookingFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (isOutOfRadius) { setErrors((prev) => ({ ...prev, address: "Maaf, alamat Anda di luar jangkauan kurir pickup kami" })); return; }
    if (Object.keys(validationErrors).length === 0) onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-4">
        <h3 className="font-semibold">Informasi Kontak</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Nama Lengkap" value={formData.contactName} onChange={(e) => handleChange("contactName", e.target.value)} error={touched.contactName ? errors.contactName : undefined} required disabled={disabled} />
          <FormInput label="Nomor Telepon" type="tel" value={formData.contactPhone} onChange={(e) => handleChange("contactPhone", e.target.value)} error={touched.contactPhone ? errors.contactPhone : undefined} placeholder="08xxxxxxxxxx" required disabled={disabled} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Informasi Perangkat</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput label="Nama/Merek Perangkat" value={formData.deviceName} onChange={(e) => handleChange("deviceName", e.target.value)} error={touched.deviceName ? errors.deviceName : undefined} placeholder="Contoh: MacBook Pro 2021" required disabled={disabled} />
          <FormSelect label="Jenis Perangkat" options={deviceTypeOptions} placeholder="Pilih jenis perangkat" required disabled={disabled} />
        </div>
        <FormTextarea label="Deskripsi Kerusakan" value={formData.damageDescription} onChange={(e) => handleChange("damageDescription", e.target.value)} error={touched.damageDescription ? errors.damageDescription : undefined} placeholder="Jelaskan kerusakan..." required disabled={disabled} showCharCount maxLength={500} />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">{bookingType === "pickup" ? "Alamat Penjemputan" : "Alamat Kunjungan"}</h3>
        <LocationPicker label="Alamat Lengkap" value={{ address: formData.address, coordinates: formData.addressCoordinates }} onChange={(loc) => { handleChange("address", loc.address); handleChange("addressCoordinates", loc.coordinates); }} error={touched.address ? errors.address : undefined} hint="Gunakan lokasi saat ini atau masukkan alamat manual" required disabled={disabled} maxRadius={25} />
        <DateTimePicker label={bookingType === "pickup" ? "Waktu Penjemputan" : "Jadwal Kunjungan"} value={formData.pickupTime} onChange={(date) => handleChange("pickupTime", date)} error={touched.pickupTime ? errors.pickupTime : undefined} hint="Pilih tanggal dan waktu" required disabled={disabled} minDate={new Date()} />
      </div>

      <div className="p-4 rounded-lg border bg-muted/30 space-y-2">
        <h3 className="font-semibold">Ringkasan Biaya</h3>
        <div className="flex justify-between text-sm"><span>Biaya {bookingType === "pickup" ? "Penjemputan" : "Kunjungan"}</span><span>Rp {cost.pickup.toLocaleString("id-ID")}</span></div>
        <div className="flex justify-between text-sm"><span>Biaya Pengecekan Awal</span><span>Rp {cost.checkup.toLocaleString("id-ID")}</span></div>
        <div className="flex justify-between font-semibold pt-2 border-t"><span>Total Estimasi</span><span>Rp {cost.total.toLocaleString("id-ID")}</span></div>
      </div>

      {isOutOfRadius && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <p className="text-sm">Maaf, alamat Anda di luar jangkauan kurir pickup kami (maks. 25 km)</p>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={disabled || isSubmitting || isOutOfRadius}>
        {isSubmitting ? "Memproses..." : bookingType === "pickup" ? "Pesan Pickup" : "Pesan Sekarang"}
      </Button>
    </form>
  );
}

function calculateHaversine(point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number {
  const R = 6371;
  const dLat = ((point2.lat - point1.lat) * Math.PI) / 180;
  const dLng = ((point2.lng - point1.lng) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((point1.lat * Math.PI) / 180) * Math.cos((point2.lat * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
