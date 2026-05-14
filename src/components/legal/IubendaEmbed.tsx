"use client";

import { useEffect } from "react";

interface IubendaEmbedProps {
  policyId: string;
  type: "privacy" | "cookie" | "terms";
  linkText: string;
}

export default function IubendaEmbed({ policyId, type, linkText }: IubendaEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.iubenda.com/iubenda.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const href =
    type === "terms"
      ? `https://www.iubenda.com/termini-e-condizioni/${policyId}`
      : type === "cookie"
      ? `https://www.iubenda.com/privacy-policy/${policyId}/cookie-policy`
      : `https://www.iubenda.com/privacy-policy/${policyId}`;

  const className =
    type === "terms"
      ? "iub-terms-and-conditions iubenda-white iubenda-noiframe iubenda-embed"
      : "iubenda-white iubenda-noiframe iubenda-embed iub-no-markup iub-body-embed";

  return (
    <div style={{ color: "#F4F3EE", fontFamily: "Inter, sans-serif", lineHeight: 1.7 }}>
      <a href={href} className={className} title={linkText}>
        {linkText}
      </a>
    </div>
  );
}
