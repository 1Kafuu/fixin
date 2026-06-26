"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

interface ActionMenuItem {
	label: string;
	onClick: () => void;
	variant?: "default" | "danger" | "warning" | "success";
	icon?: React.ElementType;
	disabled?: boolean;
}

interface ActionMenuProps {
	items: ActionMenuItem[];
	className?: string;
}

export function ActionMenu({ items, className }: ActionMenuProps) {
	const [open, setOpen] = useState(false);

	const variantStyles = {
		default: "hover:bg-muted",
		danger: "text-destructive hover:bg-destructive/10",
		warning: "text-amber-700 hover:bg-amber-50",
		success: "text-emerald-700 hover:bg-emerald-50",
	};

	return (
		<div className={cn("relative", className)}>
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
				aria-label="Actions"
				aria-expanded={open}
			>
				<MoreHorizontal className="h-4 w-4" />
			</button>
			{open && (
				<>
					<div
						className="fixed inset-0 z-10"
						onClick={() => setOpen(false)}
						onKeyDown={(e) => {
							if (e.key === "Escape") setOpen(false);
						}}
						role="button"
						tabIndex={-1}
						aria-label="Close menu"
					/>
					<div className="absolute right-0 z-20 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg">
						{items.map((item, index) => (
							<button
								key={index}
								type="button"
								onClick={() => {
									if (!item.disabled) {
										item.onClick();
										setOpen(false);
									}
								}}
								disabled={item.disabled}
								className={cn(
									"flex w-full items-center gap-2 px-3 py-2 text-sm",
									variantStyles[item.variant || "default"],
									item.disabled && "opacity-50 cursor-not-allowed"
								)}
							>
								{item.icon && <item.icon className="h-3.5 w-3.5" />}
								{item.label}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
