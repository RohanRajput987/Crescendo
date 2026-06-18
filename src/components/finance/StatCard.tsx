import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/format";

function Counter({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => currency(v));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

export interface StatCardProps {
  label: string;
  value: number;
  delta?: number; // percentage change
  icon: LucideIcon;
  accent?: "primary" | "success" | "warning" | "info";
}

const accentMap = {
  primary: "from-primary/30 to-fuchsia-500/10 text-primary",
  success: "from-emerald-500/30 to-teal-500/10 text-emerald-500",
  warning: "from-amber-500/30 to-orange-500/10 text-amber-500",
  info: "from-sky-500/30 to-indigo-500/10 text-sky-500",
} as const;

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent = "primary",
}: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="glass rounded-2xl p-5 relative overflow-hidden"
    >
      <div
        className={cn(
          "absolute -top-12 -right-12 size-32 rounded-full blur-2xl opacity-60 bg-gradient-to-br",
          accentMap[accent],
        )}
      />
      <div className="flex items-center justify-between mb-4 relative">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <div
          className={cn(
            "size-9 rounded-xl grid place-items-center bg-gradient-to-br",
            accentMap[accent],
          )}
        >
          <Icon className="size-4" />
        </div>
      </div>
      <div className="text-2xl lg:text-3xl font-bold tracking-tight relative">
        <Counter value={value} />
      </div>
      {delta !== undefined && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-xs font-medium",
            positive ? "text-emerald-500" : "text-rose-500",
          )}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {Math.abs(delta).toFixed(1)}% vs last month
        </div>
      )}
    </motion.div>
  );
}
