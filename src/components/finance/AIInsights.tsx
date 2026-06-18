import { motion } from "framer-motion";
import { Sparkles, TrendingDown, TrendingUp, Lightbulb } from "lucide-react";

const insights = [
  {
    icon: TrendingDown,
    color: "text-emerald-500 bg-emerald-500/10",
    title: "Dining spend down 18%",
    body: "You cooked at home 4 more nights this month. Keep it up to save ~$240/mo.",
  },
  {
    icon: TrendingUp,
    color: "text-amber-500 bg-amber-500/10",
    title: "Subscriptions creeping up",
    body: "3 new recurring charges since September. Audit them in Budgets.",
  },
  {
    icon: Lightbulb,
    color: "text-primary bg-primary/10",
    title: "Move $400 to savings",
    body: "You're on pace to overshoot your buffer — auto-route the excess to Emergency Fund.",
  },
];

export function AIInsights() {
  return (
    <div className="glass rounded-2xl p-5 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="size-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-500 grid place-items-center">
            <Sparkles className="size-3.5 text-white" />
          </span>
          AI Insights
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          Live
        </span>
      </div>
      <div className="space-y-2.5">
        {insights.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex gap-3 p-3 rounded-xl bg-card/60 border border-border/60 hover:border-primary/40 transition-colors"
            >
              <div
                className={`size-8 rounded-lg grid place-items-center shrink-0 ${it.color}`}
              >
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium">{it.title}</div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {it.body}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
