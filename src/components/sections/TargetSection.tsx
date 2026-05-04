"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const categories = [
  "Hotel e strutture ricettive",
  "Ristoranti e locali",
  "Parrucchieri e barber shop",
  "Centri estetici e wellness",
  "Negozi e retail",
  "Liberi professionisti",
  "Attività con prenotazioni",
  "Servizi delivery",
  "Pizzerie e locali ad alta operatività",
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

const pillStyle: CSSProperties = {
  background: "#13161C",
  border: "1px solid rgba(244,243,238,0.10)",
  borderRadius: "9999px",
  padding: "10px 20px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "rgba(244,243,238,0.70)",
  lineHeight: 1,
  whiteSpace: "nowrap",
};

const ctaStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "14px 28px",
  borderRadius: "12px",
  background: "transparent",
  color: "#F4F3EE",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  lineHeight: 1,
  border: "1px solid rgba(244,243,238,0.18)",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
};

export default function TargetSection() {
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
          style={{ maxWidth: "680px" }}
        >
          <div style={eyebrowStyle}>A chi si rivolge</div>
          <h2 style={{ ...headingStyle, marginTop: "20px" }}>
            Ogni attività ha flussi diversi. Ma molte difficoltà sono
            sorprendentemente simili.
          </h2>
          <p style={{ ...bodyStyle, marginTop: "20px" }}>
            FreyrtechnologyAI lavora con imprese locali e PMI che ogni giorno devono
            coordinare persone, clienti, richieste e informazioni.
          </p>
        </motion.div>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.55, ease, delay: 0.08 * index }}
            >
              <span style={pillStyle}>{cat}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease, delay: 0.2 }}
          style={{ marginTop: "40px" }}
        >
          <Link
            href="/casi-studio"
            style={ctaStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(244,243,238,0.08)";
              e.currentTarget.style.borderColor = "rgba(244,243,238,0.30)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(244,243,238,0.18)";
            }}
          >
            Vedi un esempio concreto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
