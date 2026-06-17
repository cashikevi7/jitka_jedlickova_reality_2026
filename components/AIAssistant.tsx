"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Mail,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

/** Varianta B (plný Next): `/api/chat`. Varianta A (hybrid): celá URL v `NEXT_PUBLIC_CHAT_API_URL`. */
function getChatApiUrl(): string {
  const base = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim();
  if (base) return base.replace(/\/$/, "");
  return "/api/chat";
}

function getApiRootFromChatUrl(): string {
  const base = process.env.NEXT_PUBLIC_CHAT_API_URL?.trim();
  if (base) return base.replace(/\/api\/chat\/?$/i, "").replace(/\/$/, "");
  return "";
}

function getInquiryApiUrl(): string {
  const root = getApiRootFromChatUrl();
  return root ? `${root}/api/inquiry` : "/api/inquiry";
}

function getInquiryDraftApiUrl(): string {
  const root = getApiRootFromChatUrl();
  return root ? `${root}/api/inquiry-draft` : "/api/inquiry-draft";
}

function buildTranscriptFromMessages(msgs: Message[], maxChars = 6000): string {
  const lines: string[] = [];
  for (const m of msgs) {
    if (m.role === "assistant" && m.content.startsWith("Dobrý den! Jsem AI asistent")) continue;
    const label = m.role === "user" ? "Zájemce" : "Asistent";
    lines.push(`[${label}]\n${m.content}`);
  }
  const text = lines.join("\n\n---\n\n");
  return text.length > maxChars ? `${text.slice(0, maxChars)}\n\n…` : text;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Dobrý den! Jsem AI asistent — pomůžu s nabídkou i s poptávkou: vy mi v chatu napíšete, co hledáte; já z toho sepíšu srozumitelný text; pak ho v sekci „E-mail paní Jedličkové“ jen zkontrolujete, doplníte svůj e-mail a jedním kliknutím to odešlete přímo jí. Jak mohu pomoci?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryText, setInquiryText] = useState("");
  const [inquiryGotcha, setInquiryGotcha] = useState("");
  const [inquirySending, setInquirySending] = useState(false);
  const [inquiryDraftLoading, setInquiryDraftLoading] = useState(false);
  const [inquiryDraftError, setInquiryDraftError] = useState(false);
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "ok" | "err">("idle");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    const apiUrl = getChatApiUrl();
    const payloadMessages = [...messages, { role: "user" as const, content: userMessage }];

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: payloadMessages,
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const errObj = data && typeof data === "object" ? (data as { error?: string }) : {};
        let reply =
          "Omlouvám se, služba chatu teď neodpovídá. Zkuste to později nebo nás kontaktujte přímo (telefon / e-mail na webu).";
        if (errObj.error === "API key not configured") {
          reply =
            "Chat není na serveru nastavený: chybí proměnná DEEPSEEK_API_KEY. U Dockeru ji přidej do souboru .env vedle docker-compose.yml a znovu spusť docker compose up. Na Vercelu ji nastav v Environment Variables.";
        } else if (response.status === 404) {
          reply =
            "Adresa API pro chat neexistuje (404). Web možná běží jen jako statické soubory bez Next serveru — nasaď projekt jako plný Next.js (nebo nastav NEXT_PUBLIC_CHAT_API_URL na funkční endpoint).";
        }
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        return;
      }

      const ok = data && typeof data === "object" ? (data as { message?: { content?: unknown } }) : null;
      const text = ok?.message?.content;
      if (typeof text !== "string") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Omlouvám se, dostali jsme neočekávanou odpověď od služby. Zkuste to znovu nebo nás kontaktujte přímo.",
          },
        ]);
        return;
      }

      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      setInquiryStatus("idle");
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Nepodařilo se spojit se serverem (síť nebo CORS). Zkontrolujte připojení; v prohlížeči musí běžet web z http(s), ne z otevřeného souboru.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fillInquiryFromChat = () => {
    setInquiryText(buildTranscriptFromMessages(messages));
    setInquiryOpen(true);
    setInquiryStatus("idle");
  };

  const fillLastAssistantMessage = () => {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role !== "assistant") continue;
      if (m.content.startsWith("Omlouvám se,") || m.content.startsWith("Nepodařilo se spojit")) continue;
      setInquiryText(m.content.trim());
      setInquiryOpen(true);
      setInquiryStatus("idle");
      return;
    }
  };

  const hasUserMessage = messages.some((m) => m.role === "user");

  const handleAiComposeInquiry = async () => {
    if (inquiryDraftLoading || !hasUserMessage) return;
    setInquiryDraftLoading(true);
    setInquiryDraftError(false);
    setInquiryOpen(true);
    setInquiryStatus("idle");
    try {
      const res = await fetch(getInquiryDraftApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = (await res.json().catch(() => null)) as { text?: string; error?: string } | null;
      if (!res.ok || !data?.text) {
        setInquiryDraftError(true);
        setInquiryText((t) => t || buildTranscriptFromMessages(messages));
        return;
      }
      setInquiryText(data.text);
    } catch {
      setInquiryDraftError(true);
      setInquiryText(buildTranscriptFromMessages(messages));
    } finally {
      setInquiryDraftLoading(false);
    }
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inquirySending) return;
    setInquirySending(true);
    setInquiryStatus("idle");
    try {
      const res = await fetch(getInquiryApiUrl(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: inquiryName.trim(),
          email: inquiryEmail.trim(),
          phone: inquiryPhone.trim(),
          message: inquiryText.trim(),
          _gotcha: inquiryGotcha,
        }),
      });
      if (!res.ok) {
        setInquiryStatus("err");
        return;
      }
      setInquiryStatus("ok");
      setInquiryText("");
      setInquiryName("");
      setInquiryEmail("");
      setInquiryPhone("");
    } catch {
      setInquiryStatus("err");
    } finally {
      setInquirySending(false);
    }
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)",
          boxShadow: "0 4px 20px rgba(201, 162, 39, 0.4)",
        }}
        aria-label="Otevřít AI asistenta"
      >
        <MessageCircle className="w-7 h-7" style={{ color: "#1a1a2e" }} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(26, 26, 46, 0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(201, 162, 39, 0.3)",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              className="p-4 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)" }}
            >
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5" style={{ color: "#1a1a2e" }} />
                <span className="font-semibold" style={{ color: "#1a1a2e" }}>
                  AI asistent
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-black/10 transition-colors cursor-pointer"
                aria-label="Zavřít"
              >
                <X className="w-5 h-5" style={{ color: "#1a1a2e" }} />
              </button>
            </div>

            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(201, 162, 39, 0.2)" }}
                    >
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm whitespace-pre-wrap ${
                      msg.role === "user" ? "text-white" : "text-white/90"
                    }`}
                    style={{
                      background:
                        msg.role === "user"
                          ? "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)"
                          : "rgba(255,255,255,0.1)",
                      color: msg.role === "user" ? "#1a1a2e" : undefined,
                    }}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201, 162, 39, 0.2)" }}
                  >
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="px-3 py-2 rounded-xl" style={{ background: "rgba(255,255,255,0.1)" }}>
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t space-y-2" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <button
                type="button"
                onClick={() => {
                  setInquiryOpen((o) => !o);
                  setInquiryStatus("idle");
                  setInquiryDraftError(false);
                }}
                className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-white/70 hover:text-white/90 transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                E-mail paní Jedličkové
                {inquiryOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <AnimatePresence>
                {inquiryOpen && (
                  <motion.form
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleInquirySubmit}
                    className="space-y-2 overflow-hidden text-xs"
                  >
                    <p className="text-white/55 leading-snug">
                      <span className="block">1) V chatu popište poptávku.</span>
                      <span className="block">2) Tlačítkem níže nechte AI napsat zprávu tak, aby dávala smysl (nebo vložte odpověď / přepis ručně).</span>
                      <span className="block">3) Zkontrolujte text, doplňte svůj e-mail — až pak klikněte „Odeslat paní Jedličkové“ (jde to na její mail).</span>
                    </p>
                    <textarea
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder="Text zprávy pro paní Jedličkovou…"
                      rows={4}
                      disabled={inquirySending || inquiryDraftLoading}
                      className="w-full px-2 py-1.5 rounded-lg text-sm text-white placeholder-white/40 bg-white/5 border border-white/10 focus:border-primary focus:outline-none resize-y min-h-[72px]"
                    />
                    <div className="flex flex-col gap-1.5">
                      <button
                        type="button"
                        onClick={handleAiComposeInquiry}
                        disabled={inquirySending || inquiryDraftLoading || !hasUserMessage}
                        className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium transition-opacity disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                        style={{
                          background: "rgba(201, 162, 39, 0.25)",
                          color: "#f5e6a8",
                        }}
                      >
                        {inquiryDraftLoading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                        ) : (
                          <Sparkles className="w-3.5 h-3.5 shrink-0" />
                        )}
                        {inquiryDraftLoading ? "Sepisuji zprávu…" : "Napsat zprávu za mě (AI)"}
                      </button>
                      {inquiryDraftError && (
                        <p className="text-amber-200/80 text-[11px] leading-snug">
                          AI text nepřišel — vložen celý přepis; upravte ho nebo zkuste znovu.
                        </p>
                      )}
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        <button
                          type="button"
                          onClick={fillLastAssistantMessage}
                          disabled={inquirySending || inquiryDraftLoading}
                          className="text-primary hover:underline disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-left"
                        >
                          Poslední odpověď asistenta
                        </button>
                        <button
                          type="button"
                          onClick={fillInquiryFromChat}
                          disabled={inquirySending || inquiryDraftLoading || !hasUserMessage}
                          className="text-primary hover:underline disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-left"
                        >
                          Celý přepis chatu
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      name="website"
                      autoComplete="off"
                      tabIndex={-1}
                      value={inquiryGotcha}
                      onChange={(e) => setInquiryGotcha(e.target.value)}
                      className="sr-only"
                      aria-hidden
                    />
                    <input
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Jméno (volitelné)"
                      disabled={inquirySending}
                      className="w-full px-2 py-1.5 rounded-lg text-sm text-white placeholder-white/40 bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                    <input
                      type="email"
                      required
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="E-mail pro odpověď *"
                      disabled={inquirySending}
                      className="w-full px-2 py-1.5 rounded-lg text-sm text-white placeholder-white/40 bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                    <input
                      type="tel"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      placeholder="Telefon (volitelné)"
                      disabled={inquirySending}
                      className="w-full px-2 py-1.5 rounded-lg text-sm text-white placeholder-white/40 bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                    />
                    {inquiryStatus === "ok" && (
                      <p className="text-emerald-400/90">
                        Odesláno paní Jedličkové. Ozve se obvykle do 24 hodin.
                      </p>
                    )}
                    {inquiryStatus === "err" && (
                      <p className="text-red-300/90">
                        Nepodařilo se odeslat. Zkuste kontakt v sekci Kontakt na stránce nebo to zkuste později.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={inquirySending || inquiryText.trim().length < 15}
                      className="w-full py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                      style={{
                        background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)",
                        color: "#1a1a2e",
                      }}
                    >
                      {inquirySending ? "Odesílám…" : "Odeslat paní Jedličkové"}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Napište zprávu..."
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 rounded-lg text-sm text-white placeholder-white/50 bg-white/5 border border-white/10 focus:border-primary focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="p-2 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #c9a227 0%, #e6b800 100%)",
                  }}
                  aria-label="Odeslat"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#1a1a2e" }} />
                  ) : (
                    <Send className="w-5 h-5" style={{ color: "#1a1a2e" }} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
