'use client';

import { useEffect } from 'react';
import AgenteAIHero from '@/components/agente-ai/AgenteAIHero';
import ChatbotEmbed from '@/components/agente-ai/ChatbotEmbed';

/* ─── design tokens (allineati a home/servizi) ─── */
const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.45)',
  border: 'rgba(255,255,255,0.07)',
};

/* ─── reveal hook ─── */
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

/* ─── section shell ─── */
function Section({
  id, tag, headline, sub, body, alt, children, bodyAfter,
}: {
  id: string; tag: string; headline: React.ReactNode;
  sub?: string; body?: string; alt?: boolean;
  children?: React.ReactNode; bodyAfter?: string;
}) {
  return (
    <section id={id} className={alt ? 's-to-alt' : 's-to-main'} style={{ padding: '100px 8vw', background: alt ? C.bg2 : C.bg }}>
      <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 18 }}>{tag}</p>
      <h2 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(24px,3vw,44px)', fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.02em', maxWidth: 780, fontFamily: 'Syne, sans-serif', color: C.txt }}>{headline}</h2>
      {sub && <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.2vw,17px)', color: C.muted, lineHeight: 1.7, maxWidth: 620, marginTop: 16, fontWeight: 300 }}>{sub}</p>}
      {body && <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.1vw,16px)', color: C.muted, lineHeight: 1.75, maxWidth: 680, marginTop: 22, fontWeight: 300 }}>{body}</p>}
      {children}
      {bodyAfter && <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.1vw,16px)', color: C.muted, lineHeight: 1.75, maxWidth: 680, marginTop: 40, fontWeight: 300 }}>{bodyAfter}</p>}
    </section>
  );
}

/* ─── Cos'è ─── */
function SectionChe() {
  return (
    <Section id="che-cose" tag="Definizione"
      headline={<>{"Cos'è davvero un agente AI,"}<br />{"spiegato in modo semplice"}</>}
      sub="Non una definizione tecnica. Una spiegazione utile per capire dove sta il valore."
      body="Un agente AI è un collaboratore digitale progettato per aiutare un'attività a gestire meglio una parte del proprio lavoro. Non è un software che esiste e basta: è un sistema costruito per osservare informazioni, organizzare compiti, restituire risposte utili, supportare processi e alleggerire attività che oggi richiedono tempo, attenzione e continuità."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        {[
          { num: '01', title: 'Osserva', text: 'Legge le informazioni del tuo contesto — richieste, dati, calendario, messaggi.' },
          { num: '02', title: 'Organizza', text: 'Classifica, collega e struttura ciò che prima restava sparso.' },
          { num: '03', title: 'Supporta', text: 'Risponde, sintetizza, suggerisce. Lavora sui tuoi processi, non su compiti astratti.' },
        ].map((b) => (
          <div key={b.num} style={{ background: C.bg2, padding: '28px 24px' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 14 }}>{b.num}</div>
            <h3 style={{ fontSize: 'clamp(16px,1.4vw,20px)', fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em', fontFamily: 'Syne, sans-serif', color: C.txt }}>{b.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{b.text}</p>
          </div>
        ))}
      </div>
      <p data-reveal style={{ ...rev(0.3), fontSize: 'clamp(14px,1.1vw,16px)', color: C.muted, lineHeight: 1.75, maxWidth: 680, marginTop: 32, fontWeight: 300 }}>
        La sua forza non sta solo nel saper rispondere, ma nel sapersi inserire in un contesto di lavoro reale. Per questo può diventare una presenza utile non solo per dialogare, ma anche per semplificare operazioni, leggere dati e aiutare chi prende decisioni.
      </p>
    </Section>
  );
}

/* ─── Cosa non è ─── */
function SectionNonE() {
  const items = [
    { title: 'Non è solo una chat', text: 'Non è uno strumento con cui parlare e basta. È un supporto operativo dentro i tuoi flussi.' },
    { title: 'Non è un risponditore', text: 'Non ripete sempre le stesse risposte. Si adatta al contesto e ai tuoi processi.' },
    { title: 'Non è standard', text: 'Non è una tecnologia identica per tutti. Viene costruita sulla tua realtà specifica.' },
    { title: 'Non è solo per grandi aziende', text: "Ha senso soprattutto per PMI e attività locali, dove l'organizzazione è più frammentata." },
  ];
  return (
    <Section id="non-e" alt tag="Prima di tutto" headline="Prima di tutto, chiariamo cosa non è"
      body="Molti associano ancora l'intelligenza artificiale a strumenti generici o a soluzioni poco integrate con il lavoro quotidiano. Un collaboratore AI progettato per un'impresa locale fa un passo in più: si adatta alle esigenze reali, lavora sul contesto e aiuta a gestire meglio ciò che accade ogni giorno."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px),1fr))', gap: 14 }}>
        {items.map((it) => (
          <div key={it.title} style={{ padding: '22px 20px', borderRadius: 12, border: `1px solid ${C.border}`, background: 'rgba(13,15,20,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
              <div style={{ width: 18, height: 18, borderRadius: 4, border: '1px solid rgba(244,243,238,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'rgba(244,243,238,0.4)', fontSize: 11, lineHeight: 1 }}>✕</div>
              <strong style={{ fontSize: 14, fontWeight: 500, color: C.txt }}>{it.title}</strong>
            </div>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65, paddingLeft: 28 }}>{it.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Cosa fa ─── */
function SectionCosaFa() {
  const caps = [
    { label: 'Raccoglie richieste', meta: 'da più canali in un unico flusso' },
    { label: 'Organizza informazioni', meta: 'collega dati che prima restavano sparsi' },
    { label: 'Recupera risposte', meta: 'attinge al contesto della tua attività' },
    { label: 'Legge i dati', meta: 'evidenzia trend, anomalie, segnali utili' },
    { label: 'Supporta processi', meta: 'alleggerisce passaggi ripetitivi' },
    { label: 'Riduce attività manuali', meta: 'toglie attrito al lavoro quotidiano' },
  ];
  return (
    <Section id="cosa-fa" tag="Cosa fa davvero" headline="Cosa può fare, nella pratica"
      sub="Il suo valore si vede soprattutto quando alleggerisce attività concrete."
      body="A seconda del tipo di attività può gestire il flusso delle richieste, rendere più leggibili numeri e andamenti, alleggerire processi interni che oggi dipendono da troppa gestione manuale. Il principio resta sempre lo stesso: non aggiungere complessità, ma togliere attrito."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,240px),1fr))', gap: 10 }}>
        {caps.map((c) => (
          <div key={c.label}
            style={{ padding: '18px 20px', borderRadius: 10, border: `1px solid ${C.border}`, background: 'rgba(13,15,20,0.6)', display: 'flex', flexDirection: 'column', gap: 6, transition: 'border-color 0.25s, background 0.25s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(75,107,251,0.35)'; e.currentTarget.style.background = 'rgba(75,107,251,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'rgba(13,15,20,0.6)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.acc, flexShrink: 0 }} />
              <strong style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{c.label}</strong>
            </div>
            <span style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, paddingLeft: 16 }}>{c.meta}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Come lavora ─── */
function SectionComeLavora() {
  const flow = [
    { n: '01', title: 'Riceve', text: 'Input da richieste, dati aziendali, calendario, canali di comunicazione.' },
    { n: '02', title: 'Interpreta', text: 'Legge il contesto per cui è stato progettato. Non risponde nel vuoto.' },
    { n: '03', title: 'Organizza', text: 'Collega informazioni sparse. Mette ordine tra richieste e segnali.' },
    { n: '04', title: 'Restituisce', text: 'Risposta, sintesi, supporto operativo, alert. Qualcosa di utile.' },
  ];
  return (
    <Section id="come-lavora" alt tag="Come lavora"
      headline={<>{"Come lavora"}<br />{"un collaboratore AI"}</>}
      sub="Dietro il concetto c'è un funzionamento semplice da capire."
      body="Osserva ciò che succede in un determinato flusso, aiuta a mettere ordine, collega dati o richieste che altrimenti resterebbero sparse e produce un risultato utile. Quello che conta davvero è che non resta astratto: viene costruito attorno a un bisogno preciso. E proprio per questo diventa utile."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,220px),1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        {flow.map((s) => (
          <div key={s.n} style={{ background: C.bg, padding: '30px 24px', position: 'relative' }}>
            <div style={{ fontSize: 40, fontWeight: 700, color: 'rgba(75,107,251,0.18)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 20, fontFamily: 'Syne, sans-serif' }}>{s.n}</div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em' }}>{s.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{s.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Prova il chatbot ─── */
function SectionProva() {
  return (
    <section id="prova" style={{ position: 'relative', padding: '120px 8vw', background: `radial-gradient(ellipse 70% 55% at 50% 0%, rgba(75,107,251,0.14) 0%, transparent 70%), ${C.bg}` }}>
      <div style={{ textAlign: 'center', maxWidth: 820, margin: '0 auto 56px' }}>
        <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc2, fontWeight: 500, marginBottom: 20 }}>Provalo ora — demo live</p>
        <h2 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(32px,4.2vw,60px)', fontWeight: 600, lineHeight: 1.06, letterSpacing: '-0.03em', fontFamily: 'Syne, sans-serif', color: C.txt, marginBottom: 20 }}>
          Parla direttamente<br />con un agente AI
        </h2>
        <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(15px,1.3vw,18px)', color: C.muted, lineHeight: 1.75, fontWeight: 300, maxWidth: 640, margin: '0 auto' }}>
          Invece di spiegartelo in astratto, te lo facciamo provare. Raccontagli il tuo settore o una situazione reale — ti mostra come un collaboratore AI ragiona sul tuo caso.
        </p>
      </div>
      <div data-reveal style={{ ...rev(0.25), maxWidth: 960, margin: '0 auto', position: 'relative' }}>
        <div aria-hidden style={{ position: 'absolute', inset: -40, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(75,107,251,0.18) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1 }}><ChatbotEmbed /></div>
      </div>
    </section>
  );
}

/* ─── Perché utile ─── */
function SectionUtile() {
  const benefits = [
    { num: '01', title: 'Più tempo', text: 'Recupera tempo togliendo peso alle attività che oggi assorbono energie su compiti ripetitivi.' },
    { num: '02', title: 'Meno rincorsa', text: 'Riduce la sensazione di essere sempre in inseguimento su richieste, messaggi, urgenze.' },
    { num: '03', title: 'Più visibilità', text: "Aiuta a vedere meglio ciò che sta succedendo nell'attività. Dati che parlano, non solo numeri." },
    { num: '04', title: 'Più continuità', text: 'Dà continuità ai processi anche quando il ritmo quotidiano rende tutto più dispersivo.' },
  ];
  return (
    <Section id="utile" alt tag="Perché è utile"
      headline={<>{"Perché può fare la differenza"}<br />{"per chi guida un'attività"}</>}
      body="Chi gestisce un'impresa spesso non ha bisogno di più strumenti. Ha bisogno di meno confusione, più leggibilità e più tempo utile. È proprio qui che un agente AI ben progettato diventa una leva concreta — non simbolica. Il beneficio non è teorico: è gestionale, organizzativo, economico."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,240px),1fr))', gap: 1, background: C.border, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        {benefits.map((b) => (
          <div key={b.num} style={{ background: C.bg2, padding: '28px 24px' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 12 }}>{b.num}</div>
            <h3 style={{ fontSize: 'clamp(15px,1.3vw,19px)', fontWeight: 600, marginBottom: 10, letterSpacing: '-0.01em', fontFamily: 'Syne, sans-serif', color: C.txt }}>{b.title}</h3>
            <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{b.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Differenza ChatGPT ─── */
function SectionDifferenza() {
  const rows = [
    { label: 'Progettazione', generic: 'Strumento generico per tutti', freyr: 'Costruito sulla tua attività' },
    { label: 'Contesto', generic: 'Nessuna memoria del tuo business', freyr: 'Impara flussi, dati e processi' },
    { label: 'Utilità', generic: 'Compiti occasionali e isolati', freyr: 'Supporto operativo continuo' },
    { label: 'Adattamento', generic: 'Ti adatti tu allo strumento', freyr: 'Si adatta al tuo modo di lavorare' },
    { label: 'Risultato', generic: 'Risponde a domande', freyr: 'Lavora perché il business funzioni meglio' },
  ];
  return (
    <Section id="differenza" tag="La differenza"
      headline={<>{"Perché non è la stessa cosa"}<br />{"di usare uno strumento generico"}</>}
      sub="Gli strumenti generici rispondono a richieste. Un agente AI aziendale lavora su flussi, dati e obiettivi specifici."
      body="Strumenti come ChatGPT o Gemini possono essere utili per ottenere testi, idee, spiegazioni o supporto su compiti occasionali. Ma non nascono per conoscere la tua attività, né per lavorare dentro i tuoi processi. La differenza non è quindi solo tecnologica. È funzionale."
    >
      <div data-reveal style={{ ...rev(0.3), marginTop: 48, border: `1px solid ${C.border}`, borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', background: 'rgba(255,255,255,0.03)', borderBottom: `1px solid ${C.border}` }}>
          <div style={{ padding: '14px 24px', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }} />
          <div style={{ padding: '14px 24px', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.muted }}>ChatGPT / Gemini</div>
          <div style={{ padding: '14px 24px', fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.acc2, background: 'rgba(75,107,251,0.05)' }}>Agente AI FreyrtechnologyAI</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.label} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: i === rows.length - 1 ? 'none' : `1px solid ${C.border}` }}>
            <div style={{ padding: '16px 24px', fontSize: 12, fontWeight: 500, color: 'rgba(244,243,238,0.5)', borderRight: `1px solid ${C.border}` }}>{r.label}</div>
            <div style={{ padding: '16px 24px', fontSize: 13, color: C.muted, lineHeight: 1.5, borderRight: `1px solid ${C.border}` }}>{r.generic}</div>
            <div style={{ padding: '16px 24px', fontSize: 13, color: 'rgba(244,243,238,0.8)', lineHeight: 1.5, background: 'rgba(75,107,251,0.03)' }}>{r.freyr}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─── CTA finale ─── */
function CTAFinal() {
  return (
    <section id="cta-finale" style={{ padding: '120px 8vw', textAlign: 'center', background: 'radial-gradient(ellipse 80% 60% at 50% 100%,rgba(75,107,251,0.12) 0%,transparent 70%)' }}>
      <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 20 }}>Prossimo passo</p>
      <h2 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(28px,4vw,58px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08, maxWidth: 760, margin: '0 auto 20px', fontFamily: 'Syne, sans-serif', color: C.txt }}>
        Ora che sai cos&apos;è,<br />la domanda giusta è una sola
      </h2>
      <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.2vw,17px)', color: C.muted, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.65, fontWeight: 300 }}>
        Può avere un senso concreto nella tua attività? La risposta dipende dai tuoi flussi e dai punti in cui oggi senti più dispersione. Per questo ha senso partire da una valutazione concreta.
      </p>
      <div data-reveal style={{ ...rev(0.2), display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <a href="mailto:info@freyrwork.com" style={{ fontSize: 15, fontWeight: 500, color: '#fff', padding: '14px 28px', borderRadius: 10, background: C.acc2, border: `1px solid ${C.acc2}`, textDecoration: 'none', boxShadow: '0 18px 44px rgba(123,148,252,.24)' }}>
          Scopri come può funzionare per te
        </a>
        <a href="mailto:info@freyrwork.com" style={{ fontSize: 15, fontWeight: 400, color: C.txt, padding: '14px 28px', borderRadius: 10, border: `1px solid ${C.border}`, background: 'rgba(255,255,255,0.02)', textDecoration: 'none' }}>
          Analizziamo il tuo caso
        </a>
      </div>
      <p data-reveal style={{ ...rev(0.3), fontSize: 12, color: C.muted, marginTop: 20 }}>Nessun tecnicismo inutile. Partiamo da come lavori oggi.</p>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer style={{ padding: '40px 8vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(244,243,238,0.3)' }}>Freyr<span style={{ color: C.acc, opacity: 0.6 }}>work</span></span>
      <span style={{ fontSize: 12, color: 'rgba(244,243,238,0.18)' }}>© 2025 FreyrtechnologyAI. Agenti AI per PMI e imprese locali.</span>
    </footer>
  );
}

/* ─── main page ─── */
export default function AgenteAIPage() {
  useReveal();
  return (
    <div className="fw-page" style={{ background: C.bg, color: C.txt, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <AgenteAIHero />
      <SectionProva />
      <SectionChe />
      <SectionNonE />
      <SectionCosaFa />
      <SectionComeLavora />
      <SectionUtile />
      <SectionDifferenza />
      <CTAFinal />
      <Footer />
    </div>
  );
}
