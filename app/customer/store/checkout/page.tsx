"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Truck,
  Wrench,
  MapPin,
  Calendar,
  Clock,
  AlertTriangle,
  Check,
  Copy,
  CheckCircle,
  CreditCard,
  Smartphone,
  ShoppingCart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/app/context/CartContext";
import { useOrder } from "@/app/context/OrderContext";
import { StatusType } from "@/components/customer";

type BookingType = "pickup" | "home";

const deviceTypes = [
  { value: "laptop", label: "Laptop" },
  { value: "pc", label: "PC Desktop" },
  { value: "other", label: "Lainnya" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrder();
  const [orderCreated, setOrderCreated] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentExpired, setPaymentExpired] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60);

  const [formData, setFormData] = useState({
    contactName: "",
    contactPhone: "",
    address: "",
    scheduledDate: "",
    scheduledTime: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (cart.technicianBookings.length === 0 && cart.services.length === 0 && !orderCreated) {
      router.push("/customer/store/cart");
    }
  }, [cart, orderCreated, router]);

  useEffect(() => {
    if (orderCreated && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setPaymentExpired(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [orderCreated, countdown]);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.contactName.trim()) newErrors.contactName = "Nama lengkap wajib diisi";
    if (!formData.contactPhone.trim()) newErrors.contactPhone = "Nomor telepon wajib diisi";
    if (!formData.address.trim()) newErrors.address = "Alamat wajib diisi";
    if (!formData.scheduledDate) newErrors.scheduledDate = "Pilih tanggal";
    if (!formData.scheduledTime) newErrors.scheduledTime = "Pilih waktu";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    setOrderCreated(true);
  };

  const handleCancelOrder = () => {
    clearCart();
    router.push("/customer");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleConfirmPayment = () => {
    if (!orderId || cart.technicianBookings.length === 0) return;

    const booking = cart.technicianBookings[0];
    const orderData = {
      id: orderId,
      techId: booking.techId,
      techName: booking.techName,
      techPhoto: booking.techPhoto,
      status: "pending" as StatusType,
      bookingType: booking.orderType,
      deviceName: booking.deviceName,
      damageDescription: booking.damageDesc,
      address: formData.address,
      scheduledDate: new Date(`${formData.scheduledDate}T${formData.scheduledTime}`),
      totalAmount: totalPrice,
      createdAt: new Date(),
      services: cart.services.map(s => ({ id: s.id, name: s.name, price: s.price })),
    };

    addOrder(orderData);
    clearCart();
    router.push("/customer/orders");
  };

  if (paymentExpired) {
    return (
      <div className="p-4 sm:p-6">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/30">
            <AlertTriangle className="h-8 w-8 text-rose-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">Waktu Pembayaran Habis</h2>
          <p className="mt-2 text-sm text-slate-500">
            Maaf, waktu pembayaran Anda telah habis. Pesanan telah dibatalkan secara otomatis.
          </p>
          <Button className="mt-6 w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg" onClick={() => router.push("/customer")}>
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    );
  }

  if (orderCreated) {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const isUrgent = countdown <= 300;
    const isCritical = countdown <= 60;

    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-950/30 dark:to-cyan-950/30 p-6">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-emerald-500 p-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">Pesanan Berhasil!</h2>
              <p className="text-sm text-slate-500">
                Order ID: <span className="font-mono font-medium">{orderId}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`rounded-2xl border p-5 ${
                isCritical
                  ? "border-rose-200 bg-rose-50 dark:border-rose-800 dark:bg-rose-950/50"
                  : isUrgent
                  ? "border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-950/50"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className={`h-6 w-6 ${isCritical ? "text-rose-500" : isUrgent ? "text-warning-500" : "text-slate-500"}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-500">Waktu pembayaran tersisa</p>
                    <p className={`text-3xl font-bold tabular-nums ${isCritical ? "text-rose-500" : isUrgent ? "text-warning-500" : "text-slate-800 dark:text-white"}`}>
                      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleCancelOrder} className="h-9 rounded-xl">
                  Batalkan
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Metode Pembayaran</h3>

              <div className="mb-4">
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                  <CreditCard className="h-5 w-5 text-slate-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">Transfer Bank</span>
                </div>
                <div className="mt-3 space-y-3">
                  <button className="w-full rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-left hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image src="/bca.png" alt="BCA" width={60} height={32} className="h-8 w-auto object-contain" />
                        <div>
                          <p className="font-medium text-slate-800 dark:text-slate-200">Bank BCA</p>
                          <p className="text-sm text-slate-500">1234567890</p>
                        </div>
                      </div>
                      <Copy className="h-4 w-4 text-slate-400" />
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800 p-3">
                  <Smartphone className="h-5 w-5 text-slate-500" />
                  <span className="font-medium text-slate-700 dark:text-slate-200">E-Wallet</span>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  {[
                    { id: "gopay", name: "GoPay", src: "/gopay.png" },
                    { id: "ovo", name: "OVO", src: "/ovo.jpg" },
                    { id: "dana", name: "DANA", src: "/dana.png" },
                  ].map((wallet) => (
                    <button
                      key={wallet.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 p-3 text-center hover:border-indigo-300 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
                    >
                      <Image src={wallet.src} alt={wallet.name} width={60} height={32} className="mx-auto h-8 w-auto object-contain" />
                      <p className="mt-2 text-sm font-medium text-slate-700 dark:text-slate-200">{wallet.name}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg gap-2" onClick={handleConfirmPayment}>
                <Check className="h-5 w-5" />
                Konfirmasi Pembayaran
              </Button>
              <Button variant="outline" size="lg" className="w-full h-14 rounded-xl" onClick={handleCancelOrder}>
                Batalkan Pesanan
              </Button>
            </div>
          </div>

          <div>
            <div className="sticky top-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm">
              <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Ringkasan Pesanan</h3>

              <div className="space-y-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Order ID</span>
                  <span className="font-mono font-medium text-slate-800 dark:text-white">{orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Tanggal</span>
                  <span className="font-medium text-slate-800 dark:text-white">{formData.scheduledDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Waktu</span>
                  <span className="font-medium text-slate-800 dark:text-white">{formData.scheduledTime}</span>
                </div>
              </div>

              {cart.technicianBookings.length > 0 && (
                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 py-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Teknisi:</p>
                  {cart.technicianBookings.map((booking) => (
                    <div key={booking.id} className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        {booking.techName} ({booking.orderType === "pickup" ? "Pickup" : "Home"})
                      </span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {formatPrice(booking.total)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {cart.services.length > 0 && (
                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 py-4">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Layanan:</p>
                  {cart.services.map((service) => (
                    <div key={service.id} className="flex justify-between text-sm">
                      <span className="text-slate-500">{service.name}</span>
                      <span className="font-medium text-slate-800 dark:text-white">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-800 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-indigo-500">{formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <Button variant="ghost" size="sm" onClick={() => { clearCart(); router.push("/customer/store"); }} className="mb-6 gap-2">
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </Button>

      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 dark:text-white">Checkout</h1>
        <p className="mt-1 text-sm text-slate-500">
          Lengkapi informasi untuk melanjutkan pembayaran
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm space-y-6">
            <div>
              <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Informasi Kontak</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleChange("contactName", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className={`h-11 w-full rounded-xl border bg-white dark:bg-slate-800 px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                      errors.contactName ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {errors.contactName && <p className="mt-1 text-xs text-rose-500">{errors.contactName}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Nomor Telepon <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className={`h-11 w-full rounded-xl border bg-white dark:bg-slate-800 px-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                      errors.contactPhone ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                  {errors.contactPhone && <p className="mt-1 text-xs text-rose-500">{errors.contactPhone}</p>}
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Alamat {cart.technicianBookings.some(b => b.orderType === "home") ? "Kunjungan" : "Penjemputan"}</h3>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                  Alamat Lengkap <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    placeholder="Masukkan alamat lengkap"
                    className={`h-11 w-full rounded-xl border bg-white dark:bg-slate-800 pl-10 pr-4 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                      errors.address ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                    }`}
                  />
                </div>
                {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Jadwal Servis</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Tanggal <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => handleChange("scheduledDate", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`h-11 w-full rounded-xl border bg-white dark:bg-slate-800 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                        errors.scheduledDate ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                    />
                  </div>
                  {errors.scheduledDate && <p className="mt-1 text-xs text-rose-500">{errors.scheduledDate}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">
                    Waktu <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={formData.scheduledTime}
                      onChange={(e) => handleChange("scheduledTime", e.target.value)}
                      className={`h-11 w-full rounded-xl border bg-white dark:bg-slate-800 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all ${
                        errors.scheduledTime ? "border-red-500" : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <option value="">Pilih waktu</option>
                      {["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  {errors.scheduledTime && <p className="mt-1 text-xs text-rose-500">{errors.scheduledTime}</p>}
                </div>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg gap-2">
              Lanjutkan ke Pembayaran
            </Button>
          </form>
        </div>

        <div>
          <div className="sticky top-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
            <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">Ringkasan</h3>

            {cart.technicianBookings.length > 0 && (
              <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Teknisi:</p>
                {cart.technicianBookings.map((booking) => (
                  <div key={booking.id} className="flex items-start gap-3">
                    <Image src={booking.techPhoto} alt={booking.techName} width={40} height={40} className="h-10 w-10 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-white">{booking.techName}</p>
                      <p className="text-xs text-slate-500">
                        {booking.orderType === "pickup" ? "Pickup" : "Home"} - {booking.deviceName}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-indigo-500">{formatPrice(booking.total)}</span>
                  </div>
                ))}
              </div>
            )}

            {cart.services.length > 0 && (
              <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Layanan:</p>
                {cart.services.map((service) => (
                  <div key={service.id} className="flex justify-between text-sm">
                    <span className="text-slate-500">{service.name}</span>
                    <span className="font-medium text-slate-800 dark:text-white">{formatPrice(service.price)}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-medium text-slate-800 dark:text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Estimasi Durasi</span>
                <span className="font-medium text-slate-800 dark:text-white">1-2 Hari</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800 dark:text-white">Total</span>
                <span className="text-xl font-bold text-indigo-500">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 p-3">
              <p className="text-xs text-indigo-600 dark:text-indigo-300">
                Biaya akhir dapat berbeda tergantung hasil pengecekan teknisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
