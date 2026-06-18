import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Target,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/transactions", icon: ArrowLeftRight, label: "Tx" },
  { to: "/budgets", icon: PiggyBank, label: "Budgets" },
  { to: "/analytics", icon: BarChart3, label: "Stats" },
  { to: "/goals", icon: Target, label: "Goals" },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 glass rounded-2xl px-2 py-2 flex items-center justify-around">
      {items.map(({ to, icon: Icon, label }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors",
              active ? "text-primary bg-primary/10" : "text-muted-foreground",
            )}
          >
            <Icon className="size-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
