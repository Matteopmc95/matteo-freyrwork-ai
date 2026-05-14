import type { Metadata } from "next";
import IubendaEmbed from "@/components/legal/IubendaEmbed";

export const metadata: Metadata = {
  title: "Cookie Policy | Freyr Technology",
  description: "Informativa sull'uso dei cookie di Freyr Technology S.r.l.",
  robots: { index: true, follow: false },
};

export default function CookiePolicyPage() {
  return (
    <main style={{ minHeight: "100vh", padding: "120px 5vw 80px", background: "#0D0F14" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#F4F3EE", marginBottom: 32 }}>
          Cookie Policy
        </h1>
        <IubendaEmbed
          policyId="IUBENDA_PRIVACY_ID"
          type="cookie"
          linkText="Cookie Policy"
        />
      </div>
    </main>
  );
}
