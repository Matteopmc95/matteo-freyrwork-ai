"use client";

import { useEffect } from "react";

interface IubendaEmbedProps {
  policyId: string;
  type: "privacy" | "cookie";
  linkText: string;
}

export default function IubendaEmbed({ policyId, type, linkText }: IubendaEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        // script già rimosso
      }
    };
  }, []);

  const href =
    type === "cookie"
      ? `https://www.iubenda.com/privacy-policy/${policyId}/cookie-policy`
      : `https://www.iubenda.com/privacy-policy/${policyId}`;

  return (
    <div style={{ color: "#F4F3EE", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
      <a
        href={href}
        className="iubenda-white iubenda-noiframe iubenda-embed iub-no-markup iub-body-embed"
        title={linkText}
      >
        {linkText}
      </a>
    </div>
  );
}
