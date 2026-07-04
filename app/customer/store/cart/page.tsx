"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  X,
  Plus,
  Trash2,
  ShoppingCart,
  Wrench,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, PREDEFINED_SERVICES, Service } from "@/app/context/CartContext";

export default function CartPage() {
  const router = useRouter();
  const { cart, addService, removeItem, clearCart, totalItems, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddService = (service: Service) => {
    addService(service);
  };

  const isServiceInCart = (serviceId: string) => {
    return cart.services.some((s) => s.id === serviceId);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => { clearCart(); router.push("/customer/store"); }} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-500" />
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">Keranjang</h1>
              {totalItems > 0 && (
                <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                  {totalItems} item
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Technician Bookings */}
              {cart.technicianBookings.length > 0 && (
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                  <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                    <Wrench className="h-5 w-5 text-indigo-500" />
                    Teknisi yang Dihire
                  </h2>
                  <div className="space-y-4">
                    {cart.technicianBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-start gap-4 rounded-xl border border-slate-200 dark:border-slate-700 p-4"
                      >
                        <img
                          src={booking.techPhoto}
                          alt={booking.techName}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-800 dark:text-white">
                                {booking.techName}
                              </h3>
                              <p className="text-xs text-slate-500">{booking.techSpecialty}</p>
                            </div>
                            <button
                              onClick={() => removeItem(booking.id, "tech")}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                            {booking.orderType === "pickup" ? (
                              <span className="flex items-center gap-1">
                                <Truck className="h-3 w-3" /> Pickup Service
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Wrench className="h-3 w-3" /> Home Service
                              </span>
                            )}
                            <span>•</span>
                            <span>{booking.deviceName}</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-xs text-slate-500">Perangkat: {booking.deviceType}</span>
                            <span className="font-medium text-indigo-500">
                              {formatPrice(booking.total)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800 dark:text-white">
                  <Plus className="h-5 w-5 text-indigo-500" />
                  Tambahkan Layanan
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PREDEFINED_SERVICES.map((service) => {
                    const inCart = isServiceInCart(service.id);
                    return (
                      <div
                        key={service.id}
                        className={`flex items-center justify-between rounded-xl border p-3 transition-all ${
                          inCart
                            ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20"
                            : "border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700"
                        }`}
                      >
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-slate-800 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {service.description}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-indigo-500">
                            {formatPrice(service.price)}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => inCart ? removeItem(service.id, "service") : handleAddService(service)}
                          className={`ml-3 h-8 rounded-lg border-rose-200 text-rose-500 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-400 dark:hover:bg-rose-900/20 ${
                            inCart ? "opacity-100" : "bg-indigo-500 hover:bg-indigo-600 border-indigo-500 text-white"
                          }`}
                        >
                          {inCart ? (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Cancel
                            </>
                          ) : (
                            <>
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </>
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <div className="sticky top-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 shadow-sm">
                <h3 className="mb-4 font-semibold text-slate-800 dark:text-white">
                  Ringkasan Keranjang
                </h3>

                <div className="space-y-3 border-b border-slate-200 dark:border-slate-700 pb-4">
                  {cart.technicianBookings.length > 0 && (
                    <div className="space-y-1">
                      {cart.technicianBookings.map((booking) => (
                        <div key={booking.id} className="flex justify-between text-sm">
                          <span className="text-slate-500">Jasa Teknisi</span>
                          <span className="text-slate-700 dark:text-slate-200">
                            {formatPrice(booking.total)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                  {cart.services.length > 0 && (
                    <div className="space-y-1">
                      {cart.services.map((service) => (
                        <div key={service.id} className="flex justify-between text-sm">
                          <span className="text-slate-500">{service.name}</span>
                          <span className="text-slate-700 dark:text-slate-200">
                            {formatPrice(service.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 dark:text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-indigo-500">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <Button
                    size="lg"
                    onClick={() => router.push("/customer/store/checkout")}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-lg hover:from-indigo-600 hover:to-indigo-700"
                  >
                    Checkout
                  </Button>
                </div>

                <p className="mt-4 text-xs text-center text-slate-400">
                  Biaya akhir dapat berbeda tergantung hasil pengecekan
                </p>
              </div>
            </div>
          </div>
      </main>
    </div>
  );
}
