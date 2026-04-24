'use client';

import { useEffect, useRef, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   ServiziDemoHero
   Hero demo cinematica full-viewport, stile Linear/Vercel.
   3 pane: INBOX (sx) → AGENT CORE (centro, streaming thoughts) → ACTIONS (dx)
   4 metriche live in alto, selector settore.
   ═══════════════════════════════════════════════════════════════ */

const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  bg3: '#141720',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.45)',
  dim: 'rgba(244,243,238,0.25)',
  border: 'rgba(255,255,255,0.07)',
  ok: '#4ade80',
  warn: '#FB923C',
};

type Sector = 'hotel' | 'ristorante' | 'beauty' | 'retail';
const SECTORS: { id: Sector; label: string }[] = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'ristorante', label: 'Ristorante' },
  { id: 'beauty', label: 'Beauty & Wellness' },
  { id: 'retail', label: 'Retail' },
];

type Channel = 'whatsapp' | 'email' | 'call' | 'form' | 'instagram';
const chColor: Record<Channel, string> = {
  whatsapp: '#25D366', email: '#7B94FC', call: '#FB923C', form: '#4B6BFB', instagram: '#E1306C',
};
const chLabel: Record<Channel, string> = {
  whatsapp: 'WhatsApp', email: 'Email', call: 'Chiamata', form: 'Form sito', instagram: 'Instagram',
};

type Step = {
  channel: Channel; from: string; request: string;
  thought: string; classify: string;
  actions: { system: string; detail: string }[];
  manual: number; agent: number;
};

const FLOW: Record<Sector, Step[]> = {
  hotel: [
    {
      channel: 'whatsapp', from: 'Marco R.',
      request: 'Buongiorno, avete due camere matrimoniali con vista sul lago per il 14-16 giugno? Veniamo con i bambini.',
      thought: 'Richiesta di prenotazione identificata. Date 14-16 giugno, 2 camere matrimoniali, menzione bambini → potenziale famiglia, considerare camere family.',
      classify: 'Prenotazione · Alta priorità',
      actions: [
        { system: 'PMS · Channel Manager', detail: 'Verifica disponibilità 14-16/06' },
        { system: 'CRM Ospiti', detail: 'Nuovo lead profilato: famiglia, 4 ospiti' },
        { system: 'Risposta WhatsApp', detail: 'Disponibili 2 Deluxe vista lago — €220/notte' },
      ],
      manual: 612, agent: 4.2,
    },
    {
      channel: 'email', from: 'Laura Bianchi',
      request: 'Richiesta conferma colazione in camera per domani ore 8:00, allergia al lattosio.',
      thought: 'Richiesta operativa. Nota allergia → flag dietetica, alert cucina. Ora colazione 8:00 disponibile.',
      classify: 'Servizio in struttura · Media',
      actions: [
        { system: 'PMS · Scheda ospite', detail: 'Flag allergia lattosio aggiunto' },
        { system: 'Cucina · Turno mattino', detail: 'Alert: colazione in camera 302 ore 8:00' },
        { system: 'Conferma email', detail: 'Risposta automatica con dettagli menù senza lattosio' },
      ],
      manual: 425, agent: 3.1,
    },
    {
      channel: 'call', from: '+39 347 ••• ••31',
      request: 'Chiamata in arrivo alle 22:47 — richiesta disponibilità camere',
      thought: 'Chiamata fuori orario ricevuta. Avvio conversazione automatica: rispondo alla richiesta, verifico disponibilità e gestisco la prenotazione in tempo reale senza rimandare.',
      classify: 'Prenotazione · Fuori orario',
      actions: [
        { system: 'Conversazione AI', detail: 'Agente avviato · risposta in 3s' },
        { system: 'PMS · Disponibilità', detail: 'Verificata e comunicata al cliente' },
        { system: 'Prenotazione', detail: 'Confermata direttamente in chat' },
      ],
      manual: 358, agent: 2.4,
    },
  ],
  ristorante: [
    {
      channel: 'whatsapp', from: 'Giulia M.',
      request: 'Posso prenotare un tavolo per 6 sabato alle 20:30? Una persona è celiaca.',
      thought: 'Prenotazione sabato sera 20:30, tavolo da 6, nota celiachia → avvisare cucina, verificare tavolo 6 posti, area fuori passaggio.',
      classify: 'Prenotazione · Sabato sera',
      actions: [
        { system: 'Gestionale · Sala', detail: 'Tavolo 12 bloccato 20:30 · 6 coperti' },
        { system: 'Cucina · Brigade', detail: 'Alert: menù celiaco, tavolo 12 sabato' },
        { system: 'Conferma WhatsApp', detail: 'Prenotazione confermata + menù dedicato' },
      ],
      manual: 487, agent: 3.8,
    },
    {
      channel: 'instagram', from: '@foodielover_rm',
      request: 'DM: quali sono i piatti di stagione questa settimana?',
      thought: 'Richiesta informativa via social. Estrai menù settimanale stagionale dal gestionale, rispondi con top 3 + link per prenotazione.',
      classify: 'Info · Social',
      actions: [
        { system: 'Menu Manager', detail: 'Estratto menù settimana 38' },
        { system: 'Instagram DM', detail: 'Risposta inviata con 3 piatti + link' },
        { system: 'Analytics', detail: 'Lead social registrato' },
      ],
      manual: 296, agent: 2.1,
    },
    {
      channel: 'form', from: 'Evento privato',
      request: 'Richiesta privativa sala per cena aziendale 25 persone, 28 ottobre.',
      thought: 'Richiesta evento privato, grande gruppo 25 pax, data lontana. Verificare disponibilità sala privata, generare preventivo menù gruppi.',
      classify: 'Evento · Alta priorità',
      actions: [
        { system: 'Agenda eventi', detail: 'Sala privata 28/10 in opzione' },
        { system: 'Preventivo auto', detail: 'Menu 3 portate · €45 pp generato' },
        { system: 'Email cliente', detail: 'Inviato preventivo + disponibilità conferma' },
      ],
      manual: 894, agent: 5.6,
    },
  ],
  beauty: [
    {
      channel: 'whatsapp', from: 'Sara L.',
      request: 'Ciao! Vorrei prenotare un colore + taglio da Marta giovedì pomeriggio se possibile.',
      thought: 'Richiesta specifica operatrice Marta, servizio colore+taglio (~2h30). Controlla agenda Marta giovedì pomeriggio, proponi slot.',
      classify: 'Appuntamento · Colore+taglio',
      actions: [
        { system: 'Agenda · Marta', detail: 'Slot 15:30-18:00 disponibile giovedì' },
        { system: 'Scheda cliente', detail: 'Sara L. · storico: 3 visite, no allergie' },
        { system: 'Conferma WhatsApp', detail: 'Slot proposto + reminder 24h prima' },
      ],
      manual: 524, agent: 3.4,
    },
    {
      channel: 'email', from: 'Elena T.',
      request: 'Posso spostare il mio appuntamento di venerdì 16:00 a martedì prossimo?',
      thought: 'Modifica appuntamento. Cerca prenotazione di Elena venerdì 16:00, verifica disponibilità martedì nella stessa fascia.',
      classify: 'Modifica · Standard',
      actions: [
        { system: 'Agenda · Matching', detail: 'Appuntamento trovato e liberato' },
        { system: 'Agenda · Nuovo', detail: 'Martedì 16:00 confermato' },
        { system: 'Email conferma', detail: 'Riepilogo inviato con reminder' },
      ],
      manual: 342, agent: 2.2,
    },
    {
      channel: 'instagram', from: '@claudia_mkt',
      request: 'Vi state prenotando per i trattamenti viso?',
      thought: 'Lead da social, richiesta generica info disponibilità. Invia listino trattamenti viso + 3 slot disponibili settimana.',
      classify: 'Lead · Social',
      actions: [
        { system: 'Catalogo servizi', detail: 'Trattamenti viso · 5 varianti' },
        { system: 'Instagram DM', detail: 'Risposta con listino + 3 slot' },
        { system: 'CRM · Lead', detail: 'Contatto @claudia_mkt registrato' },
      ],
      manual: 268, agent: 1.9,
    },
  ],
  retail: [
    {
      channel: 'whatsapp', from: 'Davide P.',
      request: 'Avete ancora il modello Nike Air Pegasus 41 nero taglia 44?',
      thought: 'Verifica disponibilità SKU specifico per taglia. Interroga gestionale inventario, controlla anche store vicini se esauriti.',
      classify: 'Verifica stock · Priorità',
      actions: [
        { system: 'ERP · Stock', detail: 'Pegasus 41 · taglia 44 · 2 pezzi in sede' },
        { system: 'Prenotazione', detail: 'Articolo tenuto per 24h a nome cliente' },
        { system: 'Risposta WhatsApp', detail: 'Disponibile + prenotazione confermata' },
      ],
      manual: 428, agent: 2.8,
    },
    {
      channel: 'form', from: 'Ordine online',
      request: 'Nuovo ordine #8427 · 3 articoli · spedizione espressa',
      thought: 'Ordine e-commerce ricevuto. Verifica giacenza, genera picking list, assegna al corriere express.',
      classify: 'Ordine · Evaso',
      actions: [
        { system: 'WMS · Picking', detail: 'Lista generata · corsia B3' },
        { system: 'Corriere', detail: 'Etichetta espressa stampata' },
        { system: 'Email cliente', detail: 'Tracking inviato · consegna 24h' },
      ],
      manual: 712, agent: 4.5,
    },
    {
      channel: 'email', from: 'Reso cliente',
      request: 'Vorrei restituire un capo acquistato 10 giorni fa, è possibile?',
      thought: 'Richiesta di reso entro finestra 14 giorni → procedibile. Verifica ordine, genera RMA e label prepagata.',
      classify: 'Reso · Entro finestra',
      actions: [
        { system: 'Gestione resi', detail: 'RMA #2847 generato' },
        { system: 'Corriere · Label', detail: 'Etichetta reso prepagata creata' },
        { system: 'Email cliente', detail: 'Istruzioni + label allegato inviati' },
      ],
      manual: 385, agent: 3.2,
    },
  ],
};

export default function ServiziDemoHero() {
  const [sector, setSector] = useState<Sector>('hotel');
  const [activeStep, setActiveStep] = useState(0);
  const [phase, setPhase] = useState<'receiving' | 'thinking' | 'acting' | 'done'>('receiving');
  const [inboxItems, setInboxItems] = useState<{ step: Step; t: number; selected: boolean }[]>([]);
  const [thoughtText, setThoughtText] = useState('');
  const [classifyText, setClassifyText] = useState('');
  const [actionsVisible, setActionsVisible] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { visible.current = !!e?.isIntersecting; }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    setActiveStep(0); setPhase('receiving'); setInboxItems([]);
    setThoughtText(''); setClassifyText(''); setActionsVisible(0);
  }, [sector]);

  useEffect(() => {
    const steps = FLOW[sector];
    const step = steps[activeStep];
    if (!step) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      if (!visible.current) { timers.push(setTimeout(run, 600)); return; }
      setPhase('receiving');
      setInboxItems((prev) => {
        const pruned = prev.slice(-4).map((p) => ({ ...p, selected: false, t: p.t + 1 }));
        return [...pruned, { step, t: 0, selected: true }];
      });
      setThoughtText(''); setClassifyText(''); setActionsVisible(0);

      timers.push(setTimeout(() => {
        setPhase('thinking');
        setClassifyText(step.classify);
        const full = step.thought;
        let i = 0;
        const si = setInterval(() => {
          i += 2;
          setThoughtText(full.slice(0, i));
          if (i >= full.length) {
            clearInterval(si);
            timers.push(setTimeout(() => {
              setPhase('acting');
              let a = 0;
              const ai = setInterval(() => {
                a++;
                setActionsVisible(a);
                if (a >= step.actions.length) {
                  clearInterval(ai);
                  timers.push(setTimeout(() => {
                    setPhase('done');
                    timers.push(setTimeout(() => { setActiveStep((prev) => (prev + 1) % steps.length); }, 2500));
                  }, 2000));
                }
              }, 700);
            }, 600));
          }
        }, 35);
      }, 1400));
    };

    run();
    return () => { timers.forEach(clearTimeout); };
  }, [activeStep, sector]);

  const step = FLOW[sector][activeStep];

  return (
    <section
      ref={rootRef}
      className="s-to-main sd-section-wrap"
      style={{
        position: 'relative', minHeight: '100svh', width: '100%',
        background: C.bg, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <style>{sdStyles}</style>
      <div className="sd-bg" aria-hidden />
      <div className="sd-grid" aria-hidden />

      {/* Top bar */}
      <div className="sd-topbar">
        <div className="sd-topbar-left">
          <span className="sd-live-dot" />
          <span className="sd-eyebrow">Freyrwork · Live demo</span>
          <span className="sd-divider">/</span>
          <span className="sd-eyebrow-dim">Osserva un agente AI ricevere, ragionare e agire in tempo reale</span>
        </div>
        <div className="sd-sector">
          <span className="sd-sector-label">Settore</span>
          <div className="sd-sector-pills">
            {SECTORS.map((s) => (
              <button key={s.id} className={'sd-pill ' + (s.id === sector ? 'active' : '')} onClick={() => setSector(s.id)} type="button">
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3-pane cinema */}
      <div className="sd-cinema">
        <SdPane title="Inbox multicanale" subtitle="Richieste in entrata" icon={<IconInbox />} state={phase === 'receiving' ? 'active' : 'idle'}>
          <div className="sd-inbox">
            {inboxItems.slice().reverse().map((item, i) => (
              <InboxCard key={`${activeStep}-${i}`} item={item} animate={i === 0} />
            ))}
          </div>
        </SdPane>

        <FlowArrow active={phase === 'thinking' || phase === 'acting'} label="CLASSIFICA" />

        <SdPane title="Agent core" subtitle="Ragionamento in corso" icon={<IconCore />} state={phase === 'thinking' ? 'active' : phase === 'acting' || phase === 'done' ? 'success' : 'idle'} highlight>
          <div className="sd-core">
            <div className="sd-core-meta">
              <div className="sd-core-kv">
                <span className="sd-core-k">Input</span>
                <span className="sd-core-v">
                  <span className="sd-ch-dot" style={{ background: chColor[step.channel] }} /> {chLabel[step.channel]} · {step.from}
                </span>
              </div>
              <div className="sd-core-kv">
                <span className="sd-core-k">Classificazione</span>
                <span className={'sd-core-v ' + (classifyText ? 'show' : '')}>{classifyText || '…'}</span>
              </div>
            </div>
            <div className="sd-thought-label">
              <span className="sd-thought-ind" />
              {phase === 'receiving' ? 'In attesa di input…' : phase === 'thinking' ? 'Sto ragionando…' : phase === 'acting' ? 'Ho ragionato, sto agendo' : 'Completato'}
            </div>
            <div className="sd-thought">
              <span>{thoughtText}</span>
              {phase === 'thinking' && <span className="sd-caret" />}
            </div>
          </div>
        </SdPane>

        <FlowArrow active={phase === 'acting' || phase === 'done'} label="AGISCE" />

        <SdPane title="Azioni eseguite" subtitle="Sistemi esterni" icon={<IconActions />} state={phase === 'acting' ? 'active' : phase === 'done' ? 'success' : 'idle'}>
          <div className="sd-actions">
            {step.actions.map((a, i) => (
              <ActionRow key={`${activeStep}-${i}`} action={a} visible={i < actionsVisible} index={i} />
            ))}
          </div>
        </SdPane>
      </div>

    </section>
  );
}

function SdPane({ title, subtitle, icon, state, highlight, children }: {
  title: string; subtitle: string; icon: React.ReactNode;
  state: 'idle' | 'active' | 'success'; highlight?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={'sd-pane ' + state + (highlight ? ' highlight' : '')}>
      <div className="sd-pane-head">
        <div className="sd-pane-icon">{icon}</div>
        <div className="sd-pane-titles">
          <div className="sd-pane-title">{title}</div>
          <div className="sd-pane-sub">{subtitle}</div>
        </div>
        <div className={'sd-pane-state ' + state}>
          <span className="sd-pane-dot" />
          {state === 'idle' ? 'in attesa' : state === 'active' ? 'attivo' : 'completato'}
        </div>
      </div>
      <div className="sd-pane-body">{children}</div>
    </div>
  );
}

function InboxCard({ item, animate }: { item: { step: Step; t: number; selected: boolean }; animate: boolean }) {
  const { step, selected } = item;
  return (
    <div className={'sd-inbox-card ' + (selected ? 'selected' : '') + (animate ? ' enter' : '')}>
      <div className="sd-inbox-top">
        <span className="sd-inbox-channel" style={{ background: chColor[step.channel] }} />
        <span className="sd-inbox-ch-label">{chLabel[step.channel]}</span>
        <span className="sd-inbox-from">· {step.from}</span>
        {selected && <span className="sd-inbox-badge">in lavorazione</span>}
      </div>
      <div className="sd-inbox-text">{step.request}</div>
    </div>
  );
}

function ActionRow({ action, visible, index }: { action: { system: string; detail: string }; visible: boolean; index: number }) {
  return (
    <div className={'sd-action ' + (visible ? 'in' : 'out')} style={{ transitionDelay: `${index * 40}ms` }}>
      <div className="sd-action-check">
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
          <path d="M2 5.2L4 7.2L8 3" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="sd-action-body">
        <div className="sd-action-sys">{action.system}</div>
        <div className="sd-action-detail">{action.detail}</div>
      </div>
      <div className="sd-action-tag">ok</div>
    </div>
  );
}

function FlowArrow({ active, label }: { active: boolean; label: string }) {
  return (
    <div className={'sd-arrow ' + (active ? 'active' : '')}>
      <div className="sd-arrow-track">
        <div className="sd-arrow-dot" />
        <div className="sd-arrow-dot d2" />
        <div className="sd-arrow-dot d3" />
      </div>
      <span className="sd-arrow-label">{label}</span>
    </div>
  );
}

const sw = { stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };
function IconInbox() {
  return <svg width={16} height={16} viewBox="0 0 24 24" {...sw}><path d="M22 12h-6l-2 3h-4l-2-3H2" /><path d="M5.5 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" /></svg>;
}
function IconCore() {
  return <svg width={16} height={16} viewBox="0 0 24 24" {...sw}><circle cx="12" cy="12" r="3" /><path d="M12 1v6M12 17v6M4.2 4.2l4.3 4.3M15.5 15.5l4.3 4.3M1 12h6M17 12h6M4.2 19.8l4.3-4.3M15.5 8.5l4.3-4.3" /></svg>;
}
function IconActions() {
  return <svg width={16} height={16} viewBox="0 0 24 24" {...sw}><polyline points="20 6 9 17 4 12" /></svg>;
}

const sdStyles = `
.sd-topbar{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:26px 32px 0;flex-wrap:wrap}
.sd-topbar-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.sd-live-dot{width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 10px rgba(74,222,128,.8);animation:sdLive 1.6s ease-in-out infinite}
.sd-eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${C.acc2};font-weight:500}
.sd-eyebrow-dim{font-size:11px;letter-spacing:.04em;color:${C.muted};font-weight:400}
.sd-divider{color:${C.dim};font-size:11px}
.sd-sector{display:flex;align-items:center;gap:12px}
.sd-sector-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.dim};font-weight:500}
.sd-sector-pills{display:flex;gap:4px;padding:3px;background:${C.bg3};border:1px solid ${C.border};border-radius:999px}
.sd-pill{font-size:12px;font-weight:500;color:${C.muted};padding:7px 14px;border:none;background:transparent;border-radius:999px;cursor:pointer;transition:all .2s;font-family:inherit}
.sd-pill:hover{color:${C.txt}}
.sd-pill.active{background:${C.acc};color:#fff;box-shadow:0 6px 18px rgba(75,107,251,.32)}
.sd-metrics{position:relative;z-index:2;display:grid;grid-template-columns:repeat(4,1fr);gap:0;padding:26px 32px;border-bottom:1px solid ${C.border}}
.sd-metric{display:flex;flex-direction:column;gap:8px;padding:4px 20px;border-left:1px solid ${C.border}}
.sd-metric:first-child{padding-left:0;border-left:none}
.sd-metric-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.dim};font-weight:500}
.sd-metric-value{display:flex;align-items:baseline;gap:6px}
.sd-metric-num{font-size:clamp(26px,3.4vw,40px);font-weight:600;color:${C.txt};letter-spacing:-.03em;line-height:1}
.sd-metric-num.ok{color:${C.ok}}
.sd-metric-unit{font-size:12px;color:${C.muted};font-weight:400}
.sd-metric.glow .sd-metric-num{text-shadow:0 0 20px rgba(123,148,252,.3)}
.sd-cinema{position:relative;z-index:2;flex:1;display:grid;grid-template-columns:1fr 44px 1.2fr 44px 1fr;gap:14px;padding:26px 32px;min-height:0;align-items:stretch}
.sd-pane{display:flex;flex-direction:column;border:1px solid ${C.border};background:linear-gradient(180deg,${C.bg2} 0%,rgba(13,15,20,.8) 100%);border-radius:14px;overflow:hidden;transition:border-color .4s,box-shadow .4s}
.sd-pane.highlight{background:linear-gradient(180deg,rgba(17,20,30,1) 0%,rgba(13,15,20,.85) 100%)}
.sd-pane.active{border-color:rgba(75,107,251,.45);box-shadow:0 0 0 1px rgba(75,107,251,.18),0 22px 58px rgba(75,107,251,.15)}
.sd-pane.success{border-color:rgba(74,222,128,.25)}
.sd-pane-head{display:flex;align-items:center;gap:12px;padding:16px 18px;border-bottom:1px solid ${C.border}}
.sd-pane-icon{width:28px;height:28px;border-radius:7px;background:rgba(75,107,251,.1);border:1px solid rgba(75,107,251,.28);display:flex;align-items:center;justify-content:center;color:${C.acc2}}
.sd-pane-titles{flex:1;min-width:0}
.sd-pane-title{font-size:13px;font-weight:500;color:${C.txt};letter-spacing:-.005em}
.sd-pane-sub{font-size:11px;color:${C.muted};margin-top:2px}
.sd-pane-state{display:inline-flex;align-items:center;gap:6px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;font-weight:500;padding:4px 8px;border-radius:6px;background:rgba(255,255,255,.03);color:${C.dim};border:1px solid ${C.border};white-space:nowrap}
.sd-pane-state.active{color:${C.acc2};background:rgba(75,107,251,.08);border-color:rgba(75,107,251,.3)}
.sd-pane-state.success{color:${C.ok};background:rgba(74,222,128,.08);border-color:rgba(74,222,128,.22)}
.sd-pane-dot{width:6px;height:6px;border-radius:50%;background:currentColor;box-shadow:0 0 8px currentColor}
.sd-pane.active .sd-pane-dot{animation:sdLive 1.2s ease-in-out infinite}
.sd-pane-body{flex:1;padding:16px 18px;overflow:hidden;display:flex;flex-direction:column;gap:10px}
.sd-inbox{display:flex;flex-direction:column;gap:10px;overflow:hidden}
.sd-inbox-card{padding:12px 14px;border:1px solid ${C.border};background:rgba(13,15,20,.5);border-radius:10px;display:flex;flex-direction:column;gap:6px;transition:all .4s;opacity:.5}
.sd-inbox-card.selected{border-color:rgba(75,107,251,.5);background:rgba(75,107,251,.06);opacity:1;box-shadow:inset 0 0 0 1px rgba(75,107,251,.15)}
.sd-inbox-card.enter{animation:sdInboxIn .5s ease both}
.sd-inbox-top{display:flex;align-items:center;gap:8px;font-size:11px}
.sd-inbox-channel{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.sd-inbox-ch-label{font-weight:500;color:${C.txt}}
.sd-inbox-from{color:${C.muted}}
.sd-inbox-badge{margin-left:auto;font-size:9px;letter-spacing:.1em;text-transform:uppercase;background:rgba(75,107,251,.15);color:${C.acc2};padding:2px 6px;border-radius:4px;font-weight:500;animation:sdInboxBadge 1.4s ease infinite}
.sd-inbox-text{font-size:12px;color:${C.muted};line-height:1.55}
.sd-core{display:flex;flex-direction:column;gap:14px;height:100%;min-height:0}
.sd-core-meta{display:flex;flex-direction:column;gap:10px;padding-bottom:12px;border-bottom:1px dashed ${C.border}}
.sd-core-kv{display:flex;align-items:center;gap:10px;font-size:11px}
.sd-core-k{width:92px;flex-shrink:0;color:${C.dim};letter-spacing:.1em;text-transform:uppercase;font-weight:500;font-size:10px}
.sd-core-v{color:${C.muted};display:flex;align-items:center;gap:6px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px}
.sd-core-v.show{color:${C.acc2}}
.sd-ch-dot{width:6px;height:6px;border-radius:50%;display:inline-block}
.sd-thought-label{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:${C.acc2};font-weight:500;display:flex;align-items:center;gap:8px}
.sd-thought-ind{width:5px;height:5px;border-radius:50%;background:${C.acc2};box-shadow:0 0 8px ${C.acc2};animation:sdLive 1.2s ease-in-out infinite}
.sd-thought{flex:1;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13px;line-height:1.72;color:${C.txt};background:rgba(13,15,20,.5);border:1px solid ${C.border};border-radius:10px;padding:14px 16px;overflow:hidden;position:relative;letter-spacing:-.005em}
.sd-caret{display:inline-block;width:8px;height:14px;background:${C.acc2};margin-left:3px;vertical-align:middle;animation:sdCaret 1s ease-in-out infinite;border-radius:1px;box-shadow:0 0 6px ${C.acc2}}
.sd-actions{display:flex;flex-direction:column;gap:8px}
.sd-action{display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid ${C.border};background:rgba(13,15,20,.5);border-radius:9px;opacity:0;transform:translateX(10px);transition:opacity .4s,transform .4s,border-color .4s,background .4s}
.sd-action.in{opacity:1;transform:none;border-color:rgba(74,222,128,.22);background:rgba(74,222,128,.04)}
.sd-action-check{width:20px;height:20px;border-radius:50%;background:rgba(74,222,128,.12);border:1px solid rgba(74,222,128,.4);color:${C.ok};display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sd-action-body{flex:1;min-width:0}
.sd-action-sys{font-size:11.5px;font-weight:500;color:${C.txt};letter-spacing:-.005em}
.sd-action-detail{font-size:11px;color:${C.muted};margin-top:2px;line-height:1.5;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sd-action-tag{font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${C.ok};background:rgba(74,222,128,.08);border:1px solid rgba(74,222,128,.22);padding:3px 7px;border-radius:5px;font-weight:500}
.sd-arrow{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;min-height:60px;padding-top:40px;opacity:.35;transition:opacity .4s}
.sd-arrow.active{opacity:1}
.sd-arrow-track{display:flex;flex-direction:row;gap:5px}
.sd-arrow-dot{width:6px;height:6px;border-radius:50%;background:${C.acc};opacity:.25}
.sd-arrow.active .sd-arrow-dot{animation:sdDotFlow 1.3s ease-in-out infinite}
.sd-arrow.active .sd-arrow-dot.d2{animation-delay:.15s}
.sd-arrow.active .sd-arrow-dot.d3{animation-delay:.3s}
.sd-arrow-label{font-size:9px;letter-spacing:.18em;text-transform:uppercase;color:${C.dim};font-weight:500}
.sd-compare{position:relative;z-index:2;display:grid;grid-template-columns:260px 1fr 240px;gap:28px;align-items:center;padding:22px 32px;border-top:1px solid ${C.border};background:rgba(17,20,30,.4)}
.sd-compare-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.dim};font-weight:500;display:block;margin-bottom:4px}
.sd-compare-title{font-size:18px;font-weight:500;color:${C.txt};letter-spacing:-.015em;line-height:1.2}
.sd-compare-bars{display:flex;flex-direction:column;gap:12px;min-width:0}
.sd-cmp-row{display:flex;align-items:center;justify-content:space-between;font-size:11px;margin-bottom:6px}
.sd-cmp-label{color:${C.muted};font-weight:400}
.sd-cmp-time{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;color:${C.txt};font-weight:500}
.sd-cmp-time.fast{color:${C.acc2};font-weight:600}
.sd-cmp-track{height:5px;background:rgba(255,255,255,.04);border-radius:999px;overflow:hidden}
.sd-cmp-fill{height:100%;transition:width 1.2s cubic-bezier(.2,.8,.2,1);border-radius:999px}
.sd-cmp-fill.warn{background:linear-gradient(90deg,rgba(251,146,60,.35),rgba(251,146,60,.9))}
.sd-cmp-fill.acc{background:linear-gradient(90deg,${C.acc} 0%,${C.acc2} 100%);box-shadow:0 0 16px rgba(75,107,251,.45)}
.sd-compare-right{text-align:right}
.sd-compare-save-label{font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:${C.dim};font-weight:500;margin-bottom:6px}
.sd-compare-save{font-size:22px;font-weight:600;color:${C.ok};letter-spacing:-.02em;line-height:1.15}
.sd-compare-x{display:block;font-size:11px;font-weight:400;color:${C.muted};margin-top:3px}
.sd-bg{position:absolute;inset:0;z-index:0;pointer-events:none;background:radial-gradient(ellipse 70% 40% at 20% 30%,rgba(75,107,251,.1),transparent 70%),radial-gradient(ellipse 50% 40% at 85% 75%,rgba(123,148,252,.08),transparent 70%)}
.sd-grid{position:absolute;inset:0;z-index:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:56px 56px;mask-image:radial-gradient(ellipse 80% 70% at 50% 40%,#000 30%,transparent 80%)}
@keyframes sdLive{0%,100%{opacity:1}50%{opacity:.35}}
@keyframes sdCaret{0%,100%{opacity:0}50%{opacity:1}}
@keyframes sdInboxIn{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:none}}
@keyframes sdInboxBadge{0%,100%{opacity:.85}50%{opacity:.5}}
@keyframes sdDotFlow{0%{transform:translateY(0);opacity:.25}50%{transform:translateY(-2px);opacity:1}100%{transform:translateY(0);opacity:.25}}
@media(max-width:1100px){
  .sd-cinema{grid-template-columns:1fr;grid-template-rows:auto 34px auto 34px auto;gap:10px;padding:20px}
  .sd-arrow{flex-direction:row;padding-top:0;min-height:34px}
  .sd-metrics{grid-template-columns:repeat(2,1fr);gap:12px 0;padding:20px}
  .sd-metric{padding:4px 16px}
  .sd-metric:nth-child(3){border-left:none;padding-left:0}
  .sd-topbar{padding:22px 20px 0;gap:14px}
  .sd-compare{grid-template-columns:1fr;gap:16px;padding:20px}
  .sd-compare-right{text-align:left}
}
@media(max-width:640px){
  .sd-topbar{flex-direction:column;align-items:flex-start;gap:16px}
  .sd-metrics{padding:16px 20px}
  .sd-metric{padding:6px 0;border-left:none !important}
  .sd-metric:not(:first-child){border-top:1px solid ${C.border};padding-top:12px}
  .sd-pill{font-size:11px;padding:6px 10px}
  .sd-compare-title{font-size:16px}
  .sd-compare-save{font-size:18px}
  .sd-thought{font-size:12px}
  .sd-section-wrap{overflow:visible !important;min-height:0 !important;height:auto !important}
  .sd-pane{overflow:visible}
  .sd-pane-body{overflow:visible;flex:none}
  .sd-inbox{overflow:visible}
  .sd-actions{overflow:visible}
}
`;
