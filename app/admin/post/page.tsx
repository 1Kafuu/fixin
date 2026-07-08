"use client";

import Image from "next/image";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import {
	Search,
	Eye,
	Trash2,
	MoreHorizontal,
	ChevronLeft,
	ChevronRight,
	CheckCircle,
	AlertTriangle,
	Flag,
	RotateCcw,
	FileText,
	Tag,
	EyeOff,
	Clock,
	MessageSquare,
	Image as ImageIcon,
	Bookmark,
	Laptop,
	Smartphone,
	Monitor,
	Archive,
} from "lucide-react";
import { useState } from "react";

// Types
type PostStatus = "Published" | "Draft" | "Flagged" | "Archived";
type LaptopBrand = "All" | "Asus" | "Acer" | "Lenovo" | "HP" | "Dell" | "Apple" | "MSI" | "Samsung" | "Other";

interface Post {
	id: string;
	title: string;
	content: string;
	author: { id: string; name: string; avatar: string };
	brand: Exclude<LaptopBrand, "All">;
	status: PostStatus;
	createdAt: string;
	updatedAt: string;
	views: number;
	comments: number;
	likes: number;
	image?: string;
	flags?: number;
	flagReason?: string;
	tags: string[];
}

interface Brand {
	id: LaptopBrand;
	name: string;
	icon: React.ElementType;
	postCount: number;
}

// Mock Data
const mockBrands: Brand[] = [
	{ id: "All", name: "Semua", icon: Laptop, postCount: 156 },
	{ id: "Asus", name: "Asus", icon: Monitor, postCount: 42 },
	{ id: "Acer", name: "Acer", icon: Monitor, postCount: 28 },
	{ id: "Lenovo", name: "Lenovo", icon: Laptop, postCount: 31 },
	{ id: "HP", name: "HP", icon: Monitor, postCount: 24 },
	{ id: "Dell", name: "Dell", icon: Laptop, postCount: 19 },
	{ id: "Apple", name: "Apple", icon: Smartphone, postCount: 15 },
	{ id: "MSI", name: "MSI", icon: Monitor, postCount: 12 },
	{ id: "Samsung", name: "Samsung", icon: Smartphone, postCount: 8 },
	{ id: "Other", name: "Lainnya", icon: Tag, postCount: 5 },
];

const mockPosts: Post[] = [
	{
		id: "POST-001",
		title: "Tips Merawat Baterai Laptop Asus Agar Tahan Lama",
		content: "Berikut adalah beberapa tips merawat baterai laptop Asus agar tidak cepat rusak dan tetap awet...",
		author: { id: "U1", name: "Rizky Pratama", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rizky" },
		brand: "Asus",
		status: "Published",
		createdAt: "2024-01-20",
		updatedAt: "2024-01-20",
		views: 1250,
		comments: 45,
		likes: 89,
		image: "https://picsum.photos/seed/asus1/800/400",
		tags: ["tips", "baterai", "asus"],
	},
	{
		id: "POST-002",
		title: "Solusi Layar Laptop Acer Berkedip? Ini Penyebabnya!",
		content: "Layar laptop Acer berkedip bisa disebabkan oleh beberapa faktor. Berikut penjelasannya...",
		author: { id: "U2", name: "Siti Nurhaliza", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti" },
		brand: "Acer",
		status: "Published",
		createdAt: "2024-01-19",
		updatedAt: "2024-01-19",
		views: 890,
		comments: 23,
		likes: 56,
		image: "https://picsum.photos/seed/acer1/800/400",
		tags: ["layar", "masalah", "acer"],
	},
	{
		id: "POST-003",
		title: "Review Lenovo ThinkPad X1 Carbon - Laptop Bisnis Premium",
		content: "Lenovo ThinkPad X1 Carbon adalah laptop bisnis premium dengan desain elegan dan performa tinggi...",
		author: { id: "U3", name: "Budi Santoso", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi" },
		brand: "Lenovo",
		status: "Flagged",
		createdAt: "2024-01-18",
		updatedAt: "2024-01-18",
		views: 567,
		comments: 12,
		likes: 34,
		flags: 2,
		flagReason: "Konten promosi berlebihan",
		tags: ["review", "thinkpad", "bisnis"],
	},
	{
		id: "POST-004",
		title: "Cara Install Windows 10 di HP Pavilion dengan Mudah",
		content: "Panduan lengkap cara install Windows 10 di laptop HP Pavilion tanpa ribet...",
		author: { id: "U4", name: "Dewi Kartika", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dewi" },
		brand: "HP",
		status: "Draft",
		createdAt: "2024-01-17",
		updatedAt: "2024-01-20",
		views: 0,
		comments: 0,
		likes: 0,
		tags: ["windows", "tutorial", "hp"],
	},
	{
		id: "POST-005",
		title: "Dell XPS 13 vs MacBook Air M2 - Mana yang Lebih Baik?",
		content: "Perbandingan lengkap antara Dell XPS 13 dan MacBook Air M2 untuk produktivitas...",
		author: { id: "U5", name: "Eko Prasetyo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eko" },
		brand: "Dell",
		status: "Published",
		createdAt: "2024-01-16",
		updatedAt: "2024-01-16",
		views: 2100,
		comments: 78,
		likes: 156,
		image: "https://picsum.photos/seed/dell1/800/400",
		tags: ["perbandingan", "dell", "macbook"],
	},
	{
		id: "POST-006",
		title: "Masalah Umum MacBook Pro M1 dan Solusinya",
		content: "Beberapa masalah umum yang sering dialami pengguna MacBook Pro M1 beserta solusinya...",
		author: { id: "U6", name: "Farhan Ramadhan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhan" },
		brand: "Apple",
		status: "Flagged",
		createdAt: "2024-01-15",
		updatedAt: "2024-01-15",
		views: 1200,
		comments: 34,
		likes: 67,
		flags: 3,
		flagReason: "Informasi tidak akurat",
		tags: ["macbook", "masalah", "apple"],
	},
	{
		id: "POST-007",
		title: "Panduan Upgrade RAM Laptop MSI GE66 Raider",
		content: "Tutorial lengkap cara upgrade RAM di laptop gaming MSI GE66 Raider...",
		author: { id: "U7", name: "Ahmad Fauzi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fauzi" },
		brand: "MSI",
		status: "Published",
		createdAt: "2024-01-14",
		updatedAt: "2024-01-14",
		views: 780,
		comments: 19,
		likes: 45,
		image: "https://picsum.photos/seed/msi1/800/400",
		tags: ["tutorial", "upgrade", "ram", "msi"],
	},
	{
		id: "POST-008",
		title: "Samsung Galaxy Book Flex - Laptop Hybrid dengan S Pen",
		content: "Review lengkap Samsung Galaxy Book Flex yang hadir dengan fitur hybrid dan S Pen...",
		author: { id: "U8", name: "Lisa Permata", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa" },
		brand: "Samsung",
		status: "Archived",
		createdAt: "2024-01-13",
		updatedAt: "2024-01-13",
		views: 450,
		comments: 8,
		likes: 23,
		tags: ["review", "samsung", "hybrid"],
	},
	{
		id: "POST-009",
		title: "Tips Memilih Laptop Gaming Budget Rp 10 Jutaan",
		content: "Rekomendasi laptop gaming dengan budget terbatas namun tetap berkualitas...",
		author: { id: "U9", name: "Rudi Hermawan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rudi" },
		brand: "Asus",
		status: "Published",
		createdAt: "2024-01-12",
		updatedAt: "2024-01-12",
		views: 3200,
		comments: 92,
		likes: 201,
		image: "https://picsum.photos/seed/asus2/800/400",
		tags: ["gaming", "budget", "rekomendasi"],
	},
	{
		id: "POST-010",
		title: "Cara Mengatasi Keyboard Laptop Acer Tidak Berfungsi Sebagian",
		content: "Langkah-langkah troubleshooting ketika keyboard laptop Acer tidak berfungsi sebagian...",
		author: { id: "U10", name: "Maya Sari", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya" },
		brand: "Acer",
		status: "Draft",
		createdAt: "2024-01-11",
		updatedAt: "2024-01-20",
		views: 0,
		comments: 0,
		likes: 0,
		tags: ["keyboard", "troubleshooting", "acer"],
	},
];

// Components
	function StatusBadge({ status }: { status: PostStatus }) {
		const config: Record<PostStatus, { className: string; dotClass: string }> = {
			Published: { className: "border-emerald-200 bg-emerald-50 text-emerald-700", dotClass: "bg-emerald-500" },
			Draft: { className: "border-gray-200 bg-gray-50 text-gray-600", dotClass: "bg-gray-400" },
			Flagged: { className: "border-amber-200 bg-amber-50 text-amber-700", dotClass: "bg-amber-500" },
			Archived: { className: "border-slate-200 bg-slate-50 text-slate-600", dotClass: "bg-slate-400" },
		};
		const { className, dotClass } = config[status];
		return (
			<span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium truncate max-w-[80px] sm:max-w-none", className)}>
				<span className={cn("h-1.5 w-1.5 rounded-full flex-shrink-0", dotClass)} />
				{status}
			</span>
		);
	}

function BrandBadge({ brand }: { brand: string }) {
	const brandColors: Record<string, string> = {
		Asus: "bg-blue-100 text-blue-700",
		Acer: "bg-red-100 text-red-700",
		Lenovo: "bg-red-100 text-red-600",
		HP: "bg-blue-100 text-blue-800",
		Dell: "bg-gray-100 text-gray-800",
		Apple: "bg-gray-100 text-gray-900",
		MSI: "bg-red-100 text-red-700",
		Samsung: "bg-blue-100 text-blue-600",
		Other: "bg-gray-100 text-gray-600",
	};
	return (
		<span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium truncate max-w-[80px] sm:max-w-none", brandColors[brand] || "bg-gray-100 text-gray-600")}>
			{brand}
		</span>
	);
}

function StatCard({ title, value, icon: Icon, color, delay }: { title: string; value: number | string; icon: React.ElementType; color: string; delay: number }) {
	return (
		<div
			className=" rounded-xl border border-border bg-card p-5 shadow-sm"
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
				</div>
				<div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", color)}>
					<Icon className="h-5 w-5 text-foreground" />
				</div>
			</div>
		</div>
	);
}

function ActionMenu({ postId, onFlag, onDelete, onRestore, status }: { postId: string; onFlag: () => void; onDelete: () => void; onRestore: () => void; status: PostStatus }) {
	const [open, setOpen] = useState(false);
	const router = useRouter();

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
				aria-label="Actions"
			>
				<MoreHorizontal className="h-4 w-4" />
			</button>
			{open && (
				<>
					<div className="fixed inset-0 z-10" onClick={() => setOpen(false)} onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }} role="button" tabIndex={-1} aria-label="Close" />
					<div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg">
						<button type="button" onClick={() => { router.push(`/admin/post/${postId}`); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
							<Eye className="h-3.5 w-3.5" />Lihat
						</button>
						<button type="button" onClick={() => { router.push(`/admin/post/${postId}`); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted">
							<Flag className="h-3.5 w-3.5" />Edit
						</button>
						{status === "Published" && (
							<button type="button" onClick={() => { onFlag(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-amber-700 hover:bg-amber-50">
								<Flag className="h-3.5 w-3.5" />Flag Post
							</button>
						)}
						{status === "Archived" && (
							<button type="button" onClick={() => { onRestore(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-emerald-700 hover:bg-emerald-50">
								<RotateCcw className="h-3.5 w-3.5" />Restore
							</button>
						)}
						<button type="button" onClick={() => { onDelete(); setOpen(false); }} className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10">
							<Trash2 className="h-3.5 w-3.5" />Delete
						</button>
					</div>
				</>
			)}
		</div>
	);
}

// Main Page
export default function PostModerationPage() {
	const router = useRouter();
	const [posts, setPosts] = useState<Post[]>(mockPosts);
	const [selectedBrand, setSelectedBrand] = useState<LaptopBrand>("All");
	const [statusFilter, setStatusFilter] = useState<PostStatus | "All">("All");
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	const itemsPerPage = 6;

	// Stats
	const totalPosts = posts.length;
	const publishedPosts = posts.filter((p) => p.status === "Published").length;
	const draftPosts = posts.filter((p) => p.status === "Draft").length;
	const flaggedPosts = posts.filter((p) => p.status === "Flagged").length;

	// Filter
	const filteredPosts = posts.filter((p) => {
		const matchesBrand = selectedBrand === "All" || p.brand === selectedBrand;
		const matchesStatus = statusFilter === "All" || p.status === statusFilter;
		const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.author.name.toLowerCase().includes(search.toLowerCase()) || p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
		return matchesBrand && matchesStatus && matchesSearch;
	});

	const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
	const paginatedPosts = filteredPosts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	// Handlers
	const handleFlag = (postId: string) => {
		setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, status: "Flagged" as PostStatus, flags: (p.flags || 0) + 1 } : p));
	};

	const handleDelete = (postId: string) => {
		if (confirm("Delete this post?")) {
			setPosts((prev) => prev.filter((p) => p.id !== postId));
		}
	};

	const handleArchive = (postId: string) => {
		setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, status: "Archived" as PostStatus } : p));
	};

	const handleRestore = (postId: string) => {
		setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, status: "Draft" as PostStatus } : p));
	};

	const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
	const formatNumber = (num: number) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();

	// Brand counts
	const brandCounts = mockBrands.map((brand) => ({
		...brand,
		postCount: brand.id === "All" ? posts.length : posts.filter((p) => p.brand === brand.id).length,
	}));

	return (
		<div className="p-6">
			{/* Header */}
			<div className="mb-6 ">
				<h1 className="text-2xl font-semibold text-foreground">Post Moderation</h1>
				<p className="mt-1 text-sm text-muted-foreground">Manage and moderate community posts by laptop brand</p>
			</div>

			{/* Stats Grid */}
			<div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Total Post" value={totalPosts} icon={FileText} color="bg-blue-50 dark:bg-blue-900/30" delay={0} />
				<StatCard title="Published" value={publishedPosts} icon={CheckCircle} color="bg-emerald-50 dark:bg-emerald-900/30" delay={100} />
				<StatCard title="Draft" value={draftPosts} icon={Clock} color="bg-gray-50 dark:bg-gray-900/30" delay={200} />
				<StatCard title="Flagged" value={flaggedPosts} icon={AlertTriangle} color="bg-amber-50 dark:bg-amber-900/30" delay={300} />
			</div>

			{/* Brand Filter Tabs */}
			<div className="mb-6  overflow-x-auto" style={{ animationDelay: "400ms" }}>
				<div className="flex gap-2 pb-2">
					{brandCounts.map((brand) => {
						const Icon = brand.icon;
						return (
							<button
								key={brand.id}
								onClick={() => { setSelectedBrand(brand.id); setCurrentPage(1); }}
								className={cn("flex items-center gap-2 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-medium transition-colors", selectedBrand === brand.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-border bg-card text-muted-foreground hover:bg-muted")}
							>
								<Icon className="h-4 w-4" />
								{brand.name}
								<span className={cn("rounded-full px-1.5 py-0.5 text-xs", selectedBrand === brand.id ? "bg-blue-100 text-blue-700" : "bg-muted")}>{brand.postCount}</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Main Content */}
			<div className=" rounded-xl border border-border bg-card shadow-sm" style={{ animationDelay: "500ms" }}>
				{/* Toolbar */}
				<div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row">
					<div className="relative flex-1">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<input
							type="text"
							value={search}
							onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
							placeholder="Cari judul, author, atau tag..."
							className="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
						/>
					</div>
					<div className="flex gap-2 overflow-x-auto pb-2 -mb-2">
						{(["All", "Published", "Draft", "Flagged", "Archived"] as const).map((status) => (
							<button
								key={status}
								onClick={() => { setStatusFilter(status as PostStatus | "All"); setCurrentPage(1); }}
								className={cn("rounded-lg border px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0", statusFilter === status ? "border-blue-500 bg-blue-50 text-blue-700" : "border-border bg-background text-muted-foreground hover:bg-muted")}
							>
								{status === "All" ? "Semua" : status}
							</button>
						))}
					</div>
				</div>

				{/* Posts Grid */}
				<div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
					{paginatedPosts.map((post) => (
						<div key={post.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-md">
							{/* Image */}
							{post.image ? (
								<div className="relative h-40 overflow-hidden">
									<Image src={post.image} alt={post.title} width={400} height={160} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
									<div className="absolute top-2 right-2"><StatusBadge status={post.status} /></div>
									<div className="absolute top-2 left-2"><BrandBadge brand={post.brand} /></div>
								</div>
							) : (
								<div className="relative h-32 bg-muted flex items-center justify-center">
									<FileText className="h-12 w-12 text-muted-foreground/30" />
									<div className="absolute top-2 right-2"><StatusBadge status={post.status} /></div>
									<div className="absolute top-2 left-2"><BrandBadge brand={post.brand} /></div>
								</div>
							)}

							{/* Content */}
							<div className="p-4">
								<h3 className="mb-2 line-clamp-2 text-sm font-medium text-foreground">{post.title}</h3>

								{/* Author */}
								<div className="mb-3 flex items-center gap-2">
									<Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="h-6 w-6 rounded-full bg-muted" />
									<span className="text-xs text-muted-foreground">{post.author.name}</span>
									<span className="text-xs text-muted-foreground">•</span>
									<span className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</span>
								</div>

								{/* Stats */}
								<div className="mb-3 flex items-center gap-4 text-xs text-muted-foreground">
									<span className="flex items-center gap-1"><Eye className="h-3 w-3" />{formatNumber(post.views)}</span>
									<span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{formatNumber(post.comments)}</span>
									<span className="flex items-center gap-1"><Bookmark className="h-3 w-3" />{formatNumber(post.likes)}</span>
									{(post.flags ?? 0) > 0 && <span className="flex items-center gap-1 text-amber-600"><Flag className="h-3 w-3" />{post.flags}</span>}
								</div>

								{/* Tags */}
								<div className="mb-3 flex flex-wrap gap-1 overflow-hidden">
									{post.tags.slice(0, 3).map((tag) => (
										<span key={tag} className="rounded bg-muted px-1.5 py-0.5 text-xs text-muted-foreground truncate max-w-[120px] sm:max-w-none">#{tag}</span>
									))}
								</div>

								{/* Actions */}
								<div className="flex items-center justify-between">
									<button
										onClick={() => router.push(`/admin/post/${post.id}`)}
										className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100"
									>
										<Eye className="h-3 w-3" />Detail
									</button>
									<ActionMenu postId={post.id} onFlag={() => handleFlag(post.id)} onDelete={() => handleDelete(post.id)} onRestore={() => handleRestore(post.id)} status={post.status} />
								</div>
							</div>
						</div>
					))}

					{paginatedPosts.length === 0 && (
						<div className="col-span-full py-12 text-center">
							<FileText className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
							<p className="text-sm text-muted-foreground">Tidak ada postingan ditemukan</p>
						</div>
					)}
				</div>

				{/* Pagination */}
				<div className="flex items-center justify-between border-t border-border px-4 py-3">
					<p className="text-sm text-muted-foreground">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredPosts.length)} of {filteredPosts.length} posts</p>
					<div className="flex items-center gap-1">
						<button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed">
							<ChevronLeft className="h-4 w-4" />
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button key={page} onClick={() => setCurrentPage(page)} className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium", page === currentPage ? "bg-blue-500 text-white" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
								{page}
							</button>
						))}
						<button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed">
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
