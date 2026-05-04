'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/agente-ai', label: 'Agente AI' },
    { href: '/casi-studio', label: 'Casi Studio' },
    { href: '/contatti', label: 'Contatti' },
    { href: '/chi-siamo', label: 'Chi Siamo' },
  ];

  return (
    <>
      <nav id="nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5vw', height: '64px',
        transition: 'background .3s, border-color .3s',
        background: scrolled ? 'rgba(13,15,20,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.2)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}>
        <Link href="/" style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '-0.01em', textDecoration: 'none', lineHeight: 1, zIndex: 101, position: 'relative' }}>
          <span style={{ color: '#F4F3EE' }}>Freyr</span>
          <span style={{ color: '#4B6BFB' }}>technology</span>
          <span style={{ color: '#F4F3EE' }}>AI</span>
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'none', gap: '28px', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{
              fontSize: '13px',
              color: pathname === link.href ? '#F4F3EE' : 'rgba(244,243,238,0.45)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}>{link.label}</Link>
          ))}
        </div>

        {/* Hamburger animato */}
        <button
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Chiudi menu' : 'Apri menu'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px', background: 'transparent', border: 'none',
            cursor: 'pointer', zIndex: 101, position: 'relative', padding: 0,
          }}
        >
          <span className="nav-toggle-inner">
            <span className="nav-toggle-line nav-toggle-line-1"></span>
            <span className="nav-toggle-line nav-toggle-line-2"></span>
            <span className="nav-toggle-line nav-toggle-line-3"></span>
          </span>
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mounted && <div className={`mobile-menu ${isOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-bg"></div>
        <div className="mobile-menu-content">
          <nav className="mobile-menu-links">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-menu-link ${pathname === link.href ? 'active' : ''}`}
                style={{ transitionDelay: isOpen ? `${0.1 + i * 0.06}s` : '0s' }}
                onClick={() => setIsOpen(false)}
              >
                <span className="mobile-menu-text">{link.label}</span>
                {pathname === link.href && <span className="mobile-menu-dot"></span>}
              </Link>
            ))}
          </nav>

          <div className="mobile-menu-footer" style={{ transitionDelay: isOpen ? '0.5s' : '0s' }}>
            <Link href="/contatti" className="mobile-menu-cta" onClick={() => setIsOpen(false)}>
              Prenota una consulenza
              <span className="mobile-menu-cta-arrow">→</span>
            </Link>

            <div className="mobile-menu-contacts">
              <a href="mailto:info@freyrwork.it" className="mobile-menu-contact">
                <span className="mobile-menu-contact-label">Email</span>
                <span className="mobile-menu-contact-value">info@freyrwork.it</span>
              </a>
              <a href="tel:+390743297711" className="mobile-menu-contact">
                <span className="mobile-menu-contact-label">Telefono</span>
                <span className="mobile-menu-contact-value">+39 0743 297711</span>
              </a>
            </div>

            <div className="mobile-menu-brand">
              <span style={{ color: 'rgba(244,243,238,0.3)' }}>Freyr</span>
              <span style={{ color: '#4B6BFB', opacity: 0.6 }}>technology</span>
              <span style={{ color: 'rgba(244,243,238,0.3)' }}>AI</span>
              <span style={{ color: 'rgba(244,243,238,0.2)', marginLeft: '8px', fontSize: '11px' }}>© 2025</span>
            </div>
          </div>
        </div>
      </div>}

      <style jsx global>{`
        @media (min-width: 901px) {
          .nav-desktop { display: flex !important; }
          .nav-toggle { display: none !important; }
        }

        .nav-toggle-inner {
          width: 22px; height: 16px; position: relative;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .nav-toggle-line {
          display: block; width: 100%; height: 2px;
          background: #F4F3EE; border-radius: 2px;
          transition: transform .4s cubic-bezier(.68,-0.55,.27,1.55), opacity .3s, width .3s;
          transform-origin: center;
        }
        .nav-toggle.is-open .nav-toggle-line-1 {
          transform: translateY(7px) rotate(45deg);
        }
        .nav-toggle.is-open .nav-toggle-line-2 {
          opacity: 0; transform: scaleX(0);
        }
        .nav-toggle.is-open .nav-toggle-line-3 {
          transform: translateY(-7px) rotate(-45deg);
        }

        .mobile-menu {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          z-index: 99; pointer-events: none;
          opacity: 0; transition: opacity .4s ease;
        }
        .mobile-menu.is-open {
          opacity: 1; pointer-events: auto;
        }
        .mobile-menu-bg {
          position: absolute; inset: 0;
          background: rgba(13,15,20,0.92);
          backdrop-filter: blur(24px) saturate(1.3);
          -webkit-backdrop-filter: blur(24px) saturate(1.3);
        }
        .mobile-menu-content {
          position: relative; z-index: 1;
          height: 100%; width: 100%;
          padding: 100px 8vw 40px;
          display: flex; flex-direction: column;
          overflow-y: auto;
        }

        .mobile-menu-links {
          display: flex; flex-direction: column;
          gap: 2px; flex: 1;
        }
        .mobile-menu-link {
          display: flex; align-items: baseline; gap: 16px;
          padding: 14px 0; text-decoration: none;
          color: rgba(244,243,238,0.5);
          font-size: 24px; font-weight: 500;
          letter-spacing: -0.02em; line-height: 1.1;
          position: relative;
          opacity: 0; transform: translateY(24px);
          transition: opacity .6s cubic-bezier(.4,0,.2,1), transform .6s cubic-bezier(.4,0,.2,1), color .3s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .mobile-menu.is-open .mobile-menu-link {
          opacity: 1; transform: translateY(0);
        }
        .mobile-menu-link:active,
        .mobile-menu-link:hover {
          color: #F4F3EE;
        }
        .mobile-menu-link.active {
          color: #F4F3EE;
        }
        .mobile-menu-num {
          font-size: 11px; font-weight: 500;
          color: rgba(244,243,238,0.3);
          letter-spacing: 0.08em;
          font-variant-numeric: tabular-nums;
          min-width: 24px;
        }
        .mobile-menu-text {
          flex: 1;
        }
        .mobile-menu-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #4B6BFB;
          box-shadow: 0 0 12px rgba(75,107,251,0.6);
          animation: menuDotPulse 2s ease-in-out infinite;
        }
        @keyframes menuDotPulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .6; transform: scale(1.3); }
        }

        .mobile-menu-footer {
          margin-top: 40px; padding-top: 32px;
          border-top: 1px solid rgba(255,255,255,0.06);
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .mobile-menu.is-open .mobile-menu-footer {
          opacity: 1; transform: translateY(0);
        }

        .mobile-menu-cta {
          display: flex; align-items: center; justify-content: space-between;
          width: 100%; padding: 18px 24px;
          background: #4B6BFB;
          border-radius: 12px;
          color: #fff; text-decoration: none;
          font-size: 15px; font-weight: 500;
          margin-bottom: 24px;
          transition: background .2s, transform .2s;
          box-shadow: 0 12px 36px rgba(75,107,251,0.3);
        }
        .mobile-menu-cta:active {
          background: #3a57e8; transform: scale(.98);
        }
        .mobile-menu-cta-arrow {
          transition: transform .2s;
        }
        .mobile-menu-cta:hover .mobile-menu-cta-arrow {
          transform: translateX(4px);
        }

        .mobile-menu-contacts {
          display: flex; flex-direction: column;
          gap: 4px; margin-bottom: 28px;
        }
        .mobile-menu-contact {
          display: flex; justify-content: space-between; align-items: center;
          padding: 12px 0; text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: padding .2s;
        }
        .mobile-menu-contact:active {
          padding-left: 6px;
        }
        .mobile-menu-contact:last-child {
          border-bottom: none;
        }
        .mobile-menu-contact-label {
          font-size: 11px;
          color: rgba(244,243,238,0.4);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .mobile-menu-contact-value {
          font-size: 14px;
          color: rgba(244,243,238,0.8);
          font-weight: 400;
        }

        .mobile-menu-brand {
          font-size: 13px; font-weight: 600;
          display: flex; align-items: center;
          margin-top: 8px;
        }

        @media (max-width: 400px) {
          .mobile-menu-link { font-size: 22px; padding: 12px 0; }
          .mobile-menu-content { padding: 90px 6vw 30px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-menu-link { transition: color .3s; opacity: 1; transform: none; }
          .mobile-menu-footer { opacity: 1; transform: none; transition: none; }
          .nav-toggle-line { transition: transform .2s, opacity .2s; }
        }
      `}</style>
    </>
  );
}
