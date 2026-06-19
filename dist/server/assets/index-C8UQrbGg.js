import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, ArrowDownRight, ArrowDownLeft, PiggyBank, Sparkles, TrendingDown, TrendingUp, Lightbulb, Wallet } from "lucide-react";
import { A as AppShell } from "./AppShell-BLLKvUYX.js";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { c as cn } from "./button-DOg9Mvyv.js";
import { c as currency, a as compact } from "./format-BD4xb6xu.js";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import { u as useFinance, a as useMonthTotals } from "./store-DEvh2MYP.js";
import { Link } from "@tanstack/react-router";
import { A as AddTransactionDialog } from "./AddTransactionDialog-DbbAF74Y.js";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "./dialog-BmhSkJfG.js";
import "@radix-ui/react-dialog";
import "./label-BjHVLbwY.js";
import "@radix-ui/react-label";
import "./select-DjNAOfwj.js";
import "@radix-ui/react-select";
import "sonner";
function Counter({ value }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => currency(v));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);
  return /* @__PURE__ */ jsx(motion.span, { children: rounded });
}
const accentMap = {
  primary: "from-primary/30 to-fuchsia-500/10 text-primary",
  success: "from-emerald-500/30 to-teal-500/10 text-emerald-500",
  warning: "from-amber-500/30 to-orange-500/10 text-amber-500",
  info: "from-sky-500/30 to-indigo-500/10 text-sky-500"
};
function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "primary"
}) {
  const positive = (delta ?? 0) >= 0;
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      whileHover: { y: -3 },
      transition: { type: "spring", stiffness: 220, damping: 20 },
      className: "glass rounded-2xl p-5 relative overflow-hidden",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "absolute -top-12 -right-12 size-32 rounded-full blur-2xl opacity-60 bg-gradient-to-br",
              accentMap[accent]
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4 relative", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: label }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "size-9 rounded-xl grid place-items-center bg-gradient-to-br",
                accentMap[accent]
              ),
              children: /* @__PURE__ */ jsx(Icon, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-2xl lg:text-3xl font-bold tracking-tight relative", children: /* @__PURE__ */ jsx(Counter, { value }) }),
        delta !== void 0 && /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "mt-2 inline-flex items-center gap-1 text-xs font-medium",
              positive ? "text-emerald-500" : "text-rose-500"
            ),
            children: [
              positive ? /* @__PURE__ */ jsx(ArrowUpRight, { className: "size-3.5" }) : /* @__PURE__ */ jsx(ArrowDownRight, { className: "size-3.5" }),
              Math.abs(delta).toFixed(1),
              "% vs last month"
            ]
          }
        )
      ]
    }
  );
}
const COLORS = [
  "oklch(0.68 0.2 275)",
  "oklch(0.72 0.17 155)",
  "oklch(0.78 0.17 60)",
  "oklch(0.7 0.2 340)",
  "oklch(0.72 0.16 230)",
  "oklch(0.75 0.18 30)",
  "oklch(0.65 0.18 200)"
];
function SpendingPieChart() {
  const { transactions } = useFinance();
  const data = useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    transactions.filter((t) => t.type === "expense").forEach(
      (t) => map.set(t.category, (map.get(t.category) ?? 0) + t.amount)
    );
    return Array.from(map.entries()).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 6);
  }, [transactions]);
  const total = data.reduce((a, d) => a + d.value, 0);
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6 h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Spending by category" }),
      /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: "Last 60 days" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative h-64", children: [
      /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(PieChart, { children: [
        /* @__PURE__ */ jsx(
          Pie,
          {
            data,
            dataKey: "value",
            nameKey: "name",
            innerRadius: 60,
            outerRadius: 95,
            paddingAngle: 2,
            stroke: "none",
            children: data.map((_, i) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[i % COLORS.length] }, i))
          }
        ),
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            formatter: (v) => currency(v),
            contentStyle: {
              background: "var(--popover)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              fontSize: 12,
              color: "var(--popover-foreground)"
            },
            itemStyle: { color: "var(--popover-foreground)" }
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center pointer-events-none", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Total" }),
        /* @__PURE__ */ jsx("div", { className: "text-xl font-bold", children: currency(total) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-2 gap-2", children: data.map((d, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "size-2.5 rounded-full",
          style: { background: COLORS[i % COLORS.length] }
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground truncate flex-1", children: d.name }),
      /* @__PURE__ */ jsx("span", { className: "font-medium", children: currency(d.value) })
    ] }, d.name)) })
  ] });
}
function MonthlyLineChart() {
  const { transactions } = useFinance();
  const data = useMemo(() => {
    const buckets = /* @__PURE__ */ new Map();
    for (let i = 29; i >= 0; i--) {
      const d = /* @__PURE__ */ new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      buckets.set(key, {
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        income: 0,
        expense: 0
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
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6 h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Cash flow" }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 text-xs", children: [
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-emerald-500" }),
          " Income"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-primary" }),
          " Spending"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-64", children: /* @__PURE__ */ jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxs(
      AreaChart,
      {
        data,
        margin: { top: 5, right: 5, bottom: 0, left: -20 },
        children: [
          /* @__PURE__ */ jsxs("defs", { children: [
            /* @__PURE__ */ jsxs("linearGradient", { id: "incArea", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "0%",
                  stopColor: "oklch(0.72 0.17 155)",
                  stopOpacity: 0.4
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "100%",
                  stopColor: "oklch(0.72 0.17 155)",
                  stopOpacity: 0
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("linearGradient", { id: "expArea", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "0%",
                  stopColor: "oklch(0.68 0.2 275)",
                  stopOpacity: 0.4
                }
              ),
              /* @__PURE__ */ jsx(
                "stop",
                {
                  offset: "100%",
                  stopColor: "oklch(0.68 0.2 275)",
                  stopOpacity: 0
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            CartesianGrid,
            {
              stroke: "var(--border)",
              strokeDasharray: "3 3",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsx(
            XAxis,
            {
              dataKey: "date",
              stroke: "var(--muted-foreground)",
              fontSize: 11,
              tickLine: false,
              axisLine: false,
              interval: 4
            }
          ),
          /* @__PURE__ */ jsx(
            YAxis,
            {
              stroke: "var(--muted-foreground)",
              fontSize: 11,
              tickLine: false,
              axisLine: false,
              tickFormatter: (v) => compact(v)
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              formatter: (v) => currency(v),
              contentStyle: {
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                fontSize: 12
              }
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "income",
              stroke: "oklch(0.72 0.17 155)",
              strokeWidth: 2,
              fill: "url(#incArea)"
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "expense",
              stroke: "oklch(0.68 0.2 275)",
              strokeWidth: 2,
              fill: "url(#expArea)"
            }
          )
        ]
      }
    ) }) })
  ] });
}
function RecentTransactions() {
  const { transactions } = useFinance();
  const recent = transactions.slice(0, 7);
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Recent transactions" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/transactions",
          className: "text-xs text-primary font-medium hover:underline",
          children: "View all →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border/60", children: recent.map((t, i) => {
      const Icon = t.type === "income" ? ArrowDownLeft : t.type === "savings" ? PiggyBank : ArrowUpRight;
      const color = t.type === "income" ? "text-emerald-500 bg-emerald-500/10" : t.type === "savings" ? "text-sky-500 bg-sky-500/10" : "text-rose-500 bg-rose-500/10";
      return /* @__PURE__ */ jsxs(
        motion.li,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.03 },
          className: "flex items-center gap-3 py-3",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "size-9 rounded-xl grid place-items-center",
                  color
                ),
                children: /* @__PURE__ */ jsx(Icon, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "font-medium text-sm truncate", children: t.title }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
                t.category,
                " ·",
                " ",
                new Date(t.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })
              ] })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "font-semibold text-sm tabular-nums",
                  t.type === "income" ? "text-emerald-500" : t.type === "expense" ? "text-foreground" : "text-sky-500"
                ),
                children: [
                  t.type === "income" ? "+" : t.type === "expense" ? "−" : "",
                  currency(t.amount)
                ]
              }
            )
          ]
        },
        t.id
      );
    }) })
  ] });
}
function HealthScore() {
  const { income, expense, savings } = useMonthTotals();
  const savingsRate = income > 0 ? Math.min(1, (savings + Math.max(0, income - expense)) / income) : 0;
  const score = Math.round(40 + savingsRate * 55 + (income > expense ? 5 : 0));
  const radius = 56;
  const c = 2 * Math.PI * radius;
  const offset = c - score / 100 * c;
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6 flex items-center gap-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative size-32 shrink-0", children: [
      /* @__PURE__ */ jsxs("svg", { className: "size-full -rotate-90", viewBox: "0 0 128 128", children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx: "64",
            cy: "64",
            r: radius,
            stroke: "var(--muted)",
            strokeWidth: "10",
            fill: "none"
          }
        ),
        /* @__PURE__ */ jsx(
          motion.circle,
          {
            cx: "64",
            cy: "64",
            r: radius,
            stroke: "url(#hs-grad)",
            strokeWidth: "10",
            strokeLinecap: "round",
            fill: "none",
            strokeDasharray: c,
            initial: { strokeDashoffset: c },
            animate: { strokeDashoffset: offset },
            transition: { duration: 1.4, ease: "easeOut" }
          }
        ),
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "hs-grad", x1: "0", y1: "0", x2: "1", y2: "1", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "oklch(0.68 0.2 275)" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "oklch(0.72 0.17 155)" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-3xl font-bold tracking-tight", children: score }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "/ 100" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Financial health" }),
      /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg mt-0.5", children: score >= 80 ? "Excellent" : score >= 60 ? "On track" : score >= 40 ? "Needs work" : "At risk" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-1.5 leading-relaxed", children: "Based on your savings rate, spending consistency, and goal progress this month." })
    ] })
  ] });
}
const insights = [
  {
    icon: TrendingDown,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Dining spend down 18%",
    body: "You cooked at home 4 more nights this month. Keep it up to save ~$240/mo."
  },
  {
    icon: TrendingUp,
    color: "text-amber-500 bg-amber-500/10",
    title: "Subscriptions creeping up",
    body: "3 new recurring charges since September. Audit them in Budgets."
  },
  {
    icon: Lightbulb,
    color: "text-primary bg-primary/10",
    title: "Move $400 to savings",
    body: "You're on pace to overshoot your buffer — auto-route the excess to Emergency Fund."
  }
];
function AIInsights() {
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs("h3", { className: "font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "size-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-3.5 text-white" }) }),
        "AI Insights"
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Live" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-2.5", children: insights.map((it, i) => {
      const Icon = it.icon;
      return /* @__PURE__ */ jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 * i },
          className: "flex gap-3 p-3 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 transition-colors",
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `size-8 rounded-lg grid place-items-center shrink-0 ${it.color}`,
                children: /* @__PURE__ */ jsx(Icon, { className: "size-4" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: it.title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: it.body })
            ] })
          ]
        },
        i
      );
    }) })
  ] });
}
function GoalProgress() {
  const { goals } = useFinance();
  return /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:p-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Goals" }),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/goals",
          className: "text-xs text-primary font-medium hover:underline",
          children: "Manage →"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: goals.slice(0, 3).map((g) => {
      const p = Math.min(1, g.saved_amount / g.target_amount);
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: g.emoji }),
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: g.title })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
            currency(g.saved_amount),
            " / ",
            currency(g.target_amount)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsx(
          motion.div,
          {
            initial: { width: 0 },
            animate: { width: `${p * 100}%` },
            transition: { duration: 1, ease: "easeOut" },
            className: "h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500"
          }
        ) })
      ] }, g.id);
    }) })
  ] });
}
function Dashboard() {
  const [open, setOpen] = useState(false);
  const {
    user,
    budgets
  } = useFinance();
  const {
    income,
    expense,
    savings,
    balance
  } = useMonthTotals();
  const budgetRemaining = budgets.reduce((a, b) => a + b.limit, 0) - budgets.reduce((a, b) => a + b.spent, 0);
  return /* @__PURE__ */ jsxs(AppShell, { onAdd: () => setOpen(true), children: [
    /* @__PURE__ */ jsx(AddTransactionDialog, { open, onOpenChange: setOpen }),
    /* @__PURE__ */ jsxs(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "mb-6", children: [
      /* @__PURE__ */ jsxs("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: [
        "Welcome back,",
        " ",
        /* @__PURE__ */ jsx("span", { className: "gradient-text", children: user?.name?.split(" ")[0] ?? "friend" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Here's a quick look at your money today." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(StatCard, { label: "Balance", value: Math.max(0, balance + 8200), delta: 4.2, icon: Wallet, accent: "primary" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Income", value: income || 6400, delta: 2.1, icon: TrendingUp, accent: "success" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Expenses", value: expense || 3120, delta: -6.4, icon: TrendingDown, accent: "warning" }),
      /* @__PURE__ */ jsx(StatCard, { label: "Savings", value: savings || 940, delta: 12, icon: PiggyBank, accent: "info" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(MonthlyLineChart, {}) }),
      /* @__PURE__ */ jsx(SpendingPieChart, {})
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [
      /* @__PURE__ */ jsx(HealthScore, {}),
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 glass rounded-2xl p-5 lg:p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold", children: "Budget remaining" }),
          /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold tabular-nums", children: [
            "$",
            budgetRemaining.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mb-4", children: [
          "Across ",
          budgets.length,
          " categories this month."
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: budgets.slice(0, 4).map((b) => {
          const p = Math.min(1, b.spent / b.limit);
          const over = b.spent > b.limit;
          return /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs mb-1", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: b.category }),
              /* @__PURE__ */ jsxs("span", { className: over ? "text-rose-500" : "text-muted-foreground", children: [
                "$",
                b.spent,
                " / $",
                b.limit
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-1.5 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { initial: {
              width: 0
            }, animate: {
              width: `${Math.min(100, p * 100)}%`
            }, transition: {
              duration: 0.9,
              ease: "easeOut"
            }, className: `h-full rounded-full ${over ? "bg-rose-500" : "bg-gradient-to-r from-primary to-fuchsia-500"}` }) })
          ] }, b.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsx(RecentTransactions, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(AIInsights, {}),
        /* @__PURE__ */ jsx(GoalProgress, {})
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
