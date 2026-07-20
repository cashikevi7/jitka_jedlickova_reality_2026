"use client";

import { Home, MessageSquare, Phone } from "lucide-react";
import Link from "next/link";

export default function MobileStickyBar() {
  return (
    <nav className="mobile-sticky-bar" aria-label="Rychlé akce">
      <a href="tel:+420608713632" aria-label="Zavolat">
        <Phone className="w-5 h-5" aria-hidden="true" />
        Zavolat
      </a>
      <Link href="#kontakt" className="sticky-primary">
        <MessageSquare className="w-5 h-5" aria-hidden="true" />
        Nezávazně poptat
      </Link>
      <Link href="#nabidka" aria-label="Nabídka">
        <Home className="w-5 h-5" aria-hidden="true" />
        Nabídka
      </Link>
    </nav>
  );
}
