'use client';

import { useEffect, useState } from 'react';

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
        padding: '180px 8vw 80px',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(75,107,251,0.09), transparent 70%), ' +
          C.bg,
        textAlign: 'center',
      }}
    >
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
        Contatti
      </p>
      <h1
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(48px,6.5vw,100px)',
          fontWeight: 600,
          lineHeight: 0.98,
          letterSpacing: '-0.045em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 1000,
          margin: '0 auto 20px',
          textShadow: '0 0 24px rgba(123,148,252,.22)',
        }}
      >
        Parliamone
        <br />
        <span style={{ color: '#5972ff', fontWeight: 300 }}>senza impegno</span>
      </h1>
      <p
        data-reveal
        style={{
          ...rev(0.2),
          fontSize: 'clamp(15px,1.3vw,18px)',
          color: 'rgba(244,243,238,0.62)',
          lineHeight: 1.8,
          fontWeight: 300,
          maxWidth: 640,
          margin: '0 auto',
        }}
      >
        Raccontaci com&apos;è fatta la tua attività, quali processi ti rallentano di più e dove vorresti
        intervenire. Ti rispondiamo di persona, non con un messaggio automatico.
      </p>
    </section>
  );
}

type InfoCard = {
  label: string;
  title: string;
  detail: React.ReactNode;
  href?: string;
  cta?: string;
  icon: React.ReactNode;
};

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const INFO_CARDS: InfoCard[] = [
  {
    label: 'Telefono',
    title: '+39 0743 297711',
    detail: 'Chiamaci negli orari di apertura. Rispondiamo di persona.',
    href: 'tel:+390743297711',
    cta: 'Chiama ora',
    icon: (
      <svg {...iconProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    title: 'info@freyrtechnology.it',
    detail: 'Scrivici una mail. Ti rispondiamo entro 24h lavorative.',
    href: 'mailto:info@freyrtechnology.it',
    cta: 'Invia email',
    icon: (
      <svg {...iconProps}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    label: 'Indirizzo',
    title: 'Via dei Filosofi, 2',
    detail: (
      <>
        06049 Spoleto (PG)
        <br />
        Umbria, Italia
      </>
    ),
    href: 'https://www.google.com/maps/dir/?api=1&destination=Via+dei+Filosofi+2+Spoleto+PG',
    cta: 'Come arrivare',
    icon: (
      <svg {...iconProps}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'Orari',
    title: 'Lun-Ven',
    detail: (
      <>
        Mattino 9:00-13:00
        <br />
        Pomeriggio 15:00-19:00
      </>
    ),
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
  },
];

function InfoGrid() {
  return (
    <section style={{ padding: '60px 8vw 80px', background: C.bg }}>
      <div
        data-reveal
        style={{
          ...rev(0),
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px),1fr))',
          gap: 14,
        }}
      >
        {INFO_CARDS.map((card) => {
          const cardContent = (
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: C.bg2,
                border: `1px solid ${C.border}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                cursor: card.href ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => {
                if (!card.href) return;
                e.currentTarget.style.borderColor = 'rgba(75,107,251,0.35)';
                e.currentTarget.style.background = 'rgba(75,107,251,0.04)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (!card.href) return;
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.background = C.bg2;
                e.currentTarget.style.transform = 'none';
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  background: 'rgba(75,107,251,0.1)',
                  border: '1px solid rgba(75,107,251,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: C.acc2,
                }}
              >
                {card.icon}
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: C.muted,
                  fontWeight: 500,
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 500,
                  color: C.txt,
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}
              >
                {card.title}
              </div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, fontWeight: 300, flex: 1 }}>
                {card.detail}
              </div>
              {card.cta && (
                <div
                  style={{
                    fontSize: 12,
                    color: C.acc2,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 4,
                  }}
                >
                  {card.cta} <span style={{ fontSize: 14 }}>→</span>
                </div>
              )}
            </div>
          );

          return card.href ? (
            <a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', height: '100%' }}
            >
              {cardContent}
            </a>
          ) : (
            <div key={card.label} style={{ height: '100%' }}>
              {cardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FormAndMap() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('sent');
        setForm({ name: '', email: '', phone: '', company: '', message: '' });
      } else {
        setStatus('idle');
        alert(data.error || "Errore durante l'invio. Riprova.");
      }
    } catch {
      setStatus('idle');
      alert('Errore di connessione. Riprova.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 14px',
    background: 'rgba(13,15,20,0.6)',
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    color: C.txt,
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, background 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: C.muted,
    fontWeight: 500,
    marginBottom: 8,
    display: 'block',
  };

  return (
    <section
      className="s-to-alt"
      style={{
        padding: '80px 8vw',
        background: C.bg2,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))',
          gap: 48,
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
              marginBottom: 18,
            }}
          >
            Raccontaci il tuo caso
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px,2.6vw,38px)',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              fontFamily: 'Syne, sans-serif',
              color: C.txt,
              marginBottom: 14,
            }}
          >
            Parliamo del tuo progetto
          </h2>
          <p
            style={{
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: 32,
              maxWidth: 460,
            }}
          >
            Più ci racconti dei tuoi processi, più possiamo capire se un agente AI è davvero la
            soluzione giusta e come costruirlo.
          </p>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))',
                gap: 14,
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="name">
                  Nome e cognome
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(75,107,251,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="company">
                  Azienda
                </label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(75,107,251,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))',
                gap: 14,
              }}
            >
              <div>
                <label style={labelStyle} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(75,107,251,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
              <div>
                <label style={labelStyle} htmlFor="phone">
                  Telefono
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(75,107,251,0.5)')}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle} htmlFor="message">
                Messaggio
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Cosa vorresti automatizzare o migliorare?"
                style={{ ...inputStyle, resize: 'vertical', minHeight: 120, fontFamily: 'inherit' }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(75,107,251,0.5)')}
                onBlur={(e) => (e.target.style.borderColor = C.border)}
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'idle'}
              style={{
                marginTop: 6,
                fontSize: 15,
                fontWeight: 500,
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 10,
                background: status === 'sent' ? '#4ade80' : C.acc2,
                border: `1px solid ${status === 'sent' ? '#4ade80' : C.acc2}`,
                boxShadow: '0 18px 44px rgba(123,148,252,.24)',
                cursor: status === 'idle' ? 'pointer' : 'default',
                alignSelf: 'flex-start',
                transition: 'background 0.2s, border-color 0.2s, opacity 0.2s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'idle' && 'Invia messaggio'}
              {status === 'sending' && 'Invio in corso…'}
              {status === 'sent' && '✓ Messaggio inviato'}
            </button>
            <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.6, marginTop: -4 }}>
              Ti rispondiamo entro 24 ore lavorative. Nessuna mail di follow-up automatica.
            </p>
          </form>
        </div>

        <div data-reveal style={rev(0.1)}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.acc,
              fontWeight: 500,
              marginBottom: 18,
            }}
          >
            Dove siamo
          </p>
          <h2
            style={{
              fontSize: 'clamp(24px,2.6vw,38px)',
              fontWeight: 600,
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              fontFamily: 'Syne, sans-serif',
              color: C.txt,
              marginBottom: 14,
            }}
          >
            Spoleto, Umbria.
            <br />
            Vieni a trovarci.
          </h2>
          <p
            style={{
              fontSize: 14,
              color: C.muted,
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: 24,
              maxWidth: 460,
            }}
          >
            Il nostro ufficio è in Via dei Filosofi 2, a pochi minuti dal centro storico. Prendiamo
            volentieri un caffè se sei di passaggio.
          </p>

          <div
            style={{
              borderRadius: 12,
              overflow: 'hidden',
              border: `1px solid ${C.border}`,
              background: C.bg,
              position: 'relative',
              aspectRatio: '4/3',
              marginBottom: 16,
            }}
          >
            <iframe
              title="FreyrtechnologyAI - Via dei Filosofi 2, Spoleto"
              src="https://www.google.com/maps?q=Via+dei+Filosofi+2+Spoleto+PG&hl=it&z=16&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.35) contrast(1.05)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Via+dei+Filosofi+2+Spoleto+PG"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: C.txt,
                padding: '11px 18px',
                borderRadius: 8,
                background: 'rgba(75,107,251,0.08)',
                border: '1px solid rgba(75,107,251,0.35)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <svg
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Indicazioni stradali
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Via+dei+Filosofi+2+Spoleto+PG"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 13,
                fontWeight: 400,
                color: C.muted,
                padding: '11px 18px',
                borderRadius: 8,
                background: 'transparent',
                border: `1px solid ${C.border}`,
                textDecoration: 'none',
              }}
            >
              Apri in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  {
    id: 'data-storage',
    q: 'Dove vengono conservati i dati che fornisco al mio agente AI?',
    a: "I dati vengono trattati su infrastrutture cloud conformi al GDPR e localizzate nell'area economica europea quando possibile. Per ogni progetto definiamo insieme dove e come i dati vengono archiviati, in base al livello di sensibilità e ai requisiti normativi della tua attività.",
  },
  {
    id: 'model-training',
    q: 'I dati della mia azienda vengono usati per addestrare modelli AI di terze parti?',
    a: 'No. Quando integriamo modelli AI nei nostri agenti, configuriamo le chiamate in modo che i tuoi dati non vengano riutilizzati per il training di modelli pubblici. Lavoriamo con provider che offrono questa garanzia contrattuale e la verifichiamo prima di ogni implementazione.',
  },
  {
    id: 'wrong-answer',
    q: 'Cosa succede se il mio agente AI sbaglia una risposta a un cliente?',
    a: 'Ogni agente che costruiamo ha confini chiari su cosa può rispondere e quando deve invece passare la richiesta a una persona. Definiamo insieme questi confini in fase di progettazione, e nei primi tempi monitoriamo le conversazioni per affinare il comportamento.',
  },
  {
    id: 'delivery-time',
    q: 'Quanto tempo serve per avere un agente AI funzionante nella mia attività?',
    a: 'Dipende dalla complessità del flusso. Per un caso semplice come la gestione di richieste ricorrenti, contiamo 4-6 settimane dalla raccolta requisiti al primo utilizzo reale. Casi più strutturati con integrazioni multiple richiedono 2-3 mesi.',
  },
  {
    id: 'existing-systems',
    q: 'Devo cambiare i sistemi che già utilizzo?',
    a: "Quasi mai. Lavoriamo per integrare l'agente AI sopra ai sistemi esistenti (gestionale, CRM, calendario, posta, WhatsApp Business, ecc.), non per sostituirli. L'obiettivo è togliere attrito senza forzare un cambio infrastrutturale.",
  },
  {
    id: 'sensitive-data',
    q: "Come gestite l'accesso ai dati sensibili come anagrafiche clienti o dati di pagamento?",
    a: "I dati di pagamento non vengono mai gestiti direttamente dall'agente AI. Per anagrafiche e altri dati sensibili applichiamo principi di accesso minimo: l'agente vede solo i dati che servono per quel compito specifico, con audit log di ogni accesso.",
  },
  {
    id: 'service-end',
    q: 'Cosa succede se decido di interrompere il servizio?',
    a: 'I dati restano tuoi. Forniamo un export completo in formato standard (CSV, JSON o database dump a seconda dei casi) e procediamo alla cancellazione dai nostri sistemi entro i tempi concordati. Nessun lock-in tecnico o contrattuale.',
  },
  {
    id: 'cost',
    q: 'Quanto costa un agente AI per la mia attività?',
    a: 'Il costo dipende dalla complessità del progetto e dai sistemi da integrare. Per un imprenditore di una PMI, parliamo di un investimento iniziale per lo sviluppo e di un canone mensile per gestione e infrastruttura. Definiamo tutto in modo chiaro prima di iniziare, senza sorprese.',
  },
  {
    id: 'responsibility',
    q: "Chi è responsabile se qualcosa va storto con l'agente AI?",
    a: "Forniamo un contratto chiaro che definisce responsabilità, livelli di servizio e tempi di intervento. Restiamo coinvolti dopo il rilascio: monitoriamo l'agente, applichiamo correzioni e aggiorniamo le sue capacità in base a come evolve la tua attività.",
  },
  {
    id: 'prototype',
    q: 'Posso vedere come funziona prima di decidere?',
    a: "Sì. Il primo passo è sempre una chiamata o un incontro per capire i tuoi flussi reali. Da lì costruiamo una proposta concreta con scenari d'uso specifici. In molti casi possiamo mostrarti un prototipo funzionante prima di chiederti un impegno contrattuale.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section className="s-to-main" style={{ padding: '100px 8vw', background: C.bg }}>
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
        Domande frequenti
      </p>
      <h2
        data-reveal
        style={{
          ...rev(0.1),
          fontSize: 'clamp(24px,3vw,44px)',
          fontWeight: 600,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 720,
          marginBottom: 40,
        }}
      >
        Quello che vorresti sapere prima di iniziare
      </h2>

      <div data-reveal style={{ ...rev(0.15), borderTop: `1px solid ${C.border}` }}>
        {FAQ_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setOpen(open === item.id ? null : item.id)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '22px 0',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${C.border}`,
              color: 'inherit',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: open === item.id ? 14 : 0,
              transition: 'gap 0.3s',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <span
                style={{
                  fontSize: 'clamp(15px,1.4vw,18px)',
                  fontWeight: 500,
                  color: C.txt,
                  fontFamily: 'Syne, sans-serif',
                  letterSpacing: '-0.01em',
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: C.acc2,
                  transition: 'transform 0.3s',
                  transform: open === item.id ? 'rotate(45deg)' : 'none',
                  flexShrink: 0,
                }}
              >
                +
              </span>
            </div>
            <div
              style={{
                maxHeight: open === item.id ? 420 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease, opacity 0.3s',
                opacity: open === item.id ? 1 : 0,
              }}
            >
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, fontWeight: 300, maxWidth: 680 }}>
                {item.a}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function ContattiPage() {
  useReveal();

  return (
    <div className="fw-page" style={{ background: C.bg, color: C.txt, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <Hero />
      <InfoGrid />
      <FormAndMap />
      <FAQ />
    </div>
  );
}
