import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell } from "./AppShell-BLLKvUYX.js";
import { u as useFinance, a as useMonthTotals, A as ALL_CATEGORIES } from "./store-DEvh2MYP.js";
import { c as currency } from "./format-BD4xb6xu.js";
import { motion } from "framer-motion";
import { Plus, Lock, AlertTriangle, Unlock } from "lucide-react";
import { B as Button, I as Input } from "./button-DOg9Mvyv.js";
import { useState } from "react";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BmhSkJfG.js";
import { L as Label } from "./label-BjHVLbwY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjNAOfwj.js";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
import "@radix-ui/react-select";
function Page() {
  const {
    budgets,
    addBudget,
    updateBudget,
    deleteBudget
  } = useFinance();
  const {
    income
  } = useMonthTotals();
  const baseIncome = income || 6400;
  const rule = [{
    label: "Needs",
    pct: 0.5,
    color: "from-primary to-fuchsia-500",
    desc: "Rent, groceries, transport"
  }, {
    label: "Wants",
    pct: 0.3,
    color: "from-sky-500 to-cyan-400",
    desc: "Dining, entertainment, shopping"
  }, {
    label: "Savings",
    pct: 0.2,
    color: "from-emerald-500 to-teal-400",
    desc: "Investments & emergency fund"
  }];
  const [open, setOpen] = useState(false);
  const [cat, setCat] = useState("Groceries");
  const [limit, setLimit] = useState("");
  const submit = () => {
    const n = parseFloat(limit);
    if (isNaN(n) || n <= 0) return toast.error("Enter a valid limit");
    addBudget({
      category: cat,
      limit: n,
      spent: 0,
      color: "var(--chart-1)"
    });
    toast.success("Budget created");
    setLimit("");
    setOpen(false);
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Budgets" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          "50/30/20 split based on monthly income of ",
          currency(baseIncome),
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
          " New budget"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New budget" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Category" }),
              /* @__PURE__ */ jsxs(Select, { value: cat, onValueChange: setCat, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsx(SelectContent, { children: ALL_CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Monthly limit" }),
              /* @__PURE__ */ jsx(Input, { type: "number", value: limit, onChange: (e) => setLimit(e.target.value), placeholder: "500" })
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: submit, className: "mt-2", children: "Create" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: rule.map((r) => /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: r.label }),
          /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold mt-1", children: currency(baseIncome * r.pct) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `size-12 rounded-2xl bg-gradient-to-br ${r.color} grid place-items-center text-white font-bold`, children: [
          Math.round(r.pct * 100),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: r.desc })
    ] }, r.label)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: budgets.map((b) => {
      const p = Math.min(1, b.spent / b.limit);
      const over = b.spent > b.limit;
      return /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, className: `glass rounded-2xl p-5 transition-colors ${b.locked ? "ring-1 ring-primary/40" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-semibold flex items-center gap-2", children: [
            b.category,
            b.locked && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: [
              /* @__PURE__ */ jsx(Lock, { className: "size-2.5" }),
              " Locked"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-sm tabular-nums", children: [
            /* @__PURE__ */ jsx("span", { className: over ? "text-rose-500 font-semibold" : "", children: currency(b.spent) }),
            /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
              " ",
              "/ ",
              currency(b.limit)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsx(motion.div, { initial: {
          width: 0
        }, animate: {
          width: `${Math.min(100, p * 100)}%`
        }, transition: {
          duration: 1,
          ease: "easeOut"
        }, className: `h-full rounded-full ${over ? "bg-rose-500" : "bg-gradient-to-r from-primary to-fuchsia-500"}` }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-3", children: [
          over ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-rose-500", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { className: "size-3.5" }),
            " Over by",
            " ",
            currency(b.spent - b.limit)
          ] }) : /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
            currency(b.limit - b.spent),
            " remaining"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => {
              updateBudget(b.id, {
                locked: !b.locked
              });
              toast.success(b.locked ? `${b.category} unlocked` : `${b.category} locked — expenses blocked`);
            }, className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary", title: b.locked ? "Unlock budget" : "Lock budget", children: [
              b.locked ? /* @__PURE__ */ jsx(Unlock, { className: "size-3.5" }) : /* @__PURE__ */ jsx(Lock, { className: "size-3.5" }),
              b.locked ? "Unlock" : "Lock"
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              deleteBudget(b.id);
              toast.success("Budget removed");
            }, className: "text-xs text-muted-foreground hover:text-rose-500", children: "Remove" })
          ] })
        ] })
      ] }, b.id);
    }) })
  ] });
}
export {
  Page as component
};
