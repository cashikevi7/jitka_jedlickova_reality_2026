import { NextRequest, NextResponse } from "next/server";

const MAX_MESSAGE = 8000;
const MIN_MESSAGE = 15;
const DEFAULT_FORMSPREE_FORM_ID = "xeepeadb";

function isValidEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  const formId = (process.env.FORMSPREE_FORM_ID ?? DEFAULT_FORMSPREE_FORM_ID).trim();
  if (!formId) {
    return NextResponse.json(
      { error: "Odesílání poptávek není na serveru nastavené (FORMSPREE_FORM_ID)." },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as Record<string, unknown>;
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "";
    const source = typeof body.source === "string" ? body.source.trim().slice(0, 80) : "";
    const honeypot = typeof body._gotcha === "string" ? body._gotcha.trim() : "";

    if (honeypot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Zadejte platný e-mail." }, { status: 400 });
    }
    if (message.length < MIN_MESSAGE || message.length > MAX_MESSAGE) {
      return NextResponse.json(
        { error: `Zpráva musí mít ${MIN_MESSAGE}–${MAX_MESSAGE} znaků.` },
        { status: 400 }
      );
    }

    const res = await fetch(`https://formspree.io/f/${formId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name || "—",
        email,
        phone: phone || "—",
        message,
        source,
        _replyto: email,
        _subject:
          source === "contact"
            ? "Poptávka z kontaktního formuláře (web Jitka Jedličková)"
            : "Poptávka z AI chatu (web Jitka Jedličková)",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { error: "Odeslání se nezdařilo. Zkuste kontakt na webu nebo to zkuste později.", details: text },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true }, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "Interní chyba." }, { status: 500 });
  }
}
