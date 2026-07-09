"use client";

import {
  Users,
  CalendarCheck,
  DollarSign,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Server,
  UserCheck,
  Cpu,
  Wrench,
  CheckCircle,
  AlertCircle,
  Clock3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { CardSlideUp } from "@/components/ui/loading";
import { useEffect, useRef, useState } from "react";

function AnimatedChart({ children, className, delay = 400 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(false);
          setTimeout(() => setIsReady(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"} ${className}`}>
      {isReady ? children : null}
    </div>
  );
}

// Mock data
const kpiData = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Active Bookings",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: CalendarCheck,
    color: "emerald",
  },
  {
    title: "Monthly Revenue",
    value: "Rp 48.5M",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "violet",
  },
  {
    title: "System Health",
    value: "99.8%",
    change: "-0.1%",
    trend: "down",
    icon: Activity,
    color: "amber",
  },
];

const revenueData = [
  { month: "Jan", value: 32 },
  { month: "Feb", value: 38 },
  { month: "Mar", value: 35 },
  { month: "Apr", value: 42 },
  { month: "May", value: 48 },
  { month: "Jun", value: 52 },
  { month: "Jul", value: 45 },
  { month: "Aug", value: 55 },
  { month: "Sep", value: 58 },
  { month: "Oct", value: 62 },
  { month: "Nov", value: 68 },
  { month: "Dec", value: 72 },
];

const healthData = [
  { time: "00:00", value: 99.9 },
  { time: "04:00", value: 99.8 },
  { time: "08:00", value: 99.7 },
  { time: "12:00", value: 99.9 },
  { time: "16:00", value: 99.6 },
  { time: "20:00", value: 99.8 },
  { time: "Now", value: 99.8 },
];

const recentActivity = [
  {
    id: 1,
    action: "New booking completed",
    user: "Ahmad Wijaya",
    service: "Laptop Screen Replacement",
    time: "2 min ago",
    type: "success",
  },
  {
    id: 2,
    action: "Technician assigned",
    user: "Budi Santoso",
    service: "Virus Removal",
    time: "5 min ago",
    type: "info",
  },
  {
    id: 3,
    action: "Payment received",
    user: "Siti Rahayu",
    service: "Windows Installation",
    time: "12 min ago",
    type: "success",
  },
  {
    id: 4,
    action: "Booking cancelled",
    user: "Dewi Lestari",
    service: "Keyboard Repair",
    time: "25 min ago",
    type: "warning",
  },
  {
    id: 5,
    action: "New user registered",
    user: "Rizky Pratama",
    service: "-",
    time: "1 hour ago",
    type: "info",
  },
];

const topServices = [
  { name: "Screen Replacement", requests: 342, percentage: 85 },
  { name: "Virus Removal", requests: 287, percentage: 72 },
  { name: "Windows Install", requests: 256, percentage: 64 },
  { name: "Keyboard Repair", requests: 198, percentage: 50 },
  { name: "Battery Replacement", requests: 167, percentage: 42 },
];

const performanceMetrics = [
  { label: "Avg Response Time", value: "24 min", icon: Clock, status: "good" },
  { label: "System Uptime", value: "99.8%", icon: Server, status: "good" },
  { label: "Active Users", value: "1,247", icon: UserCheck, status: "normal" },
  { label: "Server Load", value: "34%", icon: Cpu, status: "good" },
];

// Custom tooltip for revenue chart
function RevenueTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-blue-500">Rp {payload[0].value}M</p>
      </div>
    );
  }
  return null;
}

// Custom tooltip for health chart
function HealthTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-emerald-500">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
}

// KPI Card component
function KPICard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  color,
}: (typeof kpiData)[0]) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-500",
    emerald: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500",
    violet: "bg-violet-50 dark:bg-violet-900/30 text-violet-500",
    amber: "bg-amber-50 dark:bg-amber-900/30 text-amber-500",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl sm:text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <div className={`rounded-lg p-2 ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1">
        {trend === "up" ? (
          <TrendingUp className="h-4 w-4 text-emerald-500" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500" />
        )}
        <span className={`text-sm font-medium ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
          {change}
        </span>
        <span className="text-sm text-muted-foreground">vs last month</span>
      </div>
    </div>
  );
}

// Progress bar component
function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-blue-500 transition-all"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor your platform performance and key metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, i) => (
          <CardSlideUp key={kpi.title} index={i}>
            <KPICard {...kpi} />
          </CardSlideUp>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Revenue Overview - Bar Chart */}
        <CardSlideUp index={4}>
        <div className=" rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Revenue Overview</h3>
            <select className="rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={180} className="sm:!height-[200px]">
            <AnimatedChart className="w-full h-full">
              <BarChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} tickFormatter={(v) => `${v}M`} />
                <Tooltip content={<RevenueTooltip />} cursor={{ fill: "oklch(0.97 0 0)" }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1200} animationEasing="ease-out" isAnimationActive={true} />
              </BarChart>
            </AnimatedChart>
          </ResponsiveContainer>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-lg sm:text-xl font-semibold text-foreground">Rp 564.5M</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-500">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+23.5%</span>
            </div>
          </div>
        </div>
        </CardSlideUp>

        {/* System Health - Area Chart */}
        <CardSlideUp index={5}>
        <div className=" rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">System Health</h3>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              <span className="text-sm text-emerald-500">Live</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180} className="sm:!height-[200px]">
            <AnimatedChart className="w-full h-full">
              <AreaChart data={healthData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id="healthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0 0)" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} />
                <YAxis domain={[99, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "oklch(0.556 0 0)" }} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<HealthTooltip />} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} fill="url(#healthGradient)" animationDuration={1200} animationEasing="ease-out" isAnimationActive={true} />
              </AreaChart>
            </AnimatedChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
            <div>
              <p className="text-xs text-muted-foreground">CPU Usage</p>
              <p className="text-lg font-semibold text-foreground">34%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Memory</p>
              <p className="text-lg font-semibold text-foreground">67%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Disk I/O</p>
              <p className="text-lg font-semibold text-foreground">12%</p>
            </div>
          </div>
        </div>
        </CardSlideUp>
      </div>

      {/* Info Panels Row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <CardSlideUp index={4}>
        <div className=" rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Activity</h3>
            <button className="text-sm text-blue-500 hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 rounded-full p-1 ${
                    activity.type === "success"
                      ? "bg-emerald-100 text-emerald-500"
                      : activity.type === "warning"
                      ? "bg-amber-100 text-amber-500"
                      : "bg-blue-100 text-blue-500"
                  }`}
                >
                  {activity.type === "success" ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : activity.type === "warning" ? (
                    <AlertCircle className="h-3.5 w-3.5" />
                  ) : (
                    <Clock3 className="h-3.5 w-3.5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </CardSlideUp>

        {/* Top Services */}
        <CardSlideUp index={5}>
        <div className=" rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Top Services</h3>
            <Wrench className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {topServices.map((service) => (
              <div key={service.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm text-foreground">{service.name}</span>
                  <span className="text-sm font-medium text-foreground">{service.requests}</span>
                </div>
                <ProgressBar percentage={service.percentage} />
              </div>
            ))}
          </div>
        </div>
        </CardSlideUp>

        {/* Performance Metrics */}
        <CardSlideUp index={6}>
        <div className=" rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Performance Metrics</h3>
            <Activity className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-4">
            {performanceMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <metric.icon className="h-4 w-4 text-blue-500" />
                  </div>
                  <span className="text-sm text-foreground">{metric.label}</span>
                </div>
                <span className="font-medium text-foreground">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
        </CardSlideUp>
      </div>
    </div>
  );
}
