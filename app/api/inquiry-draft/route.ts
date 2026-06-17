import { NextRequest, NextResponse } from "next/server";
import { sanitizeChatMessages } from "@/lib/sanitize-chat-messages";

const DRAFT_SYSTEM = `Jsi asistent na realitním webu makléřky Jitky Jedličkové. Dostaneš přepis konverzace mezi zájemcem a chatbotem.

Úkol: napiš JEDEN souvislý text zprávy v češtině, který zájemce pošle makléřce (e-mail / kontaktní formulář).
- Piš v první osobě jednotného čísla (např. „hledám…“, „mám zájem o…“).
- Shrň konkrétní poptávku: lokalita, typ nemovitosti, rozpočet, časový horizont, případně kontakt, pokud byl v konverzaci zmíněn.
- Neuváděj, že jsi AI ani že jsi chatbot. Nepřidávej věty typu „Zde je návrh:“ — začni rovnou textem pro makléřku.
- Bez markdown nadpisů (#). Stručné odrážky jsou v pořádku, pokud pomůžou přehledu.
- Maximálně asi 1800 znaků.`;

function transcriptForDraft(messages: { role: string; content: string }[]): string {
  const lines: string[] = [];
  for (const m of messages) {
    if (m.role === "assistant" && m.content.startsWith("Dobrý den! Jsem AI asistent")) continue;
    const label = m.role === "user" ? "Zájemce" : "Asistent";
    lines.push(`[${label}]\n${m.content}`);
  }
  return lines.join("\n\n---\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sanitized = sanitizeChatMessages(body.messages);

    const userTurns = sanitized.filter((m) => m.role === "user").length;
    if (userTurns < 1) {
      return NextResponse.json({ error: "Nejdřív napište do chatu, o co máte zájem." }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const transcript = transcriptForDraft(sanitized);
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: DRAFT_SYSTEM },
          {
            role: "user",
            content: `Konverzace:\n\n${transcript.slice(0, 28000)}\n\nNapiš finální text zprávy pro makléřku:`,
          },
        ],
        temperature: 0.35,
        max_tokens: 700,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json({ error: "API error", details: err }, { status: response.status });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== "string" || text.trim().length < 15) {
      return NextResponse.json({ error: "Prázdná odpověď modelu" }, { status: 502 });
    }

    return NextResponse.json(
      { text: text.trim() },
      { headers: { "Cache-Control": "no-store, max-age=0" } }
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
