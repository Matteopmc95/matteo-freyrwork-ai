export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FreyrtechnologyAI',
    url: 'https://freyrtechnology.ai',
    logo: 'https://freyrtechnology.ai/logo/logo.png',
    description:
      'Software house italiana specializzata nello sviluppo di agenti AI personalizzati per PMI: hotel, ristoranti, saloni, retail e professionisti.',
    email: 'info@freyrtechnology.ai',
    telephone: '+390743297711',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via dei Filosofi, 2',
      addressLocality: 'Spoleto',
      addressRegion: 'PG',
      postalCode: '06049',
      addressCountry: 'IT',
    },
    sameAs: [],
    foundingDate: '2024',
    areaServed: 'IT',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FreyrtechnologyAI',
    url: 'https://freyrtechnology.ai',
    inLanguage: 'it-IT',
    publisher: {
      '@type': 'Organization',
      name: 'FreyrtechnologyAI',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ServiceSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Sviluppo agenti AI per PMI',
    provider: {
      '@type': 'Organization',
      name: 'FreyrtechnologyAI',
      url: 'https://freyrtechnology.ai',
    },
    areaServed: { '@type': 'Country', name: 'Italia' },
    description:
      'Sviluppo di agenti AI personalizzati per automazione di prenotazioni, supporto operativo, analisi dati e flussi interni.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servizi AI',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Agente AI per Prenotazioni e richieste' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Supporto operativo AI' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Analisi dati e insight AI' },
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Automazione di flussi interni' },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
