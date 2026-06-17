const STORAGE_KEY = "mamka_admin_session";
const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function getConfiguredAdminEmail(): string {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "").trim();
}

function getConfiguredPassword(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";
}

export function isAdminLoginConfigured(): boolean {
  return Boolean(getConfiguredAdminEmail() && getConfiguredPassword());
}

export function tryAdminLogin(email: string, password: string): boolean {
  const expectedEmail = getConfiguredAdminEmail().toLowerCase();
  const expectedPassword = getConfiguredPassword();
  if (!expectedEmail || !expectedPassword) return false;
  const ok =
    email.trim().toLowerCase() === expectedEmail && password === expectedPassword;
  if (!ok || typeof window === "undefined") return ok;
  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ exp: Date.now() + SESSION_MS, email: email.trim() }),
  );
  return true;
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}

export function hasValidAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const parsed = JSON.parse(raw) as { exp?: number };
    if (typeof parsed.exp !== "number" || Date.now() > parsed.exp) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return false;
    }
    return true;
  } catch {
    window.sessionStorage.removeItem(STORAGE_KEY);
    return false;
  }
}
