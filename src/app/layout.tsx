import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://freyrtechnology.ai"),
  title: "FreyrtechnologyAI — Collaboratori AI per PMI",
  description:
    "Agenti AI concreti per piccole e medie imprese. Gestisci richieste, processi e dati con un collaboratore digitale costruito sulla tua attività.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FreyrtechnologyAI — Collaboratori AI per PMI",
    description:
      "Agenti AI concreti per piccole e medie imprese. Gestisci richieste, processi e dati con un collaboratore digitale costruito sulla tua attività.",
    url: "https://freyrtechnology.ai",
    siteName: "FreyrtechnologyAI",
    type: "website",
    locale: "it_IT",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-770W824WND"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-770W824WND');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
