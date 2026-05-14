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
        {/* Iubenda Cookie Solution — deve stare prima di GA */}
        <Script id="iubenda-cs-config" strategy="beforeInteractive">
          {`
            var _iub = _iub || [];
            _iub.csConfiguration = {
              "siteId": IUBENDA_SITE_ID,
              "cookiePolicyId": IUBENDA_PRIVACY_ID,
              "lang": "it",
              "storage": {"useSiteId": true},
              "banner": {
                "acceptButtonDisplay": true,
                "customizeButtonDisplay": true,
                "rejectButtonDisplay": true,
                "position": "float-bottom-center",
                "acceptButtonColor": "#4B6BFB",
                "acceptButtonCaptionColor": "#FFFFFF",
                "rejectButtonColor": "#1a1d24",
                "rejectButtonCaptionColor": "#F4F3EE",
                "customizeButtonColor": "#1a1d24",
                "customizeButtonCaptionColor": "#F4F3EE",
                "backgroundColor": "#0D0F14",
                "textColor": "#F4F3EE",
                "fontSizeBody": "14px",
                "closeButtonRejects": true,
                "linksTextColor": "#7B94FC",
                "explicitWithdrawal": true,
                "listPurposes": true,
                "showTitle": false
              },
              "consentOnContinuedBrowsing": false,
              "perPurposeConsent": true,
              "googleAdditionalConsentMode": true
            };
          `}
        </Script>
        <Script src="//cs.iubenda.com/autoblocking/IUBENDA_SITE_ID.js" strategy="beforeInteractive" />
        <Script src="//cdn.iubenda.com/cs/gpp/stub.js" strategy="beforeInteractive" />
        <Script src="//cdn.iubenda.com/cs/iubenda_cs.js" strategy="beforeInteractive" charSet="UTF-8" async />
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
