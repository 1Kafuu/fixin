"use client";

import {
	CheckCircle,
	DollarSign,
	Layers,
	Pencil,
	Plus,
	Tag,

	Trash2,

	Wrench,

} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
	StatusBadge,
	StatCard,
	ActionMenu,
	SearchInput,
	Modal,
	PageHeader,
} from "../../../components/admin";
import { Pagination } from "../../../components/admin/Pagination";

// Types
interface Service {
	id: string;
	name: string;
	description: string;
	price: number;
	category: string;
	status: "Active" | "Inactive";
}

interface Category {
	id: string;
	name: string;
	serviceCount: number;
}

// Mock Data
const mockCategories: Category[] = [
	{ id: "1", name: "Screen Repair", serviceCount: 4 },
	{ id: "2", name: "Virus Removal", serviceCount: 2 },
	{ id: "3", name: "Installation", serviceCount: 3 },
	{ id: "4", name: "Hardware Repair", serviceCount: 5 },
	{ id: "5", name: "Software Setup", serviceCount: 3 },
];

const mockServices: Service[] = [
	{ id: "1", name: "LCD Screen Replacement", description: "Full LCD screen replacement for laptops and monitors", price: 250000, category: "Screen Repair", status: "Active" },
	{ id: "2", name: "Virus & Malware Removal", description: "Complete virus scanning, removal, and system cleanup", price: 150000, category: "Virus Removal", status: "Active" },
	{ id: "3", name: "Windows Installation", description: "Fresh Windows installation with drivers and updates", price: 200000, category: "Installation", status: "Active" },
	{ id: "4", name: "Keyboard Replacement", description: "Replace damaged or malfunctioning keyboard", price: 180000, category: "Hardware Repair", status: "Active" },
	{ id: "5", name: "Office Software Setup", description: "Install and configure Microsoft Office suite", price: 100000, category: "Software Setup", status: "Active" },
	{ id: "6", name: "Touchscreen Repair", description: "Fix unresponsive or damaged touchscreen displays", price: 300000, category: "Screen Repair", status: "Inactive" },
	{ id: "7", name: "Data Recovery", description: "Recover lost or corrupted data from damaged drives", price: 350000, category: "Hardware Repair", status: "Active" },
	{ id: "8", name: "Antivirus Installation", description: "Install and configure premium antivirus software", price: 75000, category: "Software Setup", status: "Active" },
	{ id: "9", name: "RAM Upgrade", description: "Install additional RAM modules for performance boost", price: 220000, category: "Hardware Repair", status: "Active" },
	{ id: "10", name: "Laptop Cleaning", description: "Internal cleaning and thermal paste replacement", price: 120000, category: "Maintenance", status: "Inactive" },
];

// Category Badge
function CategoryBadge({ category }: { category: string }) {
	return (
		<span className="inline-flex items-center rounded-md border border-violet-200 bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-700">
			<Tag className="mr-1 h-3 w-3" />
			{category}
		</span>
	);
}

// Service Modal
function ServiceModal({
	open,
	onClose,
	onSave,
	service,
	categories,
}: {
	open: boolean;
	onClose: () => void;
	onSave: (service: Omit<Service, "id">) => void;
	service?: Service | null;
	categories: Category[];
}) {
	const [name, setName] = useState(service?.name ?? "");
	const [description, setDescription] = useState(service?.description ?? "");
	const [price, setPrice] = useState(service?.price?.toString() ?? "");
	const [category, setCategory] = useState(service?.category ?? categories[0]?.name ?? "");
	const [status, setStatus] = useState<"Active" | "Inactive">(service?.status ?? "Active");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const parsedPrice = parseInt(price, 10);
		onSave({ name, description, price: Number.isNaN(parsedPrice) ? 0 : parsedPrice, category, status });
		onClose();
	};

	if (!open) return null;

	return (
		<Modal open={open} onClose={onClose} title={service ? "Edit Service" : "Add New Service"} size="md">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="service-name" className="mb-1.5 block text-sm font-medium">Service Name</label>
					<input id="service-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., LCD Screen Replacement" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
				</div>
				<div>
					<label htmlFor="service-description" className="mb-1.5 block text-sm font-medium">Description</label>
					<textarea id="service-description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the service..." rows={3} className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="service-price" className="mb-1.5 block text-sm font-medium">Price (IDR)</label>
						<input id="service-price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="150000" className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required />
					</div>
					<div>
						<label htmlFor="service-category" className="mb-1.5 block text-sm font-medium">Category</label>
						<select id="service-category" value={category} onChange={(e) => setCategory(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" required>
							{categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
						</select>
					</div>
				</div>
				<div>
					<span className="mb-1.5 block text-sm font-medium">Status</span>
					<div className="flex gap-2" role="group">
						{(["Active", "Inactive"] as const).map((s) => (
							<button key={s} type="button" onClick={() => setStatus(s)} role="radio" aria-checked={status === s} className={cn("flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors", status === s ? s === "Active" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-gray-200 bg-gray-50 text-gray-500" : "border-border bg-background text-muted-foreground hover:bg-muted")}>
								{s}
							</button>
						))}
					</div>
				</div>
				<div className="flex gap-3 pt-2">
					<button type="button" onClick={onClose} className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted">Cancel</button>
					<button type="submit" className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">{service ? "Save Changes" : "Add Service"}</button>
				</div>
			</form>
		</Modal>
	);
}

const formatPrice = (price: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);

export default function ServicesPage() {
	const [services, setServices] = useState<Service[]>(mockServices);
	const [categories, setCategories] = useState<Category[]>(mockCategories);
	const [search, setSearch] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [currentPage, setCurrentPage] = useState(1);
	const [serviceModal, setServiceModal] = useState<{ open: boolean; service: Service | null }>({ open: false, service: null });

	const itemsPerPage = 5;
	const totalServices = services.length;
	const activeServices = services.filter((s) => s.status === "Active").length;
	const avgPrice = Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length);
	const popularCategory = categories.reduce((prev, curr) => curr.serviceCount > prev.serviceCount ? curr : prev).name;

	const filteredServices = services.filter((s) => {
		const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
		const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
		return matchesSearch && matchesCategory;
	});

	const totalPages = Math.ceil(filteredServices.length / itemsPerPage);
	const paginatedServices = filteredServices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	const handleSaveService = (data: Omit<Service, "id">) => {
		if (serviceModal.service) {
			setServices((prev) => prev.map((s) => s.id === serviceModal.service?.id ? { ...s, ...data } : s));
		} else {
			setServices((prev) => [...prev, { ...data, id: String(Date.now()) }]);
		}
	};

	const handleDeleteService = (id: string) => {
		if (confirm("Delete this service?")) setServices((prev) => prev.filter((s) => s.id !== id));
	};

	return (
		<div className="p-6">
			<PageHeader title="Services Management" description="Manage your service offerings and categories" />

			<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Total Services" value={totalServices} icon={Wrench} color="bg-blue-50" delay={0} />
				<StatCard title="Active Services" value={activeServices} icon={CheckCircle} color="bg-emerald-50" delay={100} />
				<StatCard title="Avg. Price" value={formatPrice(avgPrice)} icon={DollarSign} color="bg-violet-50" delay={200} />
				<StatCard title="Popular Category" value={popularCategory} icon={Layers} color="bg-amber-50" delay={300} />
			</div>

			<div className="mb-6 animate-slideUp" style={{ animationDelay: "400ms" }}>
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-lg font-semibold">Categories</h2>
					<button onClick={() => setServiceModal({ open: true, service: null })} className="flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-600">
						<Plus className="h-4 w-4" />Add Category
					</button>
				</div>
				<div className="flex flex-wrap gap-2">
					{categories.map((cat) => (
						<div key={cat.id} className="group flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 shadow-sm">
							<span className="text-sm font-medium">{cat.name}</span>
							<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{cat.serviceCount}</span>
							<div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
								<button className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-foreground"><Pencil className="h-3 w-3" /></button>
								<button className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="animate-slideUp rounded-xl border border-border bg-card shadow-sm" style={{ animationDelay: "500ms" }}>
				<div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
					<SearchInput value={search} onChange={(v) => { setSearch(v); setCurrentPage(1); }} placeholder="Search services..." className="flex-1" />
					<select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }} className="h-10 rounded-lg border border-input bg-background px-3 text-sm">
						<option value="All">All Categories</option>
						{categories.map((cat) => (<option key={cat.id} value={cat.name}>{cat.name}</option>))}
					</select>
					<button onClick={() => setServiceModal({ open: true, service: null })} className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
						<Plus className="h-4 w-4" />Add Service
					</button>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Service</th>
								<th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</th>
								<th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Price</th>
								<th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
								<th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-border">
							{paginatedServices.map((service) => (
								<tr key={service.id} className="transition-colors hover:bg-muted/30">
									<td className="px-4 py-3">
										<div><p className="font-medium">{service.name}</p><p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">{service.description}</p></div>
									</td>
									<td className="px-4 py-3"><CategoryBadge category={service.category} /></td>
									<td className="whitespace-nowrap px-4 py-3 text-right text-sm font-medium">{formatPrice(service.price)}</td>
									<td className="px-4 py-3 text-center"><StatusBadge status={service.status} /></td>
									<td className="px-4 py-3 text-right">
										<ActionMenu items={[
											{ label: "Edit", icon: Pencil, onClick: () => setServiceModal({ open: true, service }) },
											{ label: "Delete", icon: Trash2, variant: "danger", onClick: () => handleDeleteService(service.id) },
										]} />
									</td>
								</tr>
							))}
							{paginatedServices.length === 0 && (
								<tr><td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">No services found</td></tr>
							)}
						</tbody>
					</table>
				</div>

				<Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredServices.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
			</div>

			<ServiceModal open={serviceModal.open} onClose={() => setServiceModal({ open: false, service: null })} onSave={handleSaveService} service={serviceModal.service} categories={categories} />
		</div>
	);
}
