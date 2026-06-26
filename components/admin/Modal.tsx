"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title?: string;
	subtitle?: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl" | "full";
	className?: string;
	showCloseButton?: boolean;
}

const sizeClasses = {
	sm: "max-w-md",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
	full: "max-w-[90vw]",
};

export function Modal({
	open,
	onClose,
	title,
	subtitle,
	children,
	size = "md",
	className,
	showCloseButton = true,
}: ModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (open) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div
				className="fixed inset-0 bg-black/50"
				onClick={onClose}
				onKeyDown={(e) => {
					if (e.key === "Escape") onClose();
				}}
				role="button"
				tabIndex={-1}
				aria-label="Close modal"
			/>
			<div
				className={`relative z-10 w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden rounded-xl border border-border bg-card shadow-lg animate-popIn ${className || ""}`}
			>
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between border-b border-border p-4">
						<div>
							{title && <h2 className="font-semibold text-foreground">{title}</h2>}
							{subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
						</div>
						{showCloseButton && (
							<button
								onClick={onClose}
								className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
							>
								<X className="h-4 w-4" />
							</button>
						)}
					</div>
				)}
				<div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6">{children}</div>
			</div>
		</div>
	);
}
