// app/customer/community/page.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Bell,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandSidebar } from "@/components/customer/BrandSidebar";
import { PostCard } from "@/components/customer/PostCard";
import { MOCK_POSTS, BRANDS, type BrandKey } from "@/lib/data/community";

export default function CommunityPage() {
  const [selectedBrand, setSelectedBrand] = React.useState<BrandKey>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const postCounts = React.useMemo(() => {
    const counts: Record<BrandKey, number> = {
      all: MOCK_POSTS.length,
      apple: 0,
      asus: 0,
      hp: 0,
      lenovo: 0,
      dell: 0,
      samsung: 0,
      acer: 0,
      msi: 0,
      other: 0,
    };
    MOCK_POSTS.forEach((post) => {
      if (post.brand in counts) {
        counts[post.brand]++;
      }
    });
    return counts;
  }, []);

  const filteredPosts = React.useMemo(() => {
    let posts = selectedBrand === "all"
      ? MOCK_POSTS
      : MOCK_POSTS.filter((p) => p.brand === selectedBrand);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [selectedBrand, searchQuery]);

  const selectedBrandLabel = BRANDS.find((b) => b.key === selectedBrand)?.label || "Semua";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/customer" className="flex items-center gap-2 sm:gap-3">
            <Image src="/logo.svg" alt="FixIn Logo" width={40} height={40} className="w-25 h-10" />
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
              <Link href="/customer/store">Store</Link>
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
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3">
            <BrandSidebar
              selectedBrand={selectedBrand}
              onBrandChange={(brand) => {
                setSelectedBrand(brand);
                setMobileMenuOpen(false);
              }}
              postCounts={postCounts}
              className="flex flex-wrap gap-2"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden sm:block w-56 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 min-h-[calc(100vh-4rem)] sticky top-14">
          <h2 className="px-3 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Merk Laptop
          </h2>
          <BrandSidebar
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            postCounts={postCounts}
          />
        </aside>

        {/* Post List */}
        <main className="flex-1 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white">
                {selectedBrandLabel}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {filteredPosts.length} diskusi
              </p>
            </div>
            <Button asChild className="hidden sm:flex rounded-xl bg-indigo-500 hover:bg-indigo-600">
              <Link href="/customer/community/create">
                <Plus className="h-4 w-4 mr-2" />
                Buat Post
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-12 text-center">
                <p className="text-lg font-medium text-slate-800 dark:text-white">
                  Tidak ada diskusi ditemukan
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Coba pilih merk lain atau buat diskusi baru
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* FAB for mobile */}
      <Link
        href="/customer/community/create"
        className="sm:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transition-colors"
      >
        <Plus className="h-6 w-6" />
      </Link>
    </div>
  );
}