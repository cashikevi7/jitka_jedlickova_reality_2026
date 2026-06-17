"use client";

import { useId } from "react";

type Props = {
  className?: string;
};

/** Moderní zlaté slunce s monogramem JJ — nahrazuje erb v hero. */
export default function HeroSunMark({ className }: Props) {
  const uid = useId().replace(/:/g, "");

  const core = `heroSunCore-${uid}`;
  const ray = `heroSunRay-${uid}`;
  const halo = `heroSunHalo-${uid}`;
  const ring = `heroSunRing-${uid}`;
  const glow = `heroSunGlow-${uid}`;

  const cx = 120;
  const cy = 120;
  const rays = 16;

  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Monogram JJ ve slunci"
    >
      <defs>
        <radialGradient id={halo} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(253, 230, 138, 0.55)" />
          <stop offset="55%" stopColor="rgba(245, 158, 11, 0.18)" />
          <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
        </radialGradient>
        <radialGradient id={core} cx="38%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="28%" stopColor="#fef3c7" />
          <stop offset="55%" stopColor="#fcd34d" />
          <stop offset="82%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </radialGradient>
        <linearGradient id={ray} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="rgba(254, 243, 199, 0)" />
          <stop offset="42%" stopColor="rgba(251, 191, 36, 0.45)" />
          <stop offset="100%" stopColor="rgba(255, 251, 235, 0.95)" />
        </linearGradient>
        <linearGradient id={ring} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#eab308" />
        </linearGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r={108} fill={`url(#${halo})`} />

      <g filter={`url(#${glow})`}>
        {Array.from({ length: rays }, (_, i) => (
          <rect
            key={i}
            x={cx - 2.25}
            y={22}
            width={4.5}
            height={44}
            rx={2.25}
            fill={`url(#${ray})`}
            transform={`rotate(${(360 / rays) * i} ${cx} ${cy})`}
          />
        ))}
      </g>

      <circle cx={cx} cy={cy} r={58} fill={`url(#${core})`} />
      <circle
        cx={cx}
        cy={cy}
        r={56}
        fill="none"
        stroke={`url(#${ring})`}
        strokeWidth={2.5}
        opacity={0.95}
      />

      <text
        x={cx}
        y={cy + 11}
        textAnchor="middle"
        fill="#0f172a"
        fontSize={34}
        fontWeight={700}
        style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
        letterSpacing="-0.03em"
      >
        JJ
      </text>
    </svg>
  );
}
