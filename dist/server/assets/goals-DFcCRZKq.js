import { jsxs, jsx } from "react/jsx-runtime";
import { A as AppShell } from "./AppShell-BLLKvUYX.js";
import { u as useFinance } from "./store-DEvh2MYP.js";
import { c as currency } from "./format-BD4xb6xu.js";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { B as Button, I as Input } from "./button-DOg9Mvyv.js";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BmhSkJfG.js";
import { L as Label } from "./label-BjHVLbwY.js";
import { Plus, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import "@tanstack/react-router";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-label";
function Page() {
  const {
    goals,
    addGoal,
    updateGoal,
    deleteGoal
  } = useFinance();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [deadline, setDeadline] = useState(new Date(Date.now() + 90 * 864e5).toISOString().slice(0, 10));
  const submit = () => {
    const t = parseFloat(target);
    if (!title || isNaN(t) || t <= 0) return toast.error("Enter a title and target");
    addGoal({
      title,
      target_amount: t,
      saved_amount: 0,
      deadline: new Date(deadline).toISOString(),
      emoji
    });
    toast.success("Goal created");
    setTitle("");
    setTarget("");
    setOpen(false);
  };
  const contribute = (id, current, target2) => {
    const next = Math.min(target2, current + Math.round(target2 * 0.1));
    updateGoal(id, {
      saved_amount: next
    });
    if (next >= target2) toast.success("Goal completed! 🎉");
    else toast.success("Contribution added");
  };
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between mb-6 flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Goals" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Save for what matters with deadlines and progress tracking." })
      ] }),
      /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { size: "sm", className: "gap-1.5", children: [
          /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
          " New goal"
        ] }) }),
        /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm", children: [
          /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New goal" }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid gap-3 mt-2", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(Input, { value: emoji, onChange: (e) => setEmoji(e.target.value.slice(0, 2)), className: "w-16 text-center text-xl" }),
              /* @__PURE__ */ jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Trip to Tokyo" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Target amount" }),
              /* @__PURE__ */ jsx(Input, { type: "number", value: target, onChange: (e) => setTarget(e.target.value), placeholder: "5000" })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Deadline" }),
              /* @__PURE__ */ jsx(Input, { type: "date", value: deadline, onChange: (e) => setDeadline(e.target.value) })
            ] }),
            /* @__PURE__ */ jsx(Button, { onClick: submit, className: "mt-2", children: "Create goal" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: /* @__PURE__ */ jsx(AnimatePresence, { children: goals.map((g) => {
      const p = Math.min(1, g.saved_amount / g.target_amount);
      const done = p >= 1;
      const daysLeft = Math.max(0, Math.round((+new Date(g.deadline) - Date.now()) / 864e5));
      return /* @__PURE__ */ jsxs(motion.div, { layout: true, initial: {
        opacity: 0,
        scale: 0.95
      }, animate: {
        opacity: 1,
        scale: 1
      }, exit: {
        opacity: 0,
        scale: 0.95
      }, whileHover: {
        y: -4
      }, className: "glass rounded-2xl p-5 relative overflow-hidden", children: [
        done && /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0
        }, animate: {
          opacity: 1
        }, className: "absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "size-3" }),
          " COMPLETED"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-4xl mb-3", children: g.emoji }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", children: g.title }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground mb-3", children: [
          daysLeft,
          " days left"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-1.5 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-semibold", children: currency(g.saved_amount) }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            "of ",
            currency(g.target_amount)
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden mb-4", children: /* @__PURE__ */ jsx(motion.div, { initial: {
          width: 0
        }, animate: {
          width: `${p * 100}%`
        }, transition: {
          duration: 1,
          ease: "easeOut"
        }, className: `h-full rounded-full ${done ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-gradient-to-r from-primary to-fuchsia-500"}` }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsx(Button, { size: "sm", variant: "outline", className: "flex-1", disabled: done, onClick: () => contribute(g.id, g.saved_amount, g.target_amount), children: "Contribute" }),
          /* @__PURE__ */ jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
            deleteGoal(g.id);
            toast.success("Goal removed");
          }, children: /* @__PURE__ */ jsx(Trash2, { className: "size-4 text-muted-foreground" }) })
        ] })
      ] }, g.id);
    }) }) })
  ] });
}
export {
  Page as component
};
