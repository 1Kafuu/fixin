"use client";

import { Wallet, TrendingUp, CheckCircle, Clock, Download, DollarSign, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardSlideUp } from "@/components/ui/loading";
import { StatCard } from "@/components/admin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

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

export default function EarningsPage() {
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

  const earningsStats = [
    { title: "Total Saldo", value: formatCurrency(MOCK_EARNINGS.totalBalance), subtitle: "Saldo Anda", icon: Wallet, color: "bg-blue-50 dark:bg-blue-900/30" },
    { title: "Bulan Ini", value: formatCurrency(MOCK_EARNINGS.monthlyEarnings[MOCK_EARNINGS.monthlyEarnings.length - 1].amount), change: "12%", changeType: "up" as const, icon: TrendingUp, color: "bg-emerald-50 dark:bg-emerald-900/30" },
    { title: "Pesanan Selesai", value: MOCK_EARNINGS.completedOrders.toString(), subtitle: "Total pesanan", icon: CheckCircle, color: "bg-violet-50 dark:bg-violet-900/30" },
    { title: "Menunggu Bayar", value: MOCK_EARNINGS.pendingOrders.toString(), subtitle: "Pending", icon: Clock, color: "bg-amber-50 dark:bg-amber-900/30" },
  ];

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
        {earningsStats.map((stat, i) => (
          <CardSlideUp key={stat.title} index={i}>
            <StatCard {...stat} />
          </CardSlideUp>
        ))}
      </div>

      {/* Chart Card */}
      <CardSlideUp index={4}>
      <div className="mb-6 rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Grafik Pendapatan</h3>
          <button className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground hover:bg-muted transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={MOCK_EARNINGS.monthlyEarnings} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} tickFormatter={(v) => `${v / 1000000}M`} />
            <Tooltip
              formatter={(value) => [formatCurrency(value as number), "Pendapatan"]}
              contentStyle={{ borderRadius: "8px", border: "1px solid oklch(0.92 0 0)", backgroundColor: "oklch(0.15 0 0)" }}
              labelStyle={{ color: "oklch(0.98 0 0)" }}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" vertical={false} />
            <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Pendapatan Tahun Ini</p>
            <p className="text-lg sm:text-xl font-semibold text-foreground">
              {formatCurrency(MOCK_EARNINGS.monthlyEarnings.reduce((sum, m) => sum + m.amount, 0))}
            </p>
          </div>
          <div className="flex items-center gap-1 text-emerald-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">+23.5%</span>
          </div>
        </div>
      </div>
      </CardSlideUp>

      {/* Order History Card */}
      <CardSlideUp index={5}>
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
      </CardSlideUp>
    </div>
  );
}
