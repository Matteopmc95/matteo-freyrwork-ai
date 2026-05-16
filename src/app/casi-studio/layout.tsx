import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Casi studio: agenti AI per hotel, ristoranti e saloni',
  description:
    'Esempi concreti di come FreyrtechnologyAI ha aiutato hotel, ristoranti, saloni e professionisti italiani con agenti AI personalizzati. Risultati reali, casi reali.',
  alternates: { canonical: 'https://freyrtechnology.ai/casi-studio' },
  openGraph: {
    title: 'Casi studio: agenti AI per PMI italiane',
    description:
      "Casi di successo nell'implementazione di agenti AI per piccole e medie imprese.",
    url: 'https://freyrtechnology.ai/casi-studio',
  },
};

export default function CasiStudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
