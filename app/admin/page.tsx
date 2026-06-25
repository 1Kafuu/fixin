"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Users,
  CalendarCheck,
  DollarSign,
  Activity,
  Settings,
  Bell,
  ChevronDown,
  Search,
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

const tabs = [
  "Overview",
  "User",
  "Services",
  "Technician",
  "Content",
  "Financial",
  "Analytics",
];

// Simple bar chart component
function BarChart({ data }: { data: { month: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-40 items-end justify-between gap-2 px-2">
      {data.map((item, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm bg-blue-500 transition-all hover:bg-blue-600"
            style={{ height: `${(item.value / max) * 100}%` }}
          />
          <span className="text-[10px] text-muted-foreground">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

// Line chart component for health
function LineChart({ data }: { data: { time: string; value: number }[] }) {
  const max = 100;
  const min = 99;
  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * 100,
    y: ((max - d.value) / (max - min)) * 80 + 10,
  }));

  const pathD = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(" ");

  return (
    <div className="relative h-40 w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="20" x2="100" y2="20" stroke="oklch(0.92 0 0)" strokeWidth="0.3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="oklch(0.92 0 0)" strokeWidth="0.3" />
        <line x1="0" y1="80" x2="100" y2="80" stroke="oklch(0.92 0 0)" strokeWidth="0.3" />
        {/* Line */}
        <path d={pathD} fill="none" stroke="oklch(0.55 0.01 250)" strokeWidth="1.5" />
        {/* Points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="2" fill="oklch(0.55 0.01 250)" />
        ))}
      </svg>
      <div className="absolute bottom-0 flex w-full justify-between px-2 text-[10px] text-muted-foreground">
        {data.map((d, i) => (
          <span key={i}>{d.time}</span>
        ))}
      </div>
    </div>
  );
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
    blue: "bg-blue-50 text-blue-500",
    emerald: "bg-emerald-50 text-emerald-500",
    violet: "bg-violet-50 text-violet-500",
    amber: "bg-amber-50 text-amber-500",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
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
  const [activeTab, setActiveTab] = useState("Overview");
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={100} height={40} />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-lg border border-input bg-background pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Notifications */}
            <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            {/* Settings */}
            <button className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              <Settings className="h-5 w-5" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-medium text-white">
                  AD
                </div>
                <span className="hidden text-sm font-medium text-foreground md:block">Admin</span>
                <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
              </button>
              {showProfile && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-white py-1 shadow-lg">
                  <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary">
                    Profile Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary">
                    Help & Support
                  </a>
                  <hr className="my-1 border-border" />
                  <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-secondary">
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex gap-1 px-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* KPI Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi) => (
            <KPICard key={kpi.title} {...kpi} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="mb-6 grid gap-6 lg:grid-cols-2">
          {/* Revenue Overview */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Revenue Overview</h3>
              <select className="rounded-md border border-input bg-background px-3 py-1 text-sm text-muted-foreground">
                <option>This Year</option>
                <option>Last Year</option>
              </select>
            </div>
            <BarChart data={revenueData} />
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <p className="text-xl font-semibold text-foreground">Rp 564.5M</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-500">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-medium">+23.5%</span>
              </div>
            </div>
          </div>

          {/* System Health */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">System Health</h3>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="text-sm text-emerald-500">Live</span>
              </div>
            </div>
            <LineChart data={healthData} />
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
        </div>

        {/* Info Panels Row */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
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

          {/* Top Services */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Top Services</h3>
              <Wrench className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="space-y-4">
              {topServices.map((service, i) => (
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

          {/* Performance Metrics */}
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
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
        </div>
      </main>
    </div>
  );
}
