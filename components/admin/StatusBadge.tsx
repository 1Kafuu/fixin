"use client";

import { cn } from "@/lib/utils";
import {
	CheckCircle,
	XCircle,
	Clock,
	AlertTriangle,
	Flag,
	FileText,
	Archive,
} from "lucide-react";

type Status = "Active" | "Inactive" | "Pending" | "Published" | "Draft" | "Flagged" | "Archived" | "Completed" | "Confirmed" | "In Progress" | "Cancelled" | "Menunggu" | "Disetujui" | "Ditolak";

const statusConfig: Record<string, { className: string; dotClass: string; icon?: React.ElementType }> = {
	Active: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500" },
	Inactive: { className: "border-gray-200 bg-gray-50 text-gray-600", dotClass: "bg-gray-400" },
	Pending: { className: "border-amber-200 bg-amber-50 text-amber-700", dotClass: "bg-amber-500", icon: Clock },
	Published: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500", icon: CheckCircle },
	Draft: { className: "border-gray-200 bg-gray-50 text-gray-600", dotClass: "bg-gray-400", icon: FileText },
	Flagged: { className: "border-amber-200 bg-amber-50 text-amber-700", dotClass: "bg-amber-500", icon: Flag },
	Archived: { className: "border-slate-200 bg-slate-50 text-slate-600", dotClass: "bg-slate-400", icon: Archive },
	Completed: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500", icon: CheckCircle },
	Confirmed: { className: "border-blue-200 bg-blue-50 text-blue-700", dotClass: "bg-blue-500", icon: CheckCircle },
	"In Progress": { className: "border-violet-200 bg-violet-50 text-violet-700", dotClass: "bg-violet-500", icon: AlertTriangle },
	Cancelled: { className: "border-red-200 bg-red-50 text-red-700", dotClass: "bg-red-500", icon: XCircle },
	Menunggu: { className: "border-amber-200 bg-amber-50 text-amber-700", dotClass: "bg-amber-500", icon: Clock },
	Disetujui: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500", icon: CheckCircle },
	Ditolak: { className: "border-red-200 bg-red-50 text-red-700", dotClass: "bg-red-500", icon: XCircle },
};

export function StatusBadge({ status }: { status: string }) {
	const config = statusConfig[status] || statusConfig["Pending"];
	const { className, dotClass } = config;

	return (
		<span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", className)}>
			<span className={cn("h-1.5 w-1.5 rounded-full", dotClass)} />
			{status}
		</span>
	);
}
