'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import FlowDiagram from '@/components/agente-ai/FlowDiagram'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease, delay },
  },
})

const WORDS = ['Collaboratori', 'AI', 'concreti', 'per', 'piccole', 'e', 'medie', 'imprese']
const WORD_INTERVAL = 115
const CURSOR_LINGER  = 650

export default function Hero() {
  const [isDesktop, setIsDesktop]   = useState(false)
  const [wordCount, setWordCount]   = useState(0)
  const [typingDone, setTypingDone] = useState(false)

  // breakpoint: 1024px per il layout a due colonne
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // typewriter loop
  useEffect(() => {
    if (wordCount < WORDS.length) {
      const delay = wordCount === 0 ? 420 : WORD_INTERVAL
      const t = setTimeout(() => setWordCount(w => w + 1), delay)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTypingDone(true), CURSOR_LINGER)
    return () => clearTimeout(t)
  }, [wordCount])

  const showCursor = wordCount > 0 && !typingDone

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0D0F14',
        overflow: 'hidden',
        paddingTop: '68px',
      }}
    >
      {/* glow blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'rgba(75,107,251,0.18)', filter: 'blur(140px)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'rgba(75,107,251,0.12)', filter: 'blur(140px)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* inner container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '1200px',
          paddingLeft: isDesktop ? '24px' : '16px',
          paddingRight: isDesktop ? '24px' : '16px',
          paddingTop: isDesktop ? '0' : '40px',
          paddingBottom: isDesktop ? '0' : '56px',
          display: isDesktop ? 'grid' : 'flex',
          gridTemplateColumns: isDesktop ? '1fr 1fr' : undefined,
          flexDirection: !isDesktop ? 'column' : undefined,
          gap: isDesktop ? '80px' : '48px',
          alignItems: 'center',
        }}
      >
        {/* ── Colonna sinistra: testo ─────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '24px',
          }}
        >
          {/* eyebrow pill */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate="visible">
            <span style={{
              display: 'inline-block',
              background: 'rgba(75,107,251,0.10)',
              border: '1px solid rgba(75,107,251,0.35)',
              color: '#7B94FC', fontSize: '11px', fontWeight: 600,
              fontFamily: 'Inter, sans-serif', letterSpacing: '0.12em',
              textTransform: 'uppercase', padding: '5px 14px', borderRadius: '9999px',
            }}>
              Collaboratori AI per PMI
            </span>
          </motion.div>

          {/* typewriter headline */}
          <h1
            style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#F4F3EE',
              margin: 0,
              minHeight: 'calc(clamp(36px, 5.5vw, 64px) * 1.1 * 1.2)',
            }}
          >
            {WORDS.slice(0, wordCount).map((word, i) => (
              <span key={i}>
                {i > 0 && ' '}
                {word === 'concreti' ? (
                  <span style={{
                    background: 'linear-gradient(135deg, #F4F3EE 0%, #7B94FC 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {word}
                  </span>
                ) : word}
              </span>
            ))}

            {showCursor && (
              <motion.span
                aria-hidden="true"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '0.82em',
                  background: '#7B94FC',
                  borderRadius: '2px',
                  marginLeft: '6px',
                  verticalAlign: 'middle',
                  position: 'relative',
                  top: '-0.05em',
                }}
              />
            )}
          </h1>

          {/* sottotitolo */}
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={typingDone ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '17px',
              lineHeight: 1.75,
              color: 'rgba(244,243,238,0.70)',
              maxWidth: '480px',
              margin: 0,
            }}
          >
            Non semplici chatbot. Non strumenti generici da adattare da soli.
            Freyrwork crea agenti AI che lavorano sui processi reali della tua
            attività e ti aiutano a risparmiare tempo, organizzare meglio il
            lavoro e capire più in fretta cosa sta succedendo.
          </motion.p>

          <motion.p
            variants={fadeUp(0.06)}
            initial="hidden"
            animate={typingDone ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              lineHeight: 1.8,
              color: 'rgba(244,243,238,0.62)',
              maxWidth: '560px',
              margin: 0,
            }}
          >
            Ogni impresa oggi si trova a gestire molto più di quello che si
            vede: clienti da seguire, informazioni sparse, richieste che
            arrivano da canali diversi, attività ripetitive, numeri da leggere,
            decisioni da prendere in poco tempo. Freyrwork nasce per alleggerire
            il lavoro operativo e restituire più chiarezza a chi guida
            l&apos;impresa.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp(0.12)}
            initial="hidden"
            animate={typingDone ? 'visible' : 'hidden'}
            style={{
              display: 'flex',
              flexDirection: isDesktop ? 'row' : 'column',
              gap: '12px',
              alignItems: isDesktop ? 'center' : 'stretch',
              width: isDesktop ? 'auto' : '100%',
              maxWidth: isDesktop ? 'none' : '320px',
            }}
          >
            <Link href="/servizi" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: '#4B6BFB', color: '#ffffff',
              fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500,
              padding: '14px 28px', borderRadius: '12px',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}>
              Scopri come può funzionare per la tua attività
            </Link>
            <Link href="/contatti" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              background: 'transparent', color: '#F4F3EE',
              fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500,
              padding: '13px 28px', borderRadius: '12px',
              border: '1px solid rgba(244,243,238,0.18)',
              textDecoration: 'none', transition: 'all 0.2s ease',
            }}>
              Prenota una consulenza
            </Link>
          </motion.div>

          {/* microcopy */}
          <motion.p
            variants={fadeUp(0.24)}
            initial="hidden"
            animate={typingDone ? 'visible' : 'hidden'}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: 'rgba(244,243,238,0.40)',
              margin: 0,
            }}
          >
            Nessun tecnicismo inutile. Partiamo da come lavori oggi.
          </motion.p>
        </div>

        {/* ── Colonna destra: FlowDiagram ────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          style={{
            position: 'relative',
            width: '100%',
            height: isDesktop ? '460px' : '300px',
          }}
        >
          <FlowDiagram />
        </motion.div>
      </div>
    </section>
  )
}
