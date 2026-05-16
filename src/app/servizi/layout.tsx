import type { Metadata } from 'next';
import { ServiceSchema } from '@/components/SchemaMarkup';

export const metadata: Metadata = {
  title: 'Servizi AI per PMI: prenotazioni, supporto, analisi dati',
  description:
    'Scopri i servizi AI di FreyrtechnologyAI: gestione prenotazioni multicanale, supporto operativo, analisi dati e dashboard intelligenti. Soluzioni AI su misura per la tua attività.',
  alternates: { canonical: 'https://freyrtechnology.ai/servizi' },
  openGraph: {
    title: 'Servizi AI per PMI: prenotazioni, supporto, analisi dati',
    description:
      'Servizi AI personalizzati per automazione, supporto operativo e analisi dati. Scopri le soluzioni FreyrtechnologyAI.',
    url: 'https://freyrtechnology.ai/servizi',
  },
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ServiceSchema />
      {children}
    </>
  );
}
