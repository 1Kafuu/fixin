"use client";

import {
	TrendingUp,
	Users,
	Wrench,
	Calendar,
	DollarSign,
	Eye,
	MessageSquare,
	Bookmark,
	ArrowUpRight,
	ArrowDownRight,
} from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	LineChart,
	Line,
	PieChart,
	Pie,
	Cell,
	AreaChart,
	Area,
	Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { StatCard, PageHeader } from "@/components/admin";

// Mock Data
const userGrowthData = [
	{ month: "Jul", users: 1200, technicians: 150 },
	{ month: "Aug", users: 1450, technicians: 180 },
	{ month: "Sep", users: 1680, technicians: 210 },
	{ month: "Oct", users: 1920, technicians: 245 },
	{ month: "Nov", users: 2150, technicians: 280 },
	{ month: "Dec", users: 2380, technicians: 310 },
	{ month: "Jan", users: 2600, technicians: 340 },
];

const bookingTrendsData = [
	{ month: "Jul", bookings: 320, completed: 280 },
	{ month: "Aug", bookings: 380, completed: 340 },
	{ month: "Sep", bookings: 420, completed: 380 },
	{ month: "Oct", bookings: 510, completed: 460 },
	{ month: "Nov", bookings: 580, completed: 520 },
	{ month: "Dec", bookings: 650, completed: 590 },
	{ month: "Jan", bookings: 720, completed: 660 },
];

const revenueData = [
	{ month: "Jul", revenue: 45000000, expenses: 18000000 },
	{ month: "Aug", revenue: 52000000, expenses: 20000000 },
	{ month: "Sep", revenue: 48000000, expenses: 19000000 },
	{ month: "Oct", revenue: 61000000, expenses: 24000000 },
	{ month: "Nov", revenue: 55000000, expenses: 22000000 },
	{ month: "Dec", revenue: 67000000, expenses: 26000000 },
	{ month: "Jan", revenue: 72000000, expenses: 28000000 },
];

const serviceDistribution = [
	{ name: "Screen Repair", value: 35, color: "#3B82F6" },
	{ name: "Virus Removal", value: 20, color: "#10B981" },
	{ name: "Hardware Repair", value: 18, color: "#8B5CF6" },
	{ name: "Installation", value: 15, color: "#F59E0B" },
	{ name: "Maintenance", value: 12, color: "#EF4444" },
];

const topServicesData = [
	{ service: "Screen Replacement", bookings: 245, revenue: 61250000 },
	{ service: "Virus Removal", bookings: 198, revenue: 29700000 },
	{ service: "Keyboard Repair", bookings: 156, revenue: 28080000 },
	{ service: "RAM Upgrade", bookings: 134, revenue: 29480000 },
	{ service: "Data Recovery", bookings: 89, revenue: 31150000 },
];

const technicianPerformance = [
	{ name: "Budi S.", completed: 145, rating: 4.9, earnings: 14500000 },
	{ name: "Dewi K.", completed: 132, rating: 4.8, earnings: 13200000 },
	{ name: "Eko P.", completed: 128, rating: 4.7, earnings: 12800000 },
	{ name: "Farhan R.", completed: 115, rating: 4.6, earnings: 11500000 },
	{ name: "Ahmad F.", completed: 98, rating: 4.5, earnings: 9800000 },
];

const COLORS = ["#3B82F6", "#10B981", "#8B5CF6", "#F59E0B", "#EF4444"];

function formatCurrency(value: number) {
	if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
	if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
	return value.toString();
}

export default function AnalyticsPage() {
	const totalUsers = 2847;
	const totalTechnicians = 340;
	const totalBookings = 3580;
	const totalRevenue = 400000000;

	return (
		<div className="p-6 space-y-6">
			<PageHeader title="Analytics Dashboard" description="Comprehensive insights and performance metrics" />

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Total Users" value={totalUsers.toLocaleString()} change="12.5%" changeType="up" icon={Users} color="bg-blue-50 dark:bg-blue-900/30" delay={0} />
				<StatCard title="Active Technicians" value={totalTechnicians} change="8.2%" changeType="up" icon={Wrench} color="bg-violet-50 dark:bg-violet-900/30" delay={100} />
				<StatCard title="Total Bookings" value={totalBookings.toLocaleString()} change="15.3%" changeType="up" icon={Calendar} color="bg-emerald-50 dark:bg-emerald-900/30" delay={200} />
				<StatCard title="Total Revenue" value={`Rp ${formatCurrency(totalRevenue)}`} change="18.7%" changeType="up" icon={DollarSign} color="bg-amber-50 dark:bg-amber-900/30" delay={300} />
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 text-sm font-semibold">User Growth Trend</h3>
					<ResponsiveContainer width="100%" height={280}>
						<LineChart data={userGrowthData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
							<YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
							<Tooltip />
							<Legend />
							<Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} dot={{ fill: "#3B82F6" }} name="Users" />
							<Line type="monotone" dataKey="technicians" stroke="#8B5CF6" strokeWidth={2} dot={{ fill: "#8B5CF6" }} name="Technicians" />
						</LineChart>
					</ResponsiveContainer>
				</div>

				<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 text-sm font-semibold">Booking Trends</h3>
					<ResponsiveContainer width="100%" height={280}>
						<BarChart data={bookingTrendsData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
							<YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
							<Tooltip />
							<Legend />
							<Bar dataKey="bookings" fill="#3B82F6" name="Total Bookings" radius={[4, 4, 0, 0]} />
							<Bar dataKey="completed" fill="#10B981" name="Completed" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 text-sm font-semibold">Service Distribution</h3>
					<ResponsiveContainer width="100%" height={240}>
						<PieChart>
							<Pie data={serviceDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
								{serviceDistribution.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<div className="mt-2 space-y-1">
						{serviceDistribution.map((entry) => (
							<div key={entry.name} className="flex items-center justify-between text-xs">
								<div className="flex items-center gap-2">
									<div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
									<span className="text-muted-foreground">{entry.name}</span>
								</div>
								<span className="font-medium">{entry.value}%</span>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-xl border border-border bg-card p-5 shadow-sm lg:col-span-2">
					<h3 className="mb-4 text-sm font-semibold">Revenue Overview</h3>
					<ResponsiveContainer width="100%" height={280}>
						<AreaChart data={revenueData}>
							<CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
							<XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
							<YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
							<Tooltip />
							<Legend />
							<Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} name="Revenue" />
							<Area type="monotone" dataKey="expenses" stroke="#EF4444" fill="#EF4444" fillOpacity={0.1} name="Expenses" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 text-sm font-semibold">Top Performing Services</h3>
					<div className="space-y-4">
						{topServicesData.map((service, index) => {
							const maxRevenue = topServicesData[0].revenue;
							const percentage = (service.revenue / maxRevenue) * 100;
							return (
								<div key={service.service}>
									<div className="mb-1 flex items-center justify-between">
										<div className="flex items-center gap-2">
											<span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50 text-xs font-medium text-blue-600">{index + 1}</span>
											<span className="text-sm font-medium">{service.service}</span>
										</div>
										<span className="text-sm font-medium">Rp {(service.revenue / 1000000).toFixed(1)}M</span>
									</div>
									<div className="ml-7 h-2 overflow-hidden rounded-full bg-muted">
										<div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${percentage}%` }} />
									</div>
									<p className="ml-7 mt-1 text-xs text-muted-foreground">{service.bookings} bookings</p>
								</div>
							);
						})}
					</div>
				</div>

				<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
					<h3 className="mb-4 text-sm font-semibold">Technician Performance</h3>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border">
									<th className="pb-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Technician</th>
									<th className="pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Completed</th>
									<th className="pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Rating</th>
									<th className="pb-2 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Earnings</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{technicianPerformance.map((tech) => (
									<tr key={tech.name}>
										<td className="py-3 text-sm font-medium">{tech.name}</td>
										<td className="py-3 text-right text-sm">{tech.completed}</td>
										<td className="py-3 text-right"><span className="inline-flex items-center gap-1 text-sm font-medium text-amber-600">★ {tech.rating}</span></td>
										<td className="py-3 text-right text-sm font-medium text-emerald-600">Rp {(tech.earnings / 1000000).toFixed(1)}M</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-border bg-card p-5 shadow-sm">
				<h3 className="mb-4 text-sm font-semibold">Platform Metrics</h3>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
					<div className="text-center">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50"><Eye className="h-8 w-8 text-blue-500" /></div>
						<p className="text-2xl font-bold">12.4K</p>
						<p className="text-sm text-muted-foreground">Total Views</p>
					</div>
					<div className="text-center">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50"><MessageSquare className="h-8 w-8 text-emerald-500" /></div>
						<p className="text-2xl font-bold">2.8K</p>
						<p className="text-sm text-muted-foreground">Comments</p>
					</div>
					<div className="text-center">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50"><Bookmark className="h-8 w-8 text-violet-500" /></div>
						<p className="text-2xl font-bold">5.6K</p>
						<p className="text-sm text-muted-foreground">Saved Services</p>
					</div>
					<div className="text-center">
						<div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50"><TrendingUp className="h-8 w-8 text-amber-500" /></div>
						<p className="text-2xl font-bold">94.2%</p>
						<p className="text-sm text-muted-foreground">Completion Rate</p>
					</div>
				</div>
			</div>
		</div>
	);
}
