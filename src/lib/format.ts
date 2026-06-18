export const currency = (n: number, c?: string) => {
  let activeCurrency = c || "USD";
  if (!c && typeof window !== "undefined") {
    activeCurrency = localStorage.getItem("crescendo_currency") || "USD";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeCurrency,
    maximumFractionDigits: 0,
  }).format(n);
};

export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

export const pct = (n: number) => `${Math.round(n * 100)}%`;
