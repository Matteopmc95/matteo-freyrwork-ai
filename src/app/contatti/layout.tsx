import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti — Parla con FreyrtechnologyAI',
  description:
    'Contattaci per una consulenza gratuita sugli agenti AI per la tua attività. Email info@freyrtechnology.it. Soluzioni AI personalizzate per PMI italiane.',
  alternates: { canonical: 'https://freyrtechnology.ai/contatti' },
  openGraph: {
    title: 'Contatti — FreyrtechnologyAI',
    description:
      'Contattaci per una consulenza gratuita sugli agenti AI per la tua attività.',
    url: 'https://freyrtechnology.ai/contatti',
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
