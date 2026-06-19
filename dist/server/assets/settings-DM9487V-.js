import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { A as AppShell, a as Avatar, b as AvatarFallback } from "./AppShell-BLLKvUYX.js";
import { u as useFinance, b as useTheme } from "./store-DEvh2MYP.js";
import { c as cn, I as Input, B as Button } from "./button-DOg9Mvyv.js";
import { L as Label } from "./label-BjHVLbwY.js";
import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { toast } from "sonner";
import "framer-motion";
import "lucide-react";
import "@radix-ui/react-avatar";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
function Page() {
  const {
    user,
    signOut
  } = useFinance();
  const {
    theme,
    toggle
  } = useTheme();
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxs(AppShell, { children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl lg:text-3xl font-bold tracking-tight", children: "Settings" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Account, preferences, and security." })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5 lg:col-span-2", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Profile" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-5", children: [
          /* @__PURE__ */ jsx(Avatar, { className: "size-16 border border-border", children: /* @__PURE__ */ jsx(AvatarFallback, { className: "bg-gradient-to-br from-primary to-fuchsia-500 text-white text-lg", children: user?.name?.split(" ").map((p) => p[0]).join("").slice(0, 2) ?? "AM" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-semibold", children: user?.name }),
            /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: user?.email })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Name" }),
            /* @__PURE__ */ jsx(Input, { defaultValue: user?.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { defaultValue: user?.email })
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { className: "mt-4", onClick: () => toast.success("Profile saved"), children: "Save changes" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-4", children: "Preferences" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Dark mode" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Easy on the eyes at night." })
            ] }),
            /* @__PURE__ */ jsx(Switch, { checked: theme === "dark", onCheckedChange: toggle })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Email digests" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Weekly money summary." })
            ] }),
            /* @__PURE__ */ jsx(Switch, { defaultChecked: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between py-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "AI insights" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "Smart suggestions on your dashboard." })
            ] }),
            /* @__PURE__ */ jsx(Switch, { defaultChecked: true })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "glass rounded-2xl p-5", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-semibold mb-2", children: "Sign out" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "You'll be redirected to the sign-in screen." }),
          /* @__PURE__ */ jsx(Button, { variant: "outline", className: "w-full", onClick: () => {
            localStorage.removeItem("crescendo_authed");
            signOut();
            navigate({
              to: "/auth"
            });
          }, children: "Sign out" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Page as component
};
