import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, LayoutDashboard, ArrowLeftRight, PiggyBank, BarChart3, Target, Settings, Search, Plus, Sun, Moon, Bell } from "lucide-react";
import { c as cn, I as Input, B as Button } from "./button-DOg9Mvyv.js";
import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { u as useFinance, b as useTheme } from "./store-DEvh2MYP.js";
const items$1 = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/settings", label: "Settings", icon: Settings }
];
function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsxs("aside", { className: "hidden lg:flex sticky top-0 h-screen w-64 flex-col px-4 py-6 border-r border-border/60 bg-sidebar/60 backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 px-2 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "size-9 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center shadow-lg shadow-primary/30", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-white" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "font-semibold tracking-tight", children: "Crescendo" }),
        /* @__PURE__ */ jsx("div", { className: "text-[10px] text-muted-foreground -mt-0.5", children: "Smart finance" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "flex flex-col gap-1", children: items$1.map((item) => {
      const active = pathname === item.to;
      const Icon = item.icon;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: item.to,
          className: cn(
            "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
            active ? "text-sidebar-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60"
          ),
          children: [
            active && /* @__PURE__ */ jsx(
              motion.span,
              {
                layoutId: "sidebar-active",
                className: "absolute inset-0 rounded-lg bg-sidebar-accent",
                transition: { type: "spring", stiffness: 400, damping: 32 }
              }
            ),
            /* @__PURE__ */ jsx(Icon, { className: "size-4 relative z-10" }),
            /* @__PURE__ */ jsx("span", { className: "relative z-10 font-medium", children: item.label })
          ]
        },
        item.to
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto rounded-2xl p-4 bg-gradient-to-br from-primary/20 to-fuchsia-500/10 border border-primary/20", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-xs font-medium mb-1 flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsx(Sparkles, { className: "size-3.5 text-primary" }),
        " AI Insights"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "You're trending 12% under budget this month. Nice work, Alex." })
    ] })
  ] });
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
function Topbar({ onAdd }) {
  const { user, currencyCode, setCurrencyCode } = useFinance();
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsxs("header", { className: "sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8 py-4 backdrop-blur-xl bg-background/60 border-b border-border/60", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
      /* @__PURE__ */ jsx(Search, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Search transactions, goals, categories…",
          className: "pl-9 bg-card/60"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      onAdd && /* @__PURE__ */ jsxs(Button, { onClick: onAdd, size: "sm", className: "hidden sm:flex gap-1.5", children: [
        /* @__PURE__ */ jsx(Plus, { className: "size-4" }),
        " Add"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "appearance-none bg-transparent text-sm font-medium pr-6 pl-2 py-1 outline-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors dark:bg-[#1a1a1a]",
            value: currencyCode,
            onChange: (e) => setCurrencyCode(e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "USD", children: "USD ($)" }),
              /* @__PURE__ */ jsx("option", { value: "EUR", children: "EUR (€)" }),
              /* @__PURE__ */ jsx("option", { value: "GBP", children: "GBP (£)" }),
              /* @__PURE__ */ jsx("option", { value: "INR", children: "INR (₹)" }),
              /* @__PURE__ */ jsx("option", { value: "AUD", children: "AUD ($)" }),
              /* @__PURE__ */ jsx("option", { value: "CAD", children: "CAD ($)" })
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-y-0 right-1 flex items-center px-1 text-muted-foreground", children: /* @__PURE__ */ jsx("svg", { className: "size-3 fill-current", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" }) }) })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          onClick: toggle,
          "aria-label": "Toggle theme",
          children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "size-4" }) : /* @__PURE__ */ jsx(Moon, { className: "size-4" })
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "ghost",
          size: "icon",
          "aria-label": "Notifications",
          className: "relative",
          children: [
            /* @__PURE__ */ jsx(Bell, { className: "size-4" }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-2 right-2 size-1.5 rounded-full bg-primary" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(Avatar, { className: "size-9 border border-border", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-fuchsia-500 text-white text-xs", children: user?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2) ?? "AM" }) })
    ] })
  ] });
}
const items = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Tx" },
  { to: "/budgets", icon: PiggyBank, label: "Budgets" },
  { to: "/analytics", icon: BarChart3, label: "Stats" },
  { to: "/goals", icon: Target, label: "Goals" }
];
function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return /* @__PURE__ */ jsx("nav", { className: "lg:hidden fixed bottom-3 left-3 right-3 z-40 glass rounded-2xl px-2 py-2 flex items-center justify-around", children: items.map(({ to, icon: Icon, label }) => {
    const active = pathname === to;
    return /* @__PURE__ */ jsxs(
      Link,
      {
        to,
        className: cn(
          "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
          active ? "text-primary bg-primary/10" : "text-muted-foreground"
        ),
        children: [
          /* @__PURE__ */ jsx(Icon, { className: "size-5" }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-medium", children: label })
        ]
      },
      to
    );
  }) });
}
function AppShell({
  children,
  onAdd
}) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen app-bg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(Sidebar, {}),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsx(Topbar, { onAdd }),
        /* @__PURE__ */ jsx("main", { className: "px-4 lg:px-8 py-6 pb-28 lg:pb-12", children })
      ] })
    ] }),
    /* @__PURE__ */ jsx(MobileNav, {})
  ] });
}
export {
  AppShell as A,
  Avatar as a,
  AvatarFallback as b
};
