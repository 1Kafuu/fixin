// components/customer/PostCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MessageCircle, ThumbsUp, Eye, Laptop } from "lucide-react";
import type { Post, BrandKey } from "@/lib/data/community";
import { BRANDS } from "@/lib/data/community";

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

export interface PostCardProps {
  post: Post;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  const brand = BRANDS.find((b) => b.key === post.brand);
  const brandColorClass = brandColors[post.brand] || brandColors.other;

  return (
    <Link href={`/customer/community/${post.id}`}>
      <article
        className={cn(
          "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 transition-all hover:border-indigo-300 hover:shadow-lg hover:-translate-y-0.5",
          className
        )}
      >
        <div className="flex gap-3">
          <img
            src={post.avatar}
            alt={post.author}
            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-medium text-slate-800 dark:text-white">
                {post.author}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-400">{post.time}</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full",
                  brandColorClass
                )}
              >
                <Laptop className="h-3 w-3" />
                {brand?.label || "Lainnya"}
              </span>
            </div>

            <h3 className="text-sm font-semibold text-slate-800 dark:text-white line-clamp-2 mb-2">
              {post.title}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {post.content}
            </p>

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
      </article>
    </Link>
  );
}
