import crypto from "crypto";

// ─── Server-side utility (NEimportovat do client komponent) ───

const SESSION_MS = 7 * 24 * 60 * 60 * 1000;

export function isAdminConfigured(): boolean {
  const email = (process.env.ADMIN_EMAIL ?? "").trim();
  const password = process.env.ADMIN_PASSWORD ?? "";
  return Boolean(email && password);
}

/** Vytvoří podepsaný session token (base64url JSON + HMAC-SHA256). */
export function createSessionToken(email: string): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  const payload = JSON.stringify({
    email: email.trim(),
    exp: Date.now() + SESSION_MS,
  });
  const encoded = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${signature}`;
}

/** Ověří token. Vrací { email } nebo null. */
export function verifySessionToken(token: string): { email: string } | null {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  if (!secret) return null;

  const dot = token.indexOf(".");
  if (dot < 1) return null;

  const encoded = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!encoded || !signature) return null;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(encoded)
    .digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString(),
    ) as { email?: string; exp?: number };
    if (
      typeof payload.exp !== "number" ||
      Date.now() > payload.exp ||
      !payload.email
    ) {
      return null;
    }
    return { email: payload.email };
  } catch {
    return null;
  }
}
