"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock3, LayoutGrid, TrendingDown } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cards = [
  {
    Icon: Clock3,
    title: "Tempo disperso",
    text: "Attività ripetitive, risposte da dare, informazioni da recuperare. Ore spese su cose che non fanno crescere l'attività.",
  },
  {
    Icon: LayoutGrid,
    title: "Informazioni sparse",
    text: "Dati su fogli, messaggi su WhatsApp, appunti ovunque. Nessuna visione d'insieme chiara.",
  },
  {
    Icon: TrendingDown,
    title: "Opportunità perse",
    text: "Senza controllo sui dati e sui flussi, le decisioni arrivano tardi. E alcune occasioni non tornano.",
  },
];

const sectionStyle: CSSProperties = {
  background: "#0D0F14",
};

const eyebrowStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  borderRadius: "9999px",
  border: "1px solid rgba(75,107,251,0.35)",
  background: "rgba(75,107,251,0.10)",
  color: "#7B94FC",
  fontFamily: "Inter, sans-serif",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  lineHeight: 1,
};

const headingStyle: CSSProperties = {
  fontFamily: "var(--font-display), 'Syne', sans-serif",
  fontWeight: 700,
  fontSize: "clamp(28px, 4vw, 44px)",
  letterSpacing: "-0.02em",
  lineHeight: 1.08,
  color: "#F4F3EE",
};

const bodyStyle: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.75,
  color: "rgba(244,243,238,0.70)",
};

const cardStyle: CSSProperties = {
  background: "#13161C",
  border: "1px solid rgba(244,243,238,0.10)",
  borderRadius: "16px",
  padding: "24px",
};

const iconWrapStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  background: "rgba(75,107,251,0.12)",
  color: "#7B94FC",
};

const cardTitleStyle: CSSProperties = {
  fontFamily: "var(--font-display), 'Syne', sans-serif",
  fontSize: "15px",
  fontWeight: 600,
  lineHeight: 1.2,
  color: "#F4F3EE",
};

const cardTextStyle: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "13px",
  lineHeight: 1.6,
  color: "rgba(244,243,238,0.60)",
};

export default function ProblemSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return (
    <section
      className="px-4 md:px-6"
      style={{
        ...sectionStyle,
        paddingTop: isDesktop ? "80px" : "48px",
        paddingBottom: isDesktop ? "80px" : "48px",
      }}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: isDesktop ? "flex-start" : "stretch",
            gap: isDesktop ? "48px" : "32px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease }}
            style={{
              width: isDesktop ? "55%" : "100%",
              maxWidth: isDesktop ? "unset" : "720px",
            }}
          >
            <div style={eyebrowStyle}>Il problema</div>

            <h2 className="mt-5" style={headingStyle}>
              Il problema spesso non è quanto lavori. È quanta energia perdi nel
              farlo.
            </h2>

            <p className="mt-5" style={bodyStyle}>
              Quando le attività si moltiplicano e le informazioni restano
              sparse, anche gestire l&apos;ordinario diventa più pesante del
              necessario.
            </p>

            <p className="mt-5" style={bodyStyle}>
              Molte piccole e medie imprese convivono ogni giorno con la stessa
              situazione: richieste che arrivano da più parti, appuntamenti da
              confermare, clienti da richiamare, dati presenti ma difficili da
              interpretare, operazioni ripetitive che rubano tempo e
              concentrazione. Nel tempo, questa gestione frammentata ha un costo
              molto concreto: rallenta il lavoro, rende più difficile avere una
              visione chiara e porta a perdere opportunità.
            </p>
          </motion.div>

          <div
            style={{
              width: isDesktop ? "45%" : "100%",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            {cards.map((card, index) => {
              const Icon = card.Icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.55,
                    ease,
                    delay: 0.08 * index,
                  }}
                  style={cardStyle}
                >
                  <div style={iconWrapStyle}>
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4" style={cardTitleStyle}>
                    {card.title}
                  </h3>

                  <p className="mt-3" style={cardTextStyle}>
                    {card.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
