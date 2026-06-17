"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

interface ShareButtonProps {
  readonly title: string;
  readonly text?: string;
  readonly className?: string;
}

export default function ShareButton({ title, text, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareText = text ?? title;

    if (
      typeof window !== "undefined" &&
      typeof window.navigator !== "undefined" &&
      typeof window.navigator.share === "function"
    ) {
      try {
        await window.navigator.share({
          title,
          text: shareText,
          url,
        });
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
      }
    }

    if (typeof window !== "undefined" && typeof window.navigator !== "undefined" && typeof window.navigator.clipboard !== "undefined") {
      try {
        await window.navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // fallback: open mailto or leave as is
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-primary/50 hover:bg-primary/5 text-dark transition-colors duration-200 cursor-pointer ${className}`}
      aria-label={copied ? "Odkaz zkopírován" : "Sdílet nabídku"}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-primary" aria-hidden />
          <span>Zkopírováno</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" aria-hidden />
          <span>Sdílet</span>
        </>
      )}
    </button>
  );
}
