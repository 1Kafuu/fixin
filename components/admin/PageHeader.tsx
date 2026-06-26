"use client";

interface PageHeaderProps {
	title: string;
	description?: string;
	actions?: React.ReactNode;
	className?: string;
	children?: React.ReactNode;
}

export function PageHeader({ title, description, actions, className, children }: PageHeaderProps) {
	return (
		<div className={`mb-6 flex items-start justify-between animate-slideUp ${className || ""}`}>
			<div>
				<h1 className="text-2xl font-semibold text-foreground">{title}</h1>
				{description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
			</div>
			<div className="flex items-center gap-2">
				{actions}
				{children}
			</div>
		</div>
	);
}
