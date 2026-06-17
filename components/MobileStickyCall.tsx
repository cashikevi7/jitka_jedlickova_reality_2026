"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const TEL = "+420608713632";
const TEL_DISPLAY = "+420 608 713 632";

export default function MobileStickyCall() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 md:hidden pointer-events-none"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="container mx-auto px-4 flex justify-center pointer-events-auto">
        <a
          href={`tel:${TEL}`}
          className="inline-flex items-center justify-center gap-2 w-full max-w-sm rounded-xl py-3.5 px-5 font-semibold text-dark shadow-lg active:scale-[0.98] transition-transform cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          }}
        >
          <Phone className="w-5 h-5 shrink-0" aria-hidden />
          Zavolat {TEL_DISPLAY}
        </a>
      </div>
    </div>
  );
}
