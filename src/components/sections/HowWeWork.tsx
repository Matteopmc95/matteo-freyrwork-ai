"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const steps = [
  {
    number: "01",
    title: "Ascoltiamo",
    text: "Come funziona oggi la tua attività.",
  },
  {
    number: "02",
    title: "Analizziamo",
    text: "I flussi e i punti critici.",
  },
  {
    number: "03",
    title: "Adattiamo",
    text: "Il collaboratore AI al tuo contesto.",
  },
  {
    number: "04",
    title: "Accompagniamo",
    text: "L'implementazione passo dopo passo.",
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

export default function HowWeWork() {
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
          style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}
        >
          <div style={eyebrowStyle}>Come lavoriamo</div>
          <h2 style={{ ...headingStyle, marginTop: "20px" }}>
            Non ti lasciamo da solo davanti a uno strumento
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(244,243,238,0.70)",
              marginTop: "20px",
            }}
          >
            FreyrtechnologyAI accompagna l&apos;azienda passo dopo passo, dalla
            comprensione del problema fino all&apos;applicazione concreta.
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(244,243,238,0.58)",
              marginTop: "14px",
            }}
          >
            Il nostro approccio parte sempre dalla realtà dell&apos;attività,
            non dalla tecnologia in sé. L&apos;obiettivo non è impressionare con
            l&apos;innovazione, ma rendere più semplice il lavoro.
          </p>
        </motion.div>

        <div
          style={{
            marginTop: "56px",
            display: "grid",
            gridTemplateColumns: isDesktop ? "repeat(4, 1fr)" : "1fr",
            gap: isDesktop ? "24px" : "20px",
            position: "relative",
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease, delay: 0.08 * index }}
              style={{
                background: "#13161C",
                border: "1px solid rgba(244,243,238,0.10)",
                borderRadius: "16px",
                padding: "28px",
                position: "relative",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#4B6BFB",
                  marginBottom: "16px",
                  lineHeight: 1,
                }}
              >
                {step.number}
              </div>
              <div
                style={{
                  width: "1px",
                  height: "32px",
                  background: "rgba(75,107,251,0.30)",
                  marginBottom: "16px",
                }}
              />
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "#F4F3EE",
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  lineHeight: 1.65,
                  color: "rgba(244,243,238,0.60)",
                }}
              >
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
