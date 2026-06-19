import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { I as Input, B as Button } from "./button-DOg9Mvyv.js";
import { L as Label } from "./label-BjHVLbwY.js";
import { Sparkles, TrendingUp, PiggyBank, ShieldCheck, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-label";
function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("alex@crescendo.app");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email and password");
    setLoading(true);
    setTimeout(() => {
      try {
        const users = JSON.parse(localStorage.getItem("crescendo_users") || "[]");
        if (mode === "signup") {
          if (users.find((u) => u.email === email)) {
            setLoading(false);
            return toast.error("Account already exists with this email");
          }
          users.push({
            email,
            password,
            name: email.split("@")[0]
          });
          localStorage.setItem("crescendo_users", JSON.stringify(users));
          localStorage.setItem("crescendo_authed", JSON.stringify({
            email,
            name: email.split("@")[0]
          }));
          toast.success("Account created");
          navigate({
            to: "/"
          });
        } else {
          const user = users.find((u) => u.email === email && u.password === password);
          if (user || email === "alex@crescendo.app" && password === "demo1234") {
            localStorage.setItem("crescendo_authed", JSON.stringify(user || {
              email: "alex@crescendo.app",
              name: "Alex Morgan"
            }));
            toast.success("Welcome back");
            navigate({
              to: "/"
            });
          } else {
            setLoading(false);
            toast.error("Invalid email or password");
          }
        }
      } catch (err) {
        setLoading(false);
        toast.error("Authentication failed");
      }
    }, 700);
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen app-bg grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex flex-col justify-between p-12 relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center shadow-lg shadow-primary/30", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-5 text-white" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-lg tracking-tight", children: "Crescendo" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground -mt-0.5", children: "Smart personal finance" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-md", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-4xl font-bold tracking-tight leading-tight mb-3", children: [
          "Money clarity ",
          /* @__PURE__ */ jsx("span", { className: "gradient-text", children: "in seconds." })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-8", children: "Track spending, set goals, and let AI surface what's worth your attention — without the spreadsheet headache." }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: [{
          icon: TrendingUp,
          t: "Smart insights",
          d: "AI summarizes trends you'd miss."
        }, {
          icon: PiggyBank,
          t: "Goal-based saving",
          d: "Visual progress, weekly nudges."
        }, {
          icon: ShieldCheck,
          t: "Bank-level security",
          d: "Encrypted, read-only access."
        }].map((f, i) => /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          x: -10
        }, animate: {
          opacity: 1,
          x: 0
        }, transition: {
          delay: 0.1 * i
        }, className: "glass rounded-xl p-4 flex gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0", children: /* @__PURE__ */ jsx(f.icon, { className: "size-4" }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "font-medium text-sm", children: f.t }),
            /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: f.d })
          ] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "© Crescendo 2026 · Built for clarity" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs(motion.form, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, onSubmit: submit, className: "glass rounded-2xl p-7 w-full max-w-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:hidden flex items-center gap-2 mb-6", children: [
        /* @__PURE__ */ jsx("div", { className: "size-9 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center", children: /* @__PURE__ */ jsx(Sparkles, { className: "size-4 text-white" }) }),
        /* @__PURE__ */ jsx("div", { className: "font-bold tracking-tight", children: "Crescendo" })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight", children: mode === "signin" ? "Welcome back" : "Create your account" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1 mb-6", children: mode === "signin" ? "Sign in to your dashboard." : "Start tracking your money in under a minute." }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Email" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Mail, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), className: "pl-9", type: "email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs", children: "Password" }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx(Lock, { className: "size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }),
            /* @__PURE__ */ jsx(Input, { value: password, onChange: (e) => setPassword(e.target.value), className: "pl-9", type: "password" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", className: "w-full mt-5", disabled: loading, children: loading ? "..." : mode === "signin" ? "Sign in" : "Create account" }),
      /* @__PURE__ */ jsx("button", { type: "button", className: "w-full text-xs text-muted-foreground hover:text-foreground mt-4 text-center", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), children: mode === "signin" ? "New here? Create an account" : "Have an account? Sign in" })
    ] }) })
  ] });
}
export {
  AuthPage as component
};
