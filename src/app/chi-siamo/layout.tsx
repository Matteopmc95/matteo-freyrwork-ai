import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi siamo — Il team dietro FreyrtechnologyAI',
  description:
    'Conosci il team di FreyrtechnologyAI: Alan Santi, Fabiano Bertini, Bartoli Matteo, Gaetano Santini. Software house italiana specializzata in agenti AI per PMI.',
  alternates: { canonical: 'https://freyrtechnology.ai/chi-siamo' },
  openGraph: {
    title: 'Chi siamo — Il team FreyrtechnologyAI',
    description:
      'Software house italiana specializzata in agenti AI per piccole e medie imprese.',
    url: 'https://freyrtechnology.ai/chi-siamo',
  },
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
