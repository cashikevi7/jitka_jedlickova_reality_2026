"use client";

import { Clock, Phone, User } from "lucide-react";

export default function TrustBadge() {
  return (
    <div
      className="py-10 md:py-14"
      style={{ background: "var(--color-sand)" }}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 text-center">
          <div className="flex flex-col items-center gap-2">
            <User
              className="w-6 h-6"
              style={{ color: "var(--color-terracotta)" }}
              aria-hidden="true"
            />
            <p
              className="font-heading text-lg font-semibold"
              style={{ color: "var(--color-espresso)" }}
            >
              Jedna osoba
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Jitka je váš jediný kontakt od&nbsp;začátku do&nbsp;konce. Žádné
              přepojování na&nbsp;asistentku.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Phone
              className="w-6 h-6"
              style={{ color: "var(--color-terracotta)" }}
              aria-hidden="true"
            />
            <p
              className="font-heading text-lg font-semibold"
              style={{ color: "var(--color-espresso)" }}
            >
              Jeden kontakt
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Vše vyřídíte s&nbsp;jedním člověkem — telefonicky, e-mailem
              nebo&nbsp;osobně.
            </p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Clock
              className="w-6 h-6"
              style={{ color: "var(--color-terracotta)" }}
              aria-hidden="true"
            />
            <p
              className="font-heading text-lg font-semibold"
              style={{ color: "var(--color-espresso)" }}
            >
              Odpověď do 24 hodin
            </p>
            <p className="text-sm" style={{ color: "var(--color-muted)" }}>
              Na zprávy a poptávky odpovídám obvykle ještě ten&nbsp;samý den.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
