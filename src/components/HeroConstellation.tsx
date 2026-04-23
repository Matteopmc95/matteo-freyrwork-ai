'use client';

import { useEffect, useRef } from 'react';

// ── Config ────────────────────────────────────────────────────────────────────
const ACCENT_COLOR = '#4B6BFB';
const ROTATION_SPEED_S = 20;   // seconds per full revolution
const PARTICLES_PER_EDGE = 2;
const RADIUS_PCT = 0.40;        // fraction of Math.min(W, H)

const LABELS = [
  'Analisi e lettura del dato',
  'Statistiche in tempo reale',
  'Analisi di mercato',
  'Dashboard intelligenti',
  'Sistema di prenotazioni',
  'Gestione del personale',
  'Gestione amministrativa',
  'Automatizzazione flussi',
  'Automatizzazione dei processi',
  'Reportistica e progetti',
];

// ── Types ─────────────────────────────────────────────────────────────────────
interface Vec3 { x: number; y: number; z: number }
interface Projected { x: number; y: number; s: number; z: number }
interface Node { id: number; base: Vec3; label: string; opacity: number; scale: number; active: boolean; pulsePhase: number; hubDone: boolean }
interface HubEdge { to: number; progress: number; done: boolean }
interface MeshEdge { from: number; to: number; progress: number; done: boolean }
interface Particle { type: 'hub' | 'mesh'; idx: number; t: number; speed: number }

// ── 3D helpers ────────────────────────────────────────────────────────────────
function fibSphere(n: number, r: number): Vec3[] {
  const phi = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y  = 1 - (i / (n - 1)) * 2;
    const rr = Math.sqrt(Math.max(0, 1 - y * y));
    const th = phi * i;
    return { x: rr * Math.cos(th) * r, y: y * r * 0.68, z: rr * Math.sin(th) * r };
  });
}

function rotateY3(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
}
function rotateX3(p: Vec3, a: number): Vec3 {
  const c = Math.cos(a), s = Math.sin(a);
  return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
}
function dist3(a: Vec3, b: Vec3): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}
function hexRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function easeOut(t: number) { return 1 - (1 - t) ** 3; }

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroConstellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // State
    let W = 0, H = 0, CX = 0, CY = 0, RADIUS = 0, isMobile = false, dpr = 1;
    let rotY = 0;
    let rotX = 0.22;
    const FOV = 850;
    let nodes: Node[]       = [];
    let hubEdges: HubEdge[] = [];
    let meshEdges: MeshEdge[] = [];
    let particles: Particle[] = [];
    let startTime: number | null = null;
    let lastTime = 0;
    let centerOpacity = 0;
    let rafId = 0;

    // Timing ms
    const T_CENTER_START = 300, T_CENTER_DONE = 1400;
    const T_HUB_STAGGER  = 160, T_HUB_DRAW   = 720;
    const T_MESH_START   = 3200, T_MESH_DRAW  = 500, T_MESH_STAGGER = 90;

    function project(p: Vec3): Projected {
      const z = p.z + FOV;
      const s = FOV / Math.max(z, 1);
      return { x: CX + p.x * s, y: CY + p.y * s, s, z: p.z };
    }
    function getRotated(node: Node): Vec3 {
      return rotateX3(rotateY3(node.base, rotY), rotX);
    }
    function updateRotX(elapsed: number) {
      rotX = 0.22 + 0.14 * Math.sin(elapsed * 0.00028);
    }

    function resize() {
      if (!canvas) return;
      if (!ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      isMobile = W < 640;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      CX = W / 2; CY = H / 2;
      RADIUS = Math.min(W, H) * RADIUS_PCT * (isMobile ? 0.82 : 1);
    }

    function buildScene() {
      RADIUS = Math.min(W, H) * RADIUS_PCT * (isMobile ? 0.82 : 1);
      const pos = fibSphere(LABELS.length, RADIUS);
      nodes = LABELS.map((label, i): Node => ({
        id: i, base: { ...pos[i] }, label,
        opacity: 0, scale: 0, active: false,
        pulsePhase: Math.random() * Math.PI * 2,
        hubDone: false,
      }));
      hubEdges = nodes.map((_, i): HubEdge => ({ to: i, progress: 0, done: false }));
      const used = new Set<string>();
      meshEdges = [];
      for (let i = 0; i < nodes.length; i++) {
        nodes.map((n, j) => ({ j, d: dist3(nodes[i].base, n.base) }))
          .filter(x => x.j !== i).sort((a, b) => a.d - b.d).slice(0, 3)
          .forEach(({ j }) => {
            const k = [Math.min(i, j), Math.max(i, j)].join('-');
            if (!used.has(k)) { used.add(k); meshEdges.push({ from: i, to: j, progress: 0, done: false }); }
          });
      }
      particles = [];
    }

    // ── Drawing ─────────────────────────────────────────────────────────────
    function drawConnector(x1: number, y1: number, x2: number, y2: number, prog: number, alpha: number, thin: boolean) {
      if (!ctx) return;
      if (prog <= 0 || alpha < 0.01) return;
      const ac = hexRgb(ACCENT_COLOR);
      const tx = x1 + (x2 - x1) * prog, ty = y1 + (y2 - y1) * prog;
      ctx.save();
      if (!thin) {
        ctx.globalAlpha = alpha * 0.22;
        ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
        ctx.lineWidth = 3; ctx.filter = 'blur(4px)';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.filter = 'none';
      } else {
        ctx.globalAlpha = alpha * 0.18;
        ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
        ctx.lineWidth = 1.5; ctx.filter = 'blur(2px)';
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.filter = 'none';
      }
      ctx.globalAlpha = alpha * (thin ? 0.28 : 0.5);
      ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
      ctx.lineWidth = thin ? 0.7 : 1;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
      ctx.restore();
    }

    function drawParticle(x: number, y: number, a: number, size: number) {
      if (!ctx) return;
      const ac = hexRgb(ACCENT_COLOR);
      ctx.save();
      const g = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      g.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${a * 0.65})`);
      g.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, size * 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = a;
      ctx.fillStyle = `rgb(${Math.min(255, ac.r + 80)},${Math.min(255, ac.g + 80)},${Math.min(255, ac.b + 80)})`;
      ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    function rrect(x: number, y: number, w: number, h: number, r: number) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    }

    function drawLabel(x: number, y: number, text: string, alpha: number, scale: number, active: boolean) {
      if (!ctx) return;
      if (alpha < 0.02) return;
      const ac = hexRgb(ACCENT_COLOR);
      const fs  = Math.max(isMobile ? 7 : 9, (isMobile ? 10 : 12) * scale);
      const px  = 10 * scale, py = 4.5 * scale, br = 6 * scale;
      const displayText = text.toUpperCase();
      ctx.font = `400 ${fs}px Inter, sans-serif`;
      const tw = ctx.measureText(displayText).width;
      const w = tw + px * 2, h = fs + py * 2;
      const bx = x - w / 2, by = y - h / 2;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = 'rgba(13,15,20,0.88)';
      rrect(bx, by, w, h, br); ctx.fill();
      if (active) { ctx.shadowColor = `rgba(${ac.r},${ac.g},${ac.b},0.7)`; ctx.shadowBlur = 14; }
      ctx.strokeStyle = active ? `rgba(${ac.r},${ac.g},${ac.b},0.9)` : `rgba(${ac.r},${ac.g},${ac.b},0.3)`;
      ctx.lineWidth = active ? 1.2 : 0.8;
      rrect(bx, by, w, h, br); ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fillStyle = active ? '#FFFFFF' : 'rgba(244,243,238,0.85)';
      ctx.font = `400 ${fs}px Inter, sans-serif`;
      ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
      ctx.fillText(displayText, x, y);
      ctx.restore();
    }

    function drawCenterText(alpha: number, t: number) {
      if (!ctx) return;
      if (alpha < 0.01) return;
      const ac = hexRgb(ACCENT_COLOR);
      const pulse = 0.85 + 0.15 * Math.sin(t * 0.0018);
      ctx.save();
      const haloR = (isMobile ? 55 : 85) * pulse;
      const halo = ctx.createRadialGradient(CX, CY, 8, CX, CY, haloR);
      halo.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${0.12 * alpha})`);
      halo.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(CX, CY, haloR, 0, Math.PI * 2); ctx.fill();
      const dotR = 4 * pulse;
      const dotG = ctx.createRadialGradient(CX, CY, 0, CX, CY, dotR * 5);
      dotG.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${0.55 * alpha})`);
      dotG.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
      ctx.fillStyle = dotG; ctx.beginPath(); ctx.arc(CX, CY, dotR * 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = alpha; ctx.fillStyle = '#FFFFFF';
      ctx.beginPath(); ctx.arc(CX, CY, dotR, 0, Math.PI * 2); ctx.fill();
      const big   = isMobile ? Math.min(W * 0.11, 46) : Math.min(W * 0.065, H * 0.115, 82);
      const small = big * (isMobile ? 0.46 : 0.44);
      ctx.globalAlpha = alpha; ctx.textAlign = 'center';
      ctx.shadowColor = `rgba(${ac.r},${ac.g},${ac.b},0.7)`; ctx.shadowBlur = 26;
      ctx.font = `600 ${big}px Inter, sans-serif`; ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'alphabetic'; ctx.fillText('Agenti AI', CX, CY - big * 0.16);
      ctx.font = `300 ${small}px Inter, sans-serif`;
      ctx.fillStyle = `rgba(${ac.r},${ac.g},${ac.b},1)`;
      ctx.shadowColor = `rgba(${ac.r},${ac.g},${ac.b},0.9)`; ctx.shadowBlur = 14;
      ctx.textBaseline = 'top'; ctx.fillText('per la tua azienda', CX, CY + big * 0.28);
      ctx.shadowBlur = 0; ctx.restore();
    }

    function spawnHub(i: number) {
      for (let k = 0; k < PARTICLES_PER_EDGE; k++) {
        particles.push({ type: 'hub', idx: i, t: k / PARTICLES_PER_EDGE, speed: 0.00032 + Math.random() * 0.00022 });
      }
    }
    function spawnMesh(i: number) {
      particles.push({ type: 'mesh', idx: i, t: Math.random(), speed: (0.00015 + Math.random() * 0.0001) * (Math.random() > 0.5 ? 1 : -1) });
    }
    function updateParticles(dt: number) {
      for (const p of particles) p.t = ((p.t + p.speed * dt) % 1 + 1) % 1;
    }

    // ── Frame ────────────────────────────────────────────────────────────────
    function draw(now: number) {
      if (!ctx) return;
      rafId = requestAnimationFrame(draw);
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const dt = Math.min(now - lastTime, 50);
      lastTime = now;

      rotY += (2 * Math.PI / (ROTATION_SPEED_S * 1000)) * dt;
      ctx.clearRect(0, 0, W, H);
      updateRotX(elapsed);

      if (elapsed >= T_CENTER_START)
        centerOpacity = easeOut(Math.min(1, (elapsed - T_CENTER_START) / (T_CENTER_DONE - T_CENTER_START)));
      drawCenterText(centerOpacity, elapsed);

      hubEdges.forEach((edge, i) => {
        const start = T_CENTER_DONE + i * T_HUB_STAGGER;
        if (elapsed < start) return;
        const prog = easeOut(Math.min(1, (elapsed - start) / T_HUB_DRAW));
        edge.progress = prog;
        if (prog >= 1 && !edge.done) { edge.done = true; nodes[i].hubDone = true; spawnHub(i); }
        nodes[i].opacity = Math.min(1, prog * 1.6);
        nodes[i].scale   = nodes[i].hubDone ? 1 : prog;
        nodes[i].active  = nodes[i].hubDone && elapsed - (start + T_HUB_DRAW) < 700;
        const rp = getRotated(nodes[i]); const pr = project(rp);
        const depth = Math.max(0.3, Math.min(1.2, (rp.z + RADIUS) / (RADIUS * 2)));
        drawConnector(CX, CY, pr.x, pr.y, prog, 0.55 * depth, false);
      });

      meshEdges.forEach((edge, i) => {
        const start = T_MESH_START + i * T_MESH_STAGGER;
        if (elapsed < start) return;
        edge.progress = easeOut(Math.min(1, (elapsed - start) / T_MESH_DRAW));
        if (edge.progress >= 1 && !edge.done) { edge.done = true; spawnMesh(i); }
        const pA = project(getRotated(nodes[edge.from]));
        const pB = project(getRotated(nodes[edge.to]));
        const rA = getRotated(nodes[edge.from]), rB = getRotated(nodes[edge.to]);
        const depthAvg = Math.max(0.25, Math.min(1, ((rA.z + rB.z) * 0.5 + RADIUS) / (RADIUS * 2)));
        drawConnector(pA.x, pA.y, pB.x, pB.y, edge.progress, 0.55 * depthAvg, true);
      });

      updateParticles(dt);
      for (const p of particles) {
        if (p.type === 'hub') {
          if (!hubEdges[p.idx]?.done) continue;
          const rp = getRotated(nodes[p.idx]); const pr = project(rp);
          const depth = Math.max(0.3, Math.min(1.2, (rp.z + RADIUS) / (RADIUS * 2)));
          drawParticle(lerp(CX, pr.x, p.t), lerp(CY, pr.y, p.t), depth * 0.9, 2.2 * depth);
        } else {
          const edge = meshEdges[p.idx]; if (!edge?.done) continue;
          const pA = project(getRotated(nodes[edge.from]));
          const pB = project(getRotated(nodes[edge.to]));
          const rA = getRotated(nodes[edge.from]), rB = getRotated(nodes[edge.to]);
          const depth = Math.max(0.2, Math.min(0.9, ((rA.z + rB.z) * 0.5) / RADIUS + 0.6));
          drawParticle(lerp(pA.x, pB.x, p.t), lerp(pA.y, pB.y, p.t), depth * 0.45, 1.4 * depth);
        }
      }

      nodes.map(n => {
        const rp = getRotated(n); const pr = project(rp);
        return { n, rp, pr };
      }).sort((a, b) => a.rp.z - b.rp.z).forEach(({ n, rp, pr }) => {
        if (n.opacity < 0.01) return;
        const depth = Math.max(0.3, Math.min(1.15, (rp.z + RADIUS) / (RADIUS * 2)));
        const pulse = 1 + 0.035 * Math.sin(elapsed * 0.0018 + n.pulsePhase);
        drawLabel(pr.x, pr.y, n.label, n.opacity * Math.max(0.25, depth), n.scale * depth * pulse, n.active);
      });
    }

    // ── Init ─────────────────────────────────────────────────────────────────
    resize(); buildScene();
    rafId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => { resize(); buildScene(); });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        background: '#0D0F14',
      }}
    />
  );
}
