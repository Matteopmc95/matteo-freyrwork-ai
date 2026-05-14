import type { Metadata } from "next";
import IubendaEmbed from "@/components/legal/IubendaEmbed";

export const metadata: Metadata = {
  title: "Termini e Condizioni | Freyr Technology",
  description: "Termini e Condizioni d'uso dei servizi di Freyr Technology S.r.l.",
  robots: { index: true, follow: false },
};

export default function TerminiCondizioniPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 5vw 80px", background: "#0D0F14" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F4F3EE", marginBottom: 32 }}>
          Termini e Condizioni
        </h1>
        <IubendaEmbed
          policyId="IUBENDA_TERMS_ID"
          type="terms"
          linkText="Termini e Condizioni"
        />
      </div>
    </main>
  );
}
