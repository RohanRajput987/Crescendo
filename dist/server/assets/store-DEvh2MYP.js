import { jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo, useContext, createContext } from "react";
const cats = [
  "Groceries",
  "Dining",
  "Transport",
  "Housing",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Education",
  "Travel",
  "Subscriptions",
  "Salary",
  "Freelance",
  "Investments"
];
const titles = {
  Groceries: ["Whole Foods", "Trader Joe's", "Costco run", "Local market"],
  Dining: [
    "Sushi night",
    "Coffee with Sam",
    "Lunch — Sweetgreen",
    "Pizza Friday"
  ],
  Transport: ["Uber to airport", "Subway top-up", "Gas station", "Lyft home"],
  Housing: ["Rent — November", "HOA fee"],
  Utilities: ["Electric bill", "Internet — Verizon", "Water bill"],
  Entertainment: ["Spotify", "Movie tickets", "Concert — Tame Impala"],
  Shopping: ["Nike sneakers", "Amazon order", "Zara haul", "Uniqlo basics"],
  Health: ["Pharmacy", "Gym membership", "Therapy session"],
  Education: ["Coursera plus", "Bookstore"],
  Travel: ["Flight to Lisbon", "Airbnb — Tulum"],
  Subscriptions: ["Notion", "ChatGPT Plus", "iCloud 2TB"],
  Salary: ["Acme Corp — payroll"],
  Freelance: ["Design retainer", "Client invoice #204"],
  Investments: ["Index fund deposit", "Crypto DCA"]
};
const rand = (min, max) => Math.random() * (max - min) + min;
function makeTransactions() {
  const out = [];
  const now = Date.now();
  for (let i = 0; i < 64; i++) {
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const isIncome = ["Salary", "Freelance"].includes(cat);
    const isSavings = cat === "Investments";
    const type = isIncome ? "income" : isSavings ? "savings" : "expense";
    const amount = isIncome ? rand(2400, 6800) : isSavings ? rand(150, 900) : rand(8, 320);
    const daysAgo = Math.floor(Math.random() * 60);
    out.push({
      id: crypto.randomUUID(),
      title: titles[cat][Math.floor(Math.random() * titles[cat].length)],
      amount: Math.round(amount * 100) / 100,
      category: cat,
      type,
      note: Math.random() > 0.7 ? "Reimbursable" : void 0,
      created_at: new Date(now - daysAgo * 864e5).toISOString()
    });
  }
  return out.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
}
const seedTransactions = makeTransactions();
const seedBudgets = [
  {
    id: "1",
    category: "Groceries",
    limit: 600,
    spent: 412,
    color: "var(--chart-1)"
  },
  {
    id: "2",
    category: "Dining",
    limit: 300,
    spent: 285,
    color: "var(--chart-3)"
  },
  {
    id: "3",
    category: "Transport",
    limit: 250,
    spent: 140,
    color: "var(--chart-5)"
  },
  {
    id: "4",
    category: "Entertainment",
    limit: 200,
    spent: 220,
    color: "var(--chart-4)"
  },
  {
    id: "5",
    category: "Shopping",
    limit: 400,
    spent: 310,
    color: "var(--chart-2)"
  },
  {
    id: "6",
    category: "Subscriptions",
    limit: 100,
    spent: 78,
    color: "var(--chart-1)"
  }
];
const seedGoals = [
  {
    id: "g1",
    title: "Emergency Fund",
    target_amount: 12e3,
    saved_amount: 8430,
    deadline: new Date(Date.now() + 120 * 864e5).toISOString(),
    emoji: "🛡️"
  },
  {
    id: "g2",
    title: "Trip to Japan",
    target_amount: 5e3,
    saved_amount: 2100,
    deadline: new Date(Date.now() + 200 * 864e5).toISOString(),
    emoji: "🗼"
  },
  {
    id: "g3",
    title: "MacBook Pro",
    target_amount: 2800,
    saved_amount: 1950,
    deadline: new Date(Date.now() + 60 * 864e5).toISOString(),
    emoji: "💻"
  },
  {
    id: "g4",
    title: "Down Payment",
    target_amount: 4e4,
    saved_amount: 6200,
    deadline: new Date(Date.now() + 800 * 864e5).toISOString(),
    emoji: "🏠"
  }
];
const ALL_CATEGORIES = cats;
const Ctx = createContext(null);
function FinanceProvider({ children }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const authed = localStorage.getItem("crescendo_authed");
        if (authed && authed !== "1") {
          const parsed = JSON.parse(authed);
          return {
            id: "local",
            name: parsed.name || "User",
            email: parsed.email
          };
        }
      } catch (e) {
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
      return () => window.removeEventListener("crescendo_currency_change", handler);
    }
  }, []);
  const handleSetCurrencyCode = (c) => {
    setCurrencyCode(c);
    if (typeof window !== "undefined") {
      localStorage.setItem("crescendo_currency", c);
      window.dispatchEvent(new Event("crescendo_currency_change"));
    }
  };
  const [transactions, setTransactions] = useState(seedTransactions);
  const [budgets, setBudgets] = useState(seedBudgets);
  const [goals, setGoals] = useState(seedGoals);
  const value = useMemo(
    () => ({
      user,
      signIn: (email) => setUser({ id: "demo", name: email.split("@")[0] || "User", email }),
      signOut: () => {
        setUser(null);
        if (typeof window !== "undefined") {
          localStorage.removeItem("crescendo_authed");
        }
      },
      currencyCode,
      setCurrencyCode: handleSetCurrencyCode,
      transactions,
      addTransaction: (t) => setTransactions((prev) => [
        {
          ...t,
          id: crypto.randomUUID(),
          created_at: t.created_at ?? (/* @__PURE__ */ new Date()).toISOString()
        },
        ...prev
      ]),
      updateTransaction: (id, t) => setTransactions(
        (prev) => prev.map((x) => x.id === id ? { ...x, ...t } : x)
      ),
      deleteTransaction: (id) => setTransactions((prev) => prev.filter((x) => x.id !== id)),
      budgets,
      addBudget: (b) => setBudgets((prev) => [...prev, { ...b, id: crypto.randomUUID() }]),
      updateBudget: (id, b) => setBudgets(
        (prev) => prev.map((x) => x.id === id ? { ...x, ...b } : x)
      ),
      deleteBudget: (id) => setBudgets((prev) => prev.filter((x) => x.id !== id)),
      goals,
      addGoal: (g) => setGoals((prev) => [...prev, { ...g, id: crypto.randomUUID() }]),
      updateGoal: (id, g) => setGoals((prev) => prev.map((x) => x.id === id ? { ...x, ...g } : x)),
      deleteGoal: (id) => setGoals((prev) => prev.filter((x) => x.id !== id))
    }),
    [user, currencyCode, transactions, budgets, goals]
  );
  return /* @__PURE__ */ jsx(Ctx.Provider, { value, children });
}
function useFinance() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFinance must be used inside FinanceProvider");
  return ctx;
}
function useMonthTotals() {
  const { transactions } = useFinance();
  return useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const monthTx = transactions.filter((t) => {
      const d = new Date(t.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const income = monthTx.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
    const expense = monthTx.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
    const savings = monthTx.filter((t) => t.type === "savings").reduce((a, t) => a + t.amount, 0);
    const balance = income - expense;
    return { income, expense, savings, balance, monthTx };
  }, [transactions]);
}
function useTheme() {
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("theme");
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
export {
  ALL_CATEGORIES as A,
  FinanceProvider as F,
  useMonthTotals as a,
  useTheme as b,
  useFinance as u
};
