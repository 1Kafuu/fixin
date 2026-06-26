"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
	key: string;
	header: string;
	render?: (item: T, index: number) => React.ReactNode;
	className?: string;
}

interface DataTableProps<T> {
	columns: Column<T>[];
	data: T[];
	emptyMessage?: string;
	className?: string;
	onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string | number }>({
	columns,
	data,
	emptyMessage = "No data found",
	className,
	onRowClick,
}: DataTableProps<T>) {
	return (
		<div className={cn("overflow-x-auto rounded-xl border border-border bg-card", className)}>
			<table className="w-full">
				<thead>
					<tr className="border-b border-border bg-muted/50">
						{columns.map((col) => (
							<th
								key={col.key}
								className={cn(
									"px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground",
									col.className
								)}
							>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-border">
					{data.map((item, index) => (
						<tr
							key={item.id}
							className={cn(
								"transition-colors hover:bg-muted/30",
								onRowClick && "cursor-pointer"
							)}
							onClick={() => onRowClick?.(item)}
						>
							{columns.map((col) => (
								<td
									key={col.key}
									className={cn("px-4 py-3", col.className)}
								>
									{col.render
										? col.render(item, index)
										: String((item as Record<string, unknown>)[col.key] ?? "")}
								</td>
							))}
						</tr>
					))}
					{data.length === 0 && (
						<tr>
							<td
								colSpan={columns.length}
								className="px-4 py-8 text-center text-sm text-muted-foreground"
							>
								{emptyMessage}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}
