import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <style>{`
        .ft-root { padding: 80px 5vw 40px; }
        .ft-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .ft-col-title {
          font-size: 12px;
          font-weight: 600;
          color: #F4F3EE;
          margin: 0 0 14px 0;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .ft-link {
          display: block;
          font-size: 13px;
          color: rgba(244, 243, 238, 0.75);
          text-decoration: none;
          margin-bottom: 10px;
          transition: color 200ms;
        }
        .ft-link:hover { color: #7B94FC; }
        .ft-btn {
          display: block;
          font-size: 13px;
          color: rgba(244, 243, 238, 0.75);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          transition: color 200ms;
          font-family: inherit;
        }
        .ft-btn:hover { color: #7B94FC; }
        .ft-legal {
          font-size: 12px;
          color: rgba(244, 243, 238, 0.55);
          line-height: 1.6;
          margin: 0 0 6px 0;
        }
        @media (max-width: 768px) {
          .ft-root { padding: 60px 5vw 30px; }
          .ft-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
      <footer
        className="ft-root"
        style={{
          background: '#0D0F14',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div className="ft-grid">

            {/* Colonna 1 — Brand */}
            <div>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo/logo.png" alt="Freyr Technology" style={{ width: 32, height: 32, objectFit: 'contain' }} />
                <span style={{ fontSize: 14, fontWeight: 600, color: '#F4F3EE' }}>
                  Freyr<span style={{ color: '#4B6BFB' }}>technology</span>AI
                </span>
              </Link>
              <p style={{ fontSize: 13, color: 'rgba(244,243,238,0.55)', lineHeight: 1.6, margin: 0, maxWidth: 220 }}>
                Agenti AI personalizzati per PMI italiane
              </p>
            </div>

            {/* Colonna 2 — Navigazione */}
            <div>
              <p className="ft-col-title">Navigazione</p>
              <Link href="/" className="ft-link">Home</Link>
              <Link href="/servizi" className="ft-link">Servizi</Link>
              <Link href="/agente-ai" className="ft-link">Agente AI</Link>
              <Link href="/casi-studio" className="ft-link">Casi Studio</Link>
              <Link href="/chi-siamo" className="ft-link">Chi Siamo</Link>
              <Link href="/contatti" className="ft-link">Contatti</Link>
            </div>

            {/* Colonna 3 — Legale */}
            <div>
              <p className="ft-col-title">Legale</p>
              <Link href="/privacy-policy" className="ft-link">Privacy Policy</Link>
              <Link href="/cookie-policy" className="ft-link">Cookie Policy</Link>
              <Link href="/termini-condizioni" className="ft-link">Termini e Condizioni</Link>
              <button id="iubenda-cs-preferences-link" className="ft-btn">
                Preferenze Cookie
              </button>
            </div>

            {/* Colonna 4 — Contatti */}
            <div>
              <p className="ft-col-title">Contatti</p>
              <a href="mailto:info@freyrtechnology.it" className="ft-link">info@freyrtechnology.it</a>
              <span style={{ display: 'block', fontSize: 13, color: 'rgba(244,243,238,0.55)', lineHeight: 1.6, marginTop: 4 }}>
                Via dei Filosofi 2<br />06049 Spoleto (PG)
              </span>
            </div>

          </div>

          {/* Dati societari */}
          <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="ft-legal">
              Freyr Technology S.r.l. · P.IVA e C.F. 03848780544 · REA PG-357026 · Capitale sociale € 3.000,00 i.v. · Sede legale: Via dei Filosofi 2, 06049 Spoleto (PG)
            </p>
            <p className="ft-legal">
              © 2026 Freyr Technology S.r.l. Tutti i diritti riservati
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
