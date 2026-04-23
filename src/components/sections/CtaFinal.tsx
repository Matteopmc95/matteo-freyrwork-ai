"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const headingStyle: CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 800,
  fontSize: "clamp(28px, 4.5vw, 48px)",
  letterSpacing: "-0.025em",
  lineHeight: 1.08,
  color: "#F4F3EE",
};

const subStyle: CSSProperties = {
  fontFamily: "'Syne', sans-serif",
  fontWeight: 600,
  fontSize: "clamp(16px, 2vw, 20px)",
  letterSpacing: "-0.01em",
  lineHeight: 1.3,
  color: "rgba(244,243,238,0.70)",
};

const bodyStyle: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  lineHeight: 1.75,
  color: "rgba(244,243,238,0.60)",
};

const ctaPrimaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "16px 32px",
  borderRadius: "12px",
  background: "#4B6BFB",
  color: "#FFFFFF",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: 1,
  transition: "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
};

const ctaSecondaryStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 32px",
  borderRadius: "12px",
  background: "transparent",
  color: "#F4F3EE",
  fontFamily: "Inter, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: 1,
  border: "1px solid rgba(244,243,238,0.18)",
  transition: "background-color 0.2s ease, border-color 0.2s ease",
};

export default function CtaFinal() {
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
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "rgba(75,107,251,0.12)",
              border: "1px solid rgba(75,107,251,0.30)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            💬
          </div>

          <h2 style={headingStyle}>
            Capire se può servirti è più semplice di quanto pensi
          </h2>

          <p style={subStyle}>
            Non serve partire da una soluzione. Basta partire da un problema
            reale.
          </p>

          <p style={bodyStyle}>
            Se senti che nella tua attività ci sono troppe cose da rincorrere,
            parliamone in modo semplice. Senza teoria superflua.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              gap: "12px",
              alignItems: "center",
              width: isDesktop ? "auto" : "100%",
              maxWidth: isDesktop ? "none" : "320px",
              marginTop: "8px",
            }}
          >
            <Link
              href="/contatti"
              style={{
                ...ctaPrimaryStyle,
                width: isDesktop ? "auto" : "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#7B94FC";
                e.currentTarget.style.boxShadow = "0 0 32px rgba(75,107,251,0.40)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#4B6BFB";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Prenota una consulenza
            </Link>
            <Link
              href="/contatti"
              style={{
                ...ctaSecondaryStyle,
                width: isDesktop ? "auto" : "100%",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(244,243,238,0.08)";
                e.currentTarget.style.borderColor = "rgba(244,243,238,0.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(244,243,238,0.18)";
              }}
            >
              Analizziamo il tuo caso
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
