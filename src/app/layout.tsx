import type { Metadata } from "next";
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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
