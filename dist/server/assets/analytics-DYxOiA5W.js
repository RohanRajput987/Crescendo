import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { A as AppShell } from "./AppShell-BLLKvUYX.js";
import { u as useFinance } from "./store-DEvh2MYP.js";
import { a as compact, c as currency } from "./format-BD4xb6xu.js";
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LineChart, Line, Cell, PieChart, Pie } from "recharts";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { c as cn } from "./button-DOg9Mvyv.js";
import "@tanstack/react-router";
import "framer-motion";
import "lucide-react";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;
const COLORS = ["oklch(0.68 0.2 275)", "oklch(0.72 0.17 155)", "oklch(0.78 0.17 60)", "oklch(0.7 0.2 340)", "oklch(0.72 0.16 230)"];
function Page() {
  const {
    transactions
  } = useFinance();
  const [range, setRange] = useState("month");
  const days = range === "week" ? 7 : range === "month" ? 30 : 365;
  const series = useMemo(() => {
    const buckets = /* @__PURE__ */ new Map();
    if (range === "year") {
      for (let i = 11; i >= 0; i--) {
        const d = /* @__PURE__ */ new Date();
        d.setMonth(d.getMonth() - i);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        const label = d.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit"
        });
        if (!buckets.has(key)) buckets.set(key, {
          label,
          income: 0,
          expense: 0,
          savings: 0
        });
      }
    } else {
      for (let i = days - 1; i >= 0; i--) {
        const d = /* @__PURE__ */ new Date();
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const label = d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        });
        if (!buckets.has(key)) buckets.set(key, {
          label,
          income: 0,
          expense: 0,
          savings: 0
        });
      }
    }
    transactions.forEach((t) => {
      const d = new Date(t.created_at);
      const key = range === "year" ? `${d.getFullYear()}-${d.getMonth()}` : t.created_at.slice(0, 10);
      const b = buckets.get(key);
      if (!b) return;
      if (t.type === "income") b.income += t.amount;
      if (t.type === "expense") b.expense += t.amount;
      if (t.type === "savings") b.savings += t.amount;
    });
    return Array.from(buckets.values());
  }, [transactions, days, range]);
  const categoryData = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    transactions.filter((t) => t.type === "expense").forEach((t) => {
      map.set(t.category, (map.get(t.category) ?? 0) + t.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [transactions]);
  const savingsGrowth = useMemo(() => {
    let acc = 1200;
    return series.map((s) => {
      acc += s.savings + Math.max(0, s.income - s.expense) * 0.1;
      return {
        label: s.label,
        total: Math.round(acc)
      };
    });
  }, [series]);
  const tooltip = {
    contentStyle: {
      background: "var(--popover)",
      border: "1px solid var(--border)",
      borderRadius: 12,
      fontSize: 12,
      color: "var(--popover-foreground)"
    },
    itemStyle: {
      color: "var(--popover-foreground)"
    }
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Analytics" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Spending trends, income vs expense, and savings growth." })
      ] }),
      /* @__PURE__ */ jsx(Tabs, { value: range, onValueChange: (v) => setRange(v), children: /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "week", children: "Week" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "month", children: "Month" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "year", children: "Year" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Income vs Expense" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(BarChart, { data: series, margin: {
          top: 5,
          right: 5,
          bottom: 0,
          left: -20
        }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, interval: Math.floor(series.length / 8) }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, tickFormatter: (v) => compact(v) }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => currency(v), ...tooltip }),
          /* @__PURE__ */ jsx(Legend, { wrapperStyle: {
            fontSize: 12
          } }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "income", fill: "oklch(0.72 0.17 155)", radius: [6, 6, 0, 0] }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "expense", fill: "oklch(0.68 0.2 275)", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Savings growth" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(LineChart, { data: savingsGrowth, margin: {
          top: 5,
          right: 5,
          bottom: 0,
          left: -20
        }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", vertical: false }),
          /* @__PURE__ */ jsx(XAxis, { dataKey: "label", stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, interval: Math.floor(savingsGrowth.length / 8) }),
          /* @__PURE__ */ jsx(YAxis, { stroke: "var(--muted-foreground)", fontSize: 11, tickLine: false, axisLine: false, tickFormatter: (v) => compact(v) }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => currency(v), ...tooltip }),
          /* @__PURE__ */ jsx(Line, { type: "monotone", dataKey: "total", stroke: "oklch(0.72 0.17 155)", strokeWidth: 2.5, dot: false })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Spending by category" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(BarChart, { data: categoryData.slice(0, 8), layout: "vertical", margin: {
          left: 10
        }, children: [
          /* @__PURE__ */ jsx(CartesianGrid, { stroke: "var(--border)", strokeDasharray: "3 3", horizontal: false }),
          /* @__PURE__ */ jsx(XAxis, { type: "number", stroke: "var(--muted-foreground)", fontSize: 11, tickFormatter: (v) => compact(v) }),
          /* @__PURE__ */ jsx(YAxis, { type: "category", dataKey: "name", stroke: "var(--muted-foreground)", fontSize: 11, width: 90 }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => currency(v), ...tooltip }),
          /* @__PURE__ */ jsx(Bar, { dataKey: "value", radius: [0, 6, 6, 0], children: categoryData.slice(0, 8).map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Distribution" }),
        /* @__PURE__ */ jsx("div", { className: "h-72", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(Pie, { data: categoryData.slice(0, 6), dataKey: "value", nameKey: "name", outerRadius: 100, stroke: "none", children: categoryData.slice(0, 6).map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i)) }),
          /* @__PURE__ */ jsx(Tooltip, { formatter: (v) => currency(v), ...tooltip }),
          /* @__PURE__ */ jsx(Legend, { wrapperStyle: {
            fontSize: 11
          } })
        ] }) }) })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
