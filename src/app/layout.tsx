import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "FreyrtechnologyAI — Collaboratori AI per PMI",
  description:
    "Agenti AI concreti per piccole e medie imprese. Gestisci richieste, processi e dati con un collaboratore digitale costruito sulla tua attività.",
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
