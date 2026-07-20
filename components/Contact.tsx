"use client";

import {
  CheckCircle,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const JITKA_PHOTO = "/images/Jitka/jitka1.webp";
const FORMSPREE_FORM_ID = "xeepeadb";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        `https://formspree.io/f/${FORMSPREE_FORM_ID}`,
        {
          method: "POST",
          body: data,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Došlo k chybě. Zkuste to znovu nebo mi zavolejte.");
      }
    } catch {
      alert("Došlo k chybě. Zkuste to znovu nebo mi zavolejte.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <section
        id="kontakt"
        className="py-20 md:py-28"
        style={{ background: "var(--color-sand)" }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <CheckCircle
              className="w-16 h-16 mx-auto mb-6"
              style={{ color: "var(--color-terracotta)" }}
            />
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--color-espresso)" }}>
              Děkuji za zprávu!
            </h2>
            <p className="mb-6" style={{ color: "var(--color-muted)" }}>
              Ozvu se vám co nejdříve, obvykle do 24 hodin.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="font-medium cursor-pointer hover:underline"
              style={{ color: "var(--color-terracotta)" }}
            >
              Odeslat další zprávu
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="kontakt"
      className="py-20 md:py-28"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <p className="section-label">Kontakt</p>
        <h2 className="section-title mb-3">Domluvme si nezávaznou schůzku</h2>
        <p
          className="section-lead mb-14 max-w-xl"
        >
          Ráda vás poznám osobně — u kávy, u vás doma, nebo online. Jedna
          osoba, jeden kontakt, žádné přepojování.
        </p>

        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-start">
          {/* Levá — portrét */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div
              className="relative w-48 h-56 md:w-full md:aspect-3/4 rounded-2xl overflow-hidden"
              style={{
                boxShadow: "0 20px 50px -12px rgba(44, 36, 22, 0.2)",
              }}
            >
              <Image
                src={JITKA_PHOTO}
                alt="Jitka Jedličková"
                fill
                sizes="(max-width: 768px) 192px, 40vw"
                className="object-cover"
              />
            </div>

            <div className="mt-6 space-y-3 text-center md:text-left">
              <a
                href="tel:+420608713632"
                className="flex items-center gap-3 font-medium transition-colors cursor-pointer"
                style={{ color: "var(--color-espresso)" }}
              >
                <Phone className="w-5 h-5 shrink-0" style={{ color: "var(--color-terracotta)" }} />
                +420 608 713 632
              </a>
              <a
                href="mailto:jedlickova@reality-proradost.cz"
                className="flex items-center gap-3 font-medium transition-colors cursor-pointer"
                style={{ color: "var(--color-espresso)" }}
              >
                <Mail className="w-5 h-5 shrink-0" style={{ color: "var(--color-terracotta)" }} />
                jedlickova@reality-proradost.cz
              </a>
              <div
                className="flex items-center gap-3"
                style={{ color: "var(--color-muted)" }}
              >
                <MapPin className="w-5 h-5 shrink-0" style={{ color: "var(--color-terracotta)" }} />
                Moravský Krumlov
              </div>
            </div>

            <p
              className="mt-6 text-sm italic leading-relaxed text-center md:text-left"
              style={{ color: "var(--color-muted)" }}
            >
              „Odpovím do 24 hodin. A pokud to bude dřív, tím lépe — nemám ráda
              čekání.“
            </p>
          </div>

          {/* Pravá — formulář */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-7 md:p-10 rounded-2xl"
              style={{
                background: "var(--color-warm-white)",
                border: "1px solid var(--color-clay)",
                boxShadow: "0 8px 32px rgba(44, 36, 22, 0.04)",
              }}
            >
              <h3
                className="font-heading text-lg font-semibold mb-2"
                style={{ color: "var(--color-espresso)" }}
              >
                Napište mi
              </h3>
              <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
                Stačí pár údajů a ozvu se vám.
              </p>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-espresso)" }}
                >
                  Vaše křestní jméno
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-clay)",
                    background: "var(--color-cream)",
                    color: "var(--color-espresso)",
                  }}
                  placeholder="např. Jana"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-espresso)" }}
                >
                  Telefon nebo e-mail
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border outline-none transition-colors"
                  style={{
                    borderColor: "var(--color-clay)",
                    background: "var(--color-cream)",
                    color: "var(--color-espresso)",
                  }}
                  placeholder="vas@email.cz nebo 777 123 456"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-espresso)" }}
                >
                  S čím vám mohu pomoci?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 rounded-lg border outline-none resize-y min-h-[100px] transition-colors"
                  style={{
                    borderColor: "var(--color-clay)",
                    background: "var(--color-cream)",
                    color: "var(--color-espresso)",
                  }}
                  placeholder="Napište mi klidně jednou větou — prodej, pronájem, nebo odhad?"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg font-semibold cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: "var(--color-terracotta)",
                  color: "white",
                  boxShadow: "0 4px 16px rgba(193, 127, 89, 0.25)",
                }}
              >
                {isLoading ? "Odesílám..." : "Domluvit schůzku"}
              </button>

              <p
                className="text-xs text-center"
                style={{ color: "var(--color-muted-light)" }}
              >
                Odesláním souhlasíte se zpracováním osobních údajů.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
