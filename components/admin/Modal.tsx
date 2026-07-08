"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

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
	sm: "max-w-sm",
	md: "max-w-md sm:max-w-lg",
	lg: "max-w-sm sm:max-w-2xl",
	xl: "max-w-sm sm:max-w-4xl",
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
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (open) {
			setIsVisible(true);
			document.body.style.overflow = "hidden";
		} else {
			const timer = setTimeout(() => setIsVisible(false), 1000);
			return () => clearTimeout(timer);
		}
	}, [open]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		if (open) {
			document.addEventListener("keydown", handleEscape);
		}
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);

	if (!isVisible) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
			<div
				className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
				onClick={onClose}
			/>
			<div
				className={`relative z-10 w-full ${sizeClasses[size]} max-h-[90vh] sm:max-h-[90vh] overflow-hidden rounded-t-2xl sm:rounded-xl border border-border bg-card shadow-lg transition-all duration-300 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 sm:translate-y-0 sm:opacity-0"} ${className || ""}`}
			>
				{(title || showCloseButton) && (
					<div className="flex items-center justify-between border-b border-border p-3 sm:p-4">
						<div>
							{title && <h2 className="font-semibold text-foreground text-sm sm:text-base">{title}</h2>}
							{subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
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
				<div className="overflow-y-auto max-h-[calc(100vh-120px)] sm:max-h-[calc(90vh-80px)] p-4 sm:p-6">{children}</div>
			</div>
		</div>
	);
}
