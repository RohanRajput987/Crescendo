const currency = (n, c) => {
  let activeCurrency = "USD";
  if (typeof window !== "undefined") {
    activeCurrency = localStorage.getItem("crescendo_currency") || "USD";
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: activeCurrency,
    maximumFractionDigits: 0
  }).format(n);
};
const compact = (n) => new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1
}).format(n);
export {
  compact as a,
  currency as c
};
