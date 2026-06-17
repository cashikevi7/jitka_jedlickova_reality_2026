"use client";

import Link from "next/link";
import { clearAdminSession } from "@/lib/admin-auth";
import { useRouter } from "next/navigation";

export default function AdminHomePage() {
  const router = useRouter();

  function logout() {
    clearAdminSession();
    router.push("/admin/login/");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-serif text-2xl text-stone-800">Přehled</h1>
        <button
          type="button"
          onClick={logout}
          className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-700 hover:bg-stone-100"
        >
          Odhlásit se
        </button>
      </div>
      <p className="mt-4 text-stone-600">
        Jste přihlášeni jako správce. Obsah administrace můžeme postupně doplnit
        (např. náhled nabídek, odkazy na úpravy dat).
      </p>
      <ul className="mt-8 list-inside list-disc space-y-2 text-stone-700">
        <li>
          <Link href="/" className="text-amber-800 underline hover:text-amber-900">
            Veřejná úvodní stránka
          </Link>
        </li>
        <li>
          Data nabídek: <code className="text-sm">data/listings.json</code> (build
          skriptem)
        </li>
      </ul>
    </div>
  );
}
