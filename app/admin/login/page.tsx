"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 501) {
        setError("Přihlášení není nastaveno (chybí proměnné prostředí).");
        return;
      }

      if (!res.ok) {
        setError("Neplatný e-mail nebo heslo.");
        return;
      }

      router.push("/admin/");
      router.refresh();
    } catch {
      setError("Chyba připojení — zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <h1 className="font-serif text-2xl text-stone-800">Administrace</h1>
      <p className="mt-1 text-sm text-stone-500">
        Mamka Reality — pouze pro oprávněné osoby.
      </p>

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
            placeholder="váš e-mail"
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
          disabled={loading}
          className="w-full rounded-lg bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Ověřuji…" : "Přihlásit se"}
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
