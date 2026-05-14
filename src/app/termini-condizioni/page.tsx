import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Freyr Technology",
  description: "Termini e Condizioni d'uso dei servizi di Freyr Technology S.r.l.",
  robots: { index: false, follow: false },
};

export default function TerminiCondizioniPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 5vw 80px", background: "#0D0F14" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F4F3EE", marginBottom: 32 }}>
          Termini e Condizioni
        </h1>
        <p style={{ color: "rgba(244,243,238,0.75)", fontFamily: "Inter, sans-serif", fontSize: 18, lineHeight: 1.7, marginBottom: 24 }}>
          I Termini e Condizioni d&apos;uso sono in fase di redazione e saranno pubblicati a breve.
        </p>
        <p style={{ color: "rgba(244,243,238,0.55)", fontFamily: "Inter, sans-serif", fontSize: 15, lineHeight: 1.7 }}>
          Per informazioni contrattuali specifiche scrivici a{" "}
          <a href="mailto:info@freyrtechnology.it" style={{ color: "#7B94FC", textDecoration: "none" }}>
            info@freyrtechnology.it
          </a>
        </p>
      </div>
    </main>
  );
}
