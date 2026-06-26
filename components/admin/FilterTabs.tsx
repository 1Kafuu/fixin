"use client";

import { cn } from "@/lib/utils";

interface FilterTab {
	value: string;
	label: string;
}

interface FilterTabsProps {
	tabs: FilterTab[];
	activeTab: string;
	onTabChange: (tab: string) => void;
	className?: string;
}

export function FilterTabs({ tabs, activeTab, onTabChange, className }: FilterTabsProps) {
	return (
		<div className={cn("flex flex-wrap gap-2", className)}>
			{tabs.map((tab) => (
				<button
					key={tab.value}
					onClick={() => onTabChange(tab.value)}
					className={cn(
						"rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
						activeTab === tab.value
							? "border-blue-500 bg-blue-50 text-blue-700"
							: "border-border bg-background text-muted-foreground hover:bg-muted"
					)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
