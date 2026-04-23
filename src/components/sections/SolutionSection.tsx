"use client";

import type { CSSProperties, ComponentType } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const genericPoints = [
  "Risponde solo quando la interroghi",
  "Non conosce la tua attività",
  "Uguale per tutti",
];

const freyrworkPoints = [
  "Lavora attivamente sui tuoi flussi",
  "Costruito sul tuo contesto",
  "Adattabile per la tua realtà",
];

const sectionStyle: CSSProperties = {
  background: "#13161C",
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

const baseCardStyle: CSSProperties = {
  background: "#0D0F14",
  borderRadius: "16px",
  padding: "28px",
};

const ctaStyle: CSSProperties = {
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
  lineHeight: 1,
  transition: "background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
};

type ComparisonCardProps = {
  accent: boolean;
  headerColor: string;
  icon: ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  items: string[];
  label: string;
  listIcon: ComponentType<{ size?: number; color?: string }>;
  listIconColor: string;
};

function ComparisonCard({
  accent,
  headerColor,
  icon: HeaderIcon,
  iconColor,
  items,
  label,
  listIcon: ListIcon,
  listIconColor,
}: ComparisonCardProps) {
  return (
    <div
      style={{
        ...baseCardStyle,
        border: accent
          ? "1px solid rgba(75,107,251,0.35)"
          : "1px solid rgba(244,243,238,0.10)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: headerColor,
        }}
      >
        <HeaderIcon size={20} color={iconColor} />
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.12em",
            lineHeight: 1,
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
            }}
          >
            <div style={{ paddingTop: "1px", flexShrink: 0 }}>
              <ListIcon size={16} color={listIconColor} />
            </div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "rgba(244,243,238,0.70)",
              }}
            >
              {item}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SolutionSection() {
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, ease }}
          className="mx-auto text-center"
          style={{ maxWidth: "680px" }}
        >
          <div style={eyebrowStyle}>La soluzione</div>

          <h2 className="mt-5" style={headingStyle}>
            Un collaboratore AI non ti complica il lavoro. Ti aiuta a
            governarlo meglio.
          </h2>

          <p className="mt-5" style={bodyStyle}>
            Un agente AI costruito bene è un collaboratore virtuale operativo
            che può aiutarti a fare ordine, gestire informazioni, leggere meglio
            i dati e restituirti un supporto concreto nelle attività di tutti i
            giorni.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease, delay: 0.15 }}
          className="mx-auto"
          style={{
            marginTop: "40px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: isDesktop ? "row" : "column",
              gap: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <ComparisonCard
                accent={false}
                headerColor="rgba(244,243,238,0.40)"
                icon={X}
                iconColor="#E35D6A"
                items={genericPoints}
                label="AI generica"
                listIcon={Minus}
                listIconColor="rgba(244,243,238,0.40)"
              />
            </div>

            <div style={{ flex: 1 }}>
              <ComparisonCard
                accent
                headerColor="#7B94FC"
                icon={Check}
                iconColor="#7B94FC"
                items={freyrworkPoints}
                label="Agente AI Freyrwork"
                listIcon={Check}
                listIconColor="#7B94FC"
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease, delay: 0.22 }}
          className="mt-10 flex justify-center"
        >
          <Link
            href="/servizi"
            style={ctaStyle}
            onMouseEnter={(event) => {
              event.currentTarget.style.background = "#7B94FC";
              event.currentTarget.style.boxShadow =
                "0 0 32px rgba(75,107,251,0.40)";
              event.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.background = "#4B6BFB";
              event.currentTarget.style.boxShadow = "none";
              event.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Scopri il tuo collaboratore AI
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
