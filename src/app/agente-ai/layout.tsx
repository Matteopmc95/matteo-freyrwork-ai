import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "L'Agente AI in azione — Prova la demo live",
  description:
    'Parla con un vero agente AI. Demo interattiva che mostra come un assistente AI può gestire conversazioni, rispondere a clienti e supportare la tua attività in tempo reale.',
  alternates: { canonical: 'https://freyrtechnology.ai/agente-ai' },
  openGraph: {
    title: "L'Agente AI in azione — Prova la demo live",
    description: 'Demo interattiva di un agente AI per PMI. Provalo subito.',
    url: 'https://freyrtechnology.ai/agente-ai',
  },
};

export default function AgenteAILayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
