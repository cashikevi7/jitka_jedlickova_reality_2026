"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  getConfiguredAdminEmail,
  isAdminLoginConfigured,
  tryAdminLogin,
} from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const configured = isAdminLoginConfigured();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!configured) {
      setError("Přihlášení není nastaveno (chybí proměnné prostředí).");
      return;
    }
    if (tryAdminLogin(email, password)) {
      router.push("/admin/");
      router.refresh();
      return;
    }
    setError("Neplatný e-mail nebo heslo.");
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800">Administrace</h1>
      <p className="mt-1 text-sm text-stone-500">
        Mamka Reality — pouze pro oprávněné osoby.
      </p>

      {!configured && (
        <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Nastavte v <code className="text-xs">.env.local</code> nebo na Vercelu{" "}
          <code className="text-xs">NEXT_PUBLIC_ADMIN_EMAIL</code> a{" "}
          <code className="text-xs">NEXT_PUBLIC_ADMIN_PASSWORD</code>, pak znovu
          sestavte projekt.
        </p>
      )}

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium text-stone-700">
            E-mail
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={getConfiguredAdminEmail() || "e-mail"}
            className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
            required
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium text-stone-700">
            Heslo
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
            required
          />
        </div>
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={!configured}
          className="w-full rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Přihlásit se
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-stone-500">
        <Link href="/" className="text-amber-800 underline hover:text-amber-900">
          Zpět na web
        </Link>
      </p>
    </div>
  );
}
