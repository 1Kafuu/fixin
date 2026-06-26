"use client";

interface StatCardProps {
	title: string;
	value: string | number;
	change?: string;
	changeType?: "up" | "down";
	subtitle?: string;
	icon: React.ElementType;
	color: string;
	delay?: number;
}

export function StatCard({
	title,
	value,
	change,
	changeType,
	subtitle,
	icon: Icon,
	color,
	delay = 0,
}: StatCardProps) {
	return (
		<div
			className="animate-slideUp rounded-xl border border-border bg-card p-5 shadow-sm"
			// eslint-disable-next-line react/no-unknown-property
			style={{ animationDelay: `${delay}ms` }}
		>
			<div className="flex items-start justify-between">
				<div>
					<p className="text-sm font-medium text-muted-foreground">{title}</p>
					<p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
					{subtitle && (
						<p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
					)}
					{change && (
						<div className="mt-2 flex items-center gap-1">
							<span className={changeType === "up" ? "text-emerald-500" : "text-red-500"}>
								{changeType === "up" ? "↑" : "↓"} {change}
							</span>
							<span className="text-xs text-muted-foreground">vs last month</span>
						</div>
					)}
				</div>
				<div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color}`}>
					<Icon className="h-6 w-6" />
				</div>
			</div>
		</div>
	);
}
