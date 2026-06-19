import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useMemo } from "react";
import { A as AppShell } from "./AppShell-BLLKvUYX.js";
import { A as AddTransactionDialog } from "./AddTransactionDialog-DbbAF74Y.js";
import { u as useFinance, A as ALL_CATEGORIES } from "./store-DEvh2MYP.js";
import { c as currency } from "./format-BD4xb6xu.js";
import { c as cn, B as Button, I as Input } from "./button-DOg9Mvyv.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjNAOfwj.js";
import { cva } from "class-variance-authority";
import { Download, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "framer-motion";
import "@radix-ui/react-avatar";
import "./dialog-BmhSkJfG.js";
import "@radix-ui/react-dialog";
import "./label-BjHVLbwY.js";
import "@radix-ui/react-label";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
const Table = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ jsx(
  "table",
  {
    ref,
    className: cn("w-full caption-bottom text-sm", className),
    ...props
  }
) }));
Table.displayName = "Table";
const TableHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b", className), ...props }));
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tbody",
  {
    ref,
    className: cn("[&_tr:last-child]:border-0", className),
    ...props
  }
));
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tfoot",
  {
    ref,
    className: cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    ),
    ...props
  }
));
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "tr",
  {
    ref,
    className: cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    ),
    ...props
  }
));
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "th",
  {
    ref,
    className: cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "td",
  {
    ref,
    className: cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    ),
    ...props
  }
));
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "caption",
  {
    ref,
    className: cn("mt-4 text-sm text-muted-foreground", className),
    ...props
  }
));
TableCaption.displayName = "TableCaption";
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function Page() {
  const {
    transactions,
    deleteTransaction
  } = useFinance();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(0);
  const pageSize = 12;
  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (q && !t.title.toLowerCase().includes(q.toLowerCase())) return false;
      if (cat !== "all" && t.category !== cat) return false;
      if (type !== "all" && t.type !== type) return false;
      return true;
    });
  }, [transactions, q, cat, type]);
  const pageData = filtered.slice(page * pageSize, page * pageSize + pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const exportCsv = () => {
    const rows = [["Date", "Title", "Category", "Type", "Amount", "Note"], ...filtered.map((t) => [t.created_at.slice(0, 10), t.title, t.category, t.type, t.amount, t.note ?? ""])];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], {
      type: "text/csv"
    }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported CSV");
  };
  return /* @__PURE__ */ jsxs(AppShell, { onAdd: () => setOpen(true), children: [
    /* @__PURE__ */ jsx(AddTransactionDialog, { open, onOpenChange: setOpen }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Transactions" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
          filtered.length,
          " of ",
          transactions.length,
          " matching"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: exportCsv, className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Download, { className: "size-4" }),
          " Export"
        ] }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", onClick: () => setOpen(true), className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
          " New"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-4 lg:p-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 flex-wrap mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
          /* @__PURE__ */ jsx(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
          /* @__PURE__ */ jsx(Input, { value: q, onChange: (e) => {
            setQ(e.target.value);
            setPage(0);
          }, placeholder: "Search by title", className: "pl-9" })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: cat, onValueChange: (v) => {
          setCat(v);
          setPage(0);
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[160px]", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Category" }) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All categories" }),
            ALL_CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c))
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Select, { value: type, onValueChange: (v) => {
          setType(v);
          setPage(0);
        }, children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[140px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "all", children: "All types" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "expense", children: "Expense" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "income", children: "Income" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "savings", children: "Savings" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs(Table, { children: [
        /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
          /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Category" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Type" }),
          /* @__PURE__ */ jsx(TableHead, { children: "Date" }),
          /* @__PURE__ */ jsx(TableHead, { className: "text-right", children: "Amount" }),
          /* @__PURE__ */ jsx(TableHead, { className: "w-10" })
        ] }) }),
        /* @__PURE__ */ jsxs(TableBody, { children: [
          pageData.length === 0 && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(TableCell, { colSpan: 6, className: "text-center py-12 text-muted-foreground", children: "No transactions match your filters." }) }),
          pageData.map((t) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: t.title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: t.category }) }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx("span", { className: t.type === "income" ? "text-emerald-500" : t.type === "savings" ? "text-sky-500" : "text-rose-500", children: t.type }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "text-muted-foreground text-sm", children: new Date(t.created_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            }) }),
            /* @__PURE__ */ jsxs(TableCell, { className: "text-right font-semibold tabular-nums", children: [
              t.type === "income" ? "+" : t.type === "expense" ? "−" : "",
              currency(t.amount)
            ] }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
              deleteTransaction(t.id);
              toast.success("Deleted");
            }, children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-muted-foreground" }) }) })
          ] }, t.id))
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-4", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-muted-foreground", children: [
          "Page ",
          page + 1,
          " of ",
          totalPages
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", disabled: page === 0, onClick: () => setPage((p) => p - 1), children: "Previous" }),
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", disabled: page >= totalPages - 1, onClick: () => setPage((p) => p + 1), children: "Next" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
