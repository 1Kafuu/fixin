// components/customer/TechnicianCard.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface Technician {
  id: string;
  name: string;
  photo: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  status: "online" | "offline" | "busy";
  location: string;
  distance?: number;
  isVerified?: boolean;
}

export interface TechnicianCardProps {
  technician: Technician;
  onConsultClick?: (technician: Technician) => void;
  className?: string;
}

export function TechnicianCard({ technician, className }: TechnicianCardProps) {
  const { id, name, photo, specialty, rating, status, isVerified } = technician;

  return (
    <Link href={`/customer/hire-technician/${id}`} className={cn("group block", className)}>
      <div className={cn(
        "rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 transition-all hover:border-primary-300 hover:shadow-lg hover:-translate-y-0.5",
        status === "offline" && "opacity-60"
      )}>
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img src={photo} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
          <span className={cn(
            "absolute top-2 right-2 h-3 w-3 rounded-full border-2 border-white dark:border-slate-900",
            status === "online" && "bg-emerald-500",
            status === "offline" && "bg-slate-400",
            status === "busy" && "bg-amber-500"
          )} />
          {isVerified && (
            <span className="absolute bottom-2 left-2 text-[10px] font-semibold bg-primary-500 text-white px-1.5 py-0.5 rounded-full">Verified</span>
          )}
        </div>
        <div className="mt-3 text-center">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-white truncate">{name}</h3>
          <p className="text-xs text-slate-500 truncate mt-0.5">{specialty}</p>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Star className="h-3 w-3 fill-warning-500 text-warning-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
