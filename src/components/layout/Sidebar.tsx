import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  BarChart3,
  Target,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-64 flex-col px-4 py-6 border-r border-border/60 bg-sidebar/60 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-2 px-2 mb-8">
        <div className="size-9 rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center shadow-lg shadow-primary/30">
          <Sparkles className="size-4 text-white" />
        </div>
        <div>
          <div className="font-semibold tracking-tight">Crescendo</div>
          <div className="text-[10px] text-muted-foreground -mt-0.5">
            Smart finance
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/60",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-sidebar-accent"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <Icon className="size-4 relative z-10" />
              <span className="relative z-10 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl p-4 bg-gradient-to-br from-primary/20 to-fuchsia-500/10 border border-primary/20">
        <div className="text-xs font-medium mb-1 flex items-center gap-1.5">
          <Sparkles className="size-3.5 text-primary" /> AI Insights
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          You're trending 12% under budget this month. Nice work, Alex.
        </p>
      </div>
    </aside>
  );
}
