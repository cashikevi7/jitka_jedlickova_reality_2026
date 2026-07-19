"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type SessionState =
  | "loading"
  | "ok"
  | "unauthorized"
  | "not_configured";

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<SessionState>("loading");

  const isLoginPath =
    pathname === "/admin/login" || pathname === "/admin/login/";

  useEffect(() => {
    if (isLoginPath) {
      setState("ok");
      return;
    }

    let cancelled = false;

    fetch("/api/admin/auth", { method: "GET" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.status === 200) {
          const data = (await res.json()) as {
            configured?: boolean;
            authenticated?: boolean;
          };
          if (!data.configured) {
            setState("not_configured");
          } else if (data.authenticated) {
            setState("ok");
          } else {
            setState("unauthorized");
          }
        } else {
          setState("unauthorized");
        }
      })
      .catch(() => {
        if (!cancelled) setState("unauthorized");
      });

    return () => {
      cancelled = true;
    };
  }, [isLoginPath, pathname]);

  useEffect(() => {
    if (state === "not_configured") {
      router.replace("/");
    } else if (state === "unauthorized" && !isLoginPath) {
      router.replace("/admin/login/");
    }
  }, [state, isLoginPath, router]);

  if (!isLoginPath && state !== "ok") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center bg-stone-50 text-stone-600">
        Načítání…
      </div>
    );
  }

  return <>{children}</>;
}
