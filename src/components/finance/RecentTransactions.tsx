import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useFinance } from "@/lib/store";
import { currency } from "@/lib/format";
import { ArrowUpRight, ArrowDownLeft, PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";

export function RecentTransactions() {
  const { transactions } = useFinance();
  const recent = transactions.slice(0, 7);

  return (
    <div className="glass rounded-2xl p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Recent transactions</h3>
        <Link
          to="/transactions"
          className="text-xs text-primary font-medium hover:underline"
        >
          View all →
        </Link>
      </div>
      <ul className="divide-y divide-border/60">
        {recent.map((t, i) => {
          const Icon =
            t.type === "income"
              ? ArrowDownLeft
              : t.type === "savings"
                ? PiggyBank
                : ArrowUpRight;
          const color =
            t.type === "income"
              ? "text-emerald-500 bg-emerald-500/10"
              : t.type === "savings"
                ? "text-sky-500 bg-sky-500/10"
                : "text-rose-500 bg-rose-500/10";
          return (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="flex items-center gap-3 py-3"
            >
              <div
                className={cn(
                  "size-9 rounded-xl grid place-items-center",
                  color,
                )}
              >
                <Icon className="size-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{t.title}</div>
                <div className="text-xs text-muted-foreground">
                  {t.category} ·{" "}
                  {new Date(t.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div
                className={cn(
                  "font-semibold text-sm tabular-nums",
                  t.type === "income"
                    ? "text-emerald-500"
                    : t.type === "expense"
                      ? "text-foreground"
                      : "text-sky-500",
                )}
              >
                {t.type === "income" ? "+" : t.type === "expense" ? "−" : ""}
                {currency(t.amount)}
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
