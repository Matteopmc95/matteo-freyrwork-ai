import type { Metadata } from "next";
import ImportedHomepage from "@/components/home/ImportedHomepage";

export const metadata: Metadata = {
  title: "Agenti AI per la tua azienda",
  description:
    "FreyrtechnologyAI sviluppa agenti AI personalizzati per hotel, ristoranti, saloni e PMI. Automazione di prenotazioni, supporto operativo e analisi dati. Soluzioni concrete per il tuo business.",
  alternates: { canonical: "https://freyrtechnology.ai" },
};

export default function Home() {
  return <ImportedHomepage />;
}
