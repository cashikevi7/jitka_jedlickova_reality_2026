"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

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

function Stat({
  value,
  label,
  inView,
  showDivider,
}: {
  value: string | number;
  label: string;
  inView: boolean;
  showDivider?: boolean;
}) {
  return (
    <>
      {showDivider && (
        <div className="hidden md:block w-px bg-primary/50 self-stretch min-h-[60px]" />
      )}
      <div className="text-center py-4">
        <div className="font-heading text-3xl md:text-4xl lg:text-5xl text-primary font-medium">
          <AnimatedCounter value={value} inView={inView} />
        </div>
        <p className="text-white/90 mt-2 text-sm md:text-base">{label}</p>
      </div>
    </>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-[var(--color-dark-section)] py-12 md:py-16"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-0">
          <Stat value="10+" label="Nemovitostí v nabídce" inView={inView} showDivider={false} />
          <Stat value="2012" label="Na trhu od roku" inView={inView} showDivider />
          <Stat value="100%" label="Spokojených klientů" inView={inView} showDivider />
          <Stat value="Znojmo" label="Region" inView={inView} showDivider />
        </div>
      </div>
    </motion.section>
  );
}
