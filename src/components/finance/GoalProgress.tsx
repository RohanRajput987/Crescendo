import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useFinance } from "@/lib/store";
import { currency } from "@/lib/format";

export function GoalProgress() {
  const { goals } = useFinance();
  return (
    <div className="glass rounded-2xl p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Goals</h3>
        <Link
          to="/goals"
          className="text-xs text-primary font-medium hover:underline"
        >
          Manage →
        </Link>
      </div>
      <div className="space-y-4">
        {goals.slice(0, 3).map((g) => {
          const p = Math.min(1, g.saved_amount / g.target_amount);
          return (
            <div key={g.id}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{g.emoji}</span>
                  <span className="text-sm font-medium">{g.title}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {currency(g.saved_amount)} / {currency(g.target_amount)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
