"use client";

import { motion, useInView } from "framer-motion";
import { Clock, Heart, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({
  value,
  duration = 2,
  inView,
}: {
  value: string | number;
  duration?: number;
  inView: boolean;
}) {
  const [display, setDisplay] = useState("");
  const valueStr = String(value);

  useEffect(() => {
    if (!inView) return;
    const numMatch = valueStr.match(/^(\d+)(%?)$/);
    if (numMatch) {
      const end = parseInt(numMatch[1], 10);
      const suffix = numMatch[2];
      const startTime = performance.now();
      const step = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(String(Math.round(end * eased)) + suffix);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      setDisplay(valueStr);
    }
  }, [inView, valueStr, duration]);

  return <>{display || valueStr}</>;
}

const STATS = [
  {
    value: "12+",
    label: "Let zkušeností",
    sublabel: "na trhu od roku 2012",
    icon: Clock,
  },
  {
    value: "100+",
    label: "Úspěšných obchodů",
    sublabel: "spokojení klienti",
    icon: Heart,
  },
  {
    value: "Znojmo",
    label: "Region",
    sublabel: "Moravský Krumlov a okolí",
    icon: MapPin,
  },
  {
    value: "100%",
    label: "Osobní přístup",
    sublabel: "jeden kontakt, žádné přepojování",
    icon: Users,
  },
];

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-20" style={{ background: "var(--color-sand)" }}>
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label text-center">Proč Jitka</p>
        <h2 className="section-title text-center mb-3">
          Zkušenosti, na které se můžete spolehnout
        </h2>
        <p className="section-lead text-center mb-12 max-w-xl mx-auto">
          Každý obchod je pro mě příběh. Tady je pár čísel, která mluví za mě.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <stat.icon className="w-5 h-5 mx-auto mb-3" style={{ color: "var(--color-terracotta)" }} aria-hidden="true" />
              <div
                className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold mb-1"
                style={{ color: "var(--color-espresso)" }}
              >
                <AnimatedCounter value={stat.value} inView={inView} />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--color-espresso)" }}>
                {stat.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--color-muted)" }}>
                {stat.sublabel}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
