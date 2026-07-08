"use client";

import Image from "next/image";
import {
	CheckCircle,
	Clock,
	XCircle,
	Eye,
	ChevronLeft,
	ChevronRight,
	Download,
	Home,
	MapPin,
	Mail,
	Phone,
	Calendar,
	User,
	Briefcase,
	Shield,
	AlertCircle,
	Image as ImageIcon,
	Pencil,
	Trash2,
	Plus,
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
	ActionMenu,
} from "@/components/admin";
import { Pagination } from "@/components/admin/Pagination";

// Types
type Status = "Menunggu" | "Disetujui" | "Ditolak";

interface Applicant {
	id: string;
	name: string;
	email: string;
	phone: string;
	registrationDate: string;
	status: Status;
	address: string;
	city: string;
	photo: string;
	specialization: string;
	experience: string;
	skills: string;
	homeService: boolean;
	pickupService: boolean;
	documents: {
		ktp: string;
		selfieKtp: string;
		cv?: string;
		certificate?: string;
	};
	adminNotes?: string;
	rejectionReason?: string;
}

const mockApplicants: Applicant[] = [
	{
		id: "REG-2024-001",
		name: "Ahmad Rizki Pratama",
		email: "ahmad.rizki@email.com",
		phone: "0812-3456-7890",
		registrationDate: "2024-01-15",
		status: "Menunggu",
		address: "Jl. Sudirman No. 123",
		city: "Jakarta Selatan",
		photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
		specialization: "Laptop & PC Repair",
		experience: "5 tahun",
		skills: "Hardware repair, motherboard replacement, LCD replacement",
		homeService: true,
		pickupService: true,
		documents: { ktp: "https://picsum.photos/seed/ktp1/800/500", selfieKtp: "https://picsum.photos/seed/selfie1/800/500" },
	},
	{
		id: "REG-2024-002",
		name: "Siti Nurhaliza",
		email: "siti.nurhaliza@email.com",
		phone: "0856-7890-1234",
		registrationDate: "2024-01-14",
		status: "Menunggu",
		address: "Jl. Gatot Subroto No. 45",
		city: "Jakarta Barat",
		photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
		specialization: "Smartphone & Tablet",
		experience: "3 tahun",
		skills: "iPhone repair, Android repair, screen replacement",
		homeService: true,
		pickupService: false,
		documents: { ktp: "https://picsum.photos/seed/ktp2/800/500", selfieKtp: "https://picsum.photos/seed/selfie2/800/500", cv: "https://picsum.photos/seed/cv2/800/1000" },
	},
	{
		id: "REG-2024-003",
		name: "Budi Santoso",
		email: "budi.santoso@email.com",
		phone: "0821-5678-9012",
		registrationDate: "2024-01-12",
		status: "Disetujui",
		address: "Jl. Thamrin No. 78",
		city: "Jakarta Pusat",
		photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
		specialization: "Printer & Peripheral",
		experience: "7 tahun",
		skills: "Printer repair, scanner repair, network printer setup",
		homeService: false,
		pickupService: true,
		documents: { ktp: "https://picsum.photos/seed/ktp3/800/500", selfieKtp: "https://picsum.photos/seed/selfie3/800/500" },
		adminNotes: "Dokumen lengkap, pengalaman memadai.",
	},
	{
		id: "REG-2024-004",
		name: "Dewi Kartika Sari",
		email: "dewi.kartika@email.com",
		phone: "0813-9012-3456",
		registrationDate: "2024-01-10",
		status: "Ditolak",
		address: "Jl. Kemang No. 56",
		city: "Jakarta Selatan",
		photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi",
		specialization: "Laptop Repair",
		experience: "1 tahun",
		skills: "Basic laptop repair",
		homeService: true,
		pickupService: true,
		documents: { ktp: "https://picsum.photos/seed/ktp4/800/500", selfieKtp: "https://picsum.photos/seed/selfie4/800/500" },
		rejectionReason: "Pengalaman kurang dari 2 tahun.",
	},
];

function formatDate(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
}

// Detail Modal
function DetailModal({ applicant, onClose, onApprove, onReject }: { applicant: Applicant; onClose: () => void; onApprove: () => void; onReject: () => void }) {
	const [notes, setNotes] = useState(applicant.adminNotes || "");
	const [showRejectModal, setShowRejectModal] = useState(false);
	const [rejectionReason, setRejectionReason] = useState(applicant.rejectionReason || "");
	const [previewDoc, setPreviewDoc] = useState<{ src: string; title: string } | null>(null);

	return (
		<Modal open onClose={onClose} title={applicant.name} subtitle={applicant.id} size="xl">
			<div className="grid gap-6 lg:grid-cols-2">
				<div className="space-y-4">
					<div className="rounded-xl border border-border bg-muted/30 p-4">
						<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Mail className="h-4 w-4" /> Contact Information</h3>
						<div className="space-y-2.5">
							<div className="flex items-center gap-3"><Mail className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{applicant.email}</span></div>
							<div className="flex items-center gap-3"><Phone className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{applicant.phone}</span></div>
							<div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{formatDate(applicant.registrationDate)}</span></div>
							<div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-muted-foreground" /><span className="text-sm">{applicant.address}, {applicant.city}</span></div>
						</div>
					</div>

					<div className="rounded-xl border border-border bg-muted/30 p-4">
						<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Briefcase className="h-4 w-4" /> Professional Information</h3>
						<div className="space-y-3">
							<div><p className="text-xs text-muted-foreground">Spesialisasi</p><p className="text-sm font-medium">{applicant.specialization}</p></div>
							<div><p className="text-xs text-muted-foreground">Pengalaman</p><p className="text-sm font-medium">{applicant.experience}</p></div>
							<div><p className="text-xs text-muted-foreground">Deskripsi</p><p className="text-sm">{applicant.skills}</p></div>
						</div>
					</div>

					<div className="rounded-xl border border-border bg-muted/30 p-4">
						<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Home className="h-4 w-4" /> Service Area</h3>
						<div className="flex gap-4">
							<span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", applicant.homeService ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500")}>
								{applicant.homeService ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}Home Service
							</span>
							<span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", applicant.pickupService ? "bg-emerald-50 text-emerald-700" : "bg-gray-50 text-gray-500")}>
								{applicant.pickupService ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}Pickup Service
							</span>
						</div>
					</div>
				</div>

				<div className="space-y-4">
					<div className="rounded-xl border border-border bg-muted/30 p-4">
						<h3 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Shield className="h-4 w-4" /> Verification Documents</h3>
						<div className="grid grid-cols-2 gap-3">
							<div>
								<p className="mb-2 text-xs font-medium">Foto KTP</p>
								<div className="relative cursor-pointer overflow-hidden rounded-lg border hover:border-blue-500" onClick={() => setPreviewDoc({ src: applicant.documents.ktp, title: "Foto KTP" })}>
									<Image src={applicant.documents.ktp} alt="KTP" width={400} height={96} className="h-24 w-full object-cover" />
								</div>
							</div>
							<div>
								<p className="mb-2 text-xs font-medium">Selfie dengan KTP</p>
								<div className="relative cursor-pointer overflow-hidden rounded-lg border hover:border-blue-500" onClick={() => setPreviewDoc({ src: applicant.documents.selfieKtp, title: "Selfie dengan KTP" })}>
									<Image src={applicant.documents.selfieKtp} alt="Selfie KTP" width={400} height={96} className="h-24 w-full object-cover" />
								</div>
							</div>
							{applicant.documents.cv && (
								<div>
									<p className="mb-2 text-xs font-medium">CV / Resume</p>
									<div className="cursor-pointer rounded-lg border bg-muted p-3 hover:border-blue-500" onClick={() => setPreviewDoc({ src: applicant.documents.cv!, title: "CV" })}>
										<p className="text-sm font-medium">CV_{applicant.id}.pdf</p>
									</div>
								</div>
							)}
							{applicant.documents.certificate && (
								<div>
									<p className="mb-2 text-xs font-medium">Sertifikat</p>
									<div className="relative cursor-pointer overflow-hidden rounded-lg border hover:border-blue-500" onClick={() => setPreviewDoc({ src: applicant.documents.certificate!, title: "Sertifikat" })}>
										<Image src={applicant.documents.certificate} alt="Certificate" width={400} height={96} className="h-24 w-full object-cover" />
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="rounded-xl border border-border bg-muted/30 p-4">
						<h3 className="mb-3 text-sm font-semibold">Admin Notes</h3>
						<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes if needed..." rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
					</div>
				</div>
			</div>

			{applicant.status === "Menunggu" && (
				<div className="mt-6 flex items-center justify-end gap-3 border-t pt-4">
					<button onClick={() => setShowRejectModal(true)} className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
						<XCircle className="h-4 w-4" />Reject
					</button>
					<button onClick={onApprove} className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600">
						<CheckCircle className="h-4 w-4" />Approve
					</button>
				</div>
			)}
			{applicant.status === "Disetujui" && (
				<div className="mt-6 flex items-center justify-end gap-3 border-t pt-4 bg-emerald-50/50 p-4 rounded-lg">
					<CheckCircle className="h-5 w-5 text-emerald-500" /><span className="text-sm font-medium text-emerald-700">Registration approved</span>
				</div>
			)}
			{applicant.status === "Ditolak" && (
				<div className="mt-6 flex items-center justify-end gap-3 border-t pt-4 bg-red-50/50 p-4 rounded-lg">
					<XCircle className="h-5 w-5 text-red-500" />
					<div><span className="text-sm font-medium text-red-700">Registration rejected</span>{applicant.rejectionReason && <p className="text-xs text-red-600">Reason: {applicant.rejectionReason}</p>}</div>
				</div>
			)}

			{showRejectModal && (
				<Modal open onClose={() => setShowRejectModal(false)} title="Reject Registration" subtitle={applicant.name} size="md">
					<div className="space-y-4">
						<div>
							<label className="mb-1.5 block text-sm font-medium">Rejection Reason <span className="text-red-500">*</span></label>
							<textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} placeholder="Explain why this registration is rejected..." rows={4} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500" required />
						</div>
						<div className="flex gap-3">
							<button onClick={() => setShowRejectModal(false)} className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
							<button onClick={() => { if (rejectionReason.trim()) { onReject(); setShowRejectModal(false); } }} disabled={!rejectionReason.trim()} className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50">
								<XCircle className="h-4 w-4" />Reject
							</button>
						</div>
					</div>
				</Modal>
			)}

			{previewDoc && (
				<Modal open onClose={() => setPreviewDoc(null)} title={previewDoc.title} size="lg">
					<Image src={previewDoc.src} alt={previewDoc.title} width={800} height={600} className="max-h-[70vh] rounded-lg object-contain" />
				</Modal>
			)}
		</Modal>
	);
}

export default function ApprovalPage() {
	const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

	const itemsPerPage = 5;
	const pendingCount = applicants.filter((a) => a.status === "Menunggu").length;
	const approvedCount = applicants.filter((a) => a.status === "Disetujui").length;
	const rejectedCount = applicants.filter((a) => a.status === "Ditolak").length;

	const filteredApplicants = applicants.filter((a) => {
		const matchesSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()) || a.id.toLowerCase().includes(search.toLowerCase());
		const matchesStatus = statusFilter === "All" || a.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
	const paginatedApplicants = filteredApplicants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleApprove = (id: string) => {
		setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status: "Disetujui" as Status } : a));
		setSelectedApplicant(null);
	};

	const handleReject = (id: string) => {
		setApplicants((prev) => prev.map((a) => a.id === id ? { ...a, status: "Ditolak" as Status } : a));
		setSelectedApplicant(null);
	};

	return (
		<div className="p-6">
			<PageHeader title="Technician Registration Approval" description="Verify and approve new technician registrations" />

			<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Pending" value={pendingCount} icon={Clock} color="bg-amber-50 dark:bg-amber-900/30" delay={0} />
				<StatCard title="Approved" value={approvedCount} icon={CheckCircle} color="bg-emerald-50 dark:bg-emerald-900/30" delay={100} />
				<StatCard title="Rejected" value={rejectedCount} icon={XCircle} color="bg-red-50 dark:bg-red-900/30" delay={200} />
				<StatCard title="Total" value={applicants.length} icon={User} color="bg-blue-50 dark:bg-blue-900/30" delay={300} />
			</div>

			<div className="rounded-xl border border-border bg-card shadow-sm">
				<div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
					<SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Search by name, email, or ID..." className="flex-1" />
					<FilterTabs
						tabs={[
							{ value: "All", label: "All" },
							{ value: "Menunggu", label: "Pending" },
							{ value: "Disetujui", label: "Approved" },
							{ value: "Ditolak", label: "Rejected" },
						]}
						activeTab={statusFilter}
						onTabChange={(v) => { setStatusFilter(v as Status | "All"); setCurrentPage(1); }}
					/>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Applicant</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Specialization</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
								<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
								<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{paginatedApplicants.map((applicant) => (
								<tr key={applicant.id} className="transition-colors hover:bg-muted/30">
									<td className="px-4 py-3">
										<div className="flex items-center gap-3">
											<Image src={applicant.photo} alt={applicant.name} width={40} height={40} className="h-10 w-10 rounded-full bg-muted" />
											<div><p className="font-medium">{applicant.name}</p><p className="text-sm text-muted-foreground">{applicant.email}</p></div>
										</div>
									</td>
									<td className="px-4 py-3 text-sm">{applicant.specialization}</td>
									<td className="whitespace-nowrap px-4 py-3 text-sm text-muted-foreground">{formatDate(applicant.registrationDate)}</td>
									<td className="px-4 py-3 text-center"><StatusBadge status={applicant.status} /></td>
									<td className="px-4 py-3 text-center">
										<button onClick={() => setSelectedApplicant(applicant)} className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100">
											<Eye className="h-4 w-4" />Detail
										</button>
									</td>
								</tr>
							))}
							{paginatedApplicants.length === 0 && (
								<tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">No applicants found</td></tr>
							)}
						</tbody>
					</table>
				</div>

				<Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredApplicants.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
			</div>

			{selectedApplicant && (
				<DetailModal
					applicant={selectedApplicant}
					onClose={() => setSelectedApplicant(null)}
					onApprove={() => handleApprove(selectedApplicant.id)}
					onReject={() => handleReject(selectedApplicant.id)}
				/>
			)}
		</div>
	);
}
