"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const benefits = [
  {
    emoji: "↗",
    title: "Più controllo operativo",
    text: "Le informazioni diventano più leggibili e i flussi più governabili, così è più facile capire cosa sta succedendo davvero.",
  },
  {
    emoji: "◌",
    title: "Meno dispersione quotidiana",
    text: "Richieste, dati e attività ripetitive pesano meno sul team e smettono di occupare energia che potresti usare meglio.",
  },
  {
    emoji: "≈",
    title: "Più continuità nel lavoro",
    text: "Un supporto AI ben costruito aiuta a mantenere ordine e ritmo anche quando la giornata si complica e tutto accelera.",
  },
  {
    emoji: "+",
    title: "Più tempo utile per decidere",
    text: "Riducendo passaggi inutili e segnali dispersi, resta più spazio per seguire clienti, qualità e scelte importanti.",
  },
];

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
  fontFamily: "'Syne', sans-serif",
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
  background: "#0D0F14",
  border: "1px solid rgba(244,243,238,0.10)",
  borderRadius: "16px",
  padding: "28px",
};

export default function BenefitsSection() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      style={{
        background: "#13161C",
        paddingTop: isDesktop ? "80px" : "48px",
        paddingBottom: isDesktop ? "80px" : "48px",
        paddingLeft: isDesktop ? "24px" : "16px",
        paddingRight: isDesktop ? "24px" : "16px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease }}
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <div style={eyebrowStyle}>Cosa cambia</div>
          <h2 style={{ ...headingStyle, marginTop: "20px" }}>
            Cosa cambia, nella pratica
          </h2>
          <p style={{ ...bodyStyle, marginTop: "20px" }}>
            Non più tecnologia da osservare. Ma un aiuto reale per lavorare meglio.
          </p>
          <p style={{ ...bodyStyle, marginTop: "16px" }}>
            Il beneficio non è avere uno strumento in più. È togliere peso a una
            parte del lavoro che oggi assorbe energie, attenzione e tempo:
            rispondere prima, tenere più ordine, leggere meglio l&apos;andamento
            dell&apos;attività e accorgersi prima di trend o criticità.
          </p>
        </motion.div>

        <div
          style={{
            marginTop: "48px",
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(2, 1fr)" : "1fr",
            gap: "20px",
          }}
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: 0.08 * index }}
              style={cardStyle}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "8px",
                  background: "rgba(75,107,251,0.12)",
                  border: "1px solid rgba(75,107,251,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  marginBottom: "16px",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                }}
              >
                {benefit.emoji}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "#F4F3EE",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}
              >
                {benefit.title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "rgba(244,243,238,0.60)",
                }}
              >
                {benefit.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
