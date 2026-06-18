import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { useFinance } from "@/lib/store";
import { currency } from "@/lib/format";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/goals")({
  component: Page,
  head: () => ({ meta: [{ title: "Goals · Crescendo" }] }),
});

function Page() {
  const { goals, addGoal, updateGoal, deleteGoal } = useFinance();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [deadline, setDeadline] = useState(
    new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
  );

  const submit = () => {
    const t = parseFloat(target);
    if (!title || isNaN(t) || t <= 0)
      return toast.error("Enter a title and target");
    addGoal({
      title,
      target_amount: t,
      saved_amount: 0,
      deadline: new Date(deadline).toISOString(),
      emoji,
    });
    toast.success("Goal created");
    setTitle("");
    setTarget("");
    setOpen(false);
  };

  const contribute = (id: string, current: number, target: number) => {
    const next = Math.min(target, current + Math.round(target * 0.1));
    updateGoal(id, { saved_amount: next });
    if (next >= target) toast.success("Goal completed! 🎉");
    else toast.success("Contribution added");
  };

  return (
    <AppShell>
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Goals
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Save for what matters with deadlines and progress tracking.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1.5">
              <Plus className="size-4" /> New goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>New goal</DialogTitle>
            </DialogHeader>
            <div className="grid gap-3 mt-2">
              <div className="flex gap-2">
                <Input
                  value={emoji}
                  onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
                  className="w-16 text-center text-xl"
                />
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Trip to Tokyo"
                />
              </div>
              <div>
                <Label className="text-xs">Target amount</Label>
                <Input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="5000"
                />
              </div>
              <div>
                <Label className="text-xs">Deadline</Label>
                <Input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <Button onClick={submit} className="mt-2">
                Create goal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {goals.map((g) => {
            const p = Math.min(1, g.saved_amount / g.target_amount);
            const done = p >= 1;
            const daysLeft = Math.max(
              0,
              Math.round((+new Date(g.deadline) - Date.now()) / 86400000),
            );
            return (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 relative overflow-hidden"
              >
                {done && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-3 right-3 bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    <Sparkles className="size-3" /> COMPLETED
                  </motion.div>
                )}
                <div className="text-4xl mb-3">{g.emoji}</div>
                <h3 className="font-semibold text-lg">{g.title}</h3>
                <div className="text-xs text-muted-foreground mb-3">
                  {daysLeft} days left
                </div>
                <div className="flex items-baseline justify-between mb-1.5 text-sm">
                  <span className="font-semibold">
                    {currency(g.saved_amount)}
                  </span>
                  <span className="text-muted-foreground">
                    of {currency(g.target_amount)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${p * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full ${done ? "bg-gradient-to-r from-emerald-500 to-teal-400" : "bg-gradient-to-r from-primary to-fuchsia-500"}`}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    disabled={done}
                    onClick={() =>
                      contribute(g.id, g.saved_amount, g.target_amount)
                    }
                  >
                    Contribute
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      deleteGoal(g.id);
                      toast.success("Goal removed");
                    }}
                  >
                    <Trash2 className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </AppShell>
  );
}
