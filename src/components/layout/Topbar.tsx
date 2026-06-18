import { Search, Bell, Moon, Sun, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useFinance, useTheme } from "@/lib/store";

export function Topbar({ onAdd }: { onAdd?: () => void }) {
  const { user, currencyCode, setCurrencyCode } = useFinance();
  const { theme, toggle } = useTheme();
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 px-4 lg:px-8 py-4 backdrop-blur-xl bg-background/60 border-b border-border/60">
      <div className="relative flex-1 max-w-md">
        <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search transactions, goals, categories…"
          className="pl-9 bg-card/60"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        {onAdd && (
          <Button onClick={onAdd} size="sm" className="hidden sm:flex gap-1.5">
            <Plus className="size-4" /> Add
          </Button>
        )}
        <div className="relative flex items-center">
          <select
            className="appearance-none bg-transparent text-sm font-medium pr-6 pl-2 py-1 outline-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors dark:bg-[#1a1a1a]"
            value={currencyCode}
            onChange={(e) => setCurrencyCode(e.target.value)}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="INR">INR (₹)</option>
            <option value="AUD">AUD ($)</option>
            <option value="CAD">CAD ($)</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center px-1 text-muted-foreground">
            <svg className="size-3 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="size-4" />
          <span className="absolute top-2 right-2 size-1.5 rounded-full bg-primary" />
        </Button>
        <Avatar className="size-9 border border-border">
          <AvatarFallback className="bg-gradient-to-br from-primary to-fuchsia-500 text-white text-xs">
            {user?.name
              ?.split(" ")
              .map((p) => p[0])
              .join("")
              .slice(0, 2) ?? "AM"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
