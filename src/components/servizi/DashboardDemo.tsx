'use client';

import { useState, useEffect } from 'react';

type TabKey = 'overview' | 'prenotazioni' | 'richieste' | 'fatturato' | 'canali';

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [liveCount, setLiveCount] = useState(128);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const i1 = setInterval(() => setLiveCount((v) => v + Math.floor(Math.random() * 3)), 4000);
    const i2 = setInterval(() => setPulseIndex((v) => (v + 1) % 4), 2500);
    return () => { clearInterval(i1); clearInterval(i2); };
  }, []);

  const weekDays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];

  const tabData: Record<TabKey, { values: number[]; label: string; total: string; sub: string; breakdown: { label: string; value: string | number; color: string }[] }> = {
    overview: {
      values: [65, 72, 68, 84, 91, 108, 98],
      label: 'Attività complessiva',
      total: '586',
      sub: '+22% vs settimana scorsa',
      breakdown: [
        { label: 'Prenotazioni', value: 206, color: '#4B6BFB' },
        { label: 'Richieste gestite', value: 345, color: '#7B94FC' },
        { label: 'Clienti unici', value: 148, color: '#22c55e' },
        { label: 'Tasso conversione', value: '68%', color: '#FB923C' },
      ],
    },
    prenotazioni: {
      values: [18, 24, 21, 28, 35, 42, 38],
      label: 'Prenotazioni settimanali',
      total: '206',
      sub: '+18% vs settimana scorsa',
      breakdown: [
        { label: 'Confermate', value: 178, color: '#22c55e' },
        { label: 'In attesa', value: 22, color: '#FB923C' },
        { label: 'Cancellate', value: 6, color: 'rgba(13,15,20,0.25)' },
      ],
    },
    richieste: {
      values: [42, 38, 51, 48, 63, 58, 45],
      label: 'Richieste gestite',
      total: '345',
      sub: '+24% vs settimana scorsa',
      breakdown: [
        { label: 'WhatsApp', value: 168, color: '#25D366' },
        { label: 'Instagram', value: 92, color: '#E1306C' },
        { label: 'Email', value: 85, color: '#4B6BFB' },
      ],
    },
    fatturato: {
      values: [1240, 1580, 1420, 1890, 2340, 2890, 2410],
      label: 'Fatturato settimanale',
      total: '€13.770',
      sub: '+31% vs settimana scorsa',
      breakdown: [
        { label: 'Media giornaliera', value: '€1.967', color: '#4B6BFB' },
        { label: 'Picco settimanale', value: 'Sab €2.890', color: '#7B94FC' },
        { label: 'Ordine medio', value: '€48,20', color: '#22c55e' },
      ],
    },
    canali: {
      values: [48, 38, 18, 12, 8, 4, 2],
      label: 'Contatti per canale',
      total: `${liveCount} oggi`,
      sub: 'Distribuzione canali attivi',
      breakdown: [
        { label: 'WhatsApp', value: '48%', color: '#25D366' },
        { label: 'Instagram', value: '30%', color: '#E1306C' },
        { label: 'Telefono', value: '14%', color: '#FB923C' },
        { label: 'Email/Altro', value: '8%', color: '#4B6BFB' },
      ],
    },
  };

  const current = tabData[activeTab];
  const maxVal = Math.max(...current.values);

  const crmRows = [
    { initials: 'MB', name: 'Marco Bianchi', channel: 'WhatsApp', time: '2 min fa', status: 'confirmed', statusLabel: 'Confermato', color: '#25D366' },
    { initials: 'LR', name: 'Laura Rossi', channel: 'Instagram', time: '8 min fa', status: 'pending', statusLabel: 'In attesa', color: '#E1306C' },
    { initials: 'AS', name: 'Andrea Serra', channel: 'Email', time: '14 min fa', status: 'replied', statusLabel: 'Risposta inviata', color: '#4B6BFB' },
    { initials: 'GF', name: 'Giulia Ferri', channel: 'Telefono', time: '22 min fa', status: 'confirmed', statusLabel: 'Confermato', color: '#FB923C' },
  ];

  const aiActions = [
    { icon: '✓', text: 'Prenotazione confermata automaticamente', time: 'ora', color: '#22c55e' },
    { icon: '↳', text: 'Risposta inviata a richiesta WhatsApp', time: '1 min fa', color: '#4B6BFB' },
    { icon: '↻', text: 'Follow-up programmato per cliente Rossi', time: '4 min fa', color: '#FB923C' },
    { icon: '◆', text: 'Report settimanale generato', time: '8 min fa', color: '#7B94FC' },
  ];

  return (
    <div className="dashboard-demo">
      <style>{`
        .dashboard-demo{background:#F4F3EE;border:1px solid rgba(0,0,0,0.08);border-radius:16px;padding:32px;color:#0D0F14;width:100%;box-shadow:0 20px 60px rgba(13,15,20,0.12)}

        .dd-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid rgba(0,0,0,0.06)}
        .dd-title{display:flex;align-items:center;gap:10px}
        .dd-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;animation:ddpulse 2s ease-in-out infinite}
        @keyframes ddpulse{0%,100%{opacity:1}50%{opacity:.3}}
        .dd-title strong{font-size:13px;font-weight:600}
        .dd-title span{font-size:11px;color:rgba(13,15,20,0.5);letter-spacing:0.04em;text-transform:uppercase;margin-left:6px}
        .dd-live{font-size:10px;font-weight:600;color:#22c55e;background:rgba(34,197,94,0.1);padding:4px 8px;border-radius:4px;letter-spacing:0.04em;text-transform:uppercase}

        .dd-tabs{display:flex;gap:4px;margin-bottom:20px;flex-wrap:wrap}
        .dd-tab{padding:7px 12px;border-radius:7px;font-size:11px;font-weight:500;background:transparent;border:1px solid rgba(0,0,0,0.1);color:rgba(13,15,20,0.6);cursor:pointer;transition:all .2s}
        .dd-tab:hover{background:rgba(13,15,20,0.04);color:#0D0F14}
        .dd-tab.active{background:#0D0F14;border-color:#0D0F14;color:#fff}

        .dd-metric{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:16px}
        .dd-metric-label{font-size:12px;color:rgba(13,15,20,0.55);font-weight:500}
        .dd-metric-value{font-size:26px;font-weight:600;letter-spacing:-0.02em;margin-top:4px}
        .dd-metric-sub{font-size:11px;color:#4B6BFB;font-weight:500;display:flex;align-items:center;gap:4px}
        .dd-metric-sub::before{content:"▲";font-size:8px}

        .dd-chart{display:flex;align-items:flex-end;justify-content:space-between;height:120px;gap:6px;margin-bottom:4px}
        .dd-bar-wrap{flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;cursor:pointer;height:100%;justify-content:flex-end}
        .dd-bar{width:100%;background:linear-gradient(180deg,#4B6BFB,#7B94FC);border-radius:4px 4px 0 0;transition:all .3s;min-height:4px;position:relative}
        .dd-bar-wrap:hover .dd-bar{background:linear-gradient(180deg,#3A57E8,#4B6BFB)}
        .dd-bar-label{font-size:10px;color:rgba(13,15,20,0.45);font-weight:500}
        .dd-bar-tip{position:absolute;top:-28px;left:50%;transform:translateX(-50%);background:#0D0F14;color:#fff;padding:4px 8px;border-radius:5px;font-size:11px;font-weight:500;opacity:0;pointer-events:none;transition:opacity .2s;white-space:nowrap;z-index:10}
        .dd-bar-tip::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:4px solid transparent;border-top-color:#0D0F14}
        .dd-bar-wrap:hover .dd-bar-tip{opacity:1}

        .dd-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:24px;margin-top:4px}
        .dd-main{display:flex;flex-direction:column;gap:20px}

        .dd-kpi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding-top:18px;border-top:1px solid rgba(0,0,0,0.06)}
        .dd-kpi-card{background:rgba(13,15,20,0.03);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:6px;transition:all .2s}
        .dd-kpi-card:hover{background:#fff;box-shadow:0 4px 12px rgba(13,15,20,0.06)}
        .dd-kpi-header{display:flex;align-items:center;gap:8px}
        .dd-kpi-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
        .dd-kpi-label{font-size:11px;color:rgba(13,15,20,0.6);font-weight:500}
        .dd-kpi-value{font-size:18px;font-weight:600;letter-spacing:-0.01em;font-variant-numeric:tabular-nums}

        .dd-monthly{background:rgba(13,15,20,0.03);border-radius:10px;padding:14px}
        .dd-monthly-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .dd-monthly-title{font-size:11px;color:rgba(13,15,20,0.6);font-weight:500;letter-spacing:0.02em;text-transform:uppercase}
        .dd-monthly-value{font-size:12px;font-weight:600;color:#22c55e}
        .dd-sparkline{width:100%;height:50px;display:block}

        .dd-col{display:flex;flex-direction:column;gap:14px}
        .dd-col-header{display:flex;justify-content:space-between;align-items:center}
        .dd-col-header h4{font-size:11px;font-weight:600;color:#0D0F14;margin:0;letter-spacing:0.04em;text-transform:uppercase}
        .dd-count{background:rgba(75,107,251,0.1);color:#4B6BFB;padding:3px 7px;border-radius:4px;font-size:10px;font-weight:600}
        .dd-count-live{background:rgba(34,197,94,0.12);color:#16a34a}

        .dd-crm-list{display:flex;flex-direction:column;gap:6px}
        .dd-crm-row{display:flex;align-items:center;gap:10px;padding:8px;background:rgba(13,15,20,0.03);border-radius:7px;transition:all .2s;cursor:pointer;border:1px solid transparent}
        .dd-crm-row:hover{background:#fff;border-color:rgba(13,15,20,0.08);transform:translateX(2px)}
        .dd-crm-row.pulsing{background:rgba(75,107,251,0.06);border-color:rgba(75,107,251,0.2)}
        .dd-crm-avatar{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;flex-shrink:0}
        .dd-crm-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
        .dd-crm-info strong{font-size:11px;color:#0D0F14;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .dd-crm-info span{font-size:10px;color:rgba(13,15,20,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .dd-crm-status{font-size:9px;font-weight:600;padding:3px 6px;border-radius:4px;letter-spacing:0.02em;white-space:nowrap;flex-shrink:0}
        .dd-crm-status.confirmed{background:rgba(34,197,94,0.12);color:#16a34a}
        .dd-crm-status.pending{background:rgba(251,146,60,0.12);color:#ea580c}
        .dd-crm-status.replied{background:rgba(75,107,251,0.12);color:#4B6BFB}

        .dd-quick-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding-top:14px;border-top:1px solid rgba(0,0,0,0.06)}
        .dd-quick-stat{background:rgba(13,15,20,0.03);border-radius:8px;padding:10px 8px;display:flex;flex-direction:column;gap:4px;text-align:center}
        .dd-quick-label{font-size:10px;color:rgba(13,15,20,0.55);font-weight:500}
        .dd-quick-value{font-size:15px;font-weight:600;color:#0D0F14;font-variant-numeric:tabular-nums}

        .dd-activity{display:flex;flex-direction:column;gap:6px}
        .dd-activity-row{display:flex;align-items:center;gap:8px;padding:7px 8px;background:rgba(13,15,20,0.03);border-radius:7px;font-size:11px}
        .dd-activity-icon{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:10px;font-weight:600;flex-shrink:0}
        .dd-activity-text{flex:1;color:rgba(13,15,20,0.75);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px}
        .dd-activity-time{font-size:10px;color:rgba(13,15,20,0.4);flex-shrink:0}

        .dd-perf{background:rgba(13,15,20,0.03);border-radius:10px;padding:14px;margin-top:auto}
        .dd-perf-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;font-size:11px;font-weight:500;color:rgba(13,15,20,0.65)}
        .dd-perf-score{font-size:14px;font-weight:600;color:#0D0F14}
        .dd-perf-bars{display:flex;flex-direction:column;gap:8px}
        .dd-perf-bar{display:grid;grid-template-columns:80px 1fr 36px;align-items:center;gap:8px;font-size:10px;color:rgba(13,15,20,0.6)}
        .dd-perf-track{height:4px;background:rgba(13,15,20,0.08);border-radius:2px;overflow:hidden}
        .dd-perf-fill{height:100%;border-radius:2px;transition:width 1s cubic-bezier(.4,0,.2,1)}
        .dd-perf-val{font-weight:600;color:#0D0F14;text-align:right;font-variant-numeric:tabular-nums}

        .dd-footer{display:flex;align-items:center;justify-content:space-between;margin-top:20px;padding-top:14px;border-top:1px solid rgba(0,0,0,0.06);font-size:10px;color:rgba(13,15,20,0.45)}
        .dd-footer-stats{display:flex;gap:16px}
        .dd-footer-stats span strong{color:#0D0F14;font-weight:600}

        @media(max-width:1024px){
          .dd-grid{grid-template-columns:1fr 1fr;gap:20px}
          .dd-main{grid-column:1 / -1}
        }
        @media(max-width:640px){
          .dashboard-demo{padding:18px;border-radius:12px}
          .dd-tabs{gap:4px}
          .dd-tab{padding:6px 9px;font-size:10px;flex:1 1 auto}
          .dd-metric-value{font-size:22px}
          .dd-chart{height:90px}
          .dd-bar-label{font-size:9px}
          .dd-grid{grid-template-columns:1fr;gap:20px}
          .dd-kpi-grid{grid-template-columns:1fr}
          .dd-quick-stats{grid-template-columns:repeat(3,1fr)}
          .dd-perf-bar{grid-template-columns:70px 1fr 32px;font-size:9px}
          .dd-footer-stats{flex-direction:column;gap:4px}
          .dd-footer{flex-direction:column;align-items:flex-start;gap:8px}
        }
      `}</style>

      <div className="dd-header">
        <div className="dd-title">
          <span className="dd-dot"></span>
          <strong>Dashboard Agente AI</strong>
          <span>Demo</span>
        </div>
        <span className="dd-live">● Live</span>
      </div>

      <div className="dd-tabs">
        {(['overview', 'prenotazioni', 'richieste', 'fatturato', 'canali'] as TabKey[]).map((k) => (
          <button key={k} className={`dd-tab ${activeTab === k ? 'active' : ''}`} onClick={() => setActiveTab(k)}>
            {k === 'overview' ? 'Panoramica' : k.charAt(0).toUpperCase() + k.slice(1)}
          </button>
        ))}
      </div>

      <div className="dd-grid">
        {/* Colonna sinistra: chart + KPI + sparkline */}
        <div className="dd-main">
          <div className="dd-metric">
            <div>
              <div className="dd-metric-label">{current.label}</div>
              <div className="dd-metric-value">{current.total}</div>
            </div>
            <div className="dd-metric-sub">{current.sub}</div>
          </div>

          <div className="dd-chart">
            {current.values.map((v, i) => {
              const height = (v / maxVal) * 100;
              const displayVal = activeTab === 'fatturato' ? `€${v.toLocaleString('it-IT')}` : v.toString();
              return (
                <div key={i} className="dd-bar-wrap">
                  <div className="dd-bar-tip">{weekDays[i]}: {displayVal}</div>
                  <div className="dd-bar" style={{ height: `${height}%` }}></div>
                  <span className="dd-bar-label">{weekDays[i]}</span>
                </div>
              );
            })}
          </div>

          <div className="dd-kpi-grid">
            {current.breakdown.map((item, i) => (
              <div key={i} className="dd-kpi-card">
                <div className="dd-kpi-header">
                  <span className="dd-kpi-dot" style={{ background: item.color }}></span>
                  <span className="dd-kpi-label">{item.label}</span>
                </div>
                <span className="dd-kpi-value">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="dd-monthly">
            <div className="dd-monthly-header">
              <span className="dd-monthly-title">Trend ultimi 30 giorni</span>
              <span className="dd-monthly-value">+42% crescita</span>
            </div>
            <svg className="dd-sparkline" viewBox="0 0 300 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="dd-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4B6BFB" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#4B6BFB" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M0,45 L15,42 L30,38 L45,40 L60,35 L75,30 L90,32 L105,28 L120,25 L135,28 L150,22 L165,18 L180,20 L195,15 L210,17 L225,12 L240,14 L255,10 L270,8 L285,12 L300,6 L300,60 L0,60 Z" fill="url(#dd-grad)"/>
              <path d="M0,45 L15,42 L30,38 L45,40 L60,35 L75,30 L90,32 L105,28 L120,25 L135,28 L150,22 L165,18 L180,20 L195,15 L210,17 L225,12 L240,14 L255,10 L270,8 L285,12 L300,6" fill="none" stroke="#4B6BFB" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Colonna centrale: CRM clienti */}
        <div className="dd-col">
          <div className="dd-col-header">
            <h4>Clienti recenti</h4>
            <span className="dd-count">{crmRows.length} attivi</span>
          </div>
          <div className="dd-crm-list">
            {crmRows.map((row, i) => (
              <div key={i} className={`dd-crm-row ${i === pulseIndex ? 'pulsing' : ''}`}>
                <div className="dd-crm-avatar" style={{ background: row.color }}>{row.initials}</div>
                <div className="dd-crm-info">
                  <strong>{row.name}</strong>
                  <span>{row.channel} · {row.time}</span>
                </div>
                <span className={`dd-crm-status ${row.status}`}>{row.statusLabel}</span>
              </div>
            ))}
          </div>

          <div className="dd-quick-stats">
            <div className="dd-quick-stat">
              <span className="dd-quick-label">Nuovi oggi</span>
              <span className="dd-quick-value">12</span>
            </div>
            <div className="dd-quick-stat">
              <span className="dd-quick-label">Ritorno</span>
              <span className="dd-quick-value">68%</span>
            </div>
            <div className="dd-quick-stat">
              <span className="dd-quick-label">Soddisfazione</span>
              <span className="dd-quick-value">4.8★</span>
            </div>
          </div>
        </div>

        {/* Colonna destra: AI Activity + performance */}
        <div className="dd-col">
          <div className="dd-col-header">
            <h4>Attività AI</h4>
            <span className="dd-count dd-count-live">● Live</span>
          </div>
          <div className="dd-activity">
            {aiActions.map((a, i) => (
              <div key={i} className="dd-activity-row">
                <div className="dd-activity-icon" style={{ background: a.color }}>{a.icon}</div>
                <span className="dd-activity-text">{a.text}</span>
                <span className="dd-activity-time">{a.time}</span>
              </div>
            ))}
          </div>

          <div className="dd-perf">
            <div className="dd-perf-header">
              <span>Performance agente</span>
              <span className="dd-perf-score">94/100</span>
            </div>
            <div className="dd-perf-bars">
              <div className="dd-perf-bar">
                <span>Accuratezza</span>
                <div className="dd-perf-track"><div className="dd-perf-fill" style={{ width: '96%', background: '#22c55e' }}></div></div>
                <span className="dd-perf-val">96%</span>
              </div>
              <div className="dd-perf-bar">
                <span>Velocità</span>
                <div className="dd-perf-track"><div className="dd-perf-fill" style={{ width: '92%', background: '#4B6BFB' }}></div></div>
                <span className="dd-perf-val">92%</span>
              </div>
              <div className="dd-perf-bar">
                <span>Completezza</span>
                <div className="dd-perf-track"><div className="dd-perf-fill" style={{ width: '89%', background: '#7B94FC' }}></div></div>
                <span className="dd-perf-val">89%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dd-footer">
        <span>Agente operativo da 14 giorni</span>
        <div className="dd-footer-stats">
          <span><strong>99.2%</strong> uptime</span>
          <span><strong>1.2s</strong> tempo risposta medio</span>
        </div>
      </div>
    </div>
  );
}
