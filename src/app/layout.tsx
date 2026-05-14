import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { OrganizationSchema, WebsiteSchema } from "@/components/SchemaMarkup";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://freyrtechnology.ai"),
  title: {
    default: "Agenti AI per la tua azienda",
    template: "%s | FreyrtechnologyAI",
  },
  description:
    "Sviluppiamo agenti AI personalizzati per hotel, ristoranti, saloni, retail e professionisti. Automazione di prenotazioni, supporto operativo, analisi dati e flussi interni. Soluzioni concrete per il lavoro di tutti i giorni.",
  keywords: [
    "agenti AI",
    "intelligenza artificiale PMI",
    "automazione AI Italia",
    "AI per hotel",
    "AI per ristoranti",
    "chatbot AI",
    "agenti AI personalizzati",
    "AI per piccole imprese",
    "automazione prenotazioni AI",
    "AI per saloni",
  ],
  authors: [{ name: "FreyrtechnologyAI" }],
  creator: "FreyrtechnologyAI",
  publisher: "FreyrtechnologyAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://freyrtechnology.ai",
    siteName: "FreyrtechnologyAI",
    title: "Agenti AI per la tua azienda",
    description:
      "Agenti AI personalizzati per automazione di prenotazioni, supporto operativo, analisi dati e flussi interni. Per hotel, ristoranti, saloni, retail e professionisti.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agenti AI per la tua azienda",
    description:
      "Agenti AI personalizzati per automazione di prenotazioni, supporto operativo, analisi dati e flussi interni.",
  },
  alternates: {
    canonical: "https://freyrtechnology.ai",
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
        <OrganizationSchema />
        <WebsiteSchema />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
