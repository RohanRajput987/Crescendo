import { useMemo } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useFinance } from "@/lib/store";
import { currency, compact } from "@/lib/format";

export function MonthlyLineChart() {
  const { transactions } = useFinance();
  const data = useMemo(() => {
    const buckets = new Map<
      string,
      { date: string; income: number; expense: number }
    >();
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      buckets.set(key, {
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        income: 0,
        expense: 0,
      });
    }
    transactions.forEach((t) => {
      const key = t.created_at.slice(0, 10);
      const b = buckets.get(key);
      if (!b) return;
      if (t.type === "income") b.income += t.amount;
      if (t.type === "expense") b.expense += t.amount;
    });
    return Array.from(buckets.values());
  }, [transactions]);

  return (
    <div className="glass rounded-2xl p-5 lg:p-6 h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-semibold">Cash flow</h3>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500" /> Income
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-primary" /> Spending
          </span>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
          >
            <defs>
              <linearGradient id="incArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="oklch(0.72 0.17 155)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.72 0.17 155)"
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="expArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="oklch(0.68 0.2 275)"
                  stopOpacity={0.4}
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.68 0.2 275)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => compact(v as number)}
            />
            <Tooltip
              formatter={(v: number) => currency(v)}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="income"
              stroke="oklch(0.72 0.17 155)"
              strokeWidth={2}
              fill="url(#incArea)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="oklch(0.68 0.2 275)"
              strokeWidth={2}
              fill="url(#expArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
