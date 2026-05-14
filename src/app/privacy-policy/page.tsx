import type { Metadata } from "next";
import IubendaEmbed from "@/components/legal/IubendaEmbed";

export const metadata: Metadata = {
  title: "Privacy Policy | Freyr Technology",
  description: "Informativa sul trattamento dei dati personali di Freyr Technology S.r.l.",
  robots: { index: true, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 5vw 80px", background: "#0D0F14" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F4F3EE", marginBottom: 32 }}>
          Privacy Policy
        </h1>
        <IubendaEmbed
          policyId="53946882"
          type="privacy"
          linkText="Privacy Policy"
        />
      </div>
    </main>
  );
}
