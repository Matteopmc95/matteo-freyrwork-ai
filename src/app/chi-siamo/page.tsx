'use client';

import { useEffect } from 'react';

const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.45)',
  border: 'rgba(255,255,255,0.07)',
};

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.opacity = '1';
            (e.target as HTMLElement).style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function rev(delay = 0): React.CSSProperties {
  return {
    opacity: 0,
    transform: 'translateY(22px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };
}

function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '180px 8vw 100px',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(75,107,251,0.09), transparent 70%), ' +
          C.bg,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 980, margin: '0 auto', textAlign: 'center' }}>
        <p
          data-reveal
          style={{
            ...rev(0),
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: C.acc2,
            fontWeight: 500,
            marginBottom: 22,
          }}
        >
          Chi siamo
        </p>
        <h1
          data-reveal
          style={{
            ...rev(0.1),
            fontSize: 'clamp(44px,6vw,92px)',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '-0.045em',
            fontFamily: 'Syne, sans-serif',
            color: C.txt,
            marginBottom: 28,
            textShadow: '0 0 24px rgba(123,148,252,.22)',
          }}
        >
          Persone che affiancano
          <br />
          <span style={{ color: '#5972ff', fontWeight: 300 }}>aziende nel loro lavoro quotidiano</span>
        </h1>
        <p
          data-reveal
          style={{
            ...rev(0.2),
            fontSize: 'clamp(16px,1.3vw,19px)',
            color: 'rgba(244,243,238,0.72)',
            lineHeight: 1.8,
            fontWeight: 300,
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          Non ci limitiamo a consegnare uno strumento e salutarci. Seguiamo i progetti
          dall&apos;inizio, capiamo come funziona davvero un&apos;attività e restiamo al fianco delle
          persone mentre cambia qualcosa nel loro modo di lavorare.
        </p>
      </div>
    </section>
  );
}

const APPROACH_STEPS = [
  {
    tag: '01',
    title: 'Ascoltiamo prima di proporre',
    text:
      'Ogni attività ha i suoi ritmi, il suo modo di parlare con i clienti, le sue abitudini. Prima di disegnare qualsiasi automazione, passiamo del tempo a capire come funzioni davvero dall\'interno.',
  },
  {
    tag: '02',
    title: 'Costruiamo insieme',
    text:
      'L\'agente AI non lo facciamo "per voi" in un capannone remoto: lo costruiamo a quattro mani con chi lavora ogni giorno sui processi. È il modo più veloce per evitare soluzioni che sembrano belle in slide ma non funzionano nella vita reale.',
  },
  {
    tag: '03',
    title: 'Ci siamo anche dopo',
    text:
      'Quando il progetto parte, non sparisce nessuno. Ottimizziamo, adattiamo, risolviamo i casi nuovi che emergono. È un servizio continuo, non una consegna e via.',
  },
];

function Approccio() {
  return (
    <section style={{ padding: '100px 8vw', background: C.bg2, borderBottom: `1px solid ${C.border}` }}>
      <p
        data-reveal
        style={{
          ...rev(0),
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.acc,
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        Il nostro approccio
      </p>
      <h2
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(26px,3.2vw,48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 780,
          marginBottom: 56,
        }}
      >
        Non vendiamo un software,
        <br />
        affianchiamo persone.
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))',
          gap: 24,
        }}
      >
        {APPROACH_STEPS.map((step, i) => (
          <div
            key={step.tag}
            data-reveal
            style={{
              ...rev(0.15 + i * 0.08),
              padding: 28,
              borderRadius: 12,
              background: C.bg,
              border: `1px solid ${C.border}`,
            }}
          >
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 38,
                fontWeight: 700,
                color: 'rgba(75,107,251,0.28)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
                marginBottom: 18,
              }}
            >
              {step.tag}
            </div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 500,
                color: C.txt,
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.01em',
                marginBottom: 12,
                lineHeight: 1.25,
              }}
            >
              {step.title}
            </h3>
            <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, fontWeight: 300 }}>
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

type Member = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  initials: string;
};

const TEAM: Member[] = [
  {
    name: 'Matteo Bartoli',
    role: 'Marketing Automation Specialist',
    bio:
      'Da dieci anni mi occupo di automazioni. Affianco aziende e professionisti nell\'ottimizzazione dei processi, partendo dal lavoro reale di chi li vive ogni giorno: capire dove si perde tempo, costruire strumenti che lo recuperano, farli entrare con naturalezza nella routine del team.',
    initials: 'MB',
  },
  {
    name: 'Alan Santi',
    role: 'Co-founder',
    bio:
      'Descrizione in arrivo. Parte del team che segue lo sviluppo e l\'adattamento degli agenti AI ai contesti specifici di ogni attività.',
    initials: 'AS',
  },
  {
    name: 'Fabiano Bertini',
    role: 'Co-founder',
    bio:
      'Descrizione in arrivo. Si occupa di portare le soluzioni nel quotidiano dei clienti e di mantenere vivo il dialogo tra tecnologia e persone.',
    initials: 'FB',
  },
];

function Team() {
  return (
    <section style={{ padding: '100px 8vw', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
      <p
        data-reveal
        style={{
          ...rev(0),
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.acc,
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        Il team
      </p>
      <h2
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(26px,3.2vw,48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 780,
          marginBottom: 16,
        }}
      >
        Le persone dietro Freyrwork
      </h2>
      <p
        data-reveal
        style={{
          ...rev(0.15),
          fontSize: 'clamp(14px,1.2vw,17px)',
          color: C.muted,
          lineHeight: 1.75,
          fontWeight: 300,
          maxWidth: 620,
          marginBottom: 56,
        }}
      >
        Un gruppo piccolo, per scelta. Ogni cliente parla con chi davvero lavora sul progetto, non con
        un account che poi inoltra.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))',
          gap: 24,
        }}
      >
        {TEAM.map((member, i) => (
          <div
            key={member.name}
            data-reveal
            style={{
              ...rev(0.2 + i * 0.08),
              borderRadius: 14,
              background: C.bg2,
              border: `1px solid ${C.border}`,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                aspectRatio: '4/3.2',
                background:
                  'radial-gradient(ellipse 60% 80% at 50% 40%, rgba(75,107,251,0.18), rgba(13,15,20,0.6) 70%), linear-gradient(160deg, rgba(123,148,252,0.08), rgba(13,15,20,0.8))',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              {member.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={member.photo}
                  alt={member.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <>
                  <div
                    style={{
                      width: 86,
                      height: 86,
                      borderRadius: '50%',
                      background: 'linear-gradient(140deg, rgba(123,148,252,0.22), rgba(75,107,251,0.08))',
                      border: '1px solid rgba(123,148,252,0.32)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'Syne, sans-serif',
                      fontSize: 28,
                      fontWeight: 600,
                      color: C.acc2,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 14,
                      fontSize: 10,
                      color: 'rgba(244,243,238,0.28)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    Foto in arrivo
                  </div>
                </>
              )}
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: C.acc2,
                  fontWeight: 500,
                }}
              >
                {member.role}
              </div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: C.txt,
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: 'rgba(244,243,238,0.7)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                  marginTop: 4,
                }}
              >
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section
      style={{
        padding: '120px 8vw',
        background: C.bg2,
        borderBottom: `1px solid ${C.border}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 60% at 80% 30%, rgba(75,107,251,0.07), transparent 70%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(75,107,251,0.05), transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))',
          gap: 56,
          alignItems: 'start',
        }}
      >
        <div data-reveal style={rev(0)}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.acc,
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            La nostra mission
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px,3.4vw,52px)',
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontFamily: 'Syne, sans-serif',
              color: C.txt,
              marginBottom: 4,
            }}
          >
            Non solo un prodotto,
          </h2>
          <h2
            style={{
              fontSize: 'clamp(26px,3.4vw,52px)',
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontFamily: 'Syne, sans-serif',
              color: '#5972ff',
            }}
          >
            ma un servizio completo.
          </h2>
        </div>
        <div
          data-reveal
          style={{
            ...rev(0.12),
            fontSize: 15,
            lineHeight: 1.85,
            color: 'rgba(244,243,238,0.72)',
            fontWeight: 300,
            maxWidth: 560,
          }}
        >
          <p style={{ marginBottom: 20 }}>
            La nostra mission non si limita alla creazione di ottimi software. Crediamo
            nell&apos;importanza di un servizio impeccabile e di un supporto costante ai nostri clienti.
            Per questo lavoriamo ogni giorno per migliorare le performance dei nostri agenti AI e per
            offrire un&apos;esperienza semplice, efficace, gratificante.
          </p>
          <p>
            Ogni giorno ci impegniamo a far crescere l&apos;azienda e la squadra, con l&apos;obiettivo di
            migliorare costantemente e di offrire ai nostri clienti un servizio di altissimo livello.
          </p>
        </div>
      </div>
    </section>
  );
}

const PILLARS = [
  {
    title: 'Esperienza & Competenza',
    text: 'Dieci anni sul campo delle automazioni. Abbiamo visto cosa funziona e cosa invece fa solo sprecare tempo e budget.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
      </svg>
    ),
  },
  {
    title: 'Passione & Dedizione',
    text: 'Ci piace davvero quello che facciamo. Quando un processo va dritto e libera ore alla settimana, è la miglior soddisfazione possibile.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
  {
    title: 'Innovazione & Ricerca',
    text: 'Gli agenti AI evolvono in fretta. Studiamo, sperimentiamo, portiamo ai clienti solo quello che ha senso, non l\'ultima moda.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 14.5l-2 6 6-2 7.5-7.5a2.83 2.83 0 0 0-4-4L9.5 14.5z" />
        <path d="M6 6l-3 3 3 3" />
      </svg>
    ),
  },
  {
    title: 'Affidabilità & Sicurezza',
    text: 'Dati trattati con cura, integrazioni pulite, processi tracciabili. Il tuo lavoro non può dipendere da scatole nere.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l8 4v6c0 5-3.5 9.4-8 10-4.5-.6-8-5-8-10V6l8-4z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: 'Assistenza Impeccabile',
    text: 'Dopo il go-live non ci fai fatica a trovare. Rispondiamo, interveniamo, adattiamo le cose man mano che il tuo lavoro cambia.',
    icon: (
      <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
];

function WhyUs() {
  return (
    <section style={{ padding: '100px 8vw', background: C.bg, borderBottom: `1px solid ${C.border}` }}>
      <p
        data-reveal
        style={{
          ...rev(0),
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.acc,
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        Perché sceglierci
      </p>
      <h2
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(26px,3.2vw,48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 780,
          marginBottom: 56,
        }}
      >
        Cinque ragioni, non una di più
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px),1fr))',
          gap: 1,
          background: C.border,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: 'hidden',
        }}
      >
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            data-reveal
            style={{
              ...rev(0.15 + i * 0.05),
              background: C.bg2,
              padding: '32px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              minHeight: 220,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 9,
                background: 'rgba(75,107,251,0.1)',
                border: '1px solid rgba(75,107,251,0.28)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.acc2,
              }}
            >
              {pillar.icon}
            </div>
            <h3
              style={{
                fontSize: 17,
                fontWeight: 500,
                color: C.txt,
                fontFamily: 'Syne, sans-serif',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
              }}
            >
              {pillar.title}
            </h3>
            <p style={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75, fontWeight: 300 }}>
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section
      style={{
        padding: '120px 8vw',
        textAlign: 'center',
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%,rgba(75,107,251,0.12) 0%,transparent 70%)',
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <p
        data-reveal
        style={{
          ...rev(0),
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: C.acc,
          fontWeight: 500,
          marginBottom: 20,
        }}
      >
        Lavoriamo insieme
      </p>
      <h2
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(28px,4vw,58px)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1.08,
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 780,
          margin: '0 auto 20px',
        }}
      >
        Raccontaci cosa vorresti migliorare,
        <br />
        partiamo da lì
      </h2>
      <p
        data-reveal
        style={{
          ...rev(0.2),
          fontSize: 'clamp(14px,1.2vw,17px)',
          color: C.muted,
          maxWidth: 560,
          margin: '0 auto 40px',
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        Una chiamata di 30 minuti è spesso tutto quello che serve per capire se quello che facciamo può
        essere utile alla tua attività.
      </p>
      <div data-reveal style={{ ...rev(0.25), display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <a
          href="/contatti"
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: '#fff',
            padding: '14px 28px',
            borderRadius: 10,
            background: C.acc2,
            border: `1px solid ${C.acc2}`,
            textDecoration: 'none',
            boxShadow: '0 18px 44px rgba(123,148,252,.24)',
          }}
        >
          Scrivici
        </a>
        <a
          href="/casi-studio"
          style={{
            fontSize: 15,
            fontWeight: 400,
            color: C.txt,
            padding: '14px 28px',
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: 'rgba(255,255,255,0.02)',
            textDecoration: 'none',
          }}
        >
          Vedi i casi studio
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        padding: '40px 8vw',
        borderTop: `1px solid ${C.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(244,243,238,0.3)' }}>
        Freyr<span style={{ color: C.acc, opacity: 0.6 }}>work</span>
      </span>
      <span style={{ fontSize: 12, color: 'rgba(244,243,238,0.18)' }}>
        © 2025 Freyrwork. Agenti AI per PMI e imprese locali.
      </span>
    </footer>
  );
}

export default function ChiSiamoPage() {
  useReveal();

  return (
    <div style={{ background: C.bg, color: C.txt, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <Hero />
      <Approccio />
      <Team />
      <Mission />
      <WhyUs />
      <CTAFinal />
      <Footer />
    </div>
  );
}
