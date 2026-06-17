export type ChatMessage = { role: "user" | "assistant"; content: string };

const MAX_CONTENT = 12000;

function isUserOrAssistantMessage(m: unknown): m is ChatMessage {
  if (m === null || typeof m !== "object") return false;
  const o = m as Record<string, unknown>;
  const role = o.role;
  if (role !== "user" && role !== "assistant") return false;
  return typeof o.content === "string";
}

export function sanitizeChatMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(isUserOrAssistantMessage).map((m) => ({
    role: m.role,
    content: m.content.slice(0, MAX_CONTENT),
  }));
}
