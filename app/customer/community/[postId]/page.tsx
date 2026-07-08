// app/customer/community/[postId]/page.tsx
"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ThumbsUp, MessageCircle, Eye, Share2, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPostById, BRANDS, type BrandKey } from "@/lib/data/community";
import { cn } from "@/lib/utils";

const brandColors: Record<BrandKey, string> = {
  all: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
  apple: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",
  asus: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  hp: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  lenovo: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  dell: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  samsung: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300",
  acer: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
  msi: "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
  other: "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300",
};

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  const post = getPostById(postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 dark:text-slate-400">Post tidak ditemukan</p>
          <Button
            onClick={() => router.push("/customer/community")}
            className="mt-4 h-10 rounded-xl bg-indigo-500"
          >
            Kembali ke Community
          </Button>
        </div>
      </div>
    );
  }

  const brand = BRANDS.find((b) => b.key === post.brand);
  const brandColorClass = brandColors[post.brand] || brandColors.other;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex h-14 items-center px-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/customer/community")} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 text-lg font-bold text-slate-800 dark:text-white">Diskusi</h1>
        </div>
      </header>

      <main className="p-4 sm:p-6 max-w-2xl mx-auto">
        {/* Post Content */}
        <article className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 sm:p-6">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image src={post.avatar} alt={post.author} fill className="object-cover" />
              </div>
            <div>
              <p className="font-medium text-slate-800 dark:text-white">{post.author}</p>
              <p className="text-sm text-slate-500">{post.time}</p>
            </div>
          </div>

          {/* Brand Badge */}
          <div className="mb-4">
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full",
                brandColorClass
              )}
            >
              <Laptop className="h-3 w-3" />
              {brand?.label || "Lainnya"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
            {post.title}
          </h2>

          {/* Content */}
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {post.content}
          </p>

          {/* Post Image */}
          {post.image && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <Image src={post.image} alt="Post image" width={800} height={384} className="w-full object-cover max-h-96" />
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 py-4 border-t border-b border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <ThumbsUp className="h-4 w-4" />
              {post.likes} suka
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <MessageCircle className="h-4 w-4" />
              {post.comments} komentar
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <Eye className="h-4 w-4" />
              {post.views} dilihat
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <ThumbsUp className="h-4 w-4" />
              Suka
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <MessageCircle className="h-4 w-4" />
              Komentar
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </article>

        {/* Comments Section Placeholder */}
        <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 sm:p-6">
          <h3 className="font-semibold text-slate-800 dark:text-white mb-4">
            Komentar ({post.comments})
          </h3>
          <p className="text-sm text-slate-500 text-center py-8">
            Fitur komentar akan segera hadir
          </p>
        </div>
      </main>
    </div>
  );
}
