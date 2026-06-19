import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BmhSkJfG.js";
import { c as cn, I as Input, B as Button } from "./button-DOg9Mvyv.js";
import { L as Label } from "./label-BjHVLbwY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DjNAOfwj.js";
import { toast } from "sonner";
import { u as useFinance, A as ALL_CATEGORIES } from "./store-DEvh2MYP.js";
const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
function AddTransactionDialog({ open, onOpenChange, trigger }) {
  const { addTransaction, budgets } = useFinance();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Groceries");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const submit = () => {
    const amt = parseFloat(amount);
    if (!title || isNaN(amt) || amt <= 0) {
      toast.error("Please enter a title and a valid amount");
      return;
    }
    if (type === "expense") {
      const locked = budgets.find((b) => b.category === category && b.locked);
      if (locked) {
        toast.error(`${category} budget is locked — unlock it to add expenses`);
        return;
      }
    }
    addTransaction({
      title,
      amount: amt,
      category,
      type,
      note: note || void 0,
      created_at: new Date(date).toISOString()
    });
    toast.success("Transaction added");
    setTitle("");
    setAmount("");
    setNote("");
    onOpenChange?.(false);
  };
  return /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange, children: [
    trigger && /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: trigger }),
    /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New transaction" }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 mt-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Title" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              value: title,
              onChange: (e) => setTitle(e.target.value),
              placeholder: "Coffee with Sam"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Amount" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "number",
                step: "0.01",
                value: amount,
                onChange: (e) => setAmount(e.target.value),
                placeholder: "0.00"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Date" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "date",
                value: date,
                onChange: (e) => setDate(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Type" }),
            /* @__PURE__ */ jsxs(Select, { value: type, onValueChange: (v) => setType(v), children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "expense", children: "Expense" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "income", children: "Income" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "savings", children: "Savings" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Category" }),
            /* @__PURE__ */ jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsx(SelectContent, { children: ALL_CATEGORIES.map((c) => /* @__PURE__ */ jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Note (optional)" }),
          /* @__PURE__ */ jsx(
            Textarea,
            {
              value: note,
              onChange: (e) => setNote(e.target.value),
              rows: 2
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: submit, className: "mt-2", children: "Save transaction" })
      ] })
    ] })
  ] });
}
export {
  AddTransactionDialog as A
};
