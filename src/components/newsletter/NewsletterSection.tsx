'use client';
import { useEffect, useRef, useState } from 'react';

const C = {
  bg: '#0D0F14',
  bg2: '#13161C',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.70)',
  muted40: 'rgba(244,243,238,0.40)',
  border: 'rgba(244,243,238,0.10)',
  border2: 'rgba(244,243,238,0.18)',
  accGlow: 'rgba(75,107,251,0.15)',
  accBorder: 'rgba(75,107,251,0.35)',
};

const SECTORS = ['Ristorazione', 'Hotellerie', 'Parrucchieri', 'Beauty · Wellness', 'Retail', 'Commercialista', 'Delivery', 'Altro'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sector, setSector] = useState('');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', phone: '' });
  const [gdpr, setGdpr] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0, rafId = 0;
    let pts: Array<{ x: number; y: number; vx: number; vy: number; r: number; hue: boolean }> = [];

    function resize() {
      const rect = cv!.getBoundingClientRect();
      W = rect.width; H = rect.height;
      cv!.width = W * dpr; cv!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.max(28, Math.min(80, Math.floor(W * H / 9000)));
      pts = Array.from({ length: n }).map(() => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
        r: 1.2 + Math.random() * 2.6, hue: Math.random() < 0.35,
      }));
    }

    function draw() {
      rafId = requestAnimationFrame(draw);
      ctx!.clearRect(0, 0, W, H);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }
      ctx!.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            ctx!.strokeStyle = `rgba(123,148,252,${(1 - d2 / (130 * 130)) * 0.22})`;
            ctx!.beginPath(); ctx!.moveTo(a.x, a.y); ctx!.lineTo(b.x, b.y); ctx!.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx!.beginPath(); ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.hue ? 'rgba(123,148,252,0.95)' : 'rgba(244,243,238,0.55)';
        ctx!.shadowColor = p.hue ? 'rgba(75,107,251,0.7)' : 'transparent';
        ctx!.shadowBlur = p.hue ? 10 : 0;
        ctx!.fill(); ctx!.shadowBlur = 0;
      }
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    resize();
    draw();
    return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          company: form.company,
          ...(form.phone ? { phone: form.phone } : {}),
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Errore durante l\'iscrizione');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Errore di connessione. Riprova tra qualche istante.');
    }
  };

  const inputStyle: React.CSSProperties = {
    background: 'rgba(244,243,238,0.08)',
    border: `1px solid ${C.border2}`,
    borderRadius: 6,
    padding: '12px 14px',
    color: C.txt,
    fontSize: 14,
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border-color .18s',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    color: C.muted40,
    letterSpacing: '.06em',
    textTransform: 'uppercase',
    fontWeight: 500,
    display: 'block',
    marginBottom: 6,
  };

  return (
    <section style={{
      padding: '90px 0 110px',
      background: C.bg,
      borderTop: `1px solid ${C.border}`,
      borderBottom: `1px solid ${C.border}`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        .nl2-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:56px;align-items:center;max-width:1240px;margin:0 auto;padding:0 6vw}
        @media(max-width:880px){.nl2-grid{grid-template-columns:1fr;gap:32px}}
        .nl2-row2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        @media(max-width:480px){.nl2-row2{grid-template-columns:1fr}}
        .nl2-chip{font-family:inherit;font-size:12px;padding:8px 12px;border-radius:6px;background:transparent;border:1px solid rgba(244,243,238,0.10);color:rgba(244,243,238,0.70);cursor:pointer;font-weight:400;transition:all .18s}
        .nl2-chip:hover{border-color:rgba(244,243,238,0.18);color:#F4F3EE}
        .nl2-chip.on{background:rgba(75,107,251,0.15);border-color:rgba(75,107,251,0.35);color:#7B94FC;font-weight:500}
        .nl2-btn{padding:14px 28px;border-radius:10px;background:#7B94FC;border:1px solid #7B94FC;color:#fff;font-family:inherit;font-size:15px;font-weight:500;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;transition:opacity .2s,transform .15s,box-shadow .2s;width:100%}
        .nl2-btn:hover:not(:disabled){opacity:.9;transform:translateY(-1px);box-shadow:0 22px 48px rgba(123,148,252,.28)}
        .nl2-btn:disabled{opacity:.5;cursor:not-allowed;transform:none !important;box-shadow:none !important}
      `}</style>

      <div className="nl2-grid">
        {/* Left: canvas + copy */}
        <div style={{
          position: 'relative', minHeight: 460, borderRadius: 20,
          background: 'linear-gradient(135deg,#13161C 0%,rgba(75,107,251,.06) 100%)',
          border: `1px solid ${C.border}`, overflow: 'hidden',
          padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(13,15,20,.6) 0%,rgba(13,15,20,.3) 50%,rgba(13,15,20,.85) 100%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-block', fontSize: 11, letterSpacing: '.12em',
              textTransform: 'uppercase', color: C.acc2, fontWeight: 600,
              padding: '5px 12px', borderRadius: 9999,
              background: C.accGlow, border: `1px solid ${C.accBorder}`,
            }}>
              Newsletter
            </span>
            <h2 style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(28px,3.6vw,44px)' as string,
              fontWeight: 600, lineHeight: 1.1, letterSpacing: '-.02em',
              color: C.txt, margin: '18px 0 0',
            }}>
              Restiamo in contatto.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: C.muted, margin: '18px 0 0', maxWidth: 460, fontWeight: 300 }}>
              Una volta al mese condividiamo cosa stiamo costruendo con altre piccole e medie imprese: progetti reali, strumenti che stiamo valutando, riflessioni operative sull&apos;uso dell&apos;intelligenza artificiale.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginTop: 28 }}>
            {[
              'Progetti realizzati con altre PMI',
              'Strumenti e flussi di lavoro che testiamo',
              'Una sola email al mese, mai promozionale',
            ].map((text) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: C.muted }}>
                <span style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: C.accGlow, border: `1px solid ${C.accBorder}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#7B94FC" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form or success */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '28px 0' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 6,
                background: 'linear-gradient(140deg,rgba(74,222,128,.25),rgba(74,222,128,.08))',
                border: '1px solid rgba(74,222,128,.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 600, color: C.txt, margin: 0, letterSpacing: '-.02em' }}>
                Iscrizione registrata.
              </h3>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.65, margin: 0 }}>
                Abbiamo inviato una email di conferma a{' '}
                <span style={{ color: C.txt }}>{form.email}</span>.{' '}
                Quando avremo qualcosa di utile da condividere, ti scriveremo.
              </p>
            </div>
          ) : (
            <>
              <div>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 600, color: C.txt, margin: '0 0 8px', letterSpacing: '-.015em' }}>
                  Iscriviti
                </h3>
                <p style={{ fontSize: 14, color: C.muted, margin: 0, lineHeight: 1.7 }}>
                  Lasciaci i tuoi dati. Ti scriveremo solo quando avremo qualcosa di rilevante per il tuo contesto.
                </p>
              </div>

              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {/* Nome + Cognome */}
                <div className="nl2-row2">
                  <div>
                    <label htmlFor="nl-fname" style={labelStyle}>Nome</label>
                    <input
                      id="nl-fname" type="text" placeholder="Marco" required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                    />
                  </div>
                  <div>
                    <label htmlFor="nl-lname" style={labelStyle}>Cognome</label>
                    <input
                      id="nl-lname" type="text" placeholder="Bianchi" required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                    />
                  </div>
                </div>

                {/* Email + Azienda */}
                <div className="nl2-row2">
                  <div>
                    <label htmlFor="nl-email" style={labelStyle}>Email</label>
                    <input
                      id="nl-email" type="email" placeholder="marco@latuaattivita.it" required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                    />
                  </div>
                  <div>
                    <label htmlFor="nl-company" style={labelStyle}>Azienda / Attività</label>
                    <input
                      id="nl-company" type="text" placeholder="La Mia Attività" required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                    />
                  </div>
                </div>

                {/* Settore chips */}
                <div>
                  <label style={labelStyle}>Settore di attività</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {SECTORS.map((s) => (
                      <button
                        key={s} type="button" onClick={() => setSector(sector === s ? '' : s)}
                        className={`nl2-chip${sector === s ? ' on' : ''}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Telefono */}
                <div>
                  <label htmlFor="nl-phone" style={labelStyle}>Telefono <span style={{ color: C.muted40, textTransform: 'none', letterSpacing: 0 }}>(opzionale)</span></label>
                  <input
                    id="nl-phone" type="tel" placeholder="+39 333 1234567"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.acc)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.border2)}
                  />
                </div>

                {/* GDPR */}
                <div style={{
                  padding: 14, borderRadius: 6,
                  background: 'rgba(244,243,238,0.02)', border: `1px solid ${C.border}`,
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <input
                    type="checkbox" id="nl-gdpr" required
                    checked={gdpr} onChange={(e) => setGdpr(e.target.checked)}
                    style={{ width: 16, height: 16, marginTop: 2, accentColor: C.acc, cursor: 'pointer', flexShrink: 0 }}
                  />
                  <label htmlFor="nl-gdpr" style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, cursor: 'pointer' }}>
                    Ho letto l&apos;<a href="/privacy" style={{ color: C.acc2, textDecoration: 'underline', textUnderlineOffset: 2 }}>informativa privacy</a> e acconsento al trattamento dei miei dati personali per ricevere la newsletter, ai sensi del Regolamento UE 2016/679 (GDPR).
                  </label>
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <div style={{
                    padding: '12px 14px', borderRadius: 6,
                    background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.3)',
                    fontSize: 13, color: '#f87171',
                  }}>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" className="nl2-btn" disabled={!gdpr || status === 'loading'}>
                  {status === 'loading' ? (
                    <>Iscrizione in corso…</>
                  ) : (
                    <>
                      Iscriviti
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>

                <p style={{ fontSize: 11, color: C.muted40, lineHeight: 1.6, margin: '4px 0 0' }}>
                  I tuoi dati restano nostri. Non li condividiamo con terze parti. Puoi disiscriverti in ogni momento dal link in fondo a ogni email.
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
