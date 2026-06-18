export type TxType = "income" | "expense" | "savings";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: TxType;
  note?: string;
  created_at: string; // ISO
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  color: string;
  locked?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  target_amount: number;
  saved_amount: number;
  deadline: string; // ISO
  emoji: string;
}

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
  "Investments",
];

const titles: Record<string, string[]> = {
  Groceries: ["Whole Foods", "Trader Joe's", "Costco run", "Local market"],
  Dining: [
    "Sushi night",
    "Coffee with Sam",
    "Lunch — Sweetgreen",
    "Pizza Friday",
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
  Investments: ["Index fund deposit", "Crypto DCA"],
};

const rand = (min: number, max: number) => Math.random() * (max - min) + min;

function makeTransactions(): Transaction[] {
  const out: Transaction[] = [];
  const now = Date.now();
  for (let i = 0; i < 64; i++) {
    const cat = cats[Math.floor(Math.random() * cats.length)];
    const isIncome = ["Salary", "Freelance"].includes(cat);
    const isSavings = cat === "Investments";
    const type: TxType = isIncome
      ? "income"
      : isSavings
        ? "savings"
        : "expense";
    const amount = isIncome
      ? rand(2400, 6800)
      : isSavings
        ? rand(150, 900)
        : rand(8, 320);
    const daysAgo = Math.floor(Math.random() * 60);
    out.push({
      id: crypto.randomUUID(),
      title: titles[cat][Math.floor(Math.random() * titles[cat].length)],
      amount: Math.round(amount * 100) / 100,
      category: cat,
      type,
      note: Math.random() > 0.7 ? "Reimbursable" : undefined,
      created_at: new Date(now - daysAgo * 86400000).toISOString(),
    });
  }
  return out.sort((a, b) => +new Date(b.created_at) - +new Date(a.created_at));
}

export const seedTransactions = makeTransactions();

export const seedBudgets: Budget[] = [
  {
    id: "1",
    category: "Groceries",
    limit: 600,
    spent: 412,
    color: "var(--chart-1)",
  },
  {
    id: "2",
    category: "Dining",
    limit: 300,
    spent: 285,
    color: "var(--chart-3)",
  },
  {
    id: "3",
    category: "Transport",
    limit: 250,
    spent: 140,
    color: "var(--chart-5)",
  },
  {
    id: "4",
    category: "Entertainment",
    limit: 200,
    spent: 220,
    color: "var(--chart-4)",
  },
  {
    id: "5",
    category: "Shopping",
    limit: 400,
    spent: 310,
    color: "var(--chart-2)",
  },
  {
    id: "6",
    category: "Subscriptions",
    limit: 100,
    spent: 78,
    color: "var(--chart-1)",
  },
];

export const seedGoals: Goal[] = [
  {
    id: "g1",
    title: "Emergency Fund",
    target_amount: 12000,
    saved_amount: 8430,
    deadline: new Date(Date.now() + 120 * 86400000).toISOString(),
    emoji: "🛡️",
  },
  {
    id: "g2",
    title: "Trip to Japan",
    target_amount: 5000,
    saved_amount: 2100,
    deadline: new Date(Date.now() + 200 * 86400000).toISOString(),
    emoji: "🗼",
  },
  {
    id: "g3",
    title: "MacBook Pro",
    target_amount: 2800,
    saved_amount: 1950,
    deadline: new Date(Date.now() + 60 * 86400000).toISOString(),
    emoji: "💻",
  },
  {
    id: "g4",
    title: "Down Payment",
    target_amount: 40000,
    saved_amount: 6200,
    deadline: new Date(Date.now() + 800 * 86400000).toISOString(),
    emoji: "🏠",
  },
];

export const ALL_CATEGORIES = cats;
