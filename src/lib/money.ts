export const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
export const round2 = (n: number) => Math.round(n * 100) / 100;
