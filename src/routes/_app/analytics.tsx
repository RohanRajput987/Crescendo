import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useFinance } from "@/lib/store";
import { currency, compact } from "@/lib/format";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/_app/analytics")({
  component: Page,
  head: () => ({ meta: [{ title: "Analytics · Crescendo" }] }),
});

const COLORS = [
  "oklch(0.68 0.2 275)",
  "oklch(0.72 0.17 155)",
  "oklch(0.78 0.17 60)",
  "oklch(0.7 0.2 340)",
  "oklch(0.72 0.16 230)",
];

function Page() {
  const { transactions } = useFinance();
  const [range, setRange] = useState<"week" | "month" | "year">("month");
  const days = range === "week" ? 7 : range === "month" ? 30 : 365;
  const bucketBy = range === "year" ? "month" : "day";

  const series = useMemo(() => {
    const buckets = new Map<
      string,
      { label: string; income: number; expense: number; savings: number }
    >();

    if (range === "year") {
      for (let i = 11; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const label = d.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        });
        if (!buckets.has(key))
          buckets.set(key, { label, income: 0, expense: 0, savings: 0 });
      }
    } else {
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        if (!buckets.has(key))
          buckets.set(key, { label, income: 0, expense: 0, savings: 0 });
      }
    }

    transactions.forEach((t) => {
      const d = new Date(t.created_at);
      const key =
        range === "year"
          ? `${d.getFullYear()}-${d.getMonth()}`
          : t.created_at.slice(0, 10);
      const b = buckets.get(key);
      if (!b) return;
      if (t.type === "income") b.income += t.amount;
      if (t.type === "expense") b.expense += t.amount;
      if (t.type === "savings") b.savings += t.amount;
    });

    return Array.from(buckets.values());
  }, [transactions, days, range]);

  const categoryData = useMemo(() => {
    const map = new Map<string, number>();
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
      });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  const savingsGrowth = useMemo(() => {
    let acc = 1200;
    return series.map((s) => {
      acc += s.savings + Math.max(0, s.income - s.expense) * 0.1;
      return { label: s.label, total: Math.round(acc) };
    });
  }, [series]);

  const tooltip = {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      fontSize: 12,
      color: "var(--popover-foreground)",
    },
    itemStyle: { color: "var(--popover-foreground)" },
  };

  return (
    <AppShell>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Analytics
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Spending trends, income vs expense, and savings growth.
          </p>
        </div>
        <Tabs value={range} onValueChange={(v) => setRange(v as typeof range)}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Income vs Expense</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart
                data={series}
                margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={Math.floor(series.length / 8)}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => compact(v as number)}
                />
                <Tooltip formatter={(v: number) => currency(v)} {...tooltip} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  dataKey="income"
                  fill="oklch(0.72 0.17 155)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="expense"
                  fill="oklch(0.68 0.2 275)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Savings growth</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart
                data={savingsGrowth}
                margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  interval={Math.floor(savingsGrowth.length / 8)}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => compact(v as number)}
                />
                <Tooltip formatter={(v: number) => currency(v)} {...tooltip} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="oklch(0.72 0.17 155)"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Spending by category</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart
                data={categoryData.slice(0, 8)}
                layout="vertical"
                margin={{ left: 10 }}
              >
                <CartesianGrid
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickFormatter={(v) => compact(v as number)}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  width={90}
                />
                <Tooltip formatter={(v: number) => currency(v)} {...tooltip} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {categoryData.slice(0, 8).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Distribution</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData.slice(0, 6)}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  stroke="none"
                >
                  {categoryData.slice(0, 6).map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => currency(v)} {...tooltip} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
