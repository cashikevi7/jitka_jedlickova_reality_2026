"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#uvod", label: "Úvod" },
  { href: "#sluzby", label: "Služby" },
  { href: "#nabidka", label: "Nabídka" },
  { href: "#o-mne", label: "O mně" },
  { href: "#reference", label: "Reference" },
  { href: "#jak-spoluprace", label: "Jak to probíhá" },
  { href: "#kontakt", label: "Kontakt" },
];

const TEL_HREF = "tel:+420608713632";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="header-inner">
          <div className="header-left">
            <Image
              src="/erb.svg"
              alt=""
              className="header-logo"
              width={36}
              height={36}
            />
            <a
              href="#uvod"
              className="home-link"
              onClick={() => setIsMobileOpen(false)}
            >
              Jitka Jedličková
            </a>
          </div>

          <div className="header-right">
            <button
              type="button"
              className="header-menu-btn lg:hidden"
              aria-label={isMobileOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={isMobileOpen}
              onClick={() => setIsMobileOpen((o) => !o)}
            >
              {isMobileOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
            <a href={TEL_HREF} className="call-button">
              +420&nbsp;608&nbsp;713&nbsp;632
            </a>
          </div>
        </div>

        <nav className="header-site-nav" aria-label="Hlavní menu">
          <div className="header-site-nav-inner">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {isMobileOpen && (
        <div
          className="header-mobile-overlay lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <nav aria-label="Sekce stránky">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={TEL_HREF}
              className="call-button"
              onClick={() => setIsMobileOpen(false)}
            >
              +420&nbsp;608&nbsp;713&nbsp;632
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
