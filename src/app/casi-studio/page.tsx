'use client';

import { useEffect, useState } from 'react';

/* ─── design tokens (coerente con home/servizi/agente-ai) ─── */
const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.45)',
  border: 'rgba(255,255,255,0.07)',
};

const HOTEL_REQUESTS = [
  { ch: 'Email', color: '#FB923C', text: 'Richiesta check-in anticipato', cat: 'Info ospite', reply: 'Info inviata' },
  { ch: 'WhatsApp', color: '#25D366', text: 'Disponibilità 12-14 giugno?', cat: 'Prenotazione', reply: 'Verificata + proposta' },
  { ch: 'Form', color: C.acc, text: 'Colazione senza glutine', cat: 'Preferenze', reply: 'Nota salvata' },
  { ch: 'Booking', color: '#003580', text: 'Ritardo arrivo — ore 23:00', cat: 'Operativo', reply: 'Reception notificata' },
  { ch: 'Instagram', color: '#E1306C', text: 'Che servizi spa offrite?', cat: 'Info servizi', reply: 'Risposta inviata' },
];

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

/* ═══════════════════════════════════════════════════════════════
   HERO — compatto, con griglia animata di casi
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '180px 8vw 100px',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(75,107,251,0.09), transparent 70%), ' + C.bg,
        borderBottom: `1px solid ${C.border}`,
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
        Casi studio
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
        Esempi concreti,
        <br />
        <span style={{ color: '#5972ff', fontWeight: 300 }}>non promesse astratte</span>
      </h1>
      <p
        data-reveal
        style={{
          ...rev(0.2),
          fontSize: 'clamp(15px,1.3vw,18px)',
          color: 'rgba(244,243,238,0.62)',
          lineHeight: 1.8,
          fontWeight: 300,
          maxWidth: 680,
          margin: '0 auto 32px',
        }}
      >
        Ogni caso studio mostra come un collaboratore AI può intervenire su problemi operativi reali e
        generare benefici tangibili. Non solo il risultato — ti mostriamo come l&apos;agente è entrato nel
        flusso e cosa ha automatizzato.
      </p>
      <div
        data-reveal
        style={{
          ...rev(0.3),
          display: 'flex',
          gap: 12,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {['Hotel', 'Ristorazione', 'Beauty & wellness'].map((t) => (
          <a
            key={t}
            href={`#caso-${t.toLowerCase().replace(/[^a-z]/g, '')}`}
            style={{
              fontSize: 12,
              color: C.txt,
              padding: '10px 18px',
              borderRadius: 999,
              border: '1px solid rgba(75,107,251,0.28)',
              background: 'rgba(75,107,251,0.06)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(75,107,251,0.14)';
              e.currentTarget.style.borderColor = 'rgba(75,107,251,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(75,107,251,0.06)';
              e.currentTarget.style.borderColor = 'rgba(75,107,251,0.28)';
            }}
          >
            {t}
          </a>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VISUALIZZAZIONI ATTIVE — una per caso studio
   ═══════════════════════════════════════════════════════════════ */

/* ─── Visual 1: Hotel — agent smista richieste multi-canale ─── */
function HotelAutomation() {
  const [step, setStep] = useState(0);
  const [processed, setProcessed] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => {
        const n = s + 1;
        if (n > HOTEL_REQUESTS.length + 2) {
          setProcessed([]);
          return 0;
        }
        if (n >= 1 && n <= HOTEL_REQUESTS.length) {
          setProcessed((p) => [...p, n - 1]);
        }
        return n;
      });
    }, 1600);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        background: 'rgba(75,107,251,0.03)',
        border: '1px solid rgba(75,107,251,0.14)',
        borderRadius: 16,
        padding: 'clamp(18px,2vw,28px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,260px),1fr))',
        gap: 16,
        position: 'relative',
        minHeight: 440,
      }}
    >
      <style>{`
        @keyframes slideInMsg { from { opacity:0; transform: translateX(-10px); } to { opacity:1; transform:none; } }
        @keyframes pulseAgent { 0%,100%{box-shadow:0 0 0 0 rgba(75,107,251,0.4);} 50%{box-shadow:0 0 0 8px rgba(75,107,251,0);} }
        @keyframes appearReply { from { opacity:0; transform: translateY(8px);} to { opacity:1; transform:none;} }
      `}</style>

      {/* COL 1: Richieste in ingresso */}
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.muted,
            fontWeight: 500,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#FB923C' }} />
          Richieste in entrata
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {HOTEL_REQUESTS.slice(0, step).map((r, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(13,15,20,0.7)',
                border: `1px solid ${C.border}`,
                borderRadius: 8,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 12,
                animation: 'slideInMsg 0.4s ease both',
                opacity: processed.includes(i) ? 0.38 : 1,
                transition: 'opacity 0.5s',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: r.color, flexShrink: 0 }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 10, color: r.color, fontWeight: 500, marginBottom: 2 }}>{r.ch}</div>
                <div
                  style={{
                    color: processed.includes(i) ? C.muted : 'rgba(244,243,238,0.85)',
                    textDecoration: processed.includes(i) ? 'line-through' : 'none',
                    lineHeight: 1.4,
                  }}
                >
                  {r.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COL 2: Agente centrale */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: '16px 8px',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: 'rgba(75,107,251,0.12)',
            border: '1px solid rgba(75,107,251,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 18,
            color: C.acc2,
            animation: 'pulseAgent 2s ease-in-out infinite',
          }}
        >
          AI
        </div>
        <div style={{ textAlign: 'center', fontSize: 11, color: C.txt, fontWeight: 500 }}>
          Agente Hotel
        </div>
        <div
          style={{
            fontSize: 10,
            color: '#4ade80',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulseAgent 1.6s ease-in-out infinite',
            }}
          />
          Operativo
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            color: C.muted,
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: 160,
          }}
        >
          Legge → classifica → risponde o instrada
        </div>
      </div>

      {/* COL 3: Gestite */}
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.muted,
            fontWeight: 500,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
          Gestite dall&apos;agente
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {processed.map((i) => {
            const r = HOTEL_REQUESTS[i];
            return (
              <div
                key={i}
                style={{
                  background: 'rgba(74,222,128,0.05)',
                  border: '1px solid rgba(74,222,128,0.22)',
                  borderRadius: 8,
                  padding: '10px 12px',
                  fontSize: 12,
                  animation: 'appearReply 0.5s ease both',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    color: '#4ade80',
                    fontWeight: 500,
                    marginBottom: 3,
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <span>✓</span>
                  <span>{r.cat}</span>
                </div>
                <div style={{ color: 'rgba(244,243,238,0.75)', lineHeight: 1.4 }}>{r.reply}</div>
              </div>
            );
          })}
          {processed.length === 0 && (
            <div style={{ fontSize: 11, color: 'rgba(244,243,238,0.25)', fontStyle: 'italic', padding: '10px 2px' }}>
              In attesa…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Visual 2: Ristorante — prenotazioni sparse si consolidano in timeline ─── */
function RistoranteAutomation() {
  const [phase, setPhase] = useState<'before' | 'after'>('before');

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p === 'before' ? 'after' : 'before')), 4200);
    return () => clearInterval(id);
  }, []);

  const prenotazioni = [
    { time: '19:30', people: 2, name: 'Rossi', source: 'WhatsApp' },
    { time: '20:00', people: 4, name: 'Bianchi', source: 'Chiamata' },
    { time: '20:30', people: 3, name: 'Verdi', source: 'Form web' },
    { time: '21:00', people: 6, name: 'Neri', source: 'WhatsApp' },
    { time: '21:30', people: 2, name: 'Gialli', source: 'Email' },
  ];

  return (
    <div
      style={{
        background: 'rgba(75,107,251,0.03)',
        border: '1px solid rgba(75,107,251,0.14)',
        borderRadius: 16,
        padding: 'clamp(18px,2vw,28px)',
        position: 'relative',
        minHeight: 440,
      }}
    >
      <style>{`
        @keyframes scatterFloat {
          0%, 100% { transform: translate(0,0) rotate(var(--r)); }
          50% { transform: translate(var(--dx), var(--dy)) rotate(var(--r)); }
        }
        @keyframes fadeInScale { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {/* Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 22, gap: 6 }}>
        {['before', 'after'].map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p as 'before' | 'after')}
            style={{
              fontSize: 11,
              padding: '7px 16px',
              borderRadius: 999,
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid ' + (phase === p ? 'rgba(75,107,251,0.5)' : C.border),
              background: phase === p ? 'rgba(75,107,251,0.14)' : 'transparent',
              color: phase === p ? C.acc2 : C.muted,
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
          >
            {p === 'before' ? 'Prima' : 'Dopo l\'agente'}
          </button>
        ))}
      </div>

      {/* Container fisso a dimensioni comuni */}
      <div style={{ position: 'relative', minHeight: 330 }}>
        {/* BEFORE: prenotazioni sparse */}
        {phase === 'before' && (
          <div
            style={{
              position: 'relative',
              height: 330,
              animation: 'fadeInScale 0.5s ease both',
            }}
          >
            {prenotazioni.map((p, i) => {
              const positions = [
                { top: '8%', left: '12%', r: -8, dx: 4, dy: -6 },
                { top: '18%', left: '58%', r: 6, dx: -5, dy: 3 },
                { top: '42%', left: '26%', r: -4, dx: 3, dy: 5 },
                { top: '55%', left: '68%', r: 9, dx: -4, dy: -3 },
                { top: '72%', left: '36%', r: -6, dx: 5, dy: -4 },
              ];
              const pos = positions[i];
              return (
                <div
                  key={i}
                  style={
                    {
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      background: 'rgba(13,15,20,0.85)',
                      border: `1px solid ${C.border}`,
                      borderRadius: 8,
                      padding: '10px 14px',
                      fontSize: 12,
                      minWidth: 160,
                      animation: `scatterFloat ${5 + i * 0.4}s ease-in-out infinite`,
                      '--r': `${pos.r}deg`,
                      '--dx': `${pos.dx}px`,
                      '--dy': `${pos.dy}px`,
                      transform: `rotate(${pos.r}deg)`,
                    } as React.CSSProperties
                  }
                >
                  <div style={{ fontSize: 10, color: '#FB923C', fontWeight: 500, marginBottom: 3 }}>
                    {p.source}
                  </div>
                  <div style={{ color: 'rgba(244,243,238,0.85)', fontWeight: 500 }}>
                    {p.time} · {p.name} ({p.people} pax)
                  </div>
                </div>
              );
            })}
            <div
              style={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: 11,
                color: C.muted,
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: 1.5,
              }}
            >
              Sparse su canali diversi. Facili da perdere o sovrapporre.
            </div>
          </div>
        )}

        {/* AFTER: timeline unificata */}
        {phase === 'after' && (
          <div
            style={{
              animation: 'fadeInScale 0.5s ease both',
              padding: '8px 0',
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.acc2,
                marginBottom: 16,
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#4ade80',
                  animation: 'pulseAgent 1.6s ease-in-out infinite',
                }}
              />
              Servizio di oggi — unificato dall&apos;agente
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {prenotazioni.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr auto auto',
                    gap: 14,
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderRadius: 8,
                    background: 'rgba(13,15,20,0.6)',
                    border: `1px solid ${C.border}`,
                    fontSize: 12,
                    animation: `fadeInScale 0.4s ease ${i * 0.08}s both`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 600,
                      color: C.acc2,
                      fontSize: 15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {p.time}
                  </div>
                  <div>
                    <div style={{ color: C.txt, fontWeight: 500, marginBottom: 1 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>via {p.source}</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.muted }}>{p.people} persone</div>
                  <div
                    style={{
                      fontSize: 10,
                      color: '#4ade80',
                      background: 'rgba(74,222,128,0.1)',
                      padding: '3px 8px',
                      borderRadius: 4,
                      fontWeight: 500,
                      letterSpacing: '0.03em',
                    }}
                  >
                    CONFERMATA
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                textAlign: 'center',
                fontSize: 11,
                color: C.muted,
                lineHeight: 1.5,
              }}
            >
              Conferme automatiche inviate · Sovrapposizioni prevenute · Carico sul personale azzerato
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Visual 3: Salone — calendario che si auto-organizza ─── */
function SaloneAutomation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 8), 1200);
    return () => clearInterval(id);
  }, []);

  const slots = [
    { time: '09:00', service: 'Taglio', client: 'M. Rossi', color: C.acc },
    { time: '09:45', service: 'Colore', client: 'S. Bianchi', color: '#E1306C' },
    { time: '10:30', service: 'Taglio + barba', client: 'A. Verdi', color: '#FB923C' },
    { time: '11:30', service: 'Messa in piega', client: 'L. Neri', color: C.acc2 },
    { time: '14:00', service: 'Trattamento', client: 'G. Gialli', color: '#4ade80' },
    { time: '15:15', service: 'Colore', client: 'F. Blu', color: '#E1306C' },
  ];

  const incomingActions = [
    'WhatsApp: "Posso spostare a domani?"',
    'Agente: Verifica disponibilità…',
    'Agente: Slot proposto 10:30',
    'Agente: Conferma cliente ricevuta',
    'Agente: Reminder 24h inviato',
    'Agente: Slot libero segnalato',
    'Agente: Ottimizzata pausa pranzo',
    'Tutto aggiornato',
  ];

  const activeSlot = step % slots.length;

  return (
    <div
      style={{
        background: 'rgba(75,107,251,0.03)',
        border: '1px solid rgba(75,107,251,0.14)',
        borderRadius: 16,
        padding: 'clamp(18px,2vw,28px)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)',
        gap: 24,
        minHeight: 440,
      }}
    >
      <style>{`
        @keyframes highlightSlot { 0%,100% { background: rgba(13,15,20,0.6); border-color: ${C.border}; } 50% { background: rgba(75,107,251,0.1); border-color: rgba(75,107,251,0.5); } }
        @keyframes pulseDot { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.6; } }
      `}</style>

      {/* Calendario */}
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.muted,
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          Agenda — giovedì 21
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {slots.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px 1fr auto',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 8,
                background: i === activeSlot ? 'rgba(75,107,251,0.1)' : 'rgba(13,15,20,0.6)',
                border: `1px solid ${i === activeSlot ? 'rgba(75,107,251,0.5)' : C.border}`,
                fontSize: 12,
                transition: 'background 0.4s, border-color 0.4s',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontFamily: 'Syne, sans-serif',
                  fontSize: 13,
                  color: i === activeSlot ? C.acc2 : 'rgba(244,243,238,0.55)',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <span
                  style={{
                    width: 4,
                    height: 22,
                    background: s.color,
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ color: C.txt, fontWeight: 500, marginBottom: 1 }}>{s.service}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>{s.client}</div>
                </div>
              </div>
              {i === activeSlot && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: C.acc,
                    animation: 'pulseDot 1s ease-in-out infinite',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Agent log */}
      <div>
        <div
          style={{
            fontSize: 10,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: C.muted,
            fontWeight: 500,
            marginBottom: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#4ade80',
              animation: 'pulseDot 1.6s ease-in-out infinite',
            }}
          />
          Attività agente
        </div>
        <div
          style={{
            background: 'rgba(13,15,20,0.7)',
            border: `1px solid ${C.border}`,
            borderRadius: 8,
            padding: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 11,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            height: 280,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {incomingActions.slice(0, step + 1).reverse().map((a, i) => (
            <div
              key={`${step}-${i}`}
              style={{
                color: i === 0 ? C.acc2 : 'rgba(244,243,238,0.45)',
                lineHeight: 1.5,
                animation: i === 0 ? 'fadeInScale 0.3s ease both' : 'none',
                fontSize: i === 0 ? 11.5 : 10.5,
                opacity: Math.max(0.25, 1 - i * 0.18),
              }}
            >
              <span style={{ color: C.muted, marginRight: 6 }}>
                {String(14 + Math.floor(step / 2)).padStart(2, '0')}:
                {String((step * 7 + i * 3) % 60).padStart(2, '0')}
              </span>
              {a}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 12, lineHeight: 1.5 }}>
          L&apos;agente aggiorna il calendario, conferma gli slot, invia i reminder e segnala le ottimizzazioni
          senza che nessuno debba seguirlo a mano.
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CASE STUDY BLOCK — template riusato per ciascun caso
   ═══════════════════════════════════════════════════════════════ */
type Case = {
  id: string;
  num: string;
  sector: string;
  title: string;
  problem: string;
  before: string;
  intervention: string;
  application: string;
  result: string;
  metrics: { label: string; value: string }[];
  Visual: React.ComponentType;
  alt?: boolean;
};

function CaseStudy({ data }: { data: Case }) {
  return (
    <section
      id={data.id}
      style={{
        padding: '100px 8vw',
        background: data.alt ? C.bg2 : C.bg,
        borderBottom: `1px solid ${C.border}`,
        position: 'relative',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          marginBottom: 22,
          flexWrap: 'wrap',
        }}
      >
        <span
          data-reveal
          style={{
            ...rev(0),
            fontFamily: 'Syne, sans-serif',
            fontSize: 40,
            fontWeight: 700,
            color: 'rgba(75,107,251,0.22)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {data.num}
        </span>
        <div
          data-reveal
          style={{
            ...rev(0.1),
            fontSize: 10,
            color: C.acc2,
            padding: '5px 12px',
            borderRadius: 999,
            background: 'rgba(75,107,251,0.08)',
            border: '1px solid rgba(75,107,251,0.28)',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Settore · {data.sector}
        </div>
      </div>

      <h2
        data-reveal
        style={{
          ...rev(0.15),
          fontSize: 'clamp(26px,3.2vw,48px)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          fontFamily: 'Syne, sans-serif',
          color: C.txt,
          maxWidth: 780,
          marginBottom: 40,
        }}
      >
        {data.title}
      </h2>

      {/* Visualizzazione attiva, full-width */}
      <div data-reveal style={{ ...rev(0.2), marginBottom: 48 }}>
        <data.Visual />
      </div>

      {/* Contenuto strutturato a 2 colonne */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,340px),1fr))',
          gap: 48,
          alignItems: 'start',
        }}
      >
        {/* Col sx: problema + before */}
        <div data-reveal style={rev(0.25)}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#FB923C',
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            Problema iniziale
          </div>
          <p
            style={{
              fontSize: 15,
              color: C.txt,
              lineHeight: 1.65,
              fontWeight: 400,
              marginBottom: 28,
            }}
          >
            {data.problem}
          </p>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.muted,
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            Prima situazione
          </div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>
            {data.before}
          </p>
        </div>

        {/* Col dx: intervento + risultato */}
        <div data-reveal style={rev(0.3)}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: C.acc2,
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            Intervento Freyrwork
          </div>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 16 }}>
            {data.intervention}
          </p>
          <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, fontWeight: 300, marginBottom: 28 }}>
            {data.application}
          </p>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#4ade80',
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            Risultato
          </div>
          <p style={{ fontSize: 15, color: C.txt, lineHeight: 1.7, fontWeight: 400, marginBottom: 24 }}>
            {data.result}
          </p>

          {/* Metriche qualitative */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,120px),1fr))',
              gap: 1,
              background: C.border,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {data.metrics.map((m) => (
              <div
                key={m.label}
                style={{
                  background: data.alt ? C.bg : C.bg2,
                  padding: '16px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif',
                    fontSize: 22,
                    fontWeight: 600,
                    color: C.acc2,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMMON SECTION (template completo caso studio singolo)
   ═══════════════════════════════════════════════════════════════ */
function FlowBeforeAfter() {
  return (
    <section
      style={{
        padding: '100px 8vw',
        background: C.bg2,
        borderBottom: `1px solid ${C.border}`,
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
          marginBottom: 18,
        }}
      >
        Pattern ricorrente
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
          marginBottom: 16,
        }}
      >
        Prima / dopo: cosa cambia davvero
        <br />
        quando entra l&apos;agente AI
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
          marginBottom: 48,
        }}
      >
        Ogni caso studio racconta lo stesso arco: richieste sparse, gestione manuale e poca uniformità
        diventano flusso ordinato, informazioni organizzate e supporto costante.
      </p>

      <div
        data-reveal
        style={{
          ...rev(0.2),
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))',
          gap: 14,
        }}
      >
        {[
          { tag: 'Prima', color: '#FB923C', points: ['Richieste sparse', 'Gestione manuale', 'Poca uniformità'] },
          { tag: 'Dopo', color: '#4ade80', points: ['Flusso ordinato', 'Informazioni organizzate', 'Supporto continuo'] },
        ].map((col) => (
          <div
            key={col.tag}
            style={{
              padding: 28,
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background: C.bg,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 18,
                paddingBottom: 14,
                borderBottom: `1px solid ${C.border}`,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: col.color }} />
              <strong
                style={{
                  fontSize: 11,
                  color: col.color,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                {col.tag}
              </strong>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {col.points.map((p) => (
                <li
                  key={p}
                  style={{ fontSize: 14, color: 'rgba(244,243,238,0.8)', display: 'flex', gap: 10 }}
                >
                  <span style={{ color: col.color, flexShrink: 0 }}>{col.tag === 'Prima' ? '—' : '✓'}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CTA FINALE
   ═══════════════════════════════════════════════════════════════ */
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
        Il tuo caso
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
        Parliamone per capire se un approccio simile
        <br />
        può funzionare anche nella tua attività
      </h2>
      <p
        data-reveal
        style={{
          ...rev(0.2),
          fontSize: 'clamp(14px,1.2vw,17px)',
          color: C.muted,
          maxWidth: 540,
          margin: '0 auto 40px',
          lineHeight: 1.7,
          fontWeight: 300,
        }}
      >
        Ogni caso parte da un problema diverso, ma l&apos;approccio è lo stesso. Raccontaci com&apos;è
        fatta la tua attività — partiamo da lì.
      </p>
      <div data-reveal style={{ ...rev(0.25), display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <a
          href="mailto:info@freyrwork.com"
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
          Analizziamo il tuo caso
        </a>
        <a
          href="/agente-ai"
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
          Scopri cos&apos;è un agente AI
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════════════════
   DATA CASI — direttamente dal copy
   ═══════════════════════════════════════════════════════════════ */
const CASES: Case[] = [
  {
    id: 'caso-hotel',
    num: '01',
    sector: 'Hotel · Ospitalità',
    title: 'Smistare richieste da 5 canali diversi senza far perdere tempo al team',
    problem:
      'Gestione frammentata di richieste e prenotazioni, con informazioni distribuite su più canali e difficoltà nel mantenere continuità nelle risposte.',
    before:
      'Il team si trovava a rincorrere messaggi, conferme, richieste ricorrenti e informazioni utili ai clienti, con un forte dispendio di tempo operativo e poca visibilità d\'insieme.',
    intervention:
      'Freyrwork ha progettato un agente AI capace di supportare la gestione delle richieste, organizzare le informazioni e alleggerire una parte del flusso operativo quotidiano.',
    application:
      'Il collaboratore AI è stato adattato al contesto della struttura per supportare i passaggi più ripetitivi e migliorare l\'ordine del lavoro.',
    result:
      'Più rapidità nella gestione, meno dispersione, migliore continuità operativa e maggiore controllo sulle richieste in ingresso.',
    metrics: [
      { value: '5 canali', label: 'centralizzati in un unico flusso' },
      { value: '< 1 min', label: 'tempo medio di prima risposta' },
      { value: '24/7', label: 'copertura operativa' },
    ],
    Visual: HotelAutomation,
  },
  {
    id: 'caso-ristorazione',
    num: '02',
    sector: 'Ristorazione',
    title: 'Consolidare prenotazioni sparse in una timeline ordinata',
    problem:
      'Richieste e prenotazioni gestite in modo poco ordinato, con tempi di risposta variabili e troppa dipendenza dalla disponibilità del personale.',
    before:
      'Molte informazioni restavano sparse tra telefonate, messaggi e appunti, rendendo il lavoro meno fluido e più esposto a dimenticanze o sovrapposizioni.',
    intervention:
      'Freyrwork ha costruito un agente AI capace di supportare l\'organizzazione delle richieste e alleggerire il carico operativo nelle attività ripetitive.',
    application:
      'L\'agente è stato inserito nei punti del flusso dove il ristorante perdeva più tempo e dove la gestione manuale generava più attrito.',
    result:
      'Più ordine nella gestione, meno dispersione e maggiore efficienza quotidiana.',
    metrics: [
      { value: '0', label: 'sovrapposizioni su tavoli' },
      { value: '+40%', label: 'conferme automatiche' },
      { value: '-2h/g', label: 'lavoro manuale in sala' },
    ],
    Visual: RistoranteAutomation,
    alt: true,
  },
  {
    id: 'caso-beautywellness',
    num: '03',
    sector: 'Beauty · Wellness',
    title: 'Un\'agenda che si aggiorna, conferma e ottimizza da sola',
    problem:
      'Appuntamenti, richieste e informazioni clienti gestiti in modo discontinuo e spesso dipendenti da disponibilità immediata.',
    before:
      'Il lavoro si accumulava sulle stesse persone, riducendo il tempo per seguire al meglio il cliente e complicando l\'organizzazione.',
    intervention:
      'Freyrwork ha sviluppato un collaboratore AI orientato al supporto operativo e alla semplificazione del flusso di gestione.',
    application:
      'L\'agente AI è stato adattato alle esigenze del salone per rendere più lineare la gestione delle richieste e migliorare l\'ordine delle informazioni.',
    result: 'Più fluidità, meno interruzioni e maggiore qualità organizzativa.',
    metrics: [
      { value: '+28%', label: 'slot ottimizzati' },
      { value: '100%', label: 'reminder inviati in automatico' },
      { value: '< 30s', label: 'tempo di conferma richiesta' },
    ],
    Visual: SaloneAutomation,
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function CasiStudioPage() {
  useReveal();

  return (
    <div
      style={{
        background: C.bg,
        color: C.txt,
        fontFamily: 'Inter, sans-serif',
        overflowX: 'hidden',
      }}
    >
      <Hero />
      {CASES.map((c) => (
        <CaseStudy key={c.id} data={c} />
      ))}
      <FlowBeforeAfter />
      <CTAFinal />
      <Footer />
    </div>
  );
}
