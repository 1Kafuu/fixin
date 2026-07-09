"use client";

import { cn } from "@/lib/utils";
import {
	DollarSign,
	TrendingUp,
	ArrowUpRight,
	ArrowDownRight,
	Search,
	Download,
	ChevronLeft,
	ChevronRight,
	Eye,
	CheckCircle,
	XCircle,
	Clock,
	CreditCard,
	Wallet,
	Receipt,
	FileText,
	ArrowRightLeft,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import {
	StatusBadge,
	StatCard,
	SearchInput,
	FilterTabs,
	Modal,
	PageHeader,
} from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";
import { SlideUp, CardSlideUp, SlideUpRow } from "@/components/ui/loading";

// Types
type TransactionStatus = "Completed" | "Pending" | "Failed" | "Refunded";

// Mock Data
const financialSummary = {
	totalRevenue: 400000000,
	monthlyRevenue: 72000000,
	pendingPayments: 8500000,
	totalTransactions: 3580,
	successRate: 94.2,
	avgTransaction: 111731,
};

const serviceRevenue = [
	{
		service: "Screen Replacement",
		count: 245,
		revenue: 61250000,
		percentage: 32,
	},
	{ service: "Virus Removal", count: 198, revenue: 29700000, percentage: 15 },
	{ service: "Hardware Repair", count: 178, revenue: 35600000, percentage: 18 },
	{ service: "Installation", count: 156, revenue: 23400000, percentage: 12 },
	{ service: "Maintenance", count: 134, revenue: 16080000, percentage: 8 },
	{ service: "Data Recovery", count: 89, revenue: 31150000, percentage: 15 },
];

const transactions = [
	{
		id: "TXN-001",
		customer: "Ahmad Rizki",
		service: "Screen Replacement",
		amount: 250000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-21",
		method: "GoPay",
	},
	{
		id: "TXN-002",
		customer: "Siti Nurhaliza",
		service: "Virus Removal",
		amount: 150000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-21",
		method: "OVO",
	},
	{
		id: "TXN-003",
		customer: "Budi Santoso",
		service: "Keyboard Replacement",
		amount: 180000,
		status: "Pending" as TransactionStatus,
		date: "2024-01-21",
		method: "Bank Transfer",
	},
	{
		id: "TXN-004",
		customer: "Dewi Kartika",
		service: "RAM Upgrade",
		amount: 220000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-20",
		method: "GoPay",
	},
	{
		id: "TXN-005",
		customer: "Eko Prasetyo",
		service: "Data Recovery",
		amount: 350000,
		status: "Failed" as TransactionStatus,
		date: "2024-01-20",
		method: "Credit Card",
	},
	{
		id: "TXN-006",
		customer: "Farhan Ramadhan",
		service: "Windows Installation",
		amount: 200000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-20",
		method: "OVO",
	},
	{
		id: "TXN-007",
		customer: "Lisa Permata",
		service: "Laptop Cleaning",
		amount: 120000,
		status: "Refunded" as TransactionStatus,
		date: "2024-01-19",
		method: "GoPay",
	},
	{
		id: "TXN-008",
		customer: "Maya Sari",
		service: "Antivirus Installation",
		amount: 75000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-19",
		method: "DANA",
	},
	{
		id: "TXN-009",
		customer: "Rudi Hermawan",
		service: "Screen Replacement",
		amount: 250000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-19",
		method: "Bank Transfer",
	},
	{
		id: "TXN-010",
		customer: "Ani Wijaya",
		service: "Virus Removal",
		amount: 150000,
		status: "Completed" as TransactionStatus,
		date: "2024-01-18",
		method: "GoPay",
	},
];

const paymentMethods = [
	{ method: "GoPay", count: 1250, amount: 312500000, percentage: 40 },
	{ method: "OVO", count: 890, amount: 178000000, percentage: 23 },
	{ method: "DANA", count: 620, amount: 93000000, percentage: 12 },
	{ method: "Bank Transfer", count: 480, amount: 144000000, percentage: 18 },
	{ method: "Credit Card", count: 180, amount: 58500000, percentage: 7 },
];

function formatCurrency(value: number) {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: 0,
	}).format(value);
}

function formatShortCurrency(value: number) {
	if (value >= 1000000) return `Rp ${(value / 1000000).toFixed(1)}M`;
	if (value >= 1000) return `Rp ${(value / 1000).toFixed(0)}K`;
	return `Rp ${value}`;
}

export default function FinancialPage() {
	const [statusFilter, setStatusFilter] = useState<TransactionStatus | "All">(
		"All",
	);
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 5;

	const filteredTransactions = transactions.filter((t) => {
		const matchesStatus = statusFilter === "All" || t.status === statusFilter;
		const matchesSearch =
			t.id.toLowerCase().includes(search.toLowerCase()) ||
			t.customer.toLowerCase().includes(search.toLowerCase()) ||
			t.service.toLowerCase().includes(search.toLowerCase());
		return matchesStatus && matchesSearch;
	});

	const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
	const paginatedTransactions = filteredTransactions.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage,
	);

	return (
		<div className="p-6 space-y-6">
			<SlideUp delay={0}>
				<PageHeader
					title="Financial Overview"
					description="Track revenue, transactions, and financial performance"
				/>
			</SlideUp>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<SlideUp delay={0}>
					<StatCard
						title="Total Revenue"
						value={formatShortCurrency(financialSummary.totalRevenue)}
						change="18.7%"
						changeType="up"
						icon={DollarSign}
						color="bg-emerald-50 dark:bg-emerald-900/30"
					/>
				</SlideUp>
				<SlideUp delay={100}>
					<StatCard
						title="Monthly Revenue"
						value={formatShortCurrency(financialSummary.monthlyRevenue)}
						change="7.5%"
						changeType="up"
						icon={TrendingUp}
						color="bg-blue-50 dark:bg-blue-900/30"
					/>
				</SlideUp>
				<SlideUp delay={200}>
					<StatCard
						title="Pending Payments"
						value={formatShortCurrency(financialSummary.pendingPayments)}
            change="1.2%"
            changeType="up"
						icon={Clock}
						color="bg-amber-50 dark:bg-amber-900/30"
					/>
				</SlideUp>
				<SlideUp delay={300}>
					<StatCard
						title="Success Rate"
						value={`${financialSummary.successRate}%`}
						change="2.1%"
						changeType="up"
						icon={CheckCircle}
						color="bg-violet-50 dark:bg-violet-900/30"
					/>
				</SlideUp>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				<SlideUp delay={400} className="lg:col-span-2">
					<div className="rounded-xl border border-border bg-card p-5 shadow-sm h-full">
						<h3 className="mb-4 text-sm font-semibold">Revenue by Service</h3>
						<div className="space-y-4">
							{serviceRevenue.map((service, index) => (
								<CardSlideUp key={service.service} index={index}>
									<div>
										<div className="mb-1 flex items-center justify-between">
											<span className="text-sm font-medium">
												{service.service}
											</span>
											<div className="text-right">
												<span className="text-sm font-medium">
													{formatShortCurrency(service.revenue)}
												</span>
												<span className="ml-2 text-xs text-muted-foreground">
													({service.count} orders)
												</span>
											</div>
										</div>
										<div className="h-3 overflow-hidden rounded-full bg-muted">
											<div
												className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all"
												style={{ width: `${service.percentage}%` }}
											/>
										</div>
									</div>
								</CardSlideUp>
							))}
						</div>
					</div>
				</SlideUp>

				<SlideUp delay={500}>
					<div className="rounded-xl border border-border bg-card p-5 shadow-sm h-full">
						<h3 className="mb-4 text-sm font-semibold">Payment Methods</h3>
						<div className="space-y-3">
							{paymentMethods.map((method, index) => (
								<CardSlideUp key={method.method} index={index}>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
												<CreditCard className="h-5 w-5 text-blue-600" />
											</div>
											<div>
												<p className="text-sm font-medium">{method.method}</p>
												<p className="text-xs text-muted-foreground">
													{method.count} transactions
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-medium">
												{formatShortCurrency(method.amount)}
											</p>
											<p className="text-xs text-muted-foreground">
												{method.percentage}%
											</p>
										</div>
									</div>
								</CardSlideUp>
							))}
						</div>
					</div>
				</SlideUp>
			</div>

			<SlideUp delay={600}>
				<div className="rounded-xl border border-border bg-card shadow-sm">
					<div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
						<SearchInput
							value={search}
							onChange={(v) => {
								setSearch(v);
								setCurrentPage(1);
							}}
							placeholder="Search transactions..."
							className="flex-1"
						/>
						<FilterTabs
							tabs={[
								{ value: "All", label: "All" },
								{ value: "Completed", label: "Completed" },
								{ value: "Pending", label: "Pending" },
								{ value: "Failed", label: "Failed" },
								{ value: "Refunded", label: "Refunded" },
							]}
							activeTab={statusFilter}
							onTabChange={(v) => {
								setStatusFilter(v as TransactionStatus | "All");
								setCurrentPage(1);
							}}
						/>
					</div>

					<div className="overflow-x-auto overflow-y-hidden scrollbar-none">
						<table className="w-full">
							<thead>
								<tr className="border-b border-border bg-muted/50">
									<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Transaction ID
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Customer
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Service
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Method
									</th>
									<th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Amount
									</th>
									<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Status
									</th>
									<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-border">
								{paginatedTransactions.map((txn, index) => (
									<SlideUpRow key={txn.id} index={index}>
										<td className="px-4 py-3 text-sm font-medium">{txn.id}</td>
										<td className="px-4 py-3 text-sm">{txn.customer}</td>
										<td className="px-4 py-3 text-sm">{txn.service}</td>
										<td className="px-4 py-3">
											<span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
												<Wallet className="h-3 w-3" />
												{txn.method}
											</span>
										</td>
										<td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">
											{formatCurrency(txn.amount)}
										</td>
										<td className="px-4 py-3 text-center">
											<StatusBadge status={txn.status} />
										</td>
										<td className="px-4 py-3 text-center">
											<button className="inline-flex items-center gap-1 rounded-lg bg-muted px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-muted/80">
												<Eye className="h-3 w-3" />
												View
											</button>
										</td>
									</SlideUpRow>
								))}
								{paginatedTransactions.length === 0 && (
									<tr>
										<td
											colSpan={7}
											className="px-4 py-8 text-center text-sm text-muted-foreground"
										>
											No transactions found
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={filteredTransactions.length}
						itemsPerPage={itemsPerPage}
						onPageChange={setCurrentPage}
					/>
				</div>
			</SlideUp>

			<SlideUp delay={700}>
				<div className="flex flex-wrap gap-3">
					<button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
						<FileText className="h-4 w-4" />
						Generate Report
					</button>
					<button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
						<Download className="h-4 w-4" />
						Export Data
					</button>
					<button className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
						<Receipt className="h-4 w-4" />
						View Invoices
					</button>
				</div>
			</SlideUp>
		</div>
	);
}
