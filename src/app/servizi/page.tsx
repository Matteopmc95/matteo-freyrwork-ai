'use client';

import { useEffect, useRef } from 'react';
import DashboardDemo from '@/components/servizi/DashboardDemo';
import ServiziDemoHero from '@/components/servizi/ServiziDemoHero';

/* ─── design tokens ─── */
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

/* ─── reveal style helper ─── */
function rev(delay = 0): React.CSSProperties {
  return {
    opacity: 0,
    transform: 'translateY(22px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  };
}

/* ─── Inbox visual ─── */
function InboxVisual() {
  const streamRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const msgs = [
      { ch: '#25D366', text: 'WhatsApp: "Posso prenotare per domani sera?"', time: 'ora' },
      { ch: C.acc, text: 'Form web: Richiesta prenotazione tavolo x4', time: '2m' },
      { ch: '#E1306C', text: 'Instagram: "Avete disponibilità sabato?"', time: '5m' },
      { ch: '#FB923C', text: 'Chiamata: Cliente vuole info sui prezzi', time: '8m' },
      { ch: C.acc, text: 'Email: Conferma appuntamento richiesta', time: '12m' },
    ];
    const statuses = [
      '↳ Classificazione in corso…',
      '↳ Risposta inviata',
      '↳ Prenotazione confermata',
      '↳ Smistato al team',
      '↳ Archiviato',
    ];
    const stream = streamRef.current;
    if (!stream) return;
    let shown = 0;
    let timer: ReturnType<typeof setTimeout>;

    function addMsg() {
      if (shown >= msgs.length || !stream) return;
      const m = msgs[shown];
      const el = document.createElement('div');
      el.style.cssText = `
        display:flex;align-items:center;gap:10px;padding:9px 12px;
        border-radius:8px;border:1px solid ${shown === 0 ? 'rgba(75,107,251,0.3)' : C.border};
        background:${shown === 0 ? 'rgba(75,107,251,0.06)' : 'rgba(13,15,20,0.6)'};
        animation:slideIn 0.4s ease both${shown === 0 ? ',newPulse 2s ease 1' : ''};
        margin-bottom:6px;
      `;
      el.innerHTML = `
        <div style="width:7px;height:7px;border-radius:50%;background:${m.ch};flex-shrink:0"></div>
        <span style="flex:1;font-size:12px;color:${C.muted};line-height:1.3">${m.text}</span>
        <span style="font-size:10px;color:rgba(244,243,238,0.2)">${m.time}</span>
      `;
      stream.insertBefore(el, stream.firstChild);
      shown++;
      if (countRef.current) countRef.current.textContent = `${shown} gestite oggi`;
      if (statusRef.current) statusRef.current.textContent = statuses[shown - 1] ?? statuses[0];
      if (shown < msgs.length) timer = setTimeout(addMsg, 1800);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setTimeout(addMsg, 600); io.disconnect(); }
      },
      { threshold: 0.3 }
    );
    io.observe(stream);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes slideIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
        @keyframes newPulse{0%,100%{border-color:rgba(75,107,251,.3)}40%{border-color:rgba(75,107,251,.7)}}
      `}</style>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, paddingBottom: 14, borderBottom: `1px solid ${C.border}` }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: C.txt }}>Richieste in entrata</span>
        <span ref={countRef} style={{ fontSize: 10, background: 'rgba(75,107,251,0.25)', color: C.acc2, padding: '2px 8px', borderRadius: 4, fontWeight: 500 }}>0 gestite oggi</span>
      </div>
      <div ref={streamRef} style={{ display: 'flex', flexDirection: 'column' }} />
      <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: C.muted }}>Agente attivo</span>
        <strong ref={statusRef} style={{ fontSize: 12, color: '#4ade80', fontWeight: 500 }}>↳ In elaborazione…</strong>
      </div>
    </div>
  );
}

/* ─── Task visual ─── */
function TaskVisual() {
  const visRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const vis = visRef.current;
    if (!vis) return;
    let done = 0;
    let timer: ReturnType<typeof setTimeout>;

    function checkNext() {
      if (done >= 5 || !vis) return;
      const cb = vis.querySelector<HTMLDivElement>(`#tc${done}`);
      const tx = vis.querySelector<HTMLSpanElement>(`#tt${done}`);
      if (cb) {
        cb.style.background = C.acc;
        cb.style.borderColor = C.acc;
        cb.innerHTML = '<span style="font-size:9px;color:#fff;font-weight:700">✓</span>';
      }
      if (tx) { tx.style.textDecoration = 'line-through'; tx.style.opacity = '0.4'; }
      done++;
      if (doneRef.current) doneRef.current.textContent = `${done} / 5 automatizzate`;
      if (done < 5) timer = setTimeout(checkNext, 1200);
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { setTimeout(checkNext, 500); io.disconnect(); }
      },
      { threshold: 0.3 }
    );
    io.observe(vis);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const tasks = [
    'Risposta FAQ clienti',
    'Aggiornamento agenda prenotazioni',
    'Raccolta feedback post-servizio',
    'Sintesi richieste in sospeso',
    'Report operativo giornaliero',
  ];

  return (
    <div ref={visRef} className="ops-animate" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, marginBottom: 8, paddingBottom: 12, borderBottom: `1px solid ${C.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Operazioni quotidiane
        <span ref={doneRef} style={{ fontSize: 11, color: C.acc, fontWeight: 400 }}>0 / 5 automatizzate</span>
      </div>
      {tasks.map((label, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, background: 'rgba(13,15,20,0.6)', border: `1px solid ${C.border}` }}>
          <div id={`tc${i}`} style={{ width: 16, height: 16, borderRadius: 4, border: '1px solid rgba(75,107,251,0.4)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s, border-color 0.3s' }} />
          <span id={`tt${i}`} style={{ fontSize: 12, color: C.muted, flex: 1, transition: 'all 0.3s' }}>{label}</span>
          <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 4, fontWeight: 500, background: 'rgba(75,107,251,0.15)', color: C.acc2 }}>AI</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Flow visual ─── */
function FlowVisual() {
  const visRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vis = visRef.current;
    if (!vis) return;
    let timer: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        let step = 2;
        function advance() {
          if (step > 4) return;
          const fc = vis!.querySelector<HTMLDivElement>(`#fc${step}`);
          if (fc) {
            fc.style.background = C.acc;
            fc.style.borderColor = C.acc;
            fc.style.color = '#fff';
            fc.style.animation = '';
            fc.textContent = '✓';
          }
          const fn = vis!.querySelector<HTMLDivElement>(`#fn${step}`);
          if (fn && !fn.querySelector('.flow-status')) {
            const s = document.createElement('span');
            s.className = 'flow-status';
            s.style.cssText = 'font-size:10px;color:#4ade80;font-weight:500;margin-top:3px;display:block';
            s.textContent = '✓ Completato';
            fn.querySelector('.flow-content')?.appendChild(s);
          }
          step++;
          if (step <= 4) timer = setTimeout(advance, 2200);
        }
        setTimeout(advance, 2000);
        io.disconnect();
      },
      { threshold: 0.3 }
    );
    io.observe(vis);
    return () => { io.disconnect(); clearTimeout(timer); };
  }, []);

  const nodes = [
    { id: 0, done: true, label: 'Richiesta ricevuta', desc: 'Il cliente invia una richiesta di prenotazione' },
    { id: 1, done: true, label: 'Classificazione automatica', desc: "L'agente riconosce il tipo di richiesta e le priorità" },
    { id: 2, done: false, pulsing: true, label: 'Verifica disponibilità', desc: 'Controllo automatico del calendario in tempo reale' },
    { id: 3, done: false, label: 'Conferma e notifica', desc: 'Risposta al cliente e aggiornamento agenda' },
    { id: 4, done: false, label: 'Registrazione nel sistema', desc: 'Log automatico per reportistica', last: true },
  ];

  return (
    <div ref={visRef} style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @keyframes flowPulse{0%,100%{background:rgba(75,107,251,.08);border-color:rgba(75,107,251,.4)}50%{background:rgba(75,107,251,.2);border-color:rgba(75,107,251,.8)}}
      `}</style>
      <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, marginBottom: 20, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
        Flusso automatizzato — Gestione prenotazione
      </div>
      {nodes.map((n) => (
        <div key={n.id} id={n.id >= 2 ? `fn${n.id}` : undefined} style={{ display: 'flex', alignItems: 'stretch', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
            <div
              id={`fc${n.id}`}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: `1px solid ${n.done ? C.acc : 'rgba(75,107,251,0.4)'}`,
                background: n.done ? C.acc : 'rgba(75,107,251,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, color: n.done ? '#fff' : C.acc,
                flexShrink: 0, animation: n.pulsing ? 'flowPulse 3s ease-in-out infinite' : undefined,
              }}
            >
              {n.done ? '✓' : n.pulsing ? '→' : n.id + 1}
            </div>
            {!n.last && (
              <div style={{ width: 1, flex: 1, background: 'linear-gradient(to bottom,rgba(75,107,251,0.3),rgba(75,107,251,0.1))', margin: '2px auto' }} />
            )}
          </div>
          <div className="flow-content" style={{ paddingBottom: n.last ? 0 : 18, flex: 1 }}>
            <strong style={{ fontSize: 12, fontWeight: 500, color: C.txt, display: 'block', marginBottom: 3 }}>{n.label}</strong>
            <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{n.desc}</p>
            {n.done && <span style={{ fontSize: 10, color: '#4ade80', fontWeight: 500, marginTop: 3, display: 'block' }}>✓ Completato</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Section wrapper ─── */
function ServiceSection({
  id, num, headline, sub, body, meta, cta, ctaHref, ctaVariant = 'primary', flip = false, alt = false,
  visual, visualLast = false,
}: {
  id: string; num: string; headline: string; sub: string; body: string;
  meta: { title: string; text: string }[];
  cta: string; ctaHref: string; ctaVariant?: 'primary' | 'ghost';
  flip?: boolean; alt?: boolean; visual?: React.ReactNode; visualLast?: boolean;
}) {
  return (
    <section id={id} className={alt ? 's-to-alt' : 's-to-main'} style={{ padding: '96px 8vw', background: alt ? C.bg2 : C.bg }}>
      <div className="svc-grid" style={{
        display: 'grid',
        gridTemplateColumns: visual ? 'repeat(auto-fit, minmax(min(100%,420px),1fr))' : '1fr',
        gap: 72,
        alignItems: 'center',
        direction: flip ? 'rtl' : 'ltr',
      }}>
        <div style={{ direction: 'ltr' }}>
          <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 16 }}>{num}</p>
          <h2 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(22px,2.4vw,36px)', fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: 14 }} dangerouslySetInnerHTML={{ __html: headline }} />
          <p data-reveal style={{ ...rev(0.1), fontSize: 'clamp(14px,1.1vw,16px)', color: C.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 24 }}>{sub}</p>
          <p data-reveal style={{ ...rev(0.2), fontSize: 13, color: C.muted, lineHeight: 1.75, marginBottom: 28, fontWeight: 300 }}>{body}</p>
          <div data-reveal style={{ ...rev(0.2), display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
            {meta.map((m) => (
              <div key={m.title} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <strong style={{ fontSize: 13, fontWeight: 500, color: C.txt, display: 'block', marginBottom: 2 }}>{m.title}</strong>
                  <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{m.text}</p>
                </div>
              </div>
            ))}
          </div>
          <a
            data-reveal
            href={ctaHref}
            style={{
              ...rev(0.3),
              fontSize: 13, fontWeight: ctaVariant === 'primary' ? 500 : 400,
              color: ctaVariant === 'primary' ? '#fff' : C.txt,
              padding: '10px 22px', borderRadius: 8,
              background: ctaVariant === 'primary' ? C.acc : 'transparent',
              border: `1px solid ${ctaVariant === 'primary' ? C.acc : C.border}`,
              cursor: 'pointer', display: 'inline-block', textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.15s',
            }}
          >
            {cta}
          </a>
        </div>
        {visual && (
          <div className={'svc-visual' + (visualLast ? ' svc-visual-last' : '')} data-reveal style={{
            ...rev(0.2), direction: 'ltr',
            border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden',
            background: 'rgba(75,107,251,0.03)', minHeight: 300, position: 'relative',
            display: 'flex', flexDirection: 'column',
          }}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Main page ─── */
export default function ServiziPage() {
  useReveal();

  useEffect(() => {
    let opsObserver: IntersectionObserver | undefined;
    const opsSection = document.querySelector('.ops-animate');
    if (opsSection) {
      opsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              opsObserver!.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );
      opsObserver.observe(opsSection);
    }
    const fallback = setTimeout(() => {
      document.querySelectorAll('.ops-animate:not(.in-view)').forEach((el) => el.classList.add('in-view'));
    }, 3000);
    return () => {
      opsObserver?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="fw-page" style={{ background: C.bg, color: C.txt, fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      <style>{`
        @media(max-width:768px){
          .svc-grid{display:flex!important;flex-direction:column;gap:40px!important}
          .svc-visual{order:-1;margin-bottom:0}
          .svc-visual-last{order:2!important}
        }
        .ops-animate{opacity:0;transform:translateY(20px);transition:opacity .6s ease,transform .6s ease}
        .ops-animate.in-view{opacity:1;transform:none}
        .ops-animate .animated-row,.ops-animate .animated-bar,.ops-animate [class*="pulse"]{animation-play-state:paused}
        .ops-animate.in-view .animated-row,.ops-animate.in-view .animated-bar,.ops-animate.in-view [class*="pulse"]{animation-play-state:running}
      `}</style>

      {/* page hero */}
      <div style={{ padding: '140px 8vw 80px' }}>
        <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 20 }}>Servizi</p>
        <h1 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 600, lineHeight: 1.08, letterSpacing: '-0.03em', maxWidth: 800 }}>
          Servizi AI pensati<br />per il lavoro di tutti i giorni
        </h1>
        <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.2vw,17px)', color: C.muted, maxWidth: 560, marginTop: 20, lineHeight: 1.7, fontWeight: 300 }}>
          Non soluzioni costruite per sembrare innovative. Soluzioni costruite per alleggerire, organizzare e migliorare il lavoro reale.
        </p>
      </div>

      {/* Cinema demo */}
      <ServiziDemoHero />

      {/* 01 Prenotazioni */}
      <ServiceSection
        id="s1" num="Prenotazioni e richieste"
        headline="Più ordine tra richieste,<br>prenotazioni e contatti"
        sub="Quando le richieste arrivano da più canali, il rischio non è solo la confusione. È perdere occasioni."
        body="Molte attività locali vivono una situazione comune: i clienti scrivono, chiamano, chiedono informazioni, vogliono prenotare. Tutto su canali diversi, in tempi diversi, con ritmi difficili da seguire. Un agente AI per prenotazioni e richieste centralizza le interazioni, organizza le informazioni e supporta le risposte frequenti."
        meta={[
          { title: 'Problema che risolve', text: 'Disordine tra richieste, tempi di risposta lunghi, appuntamenti che si perdono, carico operativo eccessivo.' },
          { title: 'Beneficio finale', text: 'Più velocità, meno dispersione, migliore esperienza per il cliente e maggiore continuità nella gestione.' },
        ]}
        cta="Scopri come funziona" ctaHref="#cta-finale" ctaVariant="primary"
        visual={<InboxVisual />} visualLast
      />

      {/* 02 Supporto operativo */}
      <ServiceSection
        id="s2" num="Supporto operativo" alt flip
        headline="Un supporto concreto nelle attività<br>che si ripetono ogni giorno"
        sub="Non tutto ciò che occupa tempo crea valore. Spesso una parte del lavoro pesa solo perché si ripete troppo."
        body="Ci sono compiti che non fanno notizia ma consumano ore: ricontrollare informazioni, recuperare dati, rispondere a richieste simili, organizzare passaggi interni. FreyrtechnologyAI sviluppa agenti AI che affiancano l'operatività proprio su questo piano — per togliere attrito alle attività più dispersive."
        meta={[
          { title: 'Problema che risolve', text: 'Sovraccarico operativo, troppe attività manuali, perdita di tempo su compiti a basso valore.' },
          { title: 'Beneficio finale', text: 'Meno interruzioni, meno energia dispersa, più tempo per le attività che contano davvero.' },
        ]}
        cta="Parliamone" ctaHref="#cta-finale" ctaVariant="ghost"
        visual={<TaskVisual />} visualLast
      />

      {/* 03 Analisi dati */}
      <ServiceSection
        id="s3" num="Analisi dati e insight"
        headline="Capire meglio<br>ciò che succede nella tua attività"
        sub="Avere dei dati non basta. Il vero valore è riuscire a leggerli in modo utile."
        body="Molte imprese raccolgono informazioni ogni giorno senza riuscire a trasformarle in lettura operativa. Un agente AI dedicato all'analisi porta ordine, evidenzia trend, anomalie e segnali utili, restituendo informazioni più leggibili per chi deve decidere."
        meta={[
          { title: 'Problema che risolve', text: 'Dati presenti ma poco sfruttati, difficoltà nel leggere trend, decisioni senza una visione chiara.' },
          { title: 'Beneficio finale', text: "Più consapevolezza, decisioni più rapide, maggiore controllo sull'andamento reale del business." },
        ]}
        cta="Richiedi una demo" ctaHref="#cta-finale" ctaVariant="primary"
      />

      {/* Dashboard demo */}
      <div style={{ marginTop: '72px', marginBottom: '48px', padding: '0 8vw', background: C.bg }}>
        <DashboardDemo />
      </div>

      {/* 04 Automazione flussi */}
      <ServiceSection
        id="s4" num="Automazione di flussi interni" alt flip
        headline="Meno passaggi inutili,<br>più fluidità nei processi"
        sub="Quando un processo è lento o dipende troppo da gestione manuale, anche il lavoro migliore perde efficienza."
        body="Molte attività convivono con flussi interni costruiti nel tempo in modo spontaneo: fogli, note, messaggi, passaggi verbali. È normale, ma diventa un freno. FreyrtechnologyAI interviene aiutando l'impresa a individuare dove l'AI può alleggerire processi interni, rendere i passaggi più chiari e portare maggiore coerenza operativa."
        meta={[
          { title: 'Problema che risolve', text: 'Processi lenti, flussi disordinati, dipendenza eccessiva da passaggi manuali.' },
          { title: 'Beneficio finale', text: 'Più ordine nei processi, meno frizioni, maggiore efficienza interna.' },
        ]}
        cta="Analizziamo il tuo caso" ctaHref="#cta-finale" ctaVariant="ghost"
        visual={<FlowVisual />}
      />

      {/* 05 Soluzioni adattabili */}
      <ServiceSection
        id="s5" num="Soluzioni adattabili"
        headline="Nessuna attività è uguale<br>a un'altra. E nemmeno la soluzione."
        sub="FreyrtechnologyAI non forza uno schema standard. Parte dal contesto reale dell'impresa."
        body="Il vero limite di molte soluzioni digitali è che chiedono all'azienda di adattarsi allo strumento. FreyrtechnologyAI lavora al contrario: osserva il modo in cui l'attività funziona, capisce dove si crea attrito e costruisce un collaboratore AI coerente con quel contesto."
        meta={[
          { title: 'Approccio', text: "Ascolto prima, soluzione dopo. Mai uno strumento generico imposto dall'esterno." },
          { title: 'Beneficio finale', text: 'Una soluzione più credibile, più adottabile e più utile nel lavoro quotidiano.' },
        ]}
        cta="Parla con noi" ctaHref="#cta-finale" ctaVariant="primary"
        visual={
          <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, marginBottom: 4 }}>Adattato per ogni tipo di attività</div>
            <p style={{ fontSize: 11, color: C.muted, marginBottom: 16, lineHeight: 1.5 }}>Un collaboratore AI costruito attorno alla tua realtà, non il contrario.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {[
                { title: 'Hotel & Hospitality', desc: 'Gestione prenotazioni, check-in, richieste ospiti' },
                { title: 'Ristoranti', desc: 'Prenotazioni tavoli, menu, gestione turni' },
                { title: 'Saloni & Wellness', desc: 'Appuntamenti, follow-up clienti, promozioni' },
                { title: 'Retail & Negozi', desc: 'Richieste prodotto, ordini, disponibilità' },
                { title: 'Professionisti', desc: 'Agenda, documentazione, reportistica' },
                { title: 'Delivery & Food', desc: 'Ordini, comunicazioni, flussi operativi' },
              ].map(({ title, desc }) => (
                <div
                  key={title}
                  style={{ padding: 14, borderRadius: 10, border: `1px solid ${C.border}`, background: 'rgba(13,15,20,0.6)', transition: 'border-color 0.3s, background 0.3s', cursor: 'default' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(75,107,251,0.4)'; e.currentTarget.style.background = 'rgba(75,107,251,0.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'rgba(13,15,20,0.6)'; }}
                >
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc, marginBottom: 8 }} />
                  <strong style={{ fontSize: 12, fontWeight: 500, color: C.txt, display: 'block', marginBottom: 4 }}>{title}</strong>
                  <p style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        }
      />

      {/* CTA */}
      <section id="cta-finale" style={{ padding: '100px 8vw', textAlign: 'center', background: `radial-gradient(ellipse 80% 60% at 50% 100%,rgba(75,107,251,0.12) 0%,transparent 70%)` }}>
        <p data-reveal style={{ ...rev(0), fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500, marginBottom: 20 }}>Inizia da qui</p>
        <h2 data-reveal style={{ ...rev(0.1), fontSize: 'clamp(26px,3.5vw,52px)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: 680, margin: '0 auto 18px' }}>
          Capire qual è il servizio giusto<br />per la tua attività è il primo passo
        </h2>
        <p data-reveal style={{ ...rev(0.2), fontSize: 'clamp(14px,1.1vw,16px)', color: C.muted, maxWidth: 460, margin: '0 auto 36px', lineHeight: 1.65, fontWeight: 300 }}>
          Parliamone partendo da come lavori oggi. Senza impegno, senza tecnicismi.
        </p>
        <div data-reveal style={{ ...rev(0.2), display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <a href="mailto:info@freyrwork.com" style={{ fontSize: 13, fontWeight: 500, color: '#fff', padding: '10px 22px', borderRadius: 8, background: C.acc, border: `1px solid ${C.acc}`, textDecoration: 'none', transition: 'opacity 0.2s' }}>
            Prenota una consulenza
          </a>
          <a href="mailto:info@freyrwork.com" style={{ fontSize: 13, fontWeight: 400, color: C.txt, padding: '10px 22px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', textDecoration: 'none', transition: 'border-color 0.2s' }}>
            Analizziamo il tuo caso
          </a>
        </div>
        <p data-reveal style={{ ...rev(0.3), fontSize: 12, color: C.muted, marginTop: 18 }}>Nessun tecnicismo inutile. Partiamo da come lavori oggi.</p>
      </section>

      {/* footer */}
      <footer style={{ padding: '40px 8vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: 'rgba(244,243,238,0.3)' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo/logo.png" alt="FreyrtechnologyAI" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span>Freyr<span style={{ color: C.acc, opacity: 0.6 }}>technology</span>AI</span>
        </span>
        <span style={{ fontSize: 12, color: 'rgba(244,243,238,0.18)' }}>© 2025 FreyrtechnologyAI. Agenti AI per PMI e imprese locali.</span>
      </footer>
    </div>
  );
}
