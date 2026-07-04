"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Bell,
  Plus,
  MessageCircle,
  ThumbsUp,
  Eye,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const mockPosts = [
  {
    id: "post-001",
    author: "Rizky Pratama",
    avatar: "https://i.pravatar.cc/150?img=33",
    title: "Laptop saya ASUS VivoBook layar berkedip-kedip, solusi apa ya?",
    content: "Halo teman-teman, laptop ASUS VivoBook saya sudah 2 hari layar berkedip-kedip. Sudah coba restart tapi masih sama. Apakah ada yang pernah mengalami masalah serupa?",
    category: "Laptop",
    likes: 24,
    comments: 12,
    views: 156,
    time: "2 jam lalu",
  },
  {
    id: "post-002",
    author: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?img=44",
    title: "Share pengalaman service di FixIn - sangat memuaskan!",
    content: "Baru selesai service laptop di FixIn, teknisinya sangat profesional dan harga terjangkau. Recommended banget untuk kalian yang butuh service laptop!",
    category: "Review",
    likes: 67,
    comments: 23,
    views: 432,
    time: "5 jam lalu",
  },
  {
    id: "post-003",
    author: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?img=12",
    title: "Tips: Cara merawat baterai laptop agar tahan lama",
    content: "Setelah pakai laptop selama 5 tahun, ini beberapa tips dari saya untuk merawat baterai laptop agar tidak cepat bocor. Semoga bermanfaat!",
    category: "Tips & Trick",
    likes: 89,
    comments: 34,
    views: 678,
    time: "1 hari lalu",
  },
  {
    id: "post-004",
    author: "Dewi Kartika",
    avatar: "https://i.pravatar.cc/150?img=5",
    title: "Pertanyaan: Berapa biaya service keyboard laptop HP?",
    content: "Keyboard laptop HP saya ada beberapa tombol yang tidak berfungsi. Kira-kira biaya service keyboard laptop HP berapa ya? Terima kasih sebelumnya!",
    category: "Pertanyaan",
    likes: 15,
    comments: 8,
    views: 89,
    time: "1 hari lalu",
  },
  {
    id: "post-005",
    author: "Ahmad Fauzi",
    avatar: "https://i.pravatar.cc/150?img=15",
    title: "Rekomendasi: Teknisi terbaik untuk service MacBook di Jakarta",
    content: "Bagi kalian yang butuh service MacBook, saya recommend teknisi dari FixIn yang sudah berpengalaman mengatasi berbagai masalah MacBook. Service cepat dan garansi juga ada!",
    category: "Rekomendasi",
    likes: 45,
    comments: 19,
    views: 312,
    time: "2 hari lalu",
  },
];

const categories = [
  { value: "all", label: "Semua" },
  { value: "Pertanyaan", label: "Pertanyaan" },
  { value: "Tips & Trick", label: "Tips & Trick" },
  { value: "Review", label: "Review" },
  { value: "Rekomendasi", label: "Rekomendasi" },
];

function PostCard({ post }: { post: (typeof mockPosts)[0] }) {
  return (
    <Link href={`/customer/community/${post.id}`}>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 transition-all hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5">
        <div className="flex gap-3">
          <img src={post.avatar} alt={post.author} className="h-10 w-10 rounded-full object-cover" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-slate-800 dark:text-white">{post.author}</span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400">{post.time}</span>
            </div>
            <span className="inline-block text-[10px] font-semibold bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 px-2 py-0.5 rounded-full mb-2">
              {post.category}
            </span>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-2 mb-2">{post.title}</h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">{post.content}</p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-3 w-3" />
                {post.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="h-3 w-3" />
                {post.comments}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.views}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPosts = mockPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/customer" className="flex items-center gap-2 sm:gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-lg font-bold text-slate-800 dark:text-white hidden sm:block">FixIn</span>
          </Link>

          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari diskusi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/customer/store">
                <MessageCircle className="h-4 w-4 mr-2" />
                Consulting
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <Link href="/customer/store/checkout">
                <Wrench className="h-4 w-4 mr-2" />
                Booking
              </Link>
            </Button>
            <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="User"
              className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900/50 cursor-pointer"
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-4 sm:px-6 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.value
                    ? "bg-indigo-500 text-white shadow-md"
                    : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 space-y-2">
            <Link href="/customer/store" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              <MessageCircle className="h-4 w-4" />
              Consulting
            </Link>
            <Link href="/customer/store/checkout" className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Wrench className="h-4 w-4" />
              Booking Servis
            </Link>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">Community</h1>
            <p className="mt-1 text-sm text-slate-500">Diskusi dan berbagi pengalaman seputar teknologi</p>
          </div>
          <Button asChild className="hidden sm:flex rounded-xl bg-indigo-500 hover:bg-indigo-600">
            <Link href="/customer/community/create">
              <Plus className="h-4 w-4 mr-2" />
              Buat Post
            </Link>
          </Button>
        </div>

        {/* Post List */}
        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-slate-400" />
              <p className="mt-4 text-lg font-medium text-slate-800 dark:text-white">Tidak ada diskusi ditemukan</p>
              <p className="mt-1 text-sm text-slate-500">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}
        </div>

        {/* FAB for mobile */}
        <Link
          href="/customer/community/create"
          className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-colors"
        >
          <Plus className="h-6 w-6" />
        </Link>
      </main>
    </div>
  );
}
