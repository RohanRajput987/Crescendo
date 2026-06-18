import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import { useFinance } from "@/lib/store";
import { currency } from "@/lib/format";

const COLORS = [
  "oklch(0.68 0.2 275)",
  "oklch(0.72 0.17 155)",
  "oklch(0.78 0.17 60)",
  "oklch(0.7 0.2 340)",
  "oklch(0.72 0.16 230)",
  "oklch(0.75 0.18 30)",
  "oklch(0.65 0.18 200)",
];

export function SpendingPieChart() {
  const { transactions } = useFinance();
  const data = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) =>
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount),
      );
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [transactions]);

  const total = data.reduce((a, d) => a + d.value, 0);

  return (
    <div className="glass rounded-2xl p-5 lg:p-6 h-full">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-semibold">Spending by category</h3>
        <span className="text-xs text-muted-foreground">Last 60 days</span>
      </div>
      <div className="relative h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => currency(v)}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12,
                color: "var(--popover-foreground)",
              }}
              itemStyle={{ color: "var(--popover-foreground)" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-xl font-bold">{currency(total)}</div>
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <span
              className="size-2.5 rounded-full"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="text-muted-foreground truncate flex-1">
              {d.name}
            </span>
            <span className="font-medium">{currency(d.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
