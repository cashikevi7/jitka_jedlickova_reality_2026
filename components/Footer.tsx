"use client";

import Link from "next/link";

const FOOTER_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#sluzby", label: "Služby" },
  { href: "#nabidka", label: "Nabídka" },
  { href: "#o-mne", label: "O mně" },
  { href: "#reference", label: "Reference" },
  { href: "#jak-spoluprace", label: "Jak to probíhá" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Footer() {
  return (
    <footer
      className="py-14 md:py-16"
      style={{
        background: "var(--color-warm-white)",
        borderTop: "1px solid var(--color-clay)",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          <div>
            <p
              className="text-2xl"
              style={{
                fontFamily: "var(--font-script), cursive",
                color: "var(--color-terracotta)",
              }}
            >
              Jitka Jedličková
            </p>
            <p
              className="text-sm mt-1.5"
              style={{ color: "var(--color-muted)" }}
            >
              Smluvní partner Reality Proradost s.r.o.
            </p>
          </div>

          <nav
            className="flex flex-wrap gap-x-8 gap-y-1 text-sm"
            aria-label="Patička – navigace"
          >
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-300 cursor-pointer"
                style={{ color: "var(--color-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex gap-3">
            <a
              href="https://facebook.com/profile.php?id=61562180164190"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2.5 rounded-full border transition-colors duration-300 cursor-pointer"
              style={{
                borderColor: "var(--color-clay)",
                color: "var(--color-muted)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M13.5 8H14.75V6H13.5C11.98 6 11 7.02 11 8.7V10H9.5V12H11V18H13V12H14.5V10H13V8.7C13 8.31 13.17 8 13.5 8Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              href="https://instagram.com/jitkajedlickova6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2.5 rounded-full border transition-colors duration-300 cursor-pointer"
              style={{
                borderColor: "var(--color-clay)",
                color: "var(--color-muted)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-5 h-5"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="5"
                  ry="5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="17" cy="7" r="1.1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        <div
          className="mt-10 pt-8 text-center text-sm"
          style={{ borderTop: "1px solid var(--color-clay)", color: "var(--color-muted)" }}
        >
          © {new Date().getFullYear()} Jitka Jedličková
        </div>
      </div>
    </footer>
  );
}
