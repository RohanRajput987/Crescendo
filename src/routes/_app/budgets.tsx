import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useFinance, useMonthTotals } from "@/lib/store";
import { currency } from "@/lib/format";
import { motion } from "framer-motion";
import { AlertTriangle, Plus, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ALL_CATEGORIES } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/budgets")({
  component: Page,
  head: () => ({ meta: [{ title: "Budgets · Crescendo" }] }),
});

function Page() {
  const { budgets, addBudget, updateBudget, deleteBudget } = useFinance();
  const { income } = useMonthTotals();
  const baseIncome = income || 6400;

  const rule = [
    {
      label: "Needs",
      pct: 0.5,
      color: "from-primary to-fuchsia-500",
      desc: "Rent, groceries, transport",
    },
    {
      label: "Wants",
      pct: 0.3,
      color: "from-sky-500 to-cyan-400",
      desc: "Dining, entertainment, shopping",
    },
    {
      label: "Savings",
      pct: 0.2,
      color: "from-emerald-500 to-teal-400",
      desc: "Investments & emergency fund",
    },
  ];

  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Groceries");
  const [limit, setLimit] = useState("");

  const submit = () => {
    const n = parseFloat(limit);
    if (isNaN(n) || n <= 0) return toast.error("Enter a valid limit");
    addBudget({ category: cat, limit: n, spent: 0, color: "var(--chart-1)" });
    toast.success("Budget created");
    setLimit("");
    setOpen(false);
  };

  return (
    <AppShell>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Budgets
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            50/30/20 split based on monthly income of {currency(baseIncome)}.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-4" /> New budget
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>New budget</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 mt-2">
              <div>
                <Label className="text-xs">Category</Label>
                <Select value={cat} onValueChange={setCat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ALL_CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Monthly limit</Label>
                <Input
                  type="number"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="500"
                />
              </div>
              <Button onClick={submit} className="mt-2">
                Create
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {rule.map((r) => (
          <div key={r.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {r.label}
                </div>
                <div className="text-2xl font-bold mt-1">
                  {currency(baseIncome * r.pct)}
                </div>
              </div>
              <div
                className={`size-12 rounded-2xl bg-gradient-to-br ${r.color} grid place-items-center text-white font-bold`}
              >
                {Math.round(r.pct * 100)}%
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((b) => {
          const p = Math.min(1, b.spent / b.limit);
          const over = b.spent > b.limit;
          return (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`glass rounded-2xl p-5 transition-colors ${b.locked ? "ring-1 ring-primary/40" : ""}`}
            >
              <div className="flex items-baseline justify-between mb-2">
                <div className="font-semibold flex items-center gap-2">
                  {b.category}
                  {b.locked && (
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      <Lock className="size-2.5" /> Locked
                    </span>
                  )}
                </div>
                <div className="text-sm tabular-nums">
                  <span className={over ? "text-rose-500 font-semibold" : ""}>
                    {currency(b.spent)}
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {currency(b.limit)}
                  </span>
                </div>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, p * 100)}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${over ? "bg-rose-500" : "bg-gradient-to-r from-primary to-fuchsia-500"}`}
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                {over ? (
                  <div className="flex items-center gap-1.5 text-xs text-rose-500">
                    <AlertTriangle className="size-3.5" /> Over by{" "}
                    {currency(b.spent - b.limit)}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    {currency(b.limit - b.spent)} remaining
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      updateBudget(b.id, { locked: !b.locked });
                      toast.success(
                        b.locked
                          ? `${b.category} unlocked`
                          : `${b.category} locked — expenses blocked`,
                      );
                    }}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    title={b.locked ? "Unlock budget" : "Lock budget"}
                  >
                    {b.locked ? (
                      <Unlock className="size-3.5" />
                    ) : (
                      <Lock className="size-3.5" />
                    )}
                    {b.locked ? "Unlock" : "Lock"}
                  </button>
                  <button
                    onClick={() => {
                      deleteBudget(b.id);
                      toast.success("Budget removed");
                    }}
                    className="text-xs text-muted-foreground hover:text-rose-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AppShell>
  );
}
