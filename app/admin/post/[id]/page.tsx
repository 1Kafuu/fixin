"use client";

import { cn } from "../../.././../lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import {
	X,
	CheckCircle,
	Edit,
	Trash2,
	Flag,
	EyeOff,
	RotateCcw,
	ArrowLeft,
	Eye,
	MessageSquare,
	Bookmark,
	AlertTriangle,
	Tag,
	Calendar,
	User,
	ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

// Types
type PostStatus = "Published" | "Draft" | "Flagged" | "Archived";
type LaptopBrand = "Asus" | "Acer" | "Lenovo" | "HP" | "Dell" | "Apple" | "MSI" | "Samsung" | "Other";

interface Post {
	id: string;
	title: string;
	content: string;
	author: {
		id: string;
		name: string;
		avatar: string;
	};
	brand: LaptopBrand;
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

// Mock Data Store (shared with list page via localStorage simulation)
const mockPosts: Post[] = [
	{
		id: "POST-001",
		title: "Tips Merawat Baterai Laptop Asus Agar Tahan Lama",
		content: `Berikut adalah beberapa tips merawat baterai laptop Asus agar tidak cepat rusak dan tetap awet:

1. Hindari penggunaan laptop saat sedang di-charge
Laptop yang digunakan saat dicharge akan membuat baterai panas. Sebaiknya tunggu hingga baterai penuh baru gunakan.

2. Jangan biarkan baterai sampai 0%
Membiarkan baterai habis total dapat merusak sel baterai. Usahakan untuk selalu menjaga baterai di level 20-80%.

3. Calibrate baterai secara berkala
Lakukan calibration baterai minimal 1 bulan sekali dengan cara mengosongkan baterai hingga 5%, lalu charge hingga 100%.

4. Gunakan charger original
Charger KW atau tidak original dapat merusak baterai dan berbahaya.

5. Simpan laptop di tempat sejuk
Panas berlebih adalah musuh utama baterai laptop.

Dengan merawat baterai dengan baik, laptop Asus Anda akan lebih tahan lama dan performanya tetap optimal.`,
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
	const config = {
		Published: {
			className: "border-emerald-200 bg-emerald-50 text-emerald-700",
			dotClass: "bg-emerald-500",
		},
		Draft: {
			className: "border-gray-200 bg-gray-50 text-gray-600",
			dotClass: "bg-gray-400",
		},
		Flagged: {
			className: "border-amber-200 bg-amber-50 text-amber-700",
			dotClass: "bg-amber-500",
		},
		Archived: {
			className: "border-slate-200 bg-slate-50 text-slate-600",
			dotClass: "bg-slate-400",
		},
	};

	const { className, dotClass } = config[status];

	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
				className,
			)}
		>
			<span className={cn("h-1.5 w-1.5 rounded-full", dotClass)} />
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
		<span
			className={cn(
				"inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
				brandColors[brand] || "bg-gray-100 text-gray-600",
			)}
		>
			{brand}
		</span>
	);
}

// Main Page
export default function PostDetailPage() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const postId = searchParams.get("id") || "POST-001";

	const [post, setPost] = useState<Post | null>(null);
	const [loading, setLoading] = useState(true);

	// Simulate data fetch
	useEffect(() => {
		const foundPost = mockPosts.find((p) => p.id === postId);
		setPost(foundPost || null);
		setLoading(false);
	}, [postId]);

	const handleApprove = () => {
		if (post) {
			setPost({
				...post,
				status: "Published",
				flags: 0,
				flagReason: undefined,
			});
		}
	};

	const handleFlag = () => {
		if (post) {
			setPost({
				...post,
				status: "Flagged",
				flags: (post.flags || 0) + 1,
				flagReason: "Ditandai oleh admin",
			});
		}
	};

	const handleArchive = () => {
		if (post) {
			setPost({ ...post, status: "Archived" });
		}
	};

	const handleRestore = () => {
		if (post) {
			setPost({ ...post, status: "Draft" });
		}
	};

	const handleDelete = () => {
		if (confirm("Yakin ingin menghapus postingan ini?")) {
			router.push("/admin/post");
		}
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	};

	const formatNumber = (num: number) => {
		if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
		return num.toString();
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-[60vh]">
				<div className="animate-pulse text-muted-foreground">Loading...</div>
			</div>
		);
	}

	if (!post) {
		return (
			<div className="p-6">
				<div className="mb-6">
					<button
						onClick={() => router.push("/admin/post")}
						className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
					>
						<ArrowLeft className="h-4 w-4" />
						Kembali ke Daftar Postingan
					</button>
				</div>
				<div className="rounded-xl border border-border bg-card p-12 text-center">
					<p className="text-muted-foreground">Postingan tidak ditemukan</p>
					<button
						onClick={() => router.push("/admin/post")}
						className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
					>
						<ArrowLeft className="h-4 w-4" />
						Kembali
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6">
			{/* Breadcrumb */}
			<div className="mb-4 animate-slideUp">
				<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
					<button
						onClick={() => router.push("/admin/post")}
						className="flex items-center gap-1 hover:text-foreground transition-colors"
					>
						Postingan
					</button>
					<ChevronRight className="h-4 w-4" />
					<span className="text-foreground">{post.id}</span>
				</div>
			</div>

			{/* Header */}
			<div className="mb-6 animate-slideUp">
				<h1 className="text-2xl font-semibold text-foreground mb-4">
					Detail Postingan
				</h1>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{/* Main Content */}
				<div className="lg:col-span-2 space-y-6">
					{/* Post Header Card */}
					<div className="animate-slideUp rounded-xl border border-border bg-card p-6 shadow-sm">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<img
									src={post.author.avatar}
									alt={post.author.name}
									className="h-12 w-12 rounded-full bg-muted object-cover"
								/>
								<div>
									<p className="font-medium text-foreground">{post.author.name}</p>
									<p className="text-sm text-muted-foreground">
										{formatDate(post.createdAt)}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<StatusBadge status={post.status} />
								<BrandBadge brand={post.brand} />
							</div>
						</div>

						<h2 className="text-xl font-semibold text-foreground mb-4">
							{post.title}
						</h2>

						{/* Featured Image */}
						{post.image && (
							<div className="mb-6 overflow-hidden rounded-xl">
								<img
									src={post.image}
									alt={post.title}
									className="h-72 w-full object-cover"
								/>
							</div>
						)}

						{/* Content */}
						<div className="rounded-xl border border-border bg-muted/30 p-6">
							<p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
								{post.content}
							</p>
						</div>

						{/* Tags */}
						<div className="mt-6 flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
								>
									<Tag className="h-3 w-3" />
									{tag}
								</span>
							))}
						</div>
					</div>

					{/* Stats Card */}
					<div className="animate-slideUp rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Statistik Postingan
						</h3>
						<div className="grid grid-cols-4 gap-4">
							<div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
								<Eye className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
								<p className="text-2xl font-bold text-foreground">
									{formatNumber(post.views)}
								</p>
								<p className="text-xs text-muted-foreground">Views</p>
							</div>
							<div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
								<MessageSquare className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
								<p className="text-2xl font-bold text-foreground">
									{formatNumber(post.comments)}
								</p>
								<p className="text-xs text-muted-foreground">Comments</p>
							</div>
							<div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
								<Bookmark className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
								<p className="text-2xl font-bold text-foreground">
									{formatNumber(post.likes)}
								</p>
								<p className="text-xs text-muted-foreground">Likes</p>
							</div>
							<div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
								<AlertTriangle className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
								<p className="text-2xl font-bold text-foreground">
									{post.flags || 0}
								</p>
								<p className="text-xs text-muted-foreground">Flags</p>
							</div>
						</div>
					</div>

					{/* Flag Warning */}
					{post.status === "Flagged" && post.flagReason && (
						<div className="animate-slideUp rounded-xl border border-amber-200 bg-amber-50 p-6" style={{ animationDelay: "200ms" }}>
							<div className="flex items-start gap-4">
								<AlertTriangle className="h-6 w-6 text-amber-600 mt-0.5" />
								<div>
									<p className="font-semibold text-amber-800">
										Postingan Ditandai
									</p>
									<p className="text-sm text-amber-700 mt-1">
										Alasan: {post.flagReason}
									</p>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* Actions Card */}
					<div className="animate-slideUp rounded-xl border border-border bg-card p-6 shadow-sm">
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Aksi
						</h3>
						<div className="space-y-3">
							{post.status === "Flagged" && (
								<button
									onClick={handleApprove}
									className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
								>
									<CheckCircle className="h-4 w-4" />
									Approve
								</button>
							)}

							{post.status === "Published" && (
								<button
									onClick={handleFlag}
									className="flex w-full items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-700 hover:bg-amber-100"
								>
									<Flag className="h-4 w-4" />
									Flag Post
								</button>
							)}

							{post.status !== "Archived" && (
								<button
									onClick={handleArchive}
									className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
								>
									<EyeOff className="h-4 w-4" />
									Archive
								</button>
							)}

							{post.status === "Archived" && (
								<button
									onClick={handleRestore}
									className="flex w-full items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100"
								>
									<RotateCcw className="h-4 w-4" />
									Restore
								</button>
							)}

							<div className="border-t border-border pt-3">
								<button
									onClick={handleDelete}
									className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100"
								>
									<Trash2 className="h-4 w-4" />
									Delete
								</button>
							</div>
						</div>
					</div>

					{/* Post Info Card */}
					<div className="animate-slideUp rounded-xl border border-border bg-card p-6 shadow-sm" style={{ animationDelay: "100ms" }}>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							Informasi Postingan
						</h3>
						<div className="space-y-4">
							<div>
								<p className="text-xs text-muted-foreground mb-1">ID Post</p>
								<p className="text-sm font-medium text-foreground">{post.id}</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground mb-1">Author</p>
								<div className="flex items-center gap-2">
									<img
										src={post.author.avatar}
										alt={post.author.name}
										className="h-6 w-6 rounded-full bg-muted"
									/>
									<p className="text-sm font-medium text-foreground">
										{post.author.name}
									</p>
								</div>
							</div>
							<div>
								<p className="text-xs text-muted-foreground mb-1">Merk Laptop</p>
								<BrandBadge brand={post.brand} />
							</div>
							<div>
								<p className="text-xs text-muted-foreground mb-1">Tanggal Dibuat</p>
								<p className="text-sm text-foreground">
									{formatDate(post.createdAt)}
								</p>
							</div>
							<div>
								<p className="text-xs text-muted-foreground mb-1">Terakhir Diubah</p>
								<p className="text-sm text-foreground">
									{formatDate(post.updatedAt)}
								</p>
							</div>
						</div>
					</div>

					{/* Back Button */}
					<button
						onClick={() => router.push("/admin/post")}
						className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
					>
						<ArrowLeft className="h-4 w-4" />
						Kembali ke Daftar
					</button>
				</div>
			</div>
		</div>
	);
}
