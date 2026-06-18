import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/finance/StatCard";
import { SpendingPieChart } from "@/components/finance/SpendingPieChart";
import { MonthlyLineChart } from "@/components/finance/MonthlyLineChart";
import { RecentTransactions } from "@/components/finance/RecentTransactions";
import { HealthScore } from "@/components/finance/HealthScore";
import { AIInsights } from "@/components/finance/AIInsights";
import { GoalProgress } from "@/components/finance/GoalProgress";
import { AddTransactionDialog } from "@/components/finance/AddTransactionDialog";
import { useFinance, useMonthTotals } from "@/lib/store";
import { motion } from "framer-motion";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard · Crescendo" }] }),
});

function Dashboard() {
  const [open, setOpen] = useState(false);
  const { user, budgets } = useFinance();
  const { income, expense, savings, balance } = useMonthTotals();
  const budgetRemaining =
    budgets.reduce((a, b) => a + b.limit, 0) -
    budgets.reduce((a, b) => a + b.spent, 0);

  return (
    <AppShell onAdd={() => setOpen(true)}>
      <AddTransactionDialog open={open} onOpenChange={setOpen} />

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
          Welcome back,{" "}
          <span className="gradient-text">
            {user?.name?.split(" ")[0] ?? "friend"}
          </span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's a quick look at your money today.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Balance"
          value={Math.max(0, balance + 8200)}
          delta={4.2}
          icon={Wallet}
          accent="primary"
        />
        <StatCard
          label="Income"
          value={income || 6400}
          delta={2.1}
          icon={TrendingUp}
          accent="success"
        />
        <StatCard
          label="Expenses"
          value={expense || 3120}
          delta={-6.4}
          icon={TrendingDown}
          accent="warning"
        />
        <StatCard
          label="Savings"
          value={savings || 940}
          delta={12.0}
          icon={PiggyBank}
          accent="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="lg:col-span-2">
          <MonthlyLineChart />
        </div>
        <SpendingPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <HealthScore />
        <div className="lg:col-span-2 glass rounded-2xl p-5 lg:p-6">
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="font-semibold">Budget remaining</h3>
            <span className="text-2xl font-bold tabular-nums">
              ${budgetRemaining.toLocaleString()}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Across {budgets.length} categories this month.
          </p>
          <div className="space-y-3">
            {budgets.slice(0, 4).map((b) => {
              const p = Math.min(1, b.spent / b.limit);
              const over = b.spent > b.limit;
              return (
                <div key={b.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{b.category}</span>
                    <span
                      className={
                        over ? "text-rose-500" : "text-muted-foreground"
                      }
                    >
                      ${b.spent} / ${b.limit}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, p * 100)}%` }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className={`h-full rounded-full ${over ? "bg-rose-500" : "bg-gradient-to-r from-primary to-fuchsia-500"}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>
        <div className="space-y-4">
          <AIInsights />
          <GoalProgress />
        </div>
      </div>
    </AppShell>
  );
}
