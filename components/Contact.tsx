"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, Instagram, CheckCircle } from "lucide-react";
import Image from "next/image";

const JITKA_PHOTO = "/images/Jitka/jitka1.webp";
const FORMSPREE_FORM_ID = "xeepeadb"; // Formspree form ID

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: "POST",
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

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
      <section id="kontakt" className="py-16 md:py-24" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h2 className="text-2xl font-semibold text-white mb-4">Děkuji za zprávu!</h2>
            <p className="text-white/70 mb-6">Ozvu se vám co nejdříve, obvykle do 24 hodin.</p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary hover:underline cursor-pointer"
            >
              Odeslat další zprávu
            </button>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section id="kontakt" className="py-16 md:py-24" style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="section-title mb-2" style={{ color: 'white' }}>Kontaktujte mě</h2>
        <p className="section-lead mb-10" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Domluvte si nezávaznou konzultaci. Odpovím vám obvykle do 24 hodin.
        </p>

        <div 
          className="p-8 rounded-2xl mb-10"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0" style={{
              border: '3px solid #c9a227',
              boxShadow: '0 8px 24px rgba(201, 162, 39, 0.3)',
            }}>
              <Image
                src={JITKA_PHOTO}
                alt="Jitka Jedličková"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-xl font-semibold mb-1">Jitka Jedličková</h3>
              <p className="text-primary font-medium mb-4">Realitní makléřka</p>
              <p className="text-white/70 text-sm mb-6">
                Jedna osoba, jeden kontakt. Žádné přepojování. 
                Ráda vám pomohu s prodejem, koupí i pronájmem nemovitostí.
              </p>
              
              <div className="space-y-3">
                <a
                  href="tel:+420608713632"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium">+420 608 713 632</span>
                </a>
                <a
                  href="mailto:jedlickova@reality-proradost.cz"
                  className="flex items-center gap-3 text-white hover:text-primary transition-colors duration-200 cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-medium">jedlickova@reality-proradost.cz</span>
                </a>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-primary shrink-0" />
                  <span>Moravský Krumlov</span>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 mt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <a
                  href="https://facebook.com/profile.php?id=61562180164190"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-2.5 rounded-full border border-white/20 text-white hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/jitkajedlickova6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-2.5 rounded-full border border-white/20 text-white hover:border-primary hover:text-primary transition-all duration-200 cursor-pointer"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-8 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <h3 className="text-white text-lg font-semibold mb-6">Napište mi zprávu</h3>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                Jméno a příjmení
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                placeholder="Vaše jméno"
              />
            </div>
            <div>
              <label
                htmlFor="contact-email"
                className="block text-sm font-medium text-white/80 mb-2"
              >
                E-mail
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors duration-200"
                placeholder="vas@email.cz"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-white/80 mb-2"
            >
              Zpráva
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y min-h-[120px] transition-colors duration-200"
              placeholder="Napište, s čím vám mám pomoci..."
            />
          </div>
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-4 rounded-lg font-semibold text-dark cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, #c9a227 0%, #e6b800 100%)',
              boxShadow: '0 4px 16px rgba(201, 162, 39, 0.3)',
            }}
          >
            {isLoading ? "Odesílám..." : "Odeslat zprávu"}
          </button>
        </form>
      </div>
    </section>
  );
}
