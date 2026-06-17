import { NextRequest, NextResponse } from "next/server";
import { buildChatSystemPrompt } from "@/lib/chat-system-prompt";
import { sanitizeChatMessages } from "@/lib/sanitize-chat-messages";

function getSiteOrigin(req: NextRequest): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "")}`;
  try {
    return req.nextUrl.origin;
  } catch {
    return "";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sanitized = sanitizeChatMessages(body.messages);

    if (sanitized.length === 0) {
      return NextResponse.json({ error: "messages required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

    const systemPrompt = buildChatSystemPrompt(getSiteOrigin(req));

    const messages: { role: string; content: string }[] = [
      { role: "system", content: systemPrompt },
      ...sanitized,
    ];

    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature: 0.45,
        max_tokens: 900,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: "API error", details: error }, { status: response.status });
    }

    const data: unknown = await response.json();
    const choice =
      data &&
      typeof data === "object" &&
      Array.isArray((data as { choices?: unknown }).choices)
        ? (data as { choices: unknown[] }).choices[0]
        : undefined;

    if (choice === undefined || choice === null || typeof choice !== "object") {
      return NextResponse.json(
        {
          error: "Unexpected API response",
          details: "DeepSeek response missing choices[0]",
        },
        { status: 502 }
      );
    }

    const content = (choice as { message?: { content?: unknown } }).message?.content;
    if (typeof content !== "string") {
      return NextResponse.json(
        {
          error: "Unexpected API response",
          details: "DeepSeek response missing message.content",
        },
        { status: 502 }
      );
    }

    return NextResponse.json(choice, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
