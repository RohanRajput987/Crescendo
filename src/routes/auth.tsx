import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Lock,
  Mail,
  ShieldCheck,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({ meta: [{ title: "Sign in · Crescendo" }] }),
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("alex@crescendo.app");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter email and password");
    setLoading(true);
    setTimeout(() => {
      try {
        const users = JSON.parse(
          localStorage.getItem("crescendo_users") || "[]",
        );
        if (mode === "signup") {
          if (users.find((u: any) => u.email === email)) {
            setLoading(false);
            return toast.error("Account already exists with this email");
          }
          users.push({ email, password, name: email.split("@")[0] });
          localStorage.setItem("crescendo_users", JSON.stringify(users));
          localStorage.setItem(
            "crescendo_authed",
            JSON.stringify({ email, name: email.split("@")[0] }),
          );
          toast.success("Account created");
          navigate({ to: "/" });
        } else {
          const user = users.find(
            (u: any) => u.email === email && u.password === password,
          );
          // Allow the hardcoded demo to pass always as a fallback
          if (
            user ||
            (email === "alex@crescendo.app" && password === "demo1234")
          ) {
            localStorage.setItem(
              "crescendo_authed",
              JSON.stringify(
                user || { email: "alex@crescendo.app", name: "Alex Morgan" },
              ),
            );
            toast.success("Welcome back");
            navigate({ to: "/" });
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

  return (
    <div className="min-h-screen app-bg grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 relative">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center shadow-lg shadow-primary/30">
            <Sparkles className="size-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight">Crescendo</div>
            <div className="text-xs text-muted-foreground -mt-0.5">
              Smart personal finance
            </div>
          </div>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold tracking-tight leading-tight mb-3">
            Money clarity <span className="gradient-text">in seconds.</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Track spending, set goals, and let AI surface what's worth your
            attention — without the spreadsheet headache.
          </p>
          <div className="grid gap-3">
            {[
              {
                icon: TrendingUp,
                t: "Smart insights",
                d: "AI summarizes trends you'd miss.",
              },
              {
                icon: PiggyBank,
                t: "Goal-based saving",
                d: "Visual progress, weekly nudges.",
              },
              {
                icon: ShieldCheck,
                t: "Bank-level security",
                d: "Encrypted, read-only access.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="glass rounded-xl p-4 flex gap-3"
              >
                <div className="size-9 rounded-lg bg-primary/15 text-primary grid place-items-center shrink-0">
                  <f.icon className="size-4" />
                </div>
                <div>
                  <div className="font-medium text-sm">{f.t}</div>
                  <div className="text-xs text-muted-foreground">{f.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          © Crescendo 2026 · Built for clarity
        </div>
      </div>

      <div className="flex items-center justify-center p-6">
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="glass rounded-2xl p-7 w-full max-w-sm"
        >
          <div className="lg:hidden flex items-center gap-2 mb-6">
            <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center">
              <Sparkles className="size-4 text-white" />
            </div>
            <div className="font-bold tracking-tight">Crescendo</div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-muted-foreground mt-1 mb-6">
            {mode === "signin"
              ? "Sign in to your dashboard."
              : "Start tracking your money in under a minute."}
          </p>

          <div className="space-y-3">
            <div>
              <Label className="text-xs">Email</Label>
              <div className="relative">
                <Mail className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  type="email"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs">Password</Label>
              <div className="relative">
                <Lock className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  type="password"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-5" disabled={loading}>
            {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </Button>

          <button
            type="button"
            className="w-full text-xs text-muted-foreground hover:text-foreground mt-4 text-center"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          >
            {mode === "signin"
              ? "New here? Create an account"
              : "Have an account? Sign in"}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
