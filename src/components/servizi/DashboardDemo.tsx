'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────
   DashboardDemo — dashboard professionale full-feature
   Layout: sidebar | workspace | AI chat panel
   Tabs: Overview · CRM · Prenotazioni · Conversazioni · Insight
   Chat AI scripted con azioni reali (lista clienti dormienti,
   invio WhatsApp di massa, generazione report, ecc.)
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

/* ── tipi ── */
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

/* ── tipi azioni chat ── */
type ChatAction =
  | { kind: 'list'; items: Customer[]; note?: string }
  | { kind: 'cta'; label: string; onClick: () => void }
  | { kind: 'progress'; total: number; label: string }
  | { kind: 'kpis'; items: { label: string; value: string; delta?: string }[] }
  | { kind: 'report'; lines: { label: string; value: string; tone?: 'ok' | 'warn' | 'neutral' }[] };

type ChatMsg = {
  id: number;
  who: 'user' | 'agent';
  text: string;
  streamed?: boolean;
  action?: ChatAction;
  timestamp: string;
};

/* ── helper: format ── */
function eur(n: number) {
  return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
}
function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

/* ─────────────────────────────────────────────────────────
   icone — minimaliste
   ───────────────────────────────────────────────────────── */
const i = {
  home: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  users: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  cal: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  msg: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  spark: <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>,
  send: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  search: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bolt: <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  whats: <svg width={12} height={12} viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M17.6 6.32A8 8 0 0 0 4.78 17.62L4 22l4.5-1.18A8 8 0 0 0 17.6 6.32zm-5.6 12.3a6.65 6.65 0 0 1-3.4-.93l-.24-.14-2.5.66.67-2.44-.16-.25a6.65 6.65 0 1 1 5.63 3.1zm3.65-4.98c-.2-.1-1.18-.58-1.36-.65-.18-.07-.31-.1-.45.1-.13.2-.51.65-.63.78-.11.13-.23.15-.43.05a5.45 5.45 0 0 1-1.6-.99 6 6 0 0 1-1.11-1.38c-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.34.1-.12.13-.2.2-.33.06-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.32-.34-.45-.34h-.38c-.13 0-.34.05-.52.25s-.69.68-.69 1.65.71 1.92.81 2.05c.1.13 1.4 2.13 3.4 2.99.47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.18-.48 1.34-.95.17-.46.17-.86.12-.94-.05-.08-.18-.13-.38-.23z"/></svg>,
  mail: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  check: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  arrow: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  trend: <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  dot: <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%' }} />,
};

/* ═══════════════════════════════════════════════════════════
   sub-components
   ═══════════════════════════════════════════════════════════ */

function CustomerRow({
  c, compact = false, onAction, actionLabel,
}: { c: Customer; compact?: boolean; onAction?: () => void; actionLabel?: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: compact ? '8px 10px' : '12px 14px',
      borderRadius: 8, background: 'rgba(255,255,255,0.02)', border: `1px solid ${C.border}`,
    }}>
      <div style={{
        width: compact ? 26 : 32, height: compact ? 26 : 32, borderRadius: '50%',
        background: `linear-gradient(140deg, ${c.color}40, ${c.color}15)`,
        border: `1px solid ${c.color}50`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: compact ? 10 : 11, fontWeight: 600, color: c.color, flexShrink: 0,
        fontFamily: 'Syne, sans-serif',
      }}>{c.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: compact ? 12 : 13, fontWeight: 500, color: C.txt, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
        <div style={{ fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{c.channel}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{c.lastSeen}</span>
        </div>
      </div>
      {!compact && (
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.txt, fontFamily: 'Syne, sans-serif' }}>{eur(c.ltv)}</div>
          <div style={{ fontSize: 10, color: C.faint }}>{c.visits} visite</div>
        </div>
      )}
      {onAction && (
        <button
          onClick={onAction}
          style={{
            fontSize: 11, fontWeight: 500, color: C.acc2,
            padding: '5px 10px', borderRadius: 6,
            background: 'rgba(75,107,251,0.1)', border: '1px solid rgba(75,107,251,0.3)',
            cursor: 'pointer', flexShrink: 0,
          }}
        >{actionLabel ?? 'Apri'}</button>
      )}
    </div>
  );
}

/* mini-bar chart */
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
            transition: 'height 0.6s cubic-bezier(.2,.8,.2,1)',
          }} />
        );
      })}
    </div>
  );
}

/* sparkline svg */
function Spark({ data, w = 120, h = 36, color = C.acc }: { data: number[]; w?: number; h?: number; color?: string }) {
  const min = Math.min(...data), max = Math.max(...data);
  const pad = 2;
  const pts = data.map((v, idx) => {
    const x = pad + (idx / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / Math.max(1, max - min)) * (h - pad * 2);
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={w - pad} cy={h - pad - ((data[data.length - 1] - min) / Math.max(1, max - min)) * (h - pad * 2)} r={2.5} fill={color} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   OVERVIEW TAB
   ═══════════════════════════════════════════════════════════ */
function OverviewTab({ counters }: { counters: { booked: number; handled: number; revenue: number; saved: number } }) {
  const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
  const dayData = [42, 38, 55, 48, 61, 78, 86];
  const channelMix = [
    { ch: 'WhatsApp', pct: 42, color: C.whats },
    { ch: 'Email', pct: 24, color: C.acc },
    { ch: 'Instagram', pct: 18, color: C.pink },
    { ch: 'Telefono', pct: 11, color: C.warn },
    { ch: 'Form sito', pct: 5, color: C.acc2 },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
      {/* KPI row */}
      {[
        { label: 'Prenotazioni oggi', value: counters.booked.toString(), delta: '+22%', spark: [12, 18, 15, 22, 19, 28, 34] },
        { label: 'Richieste gestite', value: counters.handled.toString(), delta: '+34%', spark: [40, 52, 48, 61, 58, 72, 86] },
        { label: 'Fatturato stimato', value: eur(counters.revenue), delta: '+18%', spark: [800, 1200, 1100, 1400, 1300, 1800, 2200] },
        { label: 'Ore risparmiate', value: counters.saved.toFixed(1), delta: '+12%', spark: [3, 4, 3.5, 5, 4.5, 6, 7.5] },
      ].map((k) => (
        <div key={k.label} style={{
          gridColumn: 'span 1',
          padding: 16, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`,
          display: 'flex', flexDirection: 'column', gap: 8, minHeight: 110,
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>{k.label}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontSize: 26, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>{k.value}</span>
            <span style={{ fontSize: 11, color: C.ok, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 3 }}>
              <span style={{ color: C.ok }}>{i.trend}</span>{k.delta}
            </span>
          </div>
          <div style={{ marginTop: 'auto' }}>
            <Spark data={k.spark} w={170} h={28} />
          </div>
        </div>
      ))}

      {/* attività settimanale */}
      <div style={{ gridColumn: 'span 2', padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Attività ultimi 7 giorni</div>
            <div style={{ fontSize: 14, color: C.txt, fontFamily: 'Syne, sans-serif', fontWeight: 500, marginTop: 4 }}>586 interazioni totali</div>
          </div>
          <span style={{ fontSize: 11, color: C.ok, display: 'flex', alignItems: 'center', gap: 4 }}>
            {i.trend} +22% vs settimana scorsa
          </span>
        </div>
        <MiniBars data={dayData} height={90} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          {days.map((d) => <span key={d} style={{ fontSize: 10, color: C.faint, flex: 1, textAlign: 'center' }}>{d}</span>)}
        </div>
      </div>

      {/* canali */}
      <div style={{ gridColumn: 'span 2', padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 16 }}>Mix canali</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {channelMix.map((cm) => (
            <div key={cm.ch}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: C.txt, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: cm.color, display: 'inline-block' }} />
                  {cm.ch}
                </span>
                <span style={{ fontSize: 12, color: C.muted, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{cm.pct}%</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${cm.pct}%`, background: cm.color, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* live activity feed */}
      <div style={{ gridColumn: 'span 4', padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Attività recente dell&apos;agente</div>
          <span style={{ fontSize: 10, color: C.ok, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
            Live
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { icon: i.check, color: C.ok, text: 'Prenotazione confermata automaticamente — Marco Bianchi (WhatsApp)', time: 'ora' },
            { icon: i.msg, color: C.acc2, text: 'Risposta inviata a richiesta WhatsApp — "Disponibilità sabato sera"', time: '1 min fa' },
            { icon: i.cal, color: C.warn, text: 'Follow-up programmato per cliente Rossi (Instagram)', time: '4 min fa' },
            { icon: i.spark, color: C.pink, text: 'Insight generato: 12 clienti dormienti identificati nell\'ultima settimana', time: '8 min fa' },
            { icon: i.bolt, color: C.acc, text: 'Report giornaliero generato e inviato al team', time: '14 min fa' },
          ].map((a, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: idx < 4 ? `1px solid ${C.border}` : 'none' }}>
              <span style={{
                width: 26, height: 26, borderRadius: 6,
                background: `${a.color}18`, border: `1px solid ${a.color}40`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color, flexShrink: 0,
              }}>{a.icon}</span>
              <span style={{ flex: 1, fontSize: 12, color: C.muted, lineHeight: 1.5 }}>{a.text}</span>
              <span style={{ fontSize: 10, color: C.faint, flexShrink: 0 }}>{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   CRM TAB
   ═══════════════════════════════════════════════════════════ */
function CRMTab() {
  const [filter, setFilter] = useState<'all' | 'attivo' | 'dormiente' | 'nuovo' | 'vip'>('all');
  const filtered = filter === 'all' ? CUSTOMERS : CUSTOMERS.filter((c) => c.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{
          flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', borderRadius: 8, background: C.bg2, border: `1px solid ${C.border}`,
        }}>
          <span style={{ color: C.faint }}>{i.search}</span>
          <span style={{ fontSize: 12, color: C.faint }}>Cerca per nome, email, telefono…</span>
        </div>
        {([
          { id: 'all', label: 'Tutti', count: CUSTOMERS.length },
          { id: 'vip', label: 'VIP', count: CUSTOMERS.filter((c) => c.status === 'vip').length, color: '#FFD60A' },
          { id: 'attivo', label: 'Attivi', count: CUSTOMERS.filter((c) => c.status === 'attivo').length, color: C.ok },
          { id: 'nuovo', label: 'Nuovi', count: CUSTOMERS.filter((c) => c.status === 'nuovo').length, color: C.acc2 },
          { id: 'dormiente', label: 'Dormienti', count: DORMANT.length, color: C.warn },
        ] as const).map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as 'all' | 'attivo' | 'dormiente' | 'nuovo' | 'vip')}
            style={{
              fontSize: 11, padding: '7px 12px', borderRadius: 6,
              background: filter === f.id ? 'rgba(75,107,251,0.15)' : 'transparent',
              border: filter === f.id ? '1px solid rgba(75,107,251,0.4)' : `1px solid ${C.border}`,
              color: filter === f.id ? C.acc2 : C.muted,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontWeight: filter === f.id ? 500 : 400,
            }}
          >
            {f.label}
            <span style={{ fontSize: 10, color: C.faint, fontFamily: 'Syne, sans-serif' }}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* table header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
        gap: 12, padding: '8px 14px', fontSize: 10, color: C.faint,
        textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500,
      }}>
        <span>Cliente</span><span>Canale</span><span>Ultimo contatto</span><span>LTV</span><span>Stato</span>
      </div>

      {/* rows */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
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
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   BOOKINGS TAB
   ═══════════════════════════════════════════════════════════ */
function BookingsTab() {
  const slots = [
    { time: '09:00', name: 'Marco Bianchi', service: 'Camera Suite · 2 notti', source: 'WhatsApp', state: 'confirmed' },
    { time: '10:30', name: 'Laura Rossi', service: 'Tavolo 4 persone', source: 'Instagram', state: 'pending' },
    { time: '12:00', name: 'Andrea Serra', service: 'Consulenza 1h', source: 'Email', state: 'confirmed' },
    { time: '14:30', name: 'Giulia Ferri', service: 'VIP — Cena privata x6', source: 'Telefono', state: 'vip' },
    { time: '16:00', name: 'Stefano Conti', service: 'Trattamento massaggio', source: 'WhatsApp', state: 'confirmed' },
    { time: '18:00', name: 'Elena Marchetti', service: 'Cena terrazza x2', source: 'Form sito', state: 'pending' },
    { time: '20:00', name: 'Davide Russo', service: 'Tavolo 2 persone', source: 'WhatsApp', state: 'confirmed' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, height: '100%' }}>
      <div style={{ padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Calendario di oggi · 6 mag</div>
          <span style={{ fontSize: 11, color: C.acc2, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{slots.length} appuntamenti</span>
        </div>
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {slots.map((s, idx) => {
            const cfg = s.state === 'confirmed'
              ? { tag: 'Confermato', color: C.ok, bg: 'rgba(74,222,128,0.1)' }
              : s.state === 'pending'
              ? { tag: 'In attesa', color: C.warn, bg: 'rgba(251,146,60,0.1)' }
              : { tag: 'VIP', color: '#FFD60A', bg: 'rgba(255,214,10,0.08)' };
            return (
              <div key={idx} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '10px 12px', borderRadius: 8, background: cfg.bg,
                border: `1px solid ${cfg.color}25`,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif',
                  minWidth: 44, textAlign: 'center', padding: '4px 0',
                  background: 'rgba(0,0,0,0.3)', borderRadius: 5,
                }}>{s.time}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, color: C.txt, fontWeight: 500, marginBottom: 2 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span>{s.service}</span><span style={{ opacity: 0.5 }}>·</span><span>{s.source}</span>
                  </div>
                </div>
                <span style={{
                  fontSize: 9, padding: '3px 7px', borderRadius: 4, fontWeight: 500,
                  color: cfg.color, background: 'transparent', border: `1px solid ${cfg.color}40`,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                }}>{cfg.tag}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 14 }}>Tasso occupazione</div>
          <div style={{ fontSize: 36, fontWeight: 600, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.02em' }}>87%</div>
          <div style={{ fontSize: 11, color: C.ok, marginBottom: 14, display: 'flex', alignItems: 'center', gap: 4 }}>
            {i.trend} +14 punti vs media mensile
          </div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.05)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '87%', background: `linear-gradient(90deg, ${C.acc}, ${C.acc2})` }} />
          </div>
        </div>
        <div style={{ padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, flex: 1 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 14 }}>Disponibilità prossimi giorni</div>
          {[
            { day: 'Domani', free: 4, total: 12 },
            { day: 'Giovedì', free: 8, total: 12 },
            { day: 'Venerdì', free: 2, total: 12 },
            { day: 'Sabato', free: 0, total: 12, full: true },
            { day: 'Domenica', free: 5, total: 12 },
          ].map((d) => (
            <div key={d.day} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: C.txt }}>{d.day}</span>
                <span style={{ fontSize: 11, color: d.full ? C.warn : C.muted, fontFamily: 'Syne, sans-serif' }}>
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
   CONVERSATIONS TAB
   ═══════════════════════════════════════════════════════════ */
function ConvTab() {
  const threads = [
    { name: 'Marco Bianchi', ch: 'WhatsApp', preview: 'Perfetto, allora prenoto per sabato sera alle 20:30. Grazie!', unread: false, time: '2 min', auto: true },
    { name: 'Laura Rossi', ch: 'Instagram', preview: 'Ciao! Vorrei sapere se avete ancora disponibilità per domenica brunch', unread: true, time: '8 min', auto: false },
    { name: 'Andrea Serra', ch: 'Email', preview: 'Confermo la prenotazione per giovedì alle 19. A presto!', unread: false, time: '14 min', auto: true },
    { name: 'Giulia Ferri', ch: 'Telefono', preview: '[Trascrizione] Vorrei modificare la prenotazione di sabato', unread: true, time: '22 min', auto: false },
    { name: 'Stefano Conti', ch: 'WhatsApp', preview: 'Ok, allora vi aggiorno entro domani sulla disponibilità', unread: false, time: '1 ora', auto: true },
  ];
  const [active, setActive] = useState(0);
  const t = threads[active];

  const messages: { who: 'them' | 'us'; text: string; time: string; auto?: boolean }[] = [
    { who: 'them', text: 'Buonasera, avete disponibilità per sabato sera?', time: '17:32' },
    { who: 'us', text: 'Buonasera! Sì, abbiamo disponibilità sabato 10 maggio. Per quante persone?', time: '17:32', auto: true },
    { who: 'them', text: 'Saremmo in 4', time: '17:35' },
    { who: 'us', text: 'Perfetto. Posso proporvi tre orari: 19:30, 20:30 oppure 21:30. Quale preferisce?', time: '17:35', auto: true },
    { who: 'them', text: 'Le 20:30 va benissimo', time: '17:38' },
    { who: 'us', text: 'Prenotazione confermata per sabato 10 maggio alle 20:30, tavolo per 4. A breve riceverà email di conferma. Grazie!', time: '17:39', auto: true },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 14, height: '100%' }}>
      <div style={{ borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, overflow: 'auto' }}>
        {threads.map((th, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            style={{
              width: '100%', padding: '12px 14px', textAlign: 'left',
              borderBottom: idx < threads.length - 1 ? `1px solid ${C.border}` : 'none',
              background: idx === active ? 'rgba(75,107,251,0.07)' : 'transparent',
              borderLeft: idx === active ? `2px solid ${C.acc}` : '2px solid transparent',
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

      <div style={{ borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, color: C.txt, fontWeight: 500 }}>{t.name}</div>
          <span style={{ fontSize: 10, color: C.faint }}>·</span>
          <span style={{ fontSize: 11, color: C.muted }}>{t.ch}</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, color: C.acc2 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc, animation: 'liveDot 1.5s ease-in-out infinite' }} />
            Agente in ascolto
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {messages.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: m.who === 'us' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '70%', padding: '8px 12px', borderRadius: 10,
                background: m.who === 'us' ? 'rgba(75,107,251,0.18)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${m.who === 'us' ? 'rgba(75,107,251,0.3)' : C.border}`,
              }}>
                <div style={{ fontSize: 12, color: C.txt, lineHeight: 1.5 }}>{m.text}</div>
                <div style={{ fontSize: 9, color: C.faint, marginTop: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <span>{m.time}</span>
                  {m.auto && <span style={{ color: C.acc2 }}>· risposta AI</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   INSIGHT TAB
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', overflow: 'auto', paddingRight: 4 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: 'linear-gradient(90deg, rgba(75,107,251,0.08), rgba(75,107,251,0.02))', border: '1px solid rgba(75,107,251,0.2)' }}>
        <span style={{ color: C.acc2 }}>{i.spark}</span>
        <span style={{ fontSize: 12, color: C.txt }}>L&apos;agente AI ha analizzato i tuoi dati e ha identificato <strong style={{ color: C.acc2, fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>4 insight</strong> azionabili nelle ultime 24 ore.</span>
      </div>

      {cards.map((c, idx) => (
        <div key={idx} style={{ padding: 18, borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, display: 'flex', gap: 16 }}>
          <div style={{
            width: 4, alignSelf: 'stretch', borderRadius: 2,
            background: c.tagColor, flexShrink: 0,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{
                fontSize: 9, padding: '3px 8px', borderRadius: 4, fontWeight: 500,
                color: c.tagColor, background: `${c.tagColor}15`, border: `1px solid ${c.tagColor}30`,
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>{c.tag}</span>
            </div>
            <div style={{ fontSize: 15, fontWeight: 500, color: C.txt, fontFamily: 'Syne, sans-serif', letterSpacing: '-0.01em', marginBottom: 8, lineHeight: 1.3 }}>{c.title}</div>
            <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.65, marginBottom: 14 }}>{c.body}</p>
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
   AI CHAT PANEL
   ═══════════════════════════════════════════════════════════ */
function ChatPanel({ onAction, autoplay = true }: { onAction?: (tab: TabId) => void; autoplay?: boolean }) {
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [typing, setTyping] = useState(false);
  const [progressStates, setProgressStates] = useState<Record<number, number>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const seqStarted = useRef(false);

  /* simula streaming di un msg */
  const pushMsg = (msg: Omit<ChatMsg, 'id' | 'timestamp'>, stream = false) => {
    const id = Date.now() + Math.random();
    const full: ChatMsg = { ...msg, id, timestamp: nowTime() };
    if (!stream || msg.who === 'user') {
      setMessages((m) => [...m, full]);
      return Promise.resolve();
    }
    /* streaming char by char */
    return new Promise<void>((resolve) => {
      setMessages((m) => [...m, { ...full, text: '' }]);
      const fullText = msg.text;
      let idx = 0;
      const tick = () => {
        idx = Math.min(fullText.length, idx + Math.max(1, Math.floor(fullText.length / 35)));
        setMessages((m) => m.map((x) => x.id === id ? { ...x, text: fullText.slice(0, idx) } : x));
        if (idx < fullText.length) setTimeout(tick, 28);
        else { setTimeout(resolve, 120); }
      };
      tick();
    });
  };

  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

  /* sequenza scriptata */
  useEffect(() => {
    if (seqStarted.current || !autoplay) return;
    seqStarted.current = true;

    let cancelled = false;
    const run = async () => {
      await wait(800);
      if (cancelled) return;

      /* — turno 1 — */
      await pushMsg({ who: 'user', text: 'Tirami giù la lista clienti che non acquistano da 2 mesi' });
      await wait(400);
      setTyping(true); await wait(900); setTyping(false);
      await pushMsg({ who: 'agent', text: 'Trovati 8 clienti con LTV combinato di €16.670 inattivi da 60+ giorni:' }, true);
      await pushMsg({
        who: 'agent', text: '',
        action: { kind: 'list', items: DORMANT, note: '8 contatti · LTV totale €16.670' },
      });
      if (cancelled) return;
      await wait(900);

      /* — turno 2 — */
      await pushMsg({ who: 'user', text: 'Manda WhatsApp a tutti con uno sconto del 15%' });
      await wait(400);
      setTyping(true); await wait(1100); setTyping(false);
      await pushMsg({ who: 'agent', text: 'Ho preparato un messaggio personalizzato per ogni cliente. Lo invio?' }, true);
      const progressId = Date.now();
      await pushMsg({
        who: 'agent', text: '',
        action: { kind: 'cta', label: 'Conferma invio a 8 contatti', onClick: () => triggerSend(progressId) },
      });
      if (cancelled) return;
      await wait(1800);

      /* auto-trigger send after 1.8s for demo */
      triggerSend(progressId);
      await wait(2400);

      /* — turno 3 — */
      await pushMsg({ who: 'user', text: 'Fammi un report di oggi' });
      await wait(400);
      setTyping(true); await wait(1100); setTyping(false);
      await pushMsg({ who: 'agent', text: 'Ecco il riepilogo operativo:' }, true);
      await pushMsg({
        who: 'agent', text: '',
        action: {
          kind: 'report',
          lines: [
            { label: 'Prenotazioni gestite', value: '34', tone: 'ok' },
            { label: 'Richieste in autonomia', value: '92%', tone: 'ok' },
            { label: 'Tempo medio risposta', value: '11s', tone: 'ok' },
            { label: 'Conversioni dal contatto', value: '68%', tone: 'ok' },
            { label: 'Clienti a rischio churn', value: '3', tone: 'warn' },
            { label: 'Ore restituite al team', value: '5.4 h', tone: 'ok' },
          ],
        },
      });
      if (cancelled) return;
      await wait(1500);

      /* — turno 4 — */
      await pushMsg({ who: 'user', text: 'Mostrami chi sono i 3 a rischio churn' });
      await wait(400);
      setTyping(true); await wait(900); setTyping(false);
      await pushMsg({ who: 'agent', text: 'Tre clienti VIP che meritano attenzione immediata:' }, true);
      await pushMsg({
        who: 'agent', text: '',
        action: {
          kind: 'list',
          items: CUSTOMERS.filter((c) => [4, 5, 6].includes(c.id)),
          note: 'LTV combinato €8.610 · suggerisco call diretta',
        },
      });
    };
    run();
    return () => { cancelled = true; };
  }, [autoplay]);

  const triggerSend = (id: number) => {
    if (progressStates[id] === 100) return;
    setProgressStates((p) => ({ ...p, [id]: 0 }));
    let v = 0;
    const tick = () => {
      v = Math.min(100, v + 12 + Math.random() * 8);
      setProgressStates((p) => ({ ...p, [id]: v }));
      if (v < 100) setTimeout(tick, 220);
      else {
        setTimeout(() => {
          pushMsg({
            who: 'agent', text: '✓ Messaggi inviati a 8 contatti. Ricevuto 3 risposte nei primi 4 minuti — 2 prenotazioni nuove e 1 richiesta info. Continuo a monitorare.',
          }, true);
        }, 350);
      }
    };
    setTimeout(tick, 200);
  };

  /* auto-scroll */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing, progressStates]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      borderLeft: `1px solid ${C.border}`,
      background: C.bg,
    }}>
      {/* header */}
      <div style={{ padding: '14px 18px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: 'linear-gradient(140deg, rgba(123,148,252,0.4), rgba(75,107,251,0.15))',
          border: '1px solid rgba(75,107,251,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.acc2,
        }}>{i.spark}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: C.txt }}>Agente AI</div>
          <div style={{ fontSize: 10, color: C.ok, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
            online · pronto ad agire
          </div>
        </div>
      </div>

      {/* messages */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {messages.map((m) => (
          <ChatBubble key={m.id} msg={m} progress={m.action?.kind === 'cta' ? progressStates[Object.keys(progressStates).map(Number)[0] ?? 0] : undefined} progressStates={progressStates} onAction={onAction} />
        ))}
        {typing && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', alignSelf: 'flex-start', border: `1px solid ${C.border}` }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc2, animation: 'typing 1.2s ease-in-out infinite' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc2, animation: 'typing 1.2s ease-in-out 0.15s infinite' }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc2, animation: 'typing 1.2s ease-in-out 0.3s infinite' }} />
          </div>
        )}
      </div>

      {/* input bar */}
      <div style={{ padding: 14, borderTop: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
          {['Clienti dormienti', 'Report oggi', 'Sabato sold out?'].map((s) => (
            <button key={s} style={{
              fontSize: 10, padding: '5px 10px', borderRadius: 5,
              background: 'rgba(75,107,251,0.08)', border: '1px solid rgba(75,107,251,0.2)',
              color: C.acc2, cursor: 'pointer',
            }}>{s}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, padding: '8px 10px', borderRadius: 8, background: C.bg2, border: `1px solid ${C.border2}` }}>
          <span style={{ flex: 1, fontSize: 12, color: C.faint }}>Chiedi all&apos;agente…</span>
          <button style={{
            width: 26, height: 26, borderRadius: 5,
            background: C.acc, border: 'none', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>{i.send}</button>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ msg, progressStates, onAction }: {
  msg: ChatMsg;
  progress?: number;
  progressStates: Record<number, number>;
  onAction?: (tab: TabId) => void;
}) {
  void onAction;
  const isUser = msg.who === 'user';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start', gap: 6 }}>
      {msg.text && (
        <div style={{
          maxWidth: '92%', padding: '9px 13px', borderRadius: 10,
          background: isUser ? 'rgba(75,107,251,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isUser ? 'rgba(75,107,251,0.3)' : C.border}`,
          fontSize: 12, color: C.txt, lineHeight: 1.55,
        }}>{msg.text}</div>
      )}

      {msg.action?.kind === 'list' && (
        <div style={{ width: '100%', borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500 }}>Risultati</span>
            <span style={{ fontSize: 10, color: C.acc2 }}>{msg.action.note}</span>
          </div>
          {msg.action.items.slice(0, 6).map((c) => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.02)' }}>
              <div style={{
                width: 22, height: 22, borderRadius: '50%',
                background: `linear-gradient(140deg, ${c.color}40, ${c.color}15)`,
                border: `1px solid ${c.color}50`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 600, color: c.color, flexShrink: 0,
                fontFamily: 'Syne, sans-serif',
              }}>{c.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: C.txt, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                <div style={{ fontSize: 9, color: C.faint }}>{c.lastSeen} · {c.channel}</div>
              </div>
              <span style={{ fontSize: 10, color: C.muted, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{eur(c.ltv)}</span>
            </div>
          ))}
          {msg.action.items.length > 6 && (
            <div style={{ fontSize: 10, color: C.faint, textAlign: 'center', padding: '4px 0' }}>+ {msg.action.items.length - 6} altri</div>
          )}
        </div>
      )}

      {msg.action?.kind === 'cta' && (
        (() => {
          const idKey = Object.keys(progressStates).map(Number)[0];
          const p = idKey != null ? progressStates[idKey] : undefined;
          const sending = p != null && p < 100;
          const done = p === 100;
          return (
            <div style={{ width: '100%', borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, padding: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sending ? (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                    <span style={{ color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ color: C.whats }}>{i.whats}</span> Invio in corso…
                    </span>
                    <span style={{ color: C.acc2, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>{Math.round(p ?? 0)}%</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(255,255,255,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${p}%`, background: `linear-gradient(90deg, ${C.acc}, ${C.acc2})`, transition: 'width 0.2s' }} />
                  </div>
                </>
              ) : done ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: C.ok }}>
                  <span>{i.check}</span> 8 messaggi WhatsApp consegnati con successo
                </div>
              ) : (
                <button
                  onClick={msg.action.onClick}
                  style={{
                    fontSize: 12, fontWeight: 500, color: '#fff',
                    padding: '10px 14px', borderRadius: 7,
                    background: C.acc, border: `1px solid ${C.acc}`,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <span>{i.whats}</span>
                  {msg.action.label}
                </button>
              )}
            </div>
          );
        })()
      )}

      {msg.action?.kind === 'report' && (() => {
        const reportAction = msg.action as Extract<ChatAction, { kind: 'report' }>;
        return (
          <div style={{ width: '100%', borderRadius: 10, background: C.bg2, border: `1px solid ${C.border}`, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.faint, fontWeight: 500, marginBottom: 4 }}>Report — 6 maggio</div>
            {reportAction.lines.map((l, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: idx < reportAction.lines.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <span style={{ fontSize: 11, color: C.muted }}>{l.label}</span>
                <span style={{ fontSize: 12, fontWeight: 500, fontFamily: 'Syne, sans-serif', color: l.tone === 'warn' ? C.warn : l.tone === 'ok' ? C.ok : C.txt }}>{l.value}</span>
              </div>
            ))}
          </div>
        );
      })()}

      <div style={{ fontSize: 9, color: C.faint }}>{msg.timestamp}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════ */
export default function DashboardDemo() {
  const [tab, setTab] = useState<TabId>('overview');
  const [counters, setCounters] = useState({ booked: 206, handled: 345, revenue: 12480, saved: 5.4 });
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  /* counters live */
  useEffect(() => {
    const id = setInterval(() => {
      setCounters((c) => ({
        booked: c.booked + (Math.random() < 0.3 ? 1 : 0),
        handled: c.handled + (Math.random() < 0.5 ? 1 : 0),
        revenue: c.revenue + Math.floor(Math.random() * 90),
        saved: +(c.saved + Math.random() * 0.05).toFixed(2),
      }));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  /* auto-rotate tabs (cinematica) */
  useEffect(() => {
    const seq: TabId[] = ['overview', 'crm', 'bookings', 'conv', 'insight'];
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % seq.length;
      setTab(seq[idx]);
    }, 9000);
    return () => clearInterval(id);
  }, []);

  /* pause when offscreen */
  useEffect(() => {
    if (!containerRef.current) return;
    const io = new IntersectionObserver(([e]) => setAutoplay(!!e?.isIntersecting), { threshold: 0.15 });
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Panoramica', icon: i.home },
    { id: 'crm', label: 'Clienti', icon: i.users },
    { id: 'bookings', label: 'Prenotazioni', icon: i.cal },
    { id: 'conv', label: 'Conversazioni', icon: i.msg },
    { id: 'insight', label: 'Insight AI', icon: i.spark },
  ];

  return (
    <section style={{ padding: '60px 0 80px', background: C.bg, borderBottom: `1px solid ${C.border}`, position: 'relative' }}>
      <style>{`
        @keyframes liveDot { 0%,100% { opacity: 1 } 50% { opacity: 0.3 } }
        @keyframes typing { 0%,60%,100% { transform: scale(1); opacity: 0.5 } 30% { transform: scale(1.4); opacity: 1 } }
        .demo-frame::-webkit-scrollbar { width: 6px; height: 6px }
        .demo-frame *::-webkit-scrollbar { width: 6px; height: 6px }
        .demo-frame *::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px }
        .demo-frame *::-webkit-scrollbar-track { background: transparent }
      `}</style>

      {/* header strap */}
      <div style={{ padding: '0 8vw 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 14 }}>
        <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.acc, fontWeight: 500 }}>Demo live</span>
        <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.025em', color: C.txt, margin: 0, maxWidth: 820 }}>
          La dashboard intelligente che<br /><span style={{ color: '#5972ff', fontWeight: 300 }}>lavora con te ogni giorno</span>
        </h2>
        <p style={{ fontSize: 'clamp(14px,1.2vw,16px)', color: C.muted, maxWidth: 620, lineHeight: 1.7, fontWeight: 300 }}>
          Una mini console reale del tuo business. Chiedi all&apos;agente di tirare giù i clienti dormienti, mandare un WhatsApp di massa, generarti un report. Lui esegue.
        </p>
      </div>

      {/* dashboard frame */}
      <div ref={containerRef} className="demo-frame" style={{
        margin: '0 4vw',
        borderRadius: 16,
        background: C.bg,
        border: `1px solid ${C.border2}`,
        boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 80px rgba(75,107,251,0.08), inset 0 1px 0 rgba(255,255,255,0.04)',
        overflow: 'hidden',
        height: 760,
        display: 'grid',
        gridTemplateColumns: '54px 1fr 360px',
        gridTemplateRows: '52px 1fr',
        position: 'relative',
      }}>
        {/* ribbon top */}
        <div style={{
          gridColumn: '1 / -1',
          padding: '0 16px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', gap: 14,
          background: C.bg2,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F56' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FFBD2E' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#27C93F' }} />
          </div>
          <span style={{ fontSize: 12, color: C.faint, fontFamily: 'Syne, sans-serif', fontWeight: 500 }}>Dashboard Agente AI</span>
          <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 4, background: 'rgba(75,107,251,0.15)', color: C.acc2, fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Demo</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 11, color: C.muted, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.ok, animation: 'liveDot 1.5s ease-in-out infinite' }} />
              Sistema operativo · sincronizzato
            </span>
            <span style={{ fontSize: 11, color: C.faint }}>v2.4.1</span>
          </div>
        </div>

        {/* sidebar */}
        <div style={{
          borderRight: `1px solid ${C.border}`,
          background: C.bg2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 0',
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(140deg, rgba(123,148,252,0.4), rgba(75,107,251,0.15))',
            border: '1px solid rgba(75,107,251,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
            fontSize: 12, fontWeight: 700, fontFamily: 'Syne, sans-serif', marginBottom: 8,
          }}>F</div>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              title={t.label}
              style={{
                width: 36, height: 36, borderRadius: 7,
                background: tab === t.id ? 'rgba(75,107,251,0.18)' : 'transparent',
                border: tab === t.id ? '1px solid rgba(75,107,251,0.4)' : '1px solid transparent',
                color: tab === t.id ? C.acc2 : C.faint,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
            >{t.icon}</button>
          ))}
        </div>

        {/* workspace */}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* tab strip */}
          <div style={{ padding: '12px 22px', borderBottom: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                style={{
                  fontSize: 12, fontWeight: tab === t.id ? 500 : 400,
                  padding: '8px 14px', borderRadius: 6,
                  background: tab === t.id ? 'rgba(75,107,251,0.12)' : 'transparent',
                  border: tab === t.id ? '1px solid rgba(75,107,251,0.3)' : '1px solid transparent',
                  color: tab === t.id ? C.txt : C.muted,
                  display: 'flex', alignItems: 'center', gap: 7, cursor: 'pointer',
                }}
              >
                <span style={{ color: tab === t.id ? C.acc2 : C.faint }}>{t.icon}</span>
                {t.label}
              </button>
            ))}
            <div style={{ marginLeft: 'auto', fontSize: 10, color: C.faint, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.acc2, animation: 'liveDot 1.5s ease-in-out infinite' }} />
              {autoplay ? 'auto-rotazione attiva' : 'in pausa'}
            </div>
          </div>
          {/* tab content */}
          <div style={{ flex: 1, padding: 22, overflow: 'auto' }}>
            {tab === 'overview' && <OverviewTab counters={counters} />}
            {tab === 'crm' && <CRMTab />}
            {tab === 'bookings' && <BookingsTab />}
            {tab === 'conv' && <ConvTab />}
            {tab === 'insight' && <InsightTab />}
          </div>
        </div>

        {/* chat panel */}
        <ChatPanel autoplay={autoplay} />
      </div>

      {/* footer hint */}
      <div style={{ textAlign: 'center', marginTop: 28, fontSize: 12, color: C.faint }}>
        Quello che vedi è scriptato per la demo · in produzione l&apos;agente lavora sui tuoi dati reali
      </div>
    </section>
  );
}
