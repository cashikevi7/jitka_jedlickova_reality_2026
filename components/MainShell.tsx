"use client";

import { usePathname } from "next/navigation";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const padBottom =
    pathname?.startsWith("/admin") ? "" : "pb-[5.5rem] md:pb-0";

  return <main className={padBottom}>{children}</main>;
}
