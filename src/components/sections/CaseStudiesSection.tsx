"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const cases = [
  {
    sector: "Hotel / Ospitalità",
    title: "Gestione richieste e prenotazioni più ordinata",
    text: "Le informazioni arrivano da più canali e il team rischia di rincorrere conferme, richieste ricorrenti e dettagli utili ai clienti.",
    outcome: "Più rapidità nella gestione, meno dispersione e maggiore continuità operativa.",
    href: "/casi-studio",
    cta: "Scopri il caso completo",
  },
  {
    sector: "Ristorazione",
    title: "Meno attrito nei momenti di maggiore intensità",
    text: "Telefonate, messaggi, prenotazioni e cambi last minute possono appesantire il lavoro e aumentare il rischio di sovrapposizioni.",
    outcome: "Più ordine nella gestione, meno caos operativo e maggiore efficienza quotidiana.",
    href: "/casi-studio",
    cta: "Vedi un esempio concreto",
  },
  {
    sector: "Beauty / Prenotazioni",
    title: "Appuntamenti e informazioni più fluidi da gestire",
    text: "Quando richieste, modifiche e conferme ricadono sempre sulle stesse persone, l'organizzazione diventa più fragile.",
    outcome: "Più fluidità, meno interruzioni e maggiore qualità organizzativa.",
    href: "/casi-studio",
    cta: "Guarda il caso studio",
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
  background: "#13161C",
  border: "1px solid rgba(244,243,238,0.10)",
  borderRadius: "20px",
  padding: "28px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  minHeight: "100%",
};

const linkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "#7B94FC",
  textDecoration: "none",
};

export default function CaseStudiesSection() {
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
        background: "#0D0F14",
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
          style={{ maxWidth: "760px" }}
        >
          <div style={eyebrowStyle}>Casi studio</div>
          <h2 style={{ ...headingStyle, marginTop: "20px" }}>
            L&apos;AI ha senso quando si vede all&apos;opera
          </h2>
          <p style={{ ...bodyStyle, marginTop: "20px" }}>
            Per capire davvero il valore di un collaboratore AI bisogna guardare
            come viene applicato nei casi reali. Qui trovi esempi pensati per
            mostrare in modo semplice come un agente AI può intervenire in
            contesti diversi.
          </p>
        </motion.div>

        <div
          style={{
            marginTop: "40px",
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(3, minmax(0, 1fr))" : "1fr",
            gap: "20px",
          }}
        >
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: index * 0.08 }}
              style={cardStyle}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignSelf: "flex-start",
                  padding: "6px 12px",
                  borderRadius: "9999px",
                  background: "rgba(75,107,251,0.10)",
                  border: "1px solid rgba(75,107,251,0.25)",
                  color: "#7B94FC",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {item.sector}
              </span>

              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#F4F3EE",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {item.title}
              </h3>

              <p style={bodyStyle}>{item.text}</p>

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(244,243,238,0.56)",
                }}
              >
                {item.outcome}
              </p>

              <Link href={item.href} style={linkStyle}>
                {item.cta}
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease, delay: 0.18 }}
          style={{ marginTop: "36px" }}
        >
          <Link
            href="/casi-studio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "14px 28px",
              borderRadius: "12px",
              background: "#4B6BFB",
              color: "#FFFFFF",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Guarda i casi studio
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
