import { motion } from "framer-motion";
import { useMonthTotals } from "@/lib/store";

export function HealthScore() {
  const { income, expense, savings } = useMonthTotals();
  const savingsRate =
    income > 0
      ? Math.min(1, (savings + Math.max(0, income - expense)) / income)
      : 0;
  const score = Math.round(40 + savingsRate * 55 + (income > expense ? 5 : 0));

  const radius = 56;
  const c = 2 * Math.PI * radius;
  const offset = c - (score / 100) * c;

  return (
    <div className="glass rounded-2xl p-5 lg:p-6 flex items-center gap-5">
      <div className="relative size-32 shrink-0">
        <svg className="size-full -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="var(--muted)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke="url(#hs-grad)"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="hs-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.68 0.2 275)" />
              <stop offset="100%" stopColor="oklch(0.72 0.17 155)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <div className="text-3xl font-bold tracking-tight">{score}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              / 100
            </div>
          </div>
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Financial health
        </div>
        <h3 className="font-semibold text-lg mt-0.5">
          {score >= 80
            ? "Excellent"
            : score >= 60
              ? "On track"
              : score >= 40
                ? "Needs work"
                : "At risk"}
        </h3>
        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
          Based on your savings rate, spending consistency, and goal progress
          this month.
        </p>
      </div>
    </div>
  );
}
