"use client";

import Link from "next/link";
import {
	ClipboardList,
	Clock,
	CheckCircle,
	Wrench,
	MapPin,
	ChevronRight,
} from "lucide-react";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { CardSlideUp } from "@/components/ui/loading";

const MOCK_ORDERS = [
	{
		id: "1",
		customerName: "Budi Santoso",
		serviceType: "Perbaikan Laptop",
		device: "HP Pavilion 15",
		address: "Jl. Merdeka No. 10, Jakarta",
		scheduledAt: "2025-01-15T09:00:00",
		status: "Menunggu Teknisi",
	},
	{
		id: "2",
		customerName: "Siti Rahayu",
		serviceType: "Ganti LCD",
		device: "Dell XPS 13",
		address: "Jl. Sudirman No. 25, Jakarta",
		scheduledAt: "2025-01-15T11:00:00",
		status: "Menuju Lokasi",
	},
	{
		id: "3",
		customerName: "Ahmad Wijaya",
		serviceType: "Service Keyboard",
		device: "MacBook Pro 14",
		address: "Jl. Gatot Subroto No. 5, Jakarta",
		scheduledAt: "2025-01-15T14:00:00",
		status: "Sedang Diperbaiki",
	},
	{
		id: "4",
		customerName: "Dewi Lestari",
		serviceType: "Upgrade RAM",
		device: "Lenovo ThinkPad X1",
		address: "Jl. Asia Afrika No. 15, Jakarta",
		scheduledAt: "2025-01-16T10:00:00",
		status: "Menunggu Persetujuan",
	},
	{
		id: "5",
		customerName: "Rizky Pratama",
		serviceType: "Ganti Baterai",
		device: "Asus ROG",
		address: "Jl. Thamrin No. 8, Jakarta",
		scheduledAt: "2025-01-14T15:00:00",
		status: "Selesai",
	},
];

const statusIcons: Record<string, React.ElementType> = {
	"Menunggu Teknisi": Clock,
	"Menuju Lokasi": MapPin,
	"Sedang Diperbaiki": Wrench,
	"Menunggu Persetujuan": Clock,
	Selesai: CheckCircle,
};

const statusColors: Record<string, string> = {
	"Menunggu Teknisi": "bg-amber-50 dark:bg-amber-900/30",
	"Menuju Lokasi": "bg-blue-50 dark:bg-blue-900/30",
	"Sedang Diperbaiki": "bg-violet-50 dark:bg-violet-900/30",
	"Menunggu Persetujuan": "bg-orange-50 dark:bg-orange-900/30",
	Selesai: "bg-emerald-50 dark:bg-emerald-900/30",
};

export default function OrderListPage() {
	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="p-4 sm:p-6">
			{/* Page Header */}
			<div className="mb-6">
				<h1 className="text-xl sm:text-2xl font-semibold text-foreground">
					Pesanan Servis
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Kelola pesanan servis Anda
				</p>
			</div>

			{/* Order Cards Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{MOCK_ORDERS.map((order, index) => {
					const StatusIcon = statusIcons[order.status] || ClipboardList;
					const bgColor = statusColors[order.status] || "bg-gray-50";

					return (
						<CardSlideUp key={order.id} index={index}>
							<div className="rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group">
								<Link href={`/technician/order/${order.id}`}>
									{/* Header */}
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center gap-3">
											<div
												className={`flex h-10 w-10 items-center justify-center rounded-lg ${bgColor}`}
											>
												<StatusIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
											</div>
											<div>
												<StatusBadge status={order.status} />
											</div>
										</div>
										<ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
									</div>

									{/* Content */}
									<div className="space-y-2 mb-4">
										<h3 className="font-semibold text-foreground">
											{order.serviceType}
										</h3>
										<p className="text-sm text-muted-foreground">
											{order.device}
										</p>
									</div>

									{/* Footer */}
									<div className="space-y-1.5 text-sm text-muted-foreground border-t border-border pt-3">
										<p className="flex items-center gap-2">
											<span>👤</span> {order.customerName}
										</p>
										<p className="flex items-center gap-2">
											<MapPin className="h-3.5 w-3.5" />
											<span className="truncate">
												{order.address.split(",")[0]}
											</span>
										</p>
										<p className="flex items-center gap-2">
											<Clock className="h-3.5 w-3.5" />
											{formatDate(order.scheduledAt)}
										</p>
									</div>
								</Link>
							</div>
						</CardSlideUp>
					);
				})}
			</div>
		</div>
	);
}
