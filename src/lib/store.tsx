import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  seedTransactions,
  seedBudgets,
  seedGoals,
  type Transaction,
  type Budget,
  type Goal,
} from "./mock-data";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface FinanceState {
  user: User | null;
  signIn: (email: string) => void;
  signOut: () => void;

  currencyCode: string;
  setCurrencyCode: (c: string) => void;

  transactions: Transaction[];
  addTransaction: (
    t: Omit<Transaction, "id" | "created_at"> & { created_at?: string },
  ) => void;
  updateTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  budgets: Budget[];
  addBudget: (b: Omit<Budget, "id">) => void;
  updateBudget: (id: string, b: Partial<Budget>) => void;
  deleteBudget: (id: string) => void;

  goals: Goal[];
  addGoal: (g: Omit<Goal, "id">) => void;
  updateGoal: (id: string, g: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
}

const Ctx = createContext<FinanceState | null>(null);

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const authed = localStorage.getItem("crescendo_authed");
        if (authed && authed !== "1") {
          const parsed = JSON.parse(authed);
          return {
            id: "local",
            name: parsed.name || "User",
            email: parsed.email,
          };
        }
      } catch {
        return null;
      }
    }
    return { id: "demo", name: "Alex Morgan", email: "alex@crescendo.app" };
  });
  const [currencyCode, setCurrencyCode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("crescendo_currency") || "USD";
    }
    return "USD";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handler = () => {
        setCurrencyCode(localStorage.getItem("crescendo_currency") || "USD");
      };
      window.addEventListener("crescendo_currency_change", handler);
      return () =>
        window.removeEventListener("crescendo_currency_change", handler);
    }
  }, []);

  const handleSetCurrencyCode = (c: string) => {
    setCurrencyCode(c);
    if (typeof window !== "undefined") {
      localStorage.setItem("crescendo_currency", c);
      window.dispatchEvent(new Event("crescendo_currency_change"));
    }
  };

  const [transactions, setTransactions] =
    useState<Transaction[]>(seedTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(seedBudgets);
  const [goals, setGoals] = useState<Goal[]>(seedGoals);

  const value = useMemo<FinanceState>(
    () => ({
      user,
      signIn: (email) =>
        setUser({ id: "demo", name: email.split("@")[0] || "User", email }),
      signOut: () => {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("crescendo_authed");
        }
      },

      currencyCode,
      setCurrencyCode: handleSetCurrencyCode,

      transactions,
      addTransaction: (t) =>
        setTransactions((prev) => [
          {
            ...t,
            id: crypto.randomUUID(),
            created_at: t.created_at ?? new Date().toISOString(),
          },
          ...prev,
        ]),
      updateTransaction: (id, t) =>
        setTransactions((prev) =>
          prev.map((x) => (x.id === id ? { ...x, ...t } : x)),
        ),
      deleteTransaction: (id) =>
        setTransactions((prev) => prev.filter((x) => x.id !== id)),

      budgets,
      addBudget: (b) =>
        setBudgets((prev) => [...prev, { ...b, id: crypto.randomUUID() }]),
      updateBudget: (id, b) =>
        setBudgets((prev) =>
          prev.map((x) => (x.id === id ? { ...x, ...b } : x)),
        ),
      deleteBudget: (id) =>
        setBudgets((prev) => prev.filter((x) => x.id !== id)),

      goals,
      addGoal: (g) =>
        setGoals((prev) => [...prev, { ...g, id: crypto.randomUUID() }]),
      updateGoal: (id, g) =>
        setGoals((prev) => prev.map((x) => (x.id === id ? { ...x, ...g } : x))),
      deleteGoal: (id) => setGoals((prev) => prev.filter((x) => x.id !== id)),
    }),
    [user, currencyCode, transactions, budgets, goals],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useFinance() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFinance must be used inside FinanceProvider");
  return ctx;
}

/* ---------- Derived selectors ---------- */

export function useMonthTotals() {
  const { transactions } = useFinance();
  return useMemo(() => {
    const now = new Date();
    const monthTx = transactions.filter((t) => {
      const d = new Date(t.created_at);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });
    const income = monthTx
      .filter((t) => t.type === "income")
      .reduce((a, t) => a + t.amount, 0);
    const expense = monthTx
      .filter((t) => t.type === "expense")
      .reduce((a, t) => a + t.amount, 0);
    const savings = monthTx
      .filter((t) => t.type === "savings")
      .reduce((a, t) => a + t.amount, 0);
    const balance = income - expense;
    return { income, expense, savings, balance, monthTx };
  }, [transactions]);
}

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem("theme")) as "light" | "dark" | null;
    const initial = stored ?? "dark";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };
  return { theme, toggle };
}
