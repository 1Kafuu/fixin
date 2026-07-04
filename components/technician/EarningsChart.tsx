"use client";

interface MonthlyEarning {
  month: string;
  amount: number;
}

interface EarningsChartProps {
  data: MonthlyEarning[];
}

export function EarningsChart({ data }: EarningsChartProps) {
  const maxAmount = Math.max(...data.map((d) => d.amount), 1);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `Rp ${(amount / 1000000).toFixed(1)}jt`;
    }
    return `Rp ${(amount / 1000).toFixed(0)}rb`;
  };

  return (
    <div className="h-64 flex items-end gap-2">
      {data.map((item) => {
        const heightPercent = (item.amount / maxAmount) * 100;
        return (
          <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex flex-col items-center">
              <span className="text-[10px] text-muted-foreground mb-1">
                {formatCurrency(item.amount)}
              </span>
              <div
                className="w-full rounded-t-lg bg-primary/80 hover:bg-primary transition-colors"
                style={{ height: `${Math.max(heightPercent, 4)}%` }}
                title={item.month}
              />
            </div>
            <span className="text-xs text-muted-foreground">{item.month}</span>
          </div>
        );
      })}
    </div>
  );
}
