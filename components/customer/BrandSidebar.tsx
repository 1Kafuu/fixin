"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { BRANDS, type BrandKey, type Brand } from "@/lib/data/community";
import { Grid3X3, Laptop } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Grid3X3,
  Laptop,
};

function BrandIcon({ brand }: { brand: Brand }) {
  const Icon = iconMap[brand.icon] || Laptop;
  return <Icon className="h-4 w-4" />;
}

export interface BrandSidebarProps {
  selectedBrand: BrandKey;
  onBrandChange: (brand: BrandKey) => void;
  postCounts?: Record<BrandKey, number>;
  className?: string;
  variant?: "vertical" | "horizontal";
}

export function BrandSidebar({
  selectedBrand,
  onBrandChange,
  postCounts,
  className,
  variant = "vertical",
}: BrandSidebarProps) {
  const isHorizontal = variant === "horizontal";

  return (
    <nav className={cn(isHorizontal ? "flex flex-nowrap gap-2 min-w-max" : "space-y-1", className)}>
      {BRANDS.map((brand) => {
        const isSelected = selectedBrand === brand.key;
        const count = postCounts?.[brand.key];

        return (
          <button
            key={brand.key}
            onClick={() => onBrandChange(brand.key)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
              isHorizontal
                ? cn(
                    "rounded-full",
                    isSelected
                      ? "bg-indigo-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  )
                : cn(
                    "w-full",
                    isSelected
                      ? "bg-indigo-500 text-white shadow-md"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )
            )}
          >
            <BrandIcon brand={brand} />
            {!isHorizontal && <span className="flex-1 text-left">{brand.label}</span>}
            {isHorizontal && <span>{brand.label}</span>}
            {count !== undefined && (
              <span
                className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isSelected
                    ? "bg-indigo-400 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
