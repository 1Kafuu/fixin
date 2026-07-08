"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
	Eye,
	ChevronLeft,
	ChevronRight,
	CheckCircle,
	XCircle,
	Clock,
	AlertTriangle,
	ClipboardList,
	Calendar,
	User,
	Home,
	MapPin,
	Phone,
	ExternalLink,
	Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	StatusBadge,
	StatCard,
	SearchInput,
	FilterTabs,
	Modal,
	PageHeader,
} from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

// Types
type BookingStatus = "Pending" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";

interface Booking {
	id: string;
	customer: { id: string; name: string; email: string; phone: string; avatar: string };
	service: { id: string; name: string; price: number };
	technician?: { id: string; name: string; avatar: string };
	status: BookingStatus;
	date: string;
	time: string;
	address: string;
	serviceType: "Home Service" | "Pickup" | "Onsite";
	description: string;
}

const mockBookings: Booking[] = [
	{ id: "BK-001", customer: { id: "U1", name: "Ahmad Rizki", email: "ahmad@email.com", phone: "0812-3456-7890", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad" }, service: { id: "S1", name: "Laptop Screen Replacement", price: 250000 }, technician: { id: "T1", name: "Budi S.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" }, status: "Completed", date: "2024-01-20", time: "10:00", address: "Jl. Sudirman No. 123, Jakarta Selatan", serviceType: "Home Service", description: "Laptop Dell Inspiron layar berkedip" },
	{ id: "BK-002", customer: { id: "U2", name: "Siti Nurhaliza", email: "siti@email.com", phone: "0856-7890-1234", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti" }, service: { id: "S2", name: "Virus Removal", price: 150000 }, technician: { id: "T2", name: "Dewi K.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi" }, status: "In Progress", date: "2024-01-21", time: "14:00", address: "Jl. Gatot Subroto No. 45, Jakarta Barat", serviceType: "Home Service", description: "Laptop terkena virus malware" },
	{ id: "BK-003", customer: { id: "U3", name: "Budi Santoso", email: "budi@email.com", phone: "0821-5678-9012", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BudiB" }, service: { id: "S3", name: "Keyboard Replacement", price: 180000 }, status: "Pending", date: "2024-01-22", time: "09:00", address: "Jl. Thamrin No. 78, Jakarta Pusat", serviceType: "Pickup", description: "Beberapa tombol keyboard tidak berfungsi" },
	{ id: "BK-004", customer: { id: "U4", name: "Dewi Kartika", email: "dewi@email.com", phone: "0813-9012-3456", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DewiK" }, service: { id: "S4", name: "Windows Installation", price: 200000 }, technician: { id: "T3", name: "Eko P.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko" }, status: "Confirmed", date: "2024-01-23", time: "11:00", address: "Jl. Kemang No. 56, Jakarta Selatan", serviceType: "Home Service", description: "Install Windows 11 fresh" },
	{ id: "BK-005", customer: { id: "U5", name: "Eko Prasetyo", email: "eko@email.com", phone: "0855-2345-6789", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=EkoP" }, service: { id: "S5", name: "Data Recovery", price: 350000 }, status: "Pending", date: "2024-01-24", time: "15:00", address: "Jl. Puri Indah No. 90, Jakarta Barat", serviceType: "Pickup", description: "Data penting tidak bisa diakses" },
	{ id: "BK-006", customer: { id: "U6", name: "Farhan Ramadhan", email: "farhan@email.com", phone: "0878-8765-4321", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan" }, service: { id: "S6", name: "RAM Upgrade", price: 220000 }, technician: { id: "T1", name: "Budi S.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" }, status: "Completed", date: "2024-01-19", time: "13:00", address: "Jl. Kebayoran Baru No. 12, Jakarta Selatan", serviceType: "Home Service", description: "Upgrade RAM 4GB ke 16GB" },
	{ id: "BK-007", customer: { id: "U7", name: "Lisa Permata", email: "lisa@email.com", phone: "0811-2233-4455", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" }, service: { id: "S7", name: "Laptop Cleaning", price: 120000 }, status: "Cancelled", date: "2024-01-18", time: "10:00", address: "Jl. Melati No. 25, Jakarta Timur", serviceType: "Onsite", description: "Laptop overheat dan kotor" },
];

function formatCurrency(value: number) {
	return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Detail Modal
function BookingDetailModal({ booking, onClose }: { booking: Booking; onClose: () => void }) {
	return (
		<Modal open onClose={onClose} title={booking.id} subtitle="Booking Details" size="lg">
			<div className="space-y-4">
				<div className="rounded-xl border border-border bg-muted/30 p-4">
					<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><User className="h-4 w-4" /> Customer</h3>
					<div className="flex items-center gap-3 mb-3">
						<Image src={booking.customer.avatar} alt={booking.customer.name} width={40} height={40} className="h-10 w-10 rounded-full bg-muted" />
						<div>
							<p className="font-medium">{booking.customer.name}</p>
							<p className="text-sm text-muted-foreground">{booking.customer.email}</p>
						</div>
					</div>
					<div className="space-y-2">
						<div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground" />{booking.customer.phone}</div>
						<div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-muted-foreground" />{booking.address}</div>
					</div>
				</div>

				<div className="rounded-xl border border-border bg-muted/30 p-4">
					<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><ClipboardList className="h-4 w-4" /> Service Details</h3>
					<div className="space-y-2">
						<div className="flex justify-between"><span className="text-sm text-muted-foreground">Service</span><span className="text-sm font-medium">{booking.service.name}</span></div>
						<div className="flex justify-between"><span className="text-sm text-muted-foreground">Type</span><span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", booking.serviceType === "Home Service" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700")}>{booking.serviceType}</span></div>
						<div className="flex justify-between"><span className="text-sm text-muted-foreground">Date</span><span className="text-sm">{formatDate(booking.date)} at {booking.time}</span></div>
						<div className="flex justify-between border-t pt-2"><span className="text-sm font-medium">Price</span><span className="text-lg font-bold">{formatCurrency(booking.service.price)}</span></div>
					</div>
					{booking.description && <div className="mt-3 rounded-lg bg-background p-3"><p className="text-xs text-muted-foreground">Description</p><p className="text-sm">{booking.description}</p></div>}
				</div>

				<div className="rounded-xl border border-border bg-muted/30 p-4">
					<h3 className="mb-3 text-sm font-semibold">Technician</h3>
					{booking.technician ? (
						<div className="flex items-center gap-3">
							<Image src={booking.technician.avatar} alt={booking.technician.name} width={40} height={40} className="h-10 w-10 rounded-full bg-muted" />
							<p className="font-medium">{booking.technician.name}</p>
						</div>
					) : (
						<p className="text-sm text-muted-foreground italic">No technician assigned</p>
					)}
				</div>

				<div className="flex items-center justify-end gap-3">
					<button onClick={onClose} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">Close</button>
				</div>
			</div>
		</Modal>
	);
}

export default function BookingPage() {
	const searchParams = useSearchParams();
	const userIdFilter = searchParams.get("user_id");

	const [bookings] = useState<Booking[]>(mockBookings);
	const [statusFilter, setStatusFilter] = useState<BookingStatus | "All">("All");
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

	const itemsPerPage = 5;
	const pendingCount = bookings.filter((b) => b.status === "Pending").length;
	const inProgressCount = bookings.filter((b) => b.status === "In Progress").length;
	const completedCount = bookings.filter((b) => b.status === "Completed").length;
	const cancelledCount = bookings.filter((b) => b.status === "Cancelled").length;

	const filteredBookings = bookings.filter((b) => {
		const matchesStatus = statusFilter === "All" || b.status === statusFilter;
		const matchesSearch = b.id.toLowerCase().includes(search.toLowerCase()) || b.customer.name.toLowerCase().includes(search.toLowerCase()) || b.service.name.toLowerCase().includes(search.toLowerCase());
		const matchesUser = !userIdFilter || b.customer.id === userIdFilter;
		return matchesStatus && matchesSearch && matchesUser;
	});

	const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
	const paginatedBookings = filteredBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	return (
		<div className="p-6">
			<PageHeader title="Booking Management" description="View and manage all service bookings">
				{userIdFilter && (
					<div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
						<User className="h-4 w-4" />Filtering by user: {userIdFilter}
						<a href="/admin/booking" className="ml-2 hover:underline">Clear</a>
					</div>
				)}
			</PageHeader>

			<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
				<StatCard title="Total" value={bookings.length} icon={ClipboardList} color="bg-blue-50 dark:bg-blue-900/30" delay={0} />
				<StatCard title="Pending" value={pendingCount} icon={Clock} color="bg-amber-50 dark:bg-amber-900/30" delay={100} />
				<StatCard title="In Progress" value={inProgressCount} icon={AlertTriangle} color="bg-violet-50 dark:bg-violet-900/30" delay={200} />
				<StatCard title="Completed" value={completedCount} icon={CheckCircle} color="bg-emerald-50 dark:bg-emerald-900/30" delay={300} />
				<StatCard title="Cancelled" value={cancelledCount} icon={XCircle} color="bg-red-50 dark:bg-red-900/30" delay={400} />
			</div>

			<div className="rounded-xl border border-border bg-card shadow-sm">
				<div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
					<SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Search by ID, customer, or service..." className="flex-1" />
					<FilterTabs
						tabs={[
							{ value: "All", label: "All" },
							{ value: "Pending", label: "Pending" },
							{ value: "Confirmed", label: "Confirmed" },
							{ value: "In Progress", label: "In Progress" },
							{ value: "Completed", label: "Completed" },
							{ value: "Cancelled", label: "Cancelled" },
						]}
						activeTab={statusFilter}
						onTabChange={(v) => { setStatusFilter(v as BookingStatus | "All"); setCurrentPage(1); }}
					/>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Customer</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Service</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
								<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
								<th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Price</th>
								<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{paginatedBookings.map((booking) => (
								<tr key={booking.id} className="transition-colors hover:bg-muted/30">
									<td className="px-4 py-3 text-sm font-medium">{booking.id}</td>
									<td className="px-4 py-3">
										<div className="flex items-center gap-2">
											<Image src={booking.customer.avatar} alt={booking.customer.name} width={32} height={32} className="h-8 w-8 rounded-full bg-muted" />
											<span className="text-sm">{booking.customer.name}</span>
										</div>
									</td>
									<td className="px-4 py-3 text-sm">{booking.service.name}</td>
									<td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{new Date(booking.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}</td>
									<td className="px-4 py-3 text-center"><StatusBadge status={booking.status} /></td>
									<td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">{formatCurrency(booking.service.price)}</td>
									<td className="px-4 py-3 text-center">
										<button onClick={() => setSelectedBooking(booking)} className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100">
											<Eye className="h-3 w-3" />Detail
										</button>
									</td>
								</tr>
							))}
							{paginatedBookings.length === 0 && (
								<tr><td colSpan={7} className="px-4 py-8 text-center text-sm text-muted-foreground">No bookings found</td></tr>
							)}
						</tbody>
					</table>
				</div>

				<Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredBookings.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
			</div>

			{selectedBooking && <BookingDetailModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}
		</div>
	);
}
