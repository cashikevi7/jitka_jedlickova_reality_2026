"use client";

import { useState, useMemo } from "react";

interface MortgageCalculatorProps {
  /** Výchozí cena v Kč (např. z nabídky) */
  readonly initialPrice?: number;
  readonly className?: string;
}

function formatMoney(value: number): string {
  return new Intl.NumberFormat("cs-CZ", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function MortgageCalculator({
  initialPrice = 3_000_000,
  className = "",
}: MortgageCalculatorProps) {
  const [price, setPrice] = useState(initialPrice);
  const [ratePercent, setRatePercent] = useState(5);
  const [years, setYears] = useState(25);

  const monthly = useMemo(() => {
    if (price <= 0 || years <= 0) return 0;
    const r = ratePercent / 100 / 12;
    const n = years * 12;
    if (r === 0) return price / n;
    return (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [price, ratePercent, years]);

  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 shadow-sm ${className}`}
      aria-labelledby="calculator-heading"
    >
      <h2 id="calculator-heading" className="font-heading text-lg font-semibold text-dark mb-4">
        Odhad měsíční splátky
      </h2>
      <p className="text-muted text-sm mb-4">
        Orientační výpočet hypotéky. Výše úroku a splátek závisí na bance a vaší bonitě.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-dark block mb-1">Cena (Kč)</span>
          <input
            type="number"
            min={100_000}
            step={100_000}
            value={price === 0 ? "" : price}
            onChange={(e) => setPrice(Number(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-dark block mb-1">Úrok (% p.a.)</span>
          <input
            type="number"
            min={0}
            max={20}
            step={0.1}
            value={ratePercent}
            onChange={(e) => setRatePercent(Number(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-dark block mb-1">Doba (roky)</span>
          <input
            type="number"
            min={1}
            max={40}
            value={years}
            onChange={(e) => setYears(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 rounded-lg border border-border bg-background text-dark focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </label>
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-sm text-muted">Orientační měsíční splátka</p>
        <p className="font-heading text-2xl font-semibold text-primary">
          {formatMoney(Math.round(monthly))} Kč
        </p>
      </div>
    </div>
  );
}
