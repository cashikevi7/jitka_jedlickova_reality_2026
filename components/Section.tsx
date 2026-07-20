"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
