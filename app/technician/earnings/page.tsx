"use client";

import { useState, useCallback } from "react";
import { Wallet, TrendingUp, CheckCircle, Clock, Download, DollarSign, Calendar } from "lucide-react";
import { useApiTimeout } from "@/hooks/useApiTimeout";
import { cn } from "@/lib/utils";

const MOCK_EARNINGS = {
  totalBalance: 15750000,
  monthlyEarnings: [
    { month: "Jul", amount: 8500000 },
    { month: "Agt", amount: 9200000 },
    { month: "Sep", amount: 7800000 },
    { month: "Okt", amount: 11500000 },
    { month: "Nov", amount: 13200000 },
    { month: "Des", amount: 15750000 },
  ],
  completedOrders: 156,
  pendingOrders: 12,
};

const MOCK_ORDER_LIST = [
  { id: "1", customerName: "Budi Santoso", serviceType: "Perbaikan Laptop", amount: 500000, status: "paid", completedAt: "2025-01-15" },
  { id: "2", customerName: "Siti Rahayu", serviceType: "Ganti LCD", amount: 1200000, status: "paid", completedAt: "2025-01-14" },
  { id: "3", customerName: "Ahmad Wijaya", serviceType: "Service Keyboard", amount: 350000, status: "paid", completedAt: "2025-01-13" },
  { id: "4", customerName: "Dewi Lestari", serviceType: "Upgrade RAM", amount: 450000, status: "pending", completedAt: "2025-01-12" },
];

interface EarningsData {
  totalBalance: number;
  monthlyEarnings: Array<{ month: string; amount: number }>;
  completedOrders: number;
  pendingOrders: number;
}

export default function EarningsPage() {
  const fetchEarnings = useCallback(async (): Promise<EarningsData> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return MOCK_EARNINGS;
  }, []);

  const { data, isLoading } = useApiTimeout<EarningsData>({
    fetchFn: fetchEarnings,
    timeoutMs: 10000,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const paidOrders = MOCK_ORDER_LIST.filter((o) => o.status === "paid");
  const pendingOrders = MOCK_ORDER_LIST.filter((o) => o.status === "pending");
  const totalPaid = paidOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalPending = pendingOrders.reduce((sum, o) => sum + o.amount, 0);

  const chartMax = Math.max(...(data?.monthlyEarnings.map((m) => m.amount) || [1]));

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 bg-muted rounded-xl" />
            <div className="h-24 bg-muted rounded-xl" />
          </div>
          <div className="h-64 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Pendapatan</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ringkasan earnings Anda
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Saldo</p>
              <p className="mt-1 text-2xl font-semibold text-blue-500">
                {formatCurrency(data?.totalBalance || 0)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
              <Wallet className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bulan Ini</p>
              <p className="mt-1 text-2xl font-semibold text-emerald-500">
                {formatCurrency(data?.monthlyEarnings[data.monthlyEarnings.length - 1]?.amount || 0)}
              </p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
              <TrendingUp className="h-6 w-6 text-emerald-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-emerald-500">
            <span className="text-sm font-medium">↑ 12%</span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pesanan Selesai</p>
              <p className="mt-1 text-2xl font-semibold text-foreground">{data?.completedOrders || 0}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50">
              <CheckCircle className="h-6 w-6 text-violet-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Menunggu Bayar</p>
              <p className="mt-1 text-2xl font-semibold text-amber-500">{data?.pendingOrders || 0}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50">
              <Clock className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Card */}
      <div className="mb-6 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Grafik Pendapatan</h3>
          <button className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Simple Bar Chart */}
        <div className="h-48 flex items-end gap-3">
          {data?.monthlyEarnings.map((item) => {
            const heightPercent = (item.amount / chartMax) * 100;
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs text-muted-foreground mb-1">
                    Rp {(item.amount / 1000000).toFixed(1)}jt
                  </span>
                  <div
                    className="w-full rounded-t-lg bg-blue-500 transition-all hover:bg-blue-600"
                    style={{ height: `${Math.max(heightPercent, 4)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Pendapatan Tahun Ini</p>
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {formatCurrency(data?.monthlyEarnings.reduce((sum, m) => sum + m.amount, 0) || 0)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-emerald-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+23.5%</span>
          </div>
        </div>
      </div>

      {/* Order History Card */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Riwayat Pesanan</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Lunas ({paidOrders.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Pending ({pendingOrders.length})</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {MOCK_ORDER_LIST.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  order.status === "paid" ? "bg-emerald-50" : "bg-amber-50"
                )}>
                  {order.status === "paid" ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-amber-500" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{order.serviceType}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customerName} • {new Date(order.completedAt).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "font-semibold",
                  order.status === "paid" ? "text-emerald-500" : "text-amber-500"
                )}>
                  {formatCurrency(order.amount)}
                </p>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  order.status === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                )}>
                  {order.status === "paid" ? "Lunas" : "Pending"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="mt-4 border-t border-border pt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Lunas</p>
              <p className="text-lg font-semibold text-emerald-500">{formatCurrency(totalPaid)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
              <Calendar className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Pending</p>
              <p className="text-lg font-semibold text-amber-500">{formatCurrency(totalPending)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
