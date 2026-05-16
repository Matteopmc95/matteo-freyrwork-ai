'use client';

import { useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────
   DashboardDemo — dashboard live full-bleed
   - full-screen (no chatbot a destra)
   - tab manuali, nessuna animazione automatica
   - mobile-first: sidebar collassa, content scrolla, layout single-column
   ───────────────────────────────────────────────────────── */

const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  bg3: '#13151c',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.55)',
  faint: 'rgba(244,243,238,0.32)',
  border: 'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.12)',
  ok: '#4ade80',
  warn: '#FB923C',
  pink: '#E1306C',
  whats: '#25D366',
};

type TabId = 'overview' | 'crm' | 'bookings' | 'conv' | 'insight';

type Customer = {
  id: number;
  name: string;
  initials: string;
  color: string;
  channel: 'WhatsApp' | 'Email' | 'Instagram' | 'Telefono';
  lastSeen: string;
  status: 'attivo' | 'dormiente' | 'nuovo' | 'vip';
  ltv: number;
  visits: number;
  daysSince: number;
};

const CUSTOMERS: Customer[] = [
  { id: 1, name: 'Marco Bianchi', initials: 'MB', color: '#4ade80', channel: 'WhatsApp', lastSeen: '2 min fa', status: 'attivo', ltv: 1240, visits: 8, daysSince: 0 },
  { id: 2, name: 'Laura Rossi', initials: 'LR', color: '#FB923C', channel: 'Instagram', lastSeen: '8 min fa', status: 'attivo', ltv: 2180, visits: 14, daysSince: 0 },
  { id: 3, name: 'Andrea Serra', initials: 'AS', color: '#7B94FC', channel: 'Email', lastSeen: '14 min fa', status: 'attivo', ltv: 890, visits: 5, daysSince: 1 },
  { id: 4, name: 'Giulia Ferri', initials: 'GF', color: '#E1306C', channel: 'Telefono', lastSeen: '22 min fa', status: 'vip', ltv: 4520, visits: 32, daysSince: 0 },
  { id: 5, name: 'Stefano Conti', initials: 'SC', color: '#25D366', channel: 'WhatsApp', lastSeen: '63 giorni', status: 'dormiente', ltv: 2340, visits: 18, daysSince: 63 },
  { id: 6, name: 'Elena Marchetti', initials: 'EM', color: '#7B94FC', channel: 'Email', lastSeen: '71 giorni', status: 'dormiente', ltv: 1890, visits: 12, daysSince: 71 },
  { id: 7, name: 'Davide Russo', initials: 'DR', color: '#FB923C', channel: 'WhatsApp', lastSeen: '68 giorni', status: 'dormiente', ltv: 3120, visits: 22, daysSince: 68 },
  { id: 8, name: 'Chiara Greco', initials: 'CG', color: '#E1306C', channel: 'Instagram', lastSeen: '74 giorni', status: 'dormiente', ltv: 1450, visits: 9, daysSince: 74 },
  { id: 9, name: 'Roberto Lombardi', initials: 'RL', color: '#4ade80', channel: 'Telefono', lastSeen: '81 giorni', status: 'dormiente', ltv: 2780, visits: 16, daysSince: 81 },
  { id: 10, name: 'Sara Vitale', initials: 'SV', color: '#7B94FC', channel: 'WhatsApp', lastSeen: '67 giorni', status: 'dormiente', ltv: 1620, visits: 11, daysSince: 67 },
  { id: 11, name: 'Luca Caruso', initials: 'LC', color: '#FB923C', channel: 'Email', lastSeen: '78 giorni', status: 'dormiente', ltv: 2090, visits: 14, daysSince: 78 },
  { id: 12, name: 'Francesca Pellegrini', initials: 'FP', color: '#E1306C', channel: 'Instagram', lastSeen: '69 giorni', status: 'dormiente', ltv: 1380, visits: 8, daysSince: 69 },
  { id: 13, name: 'Matteo De Luca', initials: 'MD', color: '#4ade80', channel: 'WhatsApp', lastSeen: '5 ore fa', status: 'nuovo', ltv: 0, visits: 1, daysSince: 0 },
  { id: 14, name: 'Valeria Moretti', initials: 'VM', color: '#7B94FC', channel: 'Email', lastSeen: '1 ora fa', status: 'nuovo', ltv: 0, visits: 1, daysSince: 0 },
];

const DORMANT = CUSTOMERS.filter((c) => c.status === 'dormiente');

function eur(n: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return m;
}

/* ─────────────────────────────────────────────────────────
   ICONS
   ───────────────────────────────────────────────────────── */
const i = {
  home: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  cal: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  msg: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  spark: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  search: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bolt: <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  check: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  trend: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
};

/* ─────────────────────────────────────────────────────────
   PRIMITIVES
   ───────────────────────────────────────────────────────── */
function MiniBars({ data, height = 80, max }: { data: number[]; height?: number; max?: number }) {
  const m = max ?? Math.max(...data);
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height }}>
      {data.map((v, idx) => {
        const h = Math.max(4, (v / m) * height);
        return (
          <div key={idx} style={{
            flex: 1, height: h, borderRadius: '3px 3px 0 0',
            background: `linear-gradient(180deg, ${C.acc2}, ${C.acc}cc)`,
          }} />
        );
      })}
    </div>
  );
}

function Spark({ data, w = 120, h = 36, color = C.acc }: { data: number[]; w?: number; h?: number; color?: string }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 2;
  const pts = data.map((v, idx) => {
    const x = pad + (idx / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / Math.max(1, max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block', maxWidth: '100%' }} preserveAspectRatio="none" viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w - pad} cy={h - pad - ((data[data.length - 1] - min) / Math.max(1, max - min)) * (h - pad * 2)} r={2.5} fill={color} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   OVERVIEW
   ═══════════════════════════════════════════════════════════ */
function OverviewTab({ counters, isMobile }: { counters: { booked: number; handled: number; revenue: number; saved: number }, isMobile: boolean }) {
  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const dayData = [42, 38, 55, 48, 61, 78, 86];
  const channelMix = [
    { ch: 'WhatsApp', pct: 42, color: C.whats },
    { ch: 'Email', pct: 24, color: C.acc },
    { ch: 'Instagram', pct: 18, color: C.pink },
    { ch: 'Telefono', pct: 11, color: C.warn },
    { ch: 'Form sito', pct: 5, color: C.acc2 },
  ];

  const kpis = [
    { label: 'Prenotazioni oggi', value: counters.booked.toString(), delta: '+22%', spark: [12, 18, 15, 22, 19, 28, 34] },
    { label: 'Richieste gestite', value: counters.handled.toString(), delta: '+34%', spark: [40, 52, 48, 61, 58, 72, 86] },
    { label: 'Fatturato stimato', value: eur(counters.revenue), delta: '+18%', spark: [800, 1200, 1100, 1400, 1300, 1800, 2200] },
    { label: 'Ore risparmiate', value: counters.saved.toFixed(1), delta: '+12%', spark: [3, 4, 3.5, 5, 4.5, 6, 7.5] },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 10 }}>
      {kpis.map((k) => (
        <div key={k.label} style={{
          padding: isMobile ? 12 : 16, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`,
          display: 'flex', flexDirection: 'column', gap: 6, minHeight: isMobile ? 96 : 110,
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, lineHeight: 1.2 }}>{k.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
            <span style={{ fontSize: isMobile ? 20 : 26, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>{k.value}</span>
            <span style={{ fontSize: 10, color: C.ok, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
              {i.trend}{k.delta}
            </span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Spark data={k.spark} w={170} h={isMobile ? 22 : 28} />
          </div>
        </div>
      ))}

      <div style={{ gridColumn: isMobile ? 'span 2' : 'span 2', padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14, gap: 8, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Attività ultimi 7 giorni</div>
            <div style={{ fontSize: 13, color: C.txt, fontFamily: 'Syne, sans-serif', fontWeight: 500, marginTop: 4 }}>586 interazioni</div>
          </div>
          <span style={{ fontSize: 10, color: C.ok, display: 'flex', alignItems: 'center', gap: 4 }}>
            {i.trend} +22%
          </span>
        </div>
        <MiniBars data={dayData} height={isMobile ? 70 : 90} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {days.map((d) => <span key={d} style={{ fontSize: 9, color: C.faint, flex: 1, textAlign: 'center' }}>{d}</span>)}
        </div>
      </div>

      <div style={{ gridColumn: isMobile ? 'span 2' : 'span 2', padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 14 }}>Mix canali</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {channelMix.map((cm) => (
            <div key={cm.ch}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.txt, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: 2, background: cm.color, display: 'inline-block' }} />
                  {cm.ch}
                </span>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{cm.pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${cm.pct}%`, background: cm.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ gridColumn: isMobile ? 'span 2' : 'span 4', padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Attività recente dell&apos;agente</div>
          <span style={{ fontSize: 10, color: C.ok, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
            Live
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            { icon: i.check, color: C.ok, text: 'Prenotazione confermata: Marco Bianchi (WhatsApp)', time: 'ora' },
            { icon: i.msg, color: C.acc2, text: 'Risposta inviata su WhatsApp: "Disponibilità sabato"', time: '1 min' },
            { icon: i.cal, color: C.warn, text: 'Follow-up programmato per cliente Rossi', time: '4 min' },
            { icon: i.spark, color: C.pink, text: '12 clienti dormienti identificati', time: '8 min' },
            { icon: i.bolt, color: C.acc, text: 'Report giornaliero generato e inviato al team', time: '14 min' },
          ].map((a, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: idx < 4 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{
                width: 24, height: 24, borderRadius: 6,
                background: `${a.color}18`, border: `1px solid ${a.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, flexShrink: 0,
              }}>{a.icon}</span>
              <span style={{ flex: 1, fontSize: 11, color: C.muted, lineHeight: 1.5, minWidth: 0 }}>{a.text}</span>
              <span style={{ fontSize: 9, color: C.faint, flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CRM
   ═══════════════════════════════════════════════════════════ */
function CRMTab({ isMobile }: { isMobile: boolean }) {
  const [filter, setFilter] = useState<'all' | 'attivo' | 'dormiente' | 'nuovo' | 'vip'>('all');
  const filtered = filter === 'all' ? CUSTOMERS : CUSTOMERS.filter((c) => c.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: '1 1 180px', minWidth: 0, display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 8, background: C.bg2, border: `1px solid ${C.border}`,
        }}>
          <span style={{ color: C.faint, flexShrink: 0 }}>{i.search}</span>
          <span style={{ fontSize: 11, color: C.faint, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Cerca cliente…</span>
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {([
            { id: 'all', label: 'Tutti', count: CUSTOMERS.length },
            { id: 'vip', label: 'VIP', count: CUSTOMERS.filter((c) => c.status === 'vip').length },
            { id: 'attivo', label: 'Attivi', count: CUSTOMERS.filter((c) => c.status === 'attivo').length },
            { id: 'nuovo', label: 'Nuovi', count: CUSTOMERS.filter((c) => c.status === 'nuovo').length },
            { id: 'dormiente', label: 'Dormienti', count: DORMANT.length },
          ] as const).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as 'all' | 'attivo' | 'dormiente' | 'nuovo' | 'vip')}
              style={{
                fontSize: 10, padding: '6px 10px', borderRadius: 6,
                background: filter === f.id ? 'rgba(75,107,251,0.15)' : 'transparent',
                border: filter === f.id ? '1px solid rgba(75,107,251,0.4)' : `1px solid ${C.border}`,
                color: filter === f.id ? C.acc2 : C.muted,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
                fontWeight: filter === f.id ? 500 : 400,
                whiteSpace: 'nowrap',
              }}
            >
              {f.label}
              <span style={{ fontSize: 9, color: C.faint, fontFamily: 'Syne, sans-serif' }}>{f.count}</span>
            </button>
          ))}
        </div>
      </div>

      {isMobile ? (
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {filtered.map((c) => (
            <div key={c.id} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, background: C.bg2, border: `1px solid ${C.border}`,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: `linear-gradient(140deg, ${c.color}40, ${c.color}15)`,
                border: `1px solid ${c.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 600, color: c.color, flexShrink: 0,
                fontFamily: 'Syne, sans-serif',
              }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                <div style={{ fontSize: 10, color: C.muted, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span>{c.channel}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{c.lastSeen}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: C.txt, fontFamily: 'Syne, sans-serif' }}>{eur(c.ltv)}</div>
                <span style={{
                  fontSize: 8, padding: '2px 6px', borderRadius: 3, fontWeight: 500, textTransform: 'capitalize',
                  background: c.status === 'dormiente' ? 'rgba(251,146,60,0.15)' :
                              c.status === 'attivo' ? 'rgba(74,222,128,0.15)' :
                              c.status === 'nuovo' ? 'rgba(123,148,252,0.15)' : 'rgba(255,214,10,0.15)',
                  color: c.status === 'dormiente' ? C.warn :
                         c.status === 'attivo' ? C.ok :
                         c.status === 'nuovo' ? C.acc2 : '#FFD60A',
                }}>{c.status}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
            gap: 12, padding: '8px 14px', fontSize: 10, color: C.faint,
            textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500,
          }}>
            <span>Cliente</span><span>Canale</span><span>Ultimo contatto</span><span>LTV</span><span>Stato</span>
          </div>
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 5 }}>
            {filtered.map((c) => (
              <div key={c.id} style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px', gap: 12, alignItems: 'center',
                padding: '10px 14px', borderRadius: 8,
                background: c.status === 'vip' ? 'rgba(255,214,10,0.05)' : C.bg2, border: `1px solid ${C.border}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `linear-gradient(140deg, ${c.color}40, ${c.color}15)`,
                    border: `1px solid ${c.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 600, color: c.color, flexShrink: 0,
                    fontFamily: 'Syne, sans-serif',
                  }}>{c.initials}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                    <div style={{ fontSize: 10, color: C.faint }}>{c.visits} visite</div>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: C.muted }}>{c.channel}</span>
                <span style={{ fontSize: 11, color: C.muted }}>{c.lastSeen}</span>
                <span style={{ fontSize: 12, color: C.txt, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{eur(c.ltv)}</span>
                <span style={{
                  fontSize: 10, padding: '3px 8px', borderRadius: 4, fontWeight: 500, textTransform: 'capitalize',
                  background: c.status === 'dormiente' ? 'rgba(251,146,60,0.15)' :
                              c.status === 'attivo' ? 'rgba(74,222,128,0.15)' :
                              c.status === 'nuovo' ? 'rgba(123,148,252,0.15)' : 'rgba(255,214,10,0.15)',
                  color: c.status === 'dormiente' ? C.warn :
                         c.status === 'attivo' ? C.ok :
                         c.status === 'nuovo' ? C.acc2 : '#FFD60A',
                  border: `1px solid ${c.status === 'dormiente' ? 'rgba(251,146,60,0.3)' :
                              c.status === 'attivo' ? 'rgba(74,222,128,0.3)' :
                              c.status === 'nuovo' ? 'rgba(123,148,252,0.3)' : 'rgba(255,214,10,0.3)'}`,
                  textAlign: 'center', justifySelf: 'start',
                }}>{c.status}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKINGS
   ═══════════════════════════════════════════════════════════ */
function BookingsTab({ isMobile }: { isMobile: boolean }) {
  const slots = [
    { time: '09:00', name: 'Marco Bianchi', service: 'Camera Suite · 2 notti', source: 'WhatsApp', state: 'confirmed' },
    { time: '10:30', name: 'Laura Rossi', service: 'Tavolo 4 persone', source: 'Instagram', state: 'pending' },
    { time: '12:00', name: 'Andrea Serra', service: 'Consulenza 1h', source: 'Email', state: 'confirmed' },
    { time: '14:30', name: 'Giulia Ferri', service: 'VIP: cena privata x6', source: 'Telefono', state: 'vip' },
    { time: '16:00', name: 'Stefano Conti', service: 'Trattamento massaggio', source: 'WhatsApp', state: 'confirmed' },
    { time: '18:00', name: 'Elena Marchetti', service: 'Cena terrazza x2', source: 'Form sito', state: 'pending' },
    { time: '20:00', name: 'Davide Russo', service: 'Tavolo 2 persone', source: 'WhatsApp', state: 'confirmed' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 12, height: '100%' }}>
      <div style={{ padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Calendario di oggi</div>
          <span style={{ fontSize: 11, color: C.acc2, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{slots.length} appuntamenti</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {slots.map((s, idx) => {
            const cfg = s.state === 'confirmed'
              ? { tag: 'OK', color: C.ok, bg: 'rgba(74,222,128,0.1)' }
              : s.state === 'pending'
              ? { tag: 'Att', color: C.warn, bg: 'rgba(251,146,60,0.1)' }
              : { tag: 'VIP', color: '#FFD60A', bg: 'rgba(255,214,10,0.08)' };
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 10px', borderRadius: 8, background: cfg.bg,
                border: `1px solid ${cfg.color}25`,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif',
                  minWidth: 42, textAlign: 'center', padding: '4px 0',
                  background: 'rgba(0,0,0,0.3)', borderRadius: 5, flexShrink: 0,
                }}>{s.time}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: C.txt, fontWeight: 500, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.name}</div>
                  <div style={{ fontSize: 10, color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {s.service} <span style={{ opacity: 0.5 }}>·</span> {s.source}
                  </div>
                </div>
                <span style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4, fontWeight: 500,
                  color: cfg.color, background: 'transparent', border: `1px solid ${cfg.color}40`,
                  textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0,
                }}>{cfg.tag}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 12 }}>Tasso occupazione</div>
          <div style={{ fontSize: isMobile ? 30 : 36, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>87%</div>
          <div style={{ fontSize: 10, color: C.ok, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
            {i.trend} +14 punti vs media mensile
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '87%', background: `linear-gradient(90deg, ${C.acc}, ${C.acc2})` }} />
          </div>
        </div>
        <div style={{ padding: isMobile ? 14 : 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, flex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 12 }}>Disponibilità prossimi giorni</div>
          {[
            { day: 'Domani', free: 4, total: 12 },
            { day: 'Giovedì', free: 8, total: 12 },
            { day: 'Venerdì', free: 2, total: 12 },
            { day: 'Sabato', free: 0, total: 12, full: true },
            { day: 'Domenica', free: 5, total: 12 },
          ].map((d) => (
            <div key={d.day} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: C.txt }}>{d.day}</span>
                <span style={{ fontSize: 10, color: d.full ? C.warn : C.muted, fontFamily: 'Syne, sans-serif' }}>
                  {d.full ? 'Sold out' : `${d.free}/${d.total} liberi`}
                </span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${((d.total - d.free) / d.total) * 100}%`,
                  background: d.full ? C.warn : C.acc2,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CONVERSATIONS
   ═══════════════════════════════════════════════════════════ */
function ConvTab({ isMobile }: { isMobile: boolean }) {
  const threads = [
    { name: 'Marco Bianchi', ch: 'WhatsApp', preview: 'Perfetto, allora prenoto per sabato sera alle 20:30. Grazie!', unread: false, time: '2 min', auto: true },
    { name: 'Laura Rossi', ch: 'Instagram', preview: 'Vorrei sapere se avete ancora disponibilità per domenica brunch', unread: true, time: '8 min', auto: false },
    { name: 'Andrea Serra', ch: 'Email', preview: 'Confermo la prenotazione per giovedì alle 19. A presto!', unread: false, time: '14 min', auto: true },
    { name: 'Giulia Ferri', ch: 'Telefono', preview: '[Trascrizione] Vorrei modificare la prenotazione di sabato', unread: true, time: '22 min', auto: false },
    { name: 'Stefano Conti', ch: 'WhatsApp', preview: 'Ok, vi aggiorno entro domani sulla disponibilità', unread: false, time: '1 ora', auto: true },
  ];
  const [active, setActive] = useState(0);
  const t = threads[active];
  const [showThread, setShowThread] = useState(false);

  const messages: { who: 'them' | 'us'; text: string; time: string; auto?: boolean }[] = [
    { who: 'them', text: 'Buonasera, avete disponibilità per sabato sera?', time: '17:32' },
    { who: 'us', text: 'Buonasera! Sì, abbiamo disponibilità sabato 10 maggio. Per quante persone?', time: '17:32', auto: true },
    { who: 'them', text: 'Saremmo in 4', time: '17:35' },
    { who: 'us', text: 'Perfetto. Posso proporvi tre orari: 19:30, 20:30 oppure 21:30. Quale preferisce?', time: '17:35', auto: true },
    { who: 'them', text: 'Le 20:30 va benissimo', time: '17:38' },
    { who: 'us', text: 'Prenotazione confermata per sabato 10 maggio alle 20:30, tavolo per 4. A breve riceverà email di conferma. Grazie!', time: '17:39', auto: true },
  ];

  const list = (
    <div style={{ borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, overflow: 'auto', height: isMobile ? 'auto' : '100%' }}>
      {threads.map((th, idx) => (
        <button
          key={idx}
          onClick={() => { setActive(idx); if (isMobile) setShowThread(true); }}
          style={{
            width: '100%', padding: '12px 14px', textAlign: 'left',
            borderBottom: idx < threads.length - 1 ? `1px solid ${C.border}` : 'none',
            background: idx === active && !isMobile ? 'rgba(75,107,251,0.07)' : 'transparent',
            borderLeft: idx === active && !isMobile ? `2px solid ${C.acc}` : '2px solid transparent',
            cursor: 'pointer', color: 'inherit',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: C.txt }}>{th.name}</span>
            <span style={{ fontSize: 10, color: C.faint }}>{th.time}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 9, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{th.ch}</span>
            {th.unread && <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc }} />}
            {th.auto && <span style={{ fontSize: 9, color: C.acc2, padding: '1px 5px', borderRadius: 3, background: 'rgba(75,107,251,0.12)' }}>AI</span>}
          </div>
          <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{th.preview}</div>
        </button>
      ))}
    </div>
  );

  const thread = (
    <div style={{ borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        {isMobile && (
          <button
            onClick={() => setShowThread(false)}
            style={{
              fontSize: 11, padding: '4px 10px', borderRadius: 5,
              background: 'transparent', border: `1px solid ${C.border}`,
              color: C.muted, cursor: 'pointer',
            }}
          >← Lista</button>
        )}
        <div style={{ fontSize: 12, color: C.txt, fontWeight: 500 }}>{t.name}</div>
        <span style={{ fontSize: 10, color: C.faint }}>·</span>
        <span style={{ fontSize: 11, color: C.muted }}>{t.ch}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: C.acc2 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc, animation: 'liveDot 1.5s ease-in-out infinite' }} />
          {isMobile ? 'AI' : 'Agente in ascolto'}
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: m.who === 'us' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '78%', padding: '8px 12px', borderRadius: 10,
              background: m.who === 'us' ? 'rgba(75,107,251,0.18)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${m.who === 'us' ? 'rgba(75,107,251,0.3)' : C.border}`,
            }}>
              <div style={{ fontSize: 12, color: C.txt, lineHeight: 1.5 }}>{m.text}</div>
              <div style={{ fontSize: 9, color: C.faint, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <span>{m.time}</span>
                {m.auto && <span style={{ color: C.acc2 }}>· AI</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (isMobile) {
    return showThread ? <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>{thread}</div> : list;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 12, height: '100%' }}>
      {list}
      {thread}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSIGHT
   ═══════════════════════════════════════════════════════════ */
function InsightTab() {
  const cards = [
    {
      tag: 'Opportunità',
      tagColor: C.acc2,
      title: '12 clienti dormienti pronti per essere riattivati',
      body: 'Hanno ordinato in media 4 volte negli ultimi 12 mesi e non ti contattano da 60-80 giorni. Storicamente, un follow-up entro 90 giorni recupera il 38% di questi clienti.',
      cta: 'Lancia campagna riattivazione',
      ctaColor: C.acc,
    },
    {
      tag: 'Attenzione',
      tagColor: C.warn,
      title: 'Sabato 17 maggio rischia di andare sold out',
      body: 'Già 9 prenotazioni confermate, +2 in attesa di pagamento. Suggerisco di chiudere la disponibilità su WhatsApp e attivare la lista d\'attesa automatica.',
      cta: 'Attiva lista attesa',
      ctaColor: C.warn,
    },
    {
      tag: 'Trend',
      tagColor: C.ok,
      title: 'Le richieste su Instagram sono raddoppiate',
      body: 'Negli ultimi 30 giorni hai ricevuto 84 messaggi via Instagram (+112% vs mese scorso). L\'agente sta gestendo il 91% in autonomia. Conviene investire di più sul canale.',
      cta: 'Vedi report dettagliato',
      ctaColor: C.acc,
    },
    {
      tag: 'Segnale',
      tagColor: C.pink,
      title: 'Tre clienti VIP non hanno ricevuto follow-up',
      body: 'Marco Bianchi, Giulia Ferri e Andrea Serra (LTV combinato €8.400) sono inattivi da 30+ giorni. Suggerisco una comunicazione personalizzata.',
      cta: 'Genera messaggi personalizzati',
      ctaColor: C.acc,
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: 'linear-gradient(90deg, rgba(75,107,251,0.08), rgba(75,107,251,0.02))', border: '1px solid rgba(75,107,251,0.2)' }}>
        <span style={{ color: C.acc2, flexShrink: 0 }}>{i.spark}</span>
        <span style={{ fontSize: 11, color: C.txt, lineHeight: 1.5 }}>L&apos;agente AI ha analizzato i tuoi dati e identificato <strong style={{ color: C.acc2, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>4 insight</strong> azionabili nelle ultime 24 ore.</span>
      </div>

      {cards.map((c, idx) => (
        <div key={idx} style={{ padding: 16, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', gap: 14 }}>
          <div style={{ width: 4, alignSelf: 'stretch', borderRadius: 2, background: c.tagColor, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                fontSize: 9, padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                color: c.tagColor, background: `${c.tagColor}15`, border: `1px solid ${c.tagColor}30`,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{c.tag}</span>
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.3 }}>{c.title}</div>
            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>{c.body}</p>
            <button style={{
              fontSize: 11, fontWeight: 500, color: '#fff',
              padding: '7px 14px', borderRadius: 6,
              background: c.ctaColor, border: `1px solid ${c.ctaColor}`,
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {c.cta} {i.arrow}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
export default function DashboardDemo() {
  const [tab, setTab] = useState<TabId>('overview');
  const [counters, setCounters] = useState({ booked: 206, handled: 345, revenue: 12480, saved: 5.4 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const id = setInterval(() => {
      setCounters((c) => ({
        booked: c.booked + (Math.random() < 0.25 ? 1 : 0),
        handled: c.handled + (Math.random() < 0.4 ? 1 : 0),
        revenue: c.revenue + Math.floor(Math.random() * 80),
        saved: +(c.saved + Math.random() * 0.04).toFixed(2),
      }));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const tabs: { id: TabId; label: string; short: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Panoramica', short: 'Home', icon: i.home },
    { id: 'crm', label: 'Clienti', short: 'CRM', icon: i.users },
    { id: 'bookings', label: 'Prenotazioni', short: 'Cal', icon: i.cal },
    { id: 'conv', label: 'Conversazioni', short: 'Chat', icon: i.msg },
    { id: 'insight', label: 'Insight AI', short: 'AI', icon: i.spark },
  ];

  return (
    <section style={{ background: C.bg, position: 'relative' }}>
      <style>{`
        @keyframes liveDot { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }
        .demo-frame::-webkit-scrollbar { width: 6px; height: 6px }
        .demo-frame *::-webkit-scrollbar { width: 6px; height: 6px }
        .demo-frame *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px }
        .demo-frame *::-webkit-scrollbar-track { background: transparent }
        @media (max-width: 768px) {
          .demo-frame { margin: 0 12px !important; border-radius: 12px !important; }
        }
      `}</style>

      {/* dashboard frame */}
      <div className="demo-frame" style={{
        margin: isMobile ? '0 12px' : '0 24px',
        borderRadius: 16,
        background: C.bg,
        border: `1px solid ${C.border2}`,
        boxShadow: isMobile ? 'none' : '0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(75,107,251,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
        overflow: 'hidden',
        height: isMobile ? '85vh' : 760,
        minHeight: isMobile ? 600 : undefined,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        {/* top ribbon */}
        <div style={{
          padding: '0 14px',
          height: 46,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 12,
          background: C.bg2,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F56' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#27C93F' }} />
          </div>
          <span style={{ fontSize: 12, color: C.faint, fontFamily: 'Syne, sans-serif', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Dashboard Agente AI
          </span>
          <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, background: 'rgba(75,107,251,0.15)', color: C.acc2, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0 }}>Demo</span>
          {!isMobile && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
                Sistema operativo · sincronizzato
              </span>
              <span style={{ fontSize: 11, color: C.faint }}>v2.4.1</span>
            </div>
          )}
          {isMobile && (
            <span style={{ marginLeft: 'auto', fontSize: 10, color: C.muted, display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
              Live
            </span>
          )}
        </div>

        {/* tab strip */}
        <div style={{
          padding: isMobile ? '8px 8px' : '10px 16px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 4,
          flexShrink: 0,
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                fontSize: isMobile ? 11 : 12, fontWeight: tab === t.id ? 500 : 400,
                padding: isMobile ? '7px 10px' : '8px 14px', borderRadius: 6,
                background: tab === t.id ? 'rgba(75,107,251,0.12)' : 'transparent',
                border: tab === t.id ? '1px solid rgba(75,107,251,0.3)' : '1px solid transparent',
                color: tab === t.id ? C.txt : C.muted,
                display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: tab === t.id ? C.acc2 : C.faint }}>{t.icon}</span>
              {isMobile ? t.short : t.label}
            </button>
          ))}
        </div>

        {/* tab content */}
        <div style={{ flex: 1, padding: isMobile ? 12 : 20, overflow: 'auto', minHeight: 0 }}>
          {tab === 'overview' && <OverviewTab counters={counters} isMobile={isMobile} />}
          {tab === 'crm' && <CRMTab isMobile={isMobile} />}
          {tab === 'bookings' && <BookingsTab isMobile={isMobile} />}
          {tab === 'conv' && <ConvTab isMobile={isMobile} />}
          {tab === 'insight' && <InsightTab />}
        </div>
      </div>

    </section>
  );
}
