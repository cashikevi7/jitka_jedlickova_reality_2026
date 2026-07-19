import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSessionToken, verifySessionToken, isAdminConfigured } from "@/lib/admin-auth";

const COOKIE_NAME = "mamka_admin_session";
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 dní

/**
 * GET  — ověření, zda je admin přihlášen
 *     200 + { authenticated: true }
 *     200 + { configured: false }
 *     401 + { authenticated: false }
 */
export async function GET() {
  if (!isAdminConfigured()) {
    return NextResponse.json({ configured: false, authenticated: false });
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }
  const payload = verifySessionToken(token);
  if (!payload) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 },
    );
  }
  return NextResponse.json({
    authenticated: true,
    email: payload.email,
  });
}

/**
 * POST — přihlášení (email + heslo)
 *   200 + { success: true }  → nastaví httpOnly cookie
 *   401 + { error: "invalid" }
 *   501 + { error: "not configured" }
 */
export async function POST(req: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "not_configured" },
      { status: 501 },
    );
  }

  try {
    const { email, password } = (await req.json()) as {
      email?: string;
      password?: string;
    };
    if (!email || !password) {
      return NextResponse.json(
        { error: "invalid" },
        { status: 401 },
      );
    }

    const emailEnv = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
    const passwordEnv = process.env.ADMIN_PASSWORD ?? "";
    if (
      email.trim().toLowerCase() !== emailEnv ||
      password !== passwordEnv
    ) {
      return NextResponse.json(
        { error: "invalid" },
        { status: 401 },
      );
    }

    const token = createSessionToken(email.trim());
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: COOKIE_MAX_AGE,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "invalid" },
      { status: 401 },
    );
  }
}

/**
 * DELETE — odhlášení (smaže cookie)
 */
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return NextResponse.json({ success: true });
}
