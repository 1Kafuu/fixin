"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems?: number;
	itemsPerPage?: number;
	onPageChange: (page: number) => void;
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage = 10,
	onPageChange,
	className,
}: PaginationProps) {
	const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : 1;
	const endItem = totalItems ? Math.min(currentPage * itemsPerPage, totalItems) : currentPage;

	const getPageNumbers = () => {
		const pages: (number | "...")[] = [];
		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, "...", totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
			}
		}
		return pages;
	};

	return (
		<div className={cn("flex items-center justify-between border-t border-border px-4 py-3", className)}>
			<p className="text-sm text-muted-foreground">
				{totalItems ? (
					<>
						Showing <span className="font-medium text-foreground">{startItem}</span> to{" "}
						<span className="font-medium text-foreground">{endItem}</span> of{" "}
						<span className="font-medium text-foreground">{totalItems}</span> results
					</>
				) : (
					<span>Page <span className="font-medium text-foreground">{currentPage}</span> of <span className="font-medium text-foreground">{totalPages}</span></span>
				)}
			</p>
			<div className="flex items-center gap-1">
				<button
					onClick={() => onPageChange(Math.max(1, currentPage - 1))}
					disabled={currentPage === 1}
					className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronLeft className="h-4 w-4" />
				</button>
				{getPageNumbers().map((page, index) =>
					page === "..." ? (
						<span key={`ellipsis-${index}`} className="flex h-8 w-8 items-center justify-center text-muted-foreground">
							...
						</span>
					) : (
						<button
							key={page}
							onClick={() => onPageChange(page)}
							className={cn(
								"flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
								currentPage === page
									? "bg-blue-500 text-white"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							)}
						>
							{page}
						</button>
					)
				)}
				<button
					onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
					disabled={currentPage === totalPages}
					className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
				>
					<ChevronRight className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
