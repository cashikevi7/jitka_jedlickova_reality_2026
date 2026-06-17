"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasValidAdminSession, isAdminLoginConfigured } from "@/lib/admin-auth";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  const isLoginPath =
    pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    if (isLoginPath) {
      setReady(true);
      return;
    }
    if (!isAdminLoginConfigured()) {
      router.replace("/");
      return;
    }
    if (!hasValidAdminSession()) {
      router.replace("/admin/login/");
      return;
    }
    setReady(true);
  }, [isLoginPath, pathname, router]);

  if (!ready && !isLoginPath) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-stone-50 text-stone-600">
        Načítání…
      </div>
    );
  }

  return <>{children}</>;
}
