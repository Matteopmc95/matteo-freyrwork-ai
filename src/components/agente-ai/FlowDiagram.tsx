'use client'

import { useEffect, useRef } from 'react'

// ─── Constants ────────────────────────────────────────────────
const BG_NODE = '#13161C'
const ACCENT = '#4B6BFB'
const ACCENT_SOFT = '#7B94FC'

// 3D coordinate space: x determines rotation behaviour, y is vertical
// During Y-rotation: x3d = x * cos(angle), z3d = x * sin(angle)
const NODE_DEFS = [
  { id: 'whatsapp',     label: 'WhatsApp',     x: -220, y: -140, isCenter: false, isOutput: false },
  { id: 'calendario',   label: 'Calendario',   x: -220, y:    0, isCenter: false, isOutput: false },
  { id: 'dati',         label: 'Dati azienda', x: -220, y:  140, isCenter: false, isOutput: false },
  { id: 'agente',       label: 'AI',           x:    0, y:    0, isCenter: true,  isOutput: false },
  { id: 'prenotazioni', label: 'Prenotazioni', x:  220, y: -140, isCenter: false, isOutput: true  },
  { id: 'insights',     label: 'Insights',     x:  220, y:    0, isCenter: false, isOutput: true  },
  { id: 'alert',        label: 'Alert',        x:  220, y:  140, isCenter: false, isOutput: true  },
]

const CONN_DEFS: [string, string][] = [
  ['whatsapp', 'agente'],
  ['calendario', 'agente'],
  ['dati', 'agente'],
  ['agente', 'prenotazioni'],
  ['agente', 'insights'],
  ['agente', 'alert'],
]

// ─── Helpers ──────────────────────────────────────────────────
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ─── Component ────────────────────────────────────────────────
export default function FlowDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef    = useRef<number>(0)

  // All mutable animation state in a ref (avoids stale closures)
  const S = useRef({
    revealed:     false,
    revealStart:  null as number | null,
    lastTime:     null as number | null,
    elapsed:      0,
    // Two particles per connection (forward + backward)
    particles: CONN_DEFS.flatMap((_, i) => [
      { t: (i * 0.17)       % 1, speed: 0.22 + i * 0.013, connIdx: i, rev: false },
      { t: (i * 0.17 + 0.5) % 1, speed: 0.18 + i * 0.011, connIdx: i, rev: true  },
    ]),
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ── Resize ──────────────────────────────────────────────
    function resize() {
      const r = canvas!.getBoundingClientRect()
      canvas!.width  = r.width  * dpr
      canvas!.height = r.height * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // ── Reveal on scroll ────────────────────────────────────
    const io = new IntersectionObserver(entries => {
      if (entries[0]?.isIntersecting) { S.current.revealed = true; io.disconnect() }
    }, { threshold: 0.08 })
    io.observe(canvas)

    // ── Main draw loop ──────────────────────────────────────
    function draw(ts: number) {
      const s   = S.current
      const dt  = s.lastTime ? Math.min((ts - s.lastTime) / 1000, 0.05) : 0
      s.lastTime = ts
      s.elapsed  += dt

      if (s.revealed && s.revealStart === null) s.revealStart = ts
      const rp = s.revealStart ? Math.min(1, (ts - s.revealStart) / 2200) : 0

      const W   = canvas!.width  / dpr
      const H   = canvas!.height / dpr
      const ctx = canvas!.getContext('2d')!

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, W, H)

      // Y-rotation: 360° every 30 s
      const rotY = (s.elapsed * 2 * Math.PI) / 30

      // Scale so diagram fills the canvas gracefully
      const sf  = Math.min(W * 0.45, H * 0.55) / 220
      const fov = Math.min(W, H) * 1.6

      // ── Project all nodes into screen space ──────────────
      const proj = NODE_DEFS.map(n => {
        const x3 = n.x * sf * Math.cos(rotY)
        const z3 = n.x * sf * Math.sin(rotY)
        const y3 = n.y * sf
        const d  = fov / (fov + z3 + 1)  // perspective depth
        return { ...n, sx: x3 * d + W / 2, sy: y3 * d + H / 2, depth: d, z3 }
      })

      const backToFront = [...proj].sort((a, b) => a.z3 - b.z3)

      // ── Connection lines ─────────────────────────────────
      for (const [fId, tId] of CONN_DEFS) {
        const f   = proj.find(n => n.id === fId)!
        const t   = proj.find(n => n.id === tId)!
        const avg = (f.depth + t.depth) / 2

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(f.sx, f.sy)
        ctx.quadraticCurveTo((f.sx + t.sx) / 2, (f.sy + t.sy) / 2, t.sx, t.sy)
        ctx.strokeStyle = `rgba(75,107,251,${rp * 0.60 * avg})`
        ctx.lineWidth   = 2.5 * avg
        ctx.shadowColor = ACCENT
        ctx.shadowBlur  = 18 * avg
        ctx.stroke()
        ctx.restore()
      }

      // ── Particles ─────────────────────────────────────────
      for (const p of s.particles) {
        const [fId, tId] = CONN_DEFS[p.connIdx]
        const f = proj.find(n => n.id === fId)!
        const t = proj.find(n => n.id === tId)!

        p.t = (p.t + p.speed * dt) % 1
        const t01 = p.rev ? 1 - p.t : p.t

        const cpx = (f.sx + t.sx) / 2
        const cpy = (f.sy + t.sy) / 2
        const px  = (1-t01)*(1-t01)*f.sx + 2*(1-t01)*t01*cpx + t01*t01*t.sx
        const py  = (1-t01)*(1-t01)*f.sy + 2*(1-t01)*t01*cpy + t01*t01*t.sy
        const pd  = (f.depth + t.depth) / 2
        const r   = 4 * pd

        ctx.save()
        // Radial glow halo
        const grad = ctx.createRadialGradient(px, py, 0, px, py, r * 4)
        grad.addColorStop(0,   `rgba(200,215,255,${rp * 0.9})`)
        grad.addColorStop(0.4, `rgba(123,148,252,${rp * 0.45})`)
        grad.addColorStop(1,   'rgba(75,107,251,0)')
        ctx.fillStyle = grad
        ctx.beginPath(); ctx.arc(px, py, r * 4, 0, Math.PI * 2); ctx.fill()
        // Core dot
        ctx.shadowColor = ACCENT_SOFT; ctx.shadowBlur = 14
        ctx.fillStyle = `rgba(220,230,255,${rp})`
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill()
        ctx.restore()
      }

      // ── Nodes (back to front) ─────────────────────────────
      for (const n of backToFront) {
        const { sx, sy, depth, isCenter } = n

        if (isCenter) {
          // Pulsing glow every 2 s: sin with period 2s
          const pulse = 0.5 + 0.5 * Math.sin(s.elapsed * Math.PI)

          // Outer halo
          const glowR = (90 + 40 * pulse) * depth
          ctx.save()
          const halo = ctx.createRadialGradient(sx, sy, 0, sx, sy, glowR)
          halo.addColorStop(0,   `rgba(75,107,251,${0.50 * pulse * rp})`)
          halo.addColorStop(0.55,`rgba(75,107,251,${0.16 * pulse * rp})`)
          halo.addColorStop(1,   'rgba(75,107,251,0)')
          ctx.fillStyle = halo
          ctx.beginPath(); ctx.arc(sx, sy, glowR, 0, Math.PI * 2); ctx.fill()
          ctx.restore()

          const bw = 124 * depth, bh = 98 * depth, br = 22 * depth
          ctx.save()
          ctx.globalAlpha = rp
          roundRect(ctx, sx - bw/2, sy - bh/2, bw, bh, br)
          ctx.fillStyle = BG_NODE; ctx.fill()
          roundRect(ctx, sx - bw/2, sy - bh/2, bw, bh, br)
          ctx.strokeStyle = `rgba(75,107,251,${0.65 + 0.32 * pulse})`
          ctx.lineWidth   = 2 * depth
          ctx.shadowColor = ACCENT
          ctx.shadowBlur  = (30 + 22 * pulse) * depth
          ctx.stroke(); ctx.shadowBlur = 0

          ctx.fillStyle = ACCENT_SOFT
          ctx.font = `600 ${Math.max(8, Math.round(10 * depth))}px Inter, sans-serif`
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText('AGENTE', sx, sy - 17 * depth)

          ctx.fillStyle = '#F4F3EE'
          ctx.font = `700 ${Math.max(14, Math.round(28 * depth))}px Syne, sans-serif`
          ctx.fillText('AI', sx, sy + 12 * depth)
          ctx.restore()

        } else {
          const bw = 130 * depth, bh = 55 * depth, br = 13 * depth
          // Deeper nodes fade out → perspective depth effect
          const opacity = Math.max(0.32, Math.min(1, (depth - 0.55) / 0.5))

          ctx.save()
          ctx.globalAlpha = rp * opacity
          roundRect(ctx, sx - bw/2, sy - bh/2, bw, bh, br)
          ctx.fillStyle = BG_NODE; ctx.fill()
          roundRect(ctx, sx - bw/2, sy - bh/2, bw, bh, br)
          ctx.strokeStyle = n.isOutput
            ? `rgba(75,107,251,${0.52 * depth})`
            : `rgba(244,243,238,${0.16 * depth})`
          ctx.lineWidth = depth
          if (n.isOutput) { ctx.shadowColor = ACCENT; ctx.shadowBlur = 10 * depth }
          ctx.stroke(); ctx.shadowBlur = 0

          ctx.fillStyle = 'rgba(244,243,238,0.84)'
          ctx.font = `500 ${Math.max(9, Math.round(13 * depth))}px Inter, sans-serif`
          ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText(n.label, sx, sy)
          ctx.restore()
        }
      }

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
