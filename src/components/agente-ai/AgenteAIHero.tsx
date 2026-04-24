"use client";

import { useEffect, useRef } from "react";

/*
  AgenteAIHero — nuova animazione centrata sull'OPERATIVITÀ.
  Mantiene lo stile visivo del hero (dark, accent #4B6BFB, glow, Syne, stesso layout),
  ma sostituisce la sfera di capability con un flusso concreto:
  - lato sinistro: richieste in ingresso (email, whatsapp, chiamata, form, booking...)
    che "viaggiano" come pacchetti verso il core
  - centro: il core AI pulsa quando elabora, con anelli concentrici
  - lato destro: azioni in uscita (risposta inviata, prenotazione confermata,
    alert, dato aggiornato...) che partono dal core
  Il messaggio è immediato: l'agente riceve, elabora e agisce. In tempo reale.
*/

const styles = `
#agente-hero{position:relative;width:100%;height:100svh;min-height:860px;overflow:hidden;background:radial-gradient(ellipse 58% 42% at 50% 43%, rgba(75,107,251,.10), transparent 72%),linear-gradient(180deg, rgba(8,10,16,.96) 0%, rgba(13,15,20,.92) 58%, #0D0F14 100%)}
#agente-hero canvas{display:block;position:absolute;inset:0;width:100%;height:100%}
#agente-hero .ah-center{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%);z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;width:min(100%,980px);padding:0 24px}
#agente-hero .ah-eyebrow{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7B94FC;font-weight:500;margin-bottom:22px}
#agente-hero .ah-title{font-family:'Syne',sans-serif;font-size:clamp(64px,7.8vw,124px);font-weight:600;line-height:.96;letter-spacing:-.055em;color:#fff;text-shadow:0 0 24px rgba(123,148,252,.28),0 0 52px rgba(123,148,252,.12)}
#agente-hero .ah-kicker{font-family:'Syne',sans-serif;margin-top:10px;font-size:clamp(28px,2.8vw,48px);font-weight:300;line-height:1.02;letter-spacing:-.035em;color:#5972ff;text-shadow:0 0 18px rgba(75,107,251,.28)}
#agente-hero .ah-bottom{position:absolute;left:50%;bottom:clamp(26px,4.35vh,52px);transform:translateX(-50%);width:min(100%,860px);background:linear-gradient(180deg, rgba(10,12,18,0) 0%, rgba(10,12,18,.18) 18%, rgba(10,12,18,.72) 100%);padding:28px 24px 0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px;z-index:2}
#agente-hero .ah-sub{font-size:clamp(15px,1.3vw,18px);color:rgba(244,243,238,.62);max-width:680px;line-height:1.82;font-weight:300;letter-spacing:-.01em}
#agente-hero .ah-actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
#agente-hero .ah-btn-primary{font-size:15px;font-weight:500;color:#fff;padding:14px 28px;border-radius:10px;background:#7B94FC;border:1px solid #7B94FC;cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s;display:inline-block;box-shadow:0 18px 44px rgba(123,148,252,.24);text-decoration:none}
#agente-hero .ah-btn-primary:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 22px 48px rgba(123,148,252,.28)}
#agente-hero .ah-btn-ghost{font-size:15px;font-weight:400;color:#F4F3EE;padding:14px 28px;border-radius:10px;border:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.02);cursor:pointer;transition:border-color .2s,background .2s,transform .15s;display:inline-block;text-decoration:none}
#agente-hero .ah-btn-ghost:hover{border-color:rgba(75,107,251,.45);background:rgba(75,107,251,.07);transform:translateY(-1px)}
@media(max-width:900px){#agente-hero{min-height:780px}#agente-hero .ah-center{top:42.5%;width:min(100%,760px)}#agente-hero .ah-title{font-size:clamp(56px,9vw,104px)}#agente-hero .ah-kicker{font-size:clamp(24px,3.4vw,40px)}#agente-hero .ah-bottom{width:min(100%,740px);padding:24px 20px 0}}
@media(max-width:640px){#agente-hero{min-height:720px}#agente-hero .ah-center{top:41%;padding:0 18px}#agente-hero .ah-title{font-size:clamp(48px,14vw,72px);line-height:.98}#agente-hero .ah-kicker{margin-top:8px;font-size:clamp(22px,6.8vw,32px)}#agente-hero .ah-bottom{bottom:22px;padding:18px 16px 0;gap:16px}#agente-hero .ah-sub{font-size:15px;line-height:1.74}#agente-hero .ah-actions{width:100%;flex-direction:column;align-items:center}#agente-hero .ah-btn-primary,#agente-hero .ah-btn-ghost{width:min(100%,320px);padding:15px 22px}}
`;

/* Richieste in entrata: cosa arriva all'agente */
const INPUTS = [
  "Email cliente",
  "Messaggio WhatsApp",
  "Richiesta prenotazione",
  "Chiamata persa",
  "Modulo sito web",
  "Notifica calendario",
  "Richiesta info",
  "Recensione online",
];

/* Azioni in uscita: cosa fa l'agente */
const OUTPUTS = [
  "Risposta inviata",
  "Prenotazione confermata",
  "Appuntamento fissato",
  "Info cliente aggiornate",
  "Alert al team",
  "Report giornaliero",
  "Reminder programmato",
  "Agenda riorganizzata",
];

export default function AgenteAIHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    if (!canvas || !hero) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ACC = { r: 75, g: 107, b: 251 };
    const ACC2 = { r: 123, g: 148, b: 252 };
    let W = 0, H = 0, CX = 0, CY = 0, CORE_R = 0, LANE_W = 0;
    let isMobile = false, dpr = 1;
    let startTime: number | null = null;
    let lastTime = 0, lastRenderTime = 0;
    let raf = 0;
    let heroVisible = true;
    let pageVisible = !document.hidden;
    const frameInterval = 1000 / 45;

    /* ───────── Packet model ─────────
       side: "in" da sinistra verso core, "out" dal core verso destra
       t: 0..1 progresso lungo il proprio percorso
       y: offset verticale dal centro (px, pre-scale)
       label: testo dentro la pillola
       born: timestamp nascita
       processed: timestamp in cui il core ha "assorbito" un "in" (trigger pulse)
    */
    type Packet = {
      side: "in" | "out";
      label: string;
      y: number;        // offset verticale (px)
      t: number;        // 0..1
      speed: number;    // t/ms
      born: number;
      colorShift: number; // 0..1 (per variety sugli output)
      absorbed?: boolean; // in: true quando raggiunge il core
    };

    const packets: Packet[] = [];
    const pulses: { born: number; strength: number }[] = []; // onde concentriche core
    let fadeIn = 0; // opacità globale 0..1

    /* ───────── canvas setup ─────────*/
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      isMobile = W < 640;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      CX = W / 2;
      CY = H * (isMobile ? 0.47 : 0.42);
      CORE_R = Math.max(14, Math.min(W, H) * (isMobile ? 0.018 : 0.022));
      /* larghezza della "corsia" che i pacchetti attraversano per raggiungere/uscire dal core */
      LANE_W = Math.min(W * 0.42, isMobile ? 340 : 520);
    };

    /* ───────── spawn ─────────*/
    const chooseY = (sideDistrib: number[]) => {
      /* distribuiamo i pacchetti su N lanes verticali, con jitter */
      const laneCount = isMobile ? 5 : 7;
      const laneSpacing = (isMobile ? 54 : 74);
      const totalH = (laneCount - 1) * laneSpacing;
      const startY = -totalH / 2;
      /* scegli una lane che non è troppo satura */
      let bestIdx = 0;
      for (let i = 0; i < laneCount; i++) {
        if ((sideDistrib[i] ?? 0) < (sideDistrib[bestIdx] ?? 0)) bestIdx = i;
      }
      sideDistrib[bestIdx] = (sideDistrib[bestIdx] ?? 0) + 1;
      const jitter = (Math.random() - 0.5) * 12;
      return startY + bestIdx * laneSpacing + jitter;
    };

    const spawnIn = (now: number) => {
      /* conta pacchetti in ingresso negli ultimi 1.4s per lane */
      const laneCount = isMobile ? 5 : 7;
      const laneSpacing = (isMobile ? 54 : 74);
      const startY = -((laneCount - 1) * laneSpacing) / 2;
      const occ = new Array(laneCount).fill(0);
      for (const p of packets) {
        if (p.side !== "in") continue;
        const lane = Math.round((p.y - startY) / laneSpacing);
        if (lane >= 0 && lane < laneCount) occ[lane] += (1 - p.t);
      }
      const y = chooseY(occ);
      packets.push({
        side: "in",
        label: INPUTS[Math.floor(Math.random() * INPUTS.length)],
        y,
        t: 0,
        speed: (0.28 + Math.random() * 0.12) / 1000,
        born: now,
        colorShift: Math.random(),
      });
    };

    const spawnOut = (now: number, label?: string) => {
      const laneCount = isMobile ? 5 : 7;
      const laneSpacing = (isMobile ? 54 : 74);
      const startY = -((laneCount - 1) * laneSpacing) / 2;
      const occ = new Array(laneCount).fill(0);
      for (const p of packets) {
        if (p.side !== "out") continue;
        const lane = Math.round((p.y - startY) / laneSpacing);
        if (lane >= 0 && lane < laneCount) occ[lane] += (1 - p.t);
      }
      const y = chooseY(occ);
      packets.push({
        side: "out",
        label: label ?? OUTPUTS[Math.floor(Math.random() * OUTPUTS.length)],
        y,
        t: 0,
        speed: (0.26 + Math.random() * 0.12) / 1000,
        born: now,
        colorShift: Math.random(),
      });
    };

    /* pulse al core quando un input viene assorbito */
    const triggerPulse = (now: number, strength = 1) => {
      pulses.push({ born: now, strength });
    };

    /* ───────── draw helpers ─────────*/
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const eOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const eIn = (t: number) => t * t * t;

    const rrect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    };

    const drawLanes = (alpha: number) => {
      /* corsie guide — sottilissime, danno senso di "flusso" */
      ctx.save();
      ctx.globalAlpha = 0.055 * alpha;
      ctx.strokeStyle = `rgb(${ACC.r},${ACC.g},${ACC.b})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 6]);
      const laneCount = isMobile ? 5 : 7;
      const laneSpacing = (isMobile ? 54 : 74);
      const startY = -((laneCount - 1) * laneSpacing) / 2;
      for (let i = 0; i < laneCount; i++) {
        const y = CY + startY + i * laneSpacing;
        /* side in (left -> core) */
        ctx.beginPath();
        ctx.moveTo(CX - LANE_W, y);
        ctx.lineTo(CX - CORE_R - 6, y);
        ctx.stroke();
        /* side out (core -> right) */
        ctx.beginPath();
        ctx.moveTo(CX + CORE_R + 6, y);
        ctx.lineTo(CX + LANE_W, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    };

    const drawCore = (now: number, alpha: number) => {
      if (alpha < 0.01) return;
      const pulseBeat = 0.92 + 0.08 * Math.sin(now * 0.002);

      /* anelli concentrici emanati dai pulses */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const age = now - p.born;
        const life = 1200;
        if (age > life) { pulses.splice(i, 1); continue; }
        const t = age / life;
        const r = CORE_R + eOut(t) * CORE_R * 5.5 * p.strength;
        const a = (1 - t) * 0.35 * p.strength * alpha;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.strokeStyle = `rgb(${ACC2.r},${ACC2.g},${ACC2.b})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
      }

      /* halo */
      const haloR = CORE_R * (isMobile ? 6.5 : 8) * pulseBeat;
      const halo = ctx.createRadialGradient(CX, CY, CORE_R * 0.4, CX, CY, haloR);
      halo.addColorStop(0, `rgba(${ACC.r},${ACC.g},${ACC.b},${0.22 * alpha})`);
      halo.addColorStop(0.5, `rgba(${ACC.r},${ACC.g},${ACC.b},${0.06 * alpha})`);
      halo.addColorStop(1, `rgba(${ACC.r},${ACC.g},${ACC.b},0)`);
      ctx.save();
      ctx.fillStyle = halo;
      ctx.beginPath(); ctx.arc(CX, CY, haloR, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      /* core sphere (gradient) */
      const coreGrad = ctx.createRadialGradient(CX - CORE_R * 0.3, CY - CORE_R * 0.3, 0, CX, CY, CORE_R);
      coreGrad.addColorStop(0, `rgba(220,228,255,${alpha})`);
      coreGrad.addColorStop(0.55, `rgba(${ACC2.r},${ACC2.g},${ACC2.b},${alpha})`);
      coreGrad.addColorStop(1, `rgba(${ACC.r},${ACC.g},${ACC.b},${alpha})`);
      ctx.save();
      ctx.fillStyle = coreGrad;
      ctx.beginPath(); ctx.arc(CX, CY, CORE_R * pulseBeat, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${0.35 * alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();

      /* "AI" tag sotto il core */
      ctx.save();
      ctx.globalAlpha = 0.8 * alpha;
      ctx.font = `500 10px Inter,sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = `rgba(${ACC2.r},${ACC2.g},${ACC2.b},${alpha})`;
      ctx.fillText("AGENTE", CX, CY + CORE_R * 2 + 4);
      ctx.restore();
    };

    const drawPacket = (p: Packet, now: number, alpha: number) => {
      /* calcola posizione x,y in canvas */
      let x: number, y: number, travelAlpha: number;
      const coreEdge = CORE_R + 8;
      if (p.side === "in") {
        /* da (CX - LANE_W, CY + p.y) a (CX - coreEdge, CY + easing(p.y)->0) */
        /* man mano che si avvicina, converge leggermente verso CY */
        const conv = eIn(p.t); // converge più verso la fine
        const startX = CX - LANE_W;
        const endX = CX - coreEdge;
        x = lerp(startX, endX, p.t);
        y = CY + p.y * (1 - conv * 0.35);
        /* fade-in iniziale + fade-out quando tocca il core */
        const appear = Math.min(1, (now - p.born) / 240);
        const nearCore = 1 - Math.max(0, Math.min(1, (p.t - 0.82) / 0.18));
        travelAlpha = appear * nearCore * alpha;
      } else {
        /* out: dal core (CX + coreEdge, CY) che diverge verso (CX + LANE_W, CY + p.y) */
        const div = eOut(p.t);
        const startX = CX + coreEdge;
        const endX = CX + LANE_W;
        x = lerp(startX, endX, p.t);
        y = CY + p.y * div;
        const appear = Math.min(1, (now - p.born) / 240);
        const fadeLate = 1 - Math.max(0, Math.min(1, (p.t - 0.78) / 0.22));
        travelAlpha = appear * fadeLate * alpha;
      }

      if (travelAlpha < 0.02) return;

      /* linea sottile dal punto verso il core (per "in") o dal core al punto (per "out") */
      ctx.save();
      ctx.globalAlpha = travelAlpha * 0.35;
      ctx.strokeStyle = `rgb(${ACC.r},${ACC.g},${ACC.b})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (p.side === "in") {
        ctx.moveTo(x, y);
        ctx.lineTo(CX - coreEdge, CY);
      } else {
        ctx.moveTo(CX + coreEdge, CY);
        ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      /* pillola con label */
      const fs = isMobile ? 9 : 10.5;
      const px = 9, py = 4;
      ctx.font = `500 ${fs}px Inter,sans-serif`;
      const text = p.label;
      const tw = ctx.measureText(text).width;
      const w = tw + px * 2;
      const h = fs + py * 2 + 2;
      const bx = x - w / 2;
      const by = y - h / 2;

      ctx.save();
      ctx.globalAlpha = travelAlpha;

      /* sfondo */
      ctx.fillStyle = "rgba(13,15,20,0.92)";
      rrect(bx, by, w, h, 5); ctx.fill();

      /* bordo: input = tenue, output = più marcato / diverso tinta */
      if (p.side === "in") {
        ctx.strokeStyle = `rgba(${ACC.r},${ACC.g},${ACC.b},0.55)`;
        ctx.lineWidth = 0.8;
      } else {
        /* output: mix tra acc2 e un verdino sottile (processed) */
        const isAlt = p.colorShift > 0.65;
        if (isAlt) {
          ctx.strokeStyle = `rgba(120, 200, 170, 0.75)`;
        } else {
          ctx.strokeStyle = `rgba(${ACC2.r},${ACC2.g},${ACC2.b},0.8)`;
        }
        ctx.lineWidth = 1;
      }
      rrect(bx, by, w, h, 5); ctx.stroke();

      /* dot colorato a sx della pillola (status) */
      const dotR = 2.6;
      ctx.fillStyle = p.side === "in"
        ? `rgba(${ACC.r},${ACC.g},${ACC.b},0.95)`
        : (p.colorShift > 0.65 ? "rgba(130, 220, 180, 1)" : `rgba(${ACC2.r},${ACC2.g},${ACC2.b},1)`);
      ctx.beginPath();
      ctx.arc(bx + px, y, dotR, 0, Math.PI * 2);
      ctx.fill();

      /* testo */
      ctx.fillStyle = "rgba(244,243,238,0.92)";
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText(text, bx + px + dotR * 2 + 2, y + 0.5);

      ctx.restore();
    };

    /* ───────── main loop ─────────*/
    let nextSpawnIn = 0;
    let nextSpawnOutFallback = 0;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      if (!heroVisible || !pageVisible) return;
      if (!startTime) startTime = now;
      if (lastRenderTime && now - lastRenderTime < frameInterval) return;
      lastRenderTime = now;
      const el = now - startTime;
      const dt = Math.min(now - lastTime, 60); lastTime = now;

      /* fade-in globale */
      fadeIn = Math.min(1, el / 900);

      ctx.clearRect(0, 0, W, H);

      /* lanes guide */
      drawLanes(fadeIn);

      /* core */
      drawCore(now, fadeIn);

      /* spawn input con ritmo piu calmo, cosi le label restano leggibili */
      if (el > 450 && now >= nextSpawnIn) {
        spawnIn(now);
        nextSpawnIn = now + 1100 + Math.random() * 900;
      }

      /* avanzamento pacchetti + trigger core pulse + spawn output quando assorbito */
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed * dt;
        if (p.t >= 1) {
          if (p.side === "in" && !p.absorbed) {
            p.absorbed = true;
            triggerPulse(now, 0.9 + Math.random() * 0.3);
            /* ~75% delle richieste assorbite producono un output dopo una pausa naturale */
            if (Math.random() < 0.78) {
              setTimeout(() => {
                spawnOut(performance.now());
              }, 420 + Math.random() * 420);
            }
          }
          packets.splice(i, 1);
        }
      }

      /* fallback: se per qualche motivo non ci sono output in volo, ne spawniamo uno ogni tanto
         (per assicurare sempre attività visibile anche nei primi secondi) */
      if (now >= nextSpawnOutFallback) {
        const outCount = packets.filter(p => p.side === "out").length;
        if (outCount < 2 && el > 2400) {
          spawnOut(now);
          triggerPulse(now, 0.7);
        }
        nextSpawnOutFallback = now + 2300;
      }

      /* draw packets (input sotto, output sopra così "escono" visivamente) */
      for (const p of packets) if (p.side === "in") drawPacket(p, now, fadeIn);
      for (const p of packets) if (p.side === "out") drawPacket(p, now, fadeIn);
    };

    const onResize = () => { resize(); };
    const io = new IntersectionObserver(([e]) => { heroVisible = !!e?.isIntersecting; }, { threshold: 0.05 });
    const onVis = () => { pageVisible = !document.hidden; };
    const ro = new ResizeObserver(() => { resize(); });

    function tryStart() {
      if (!canvas || canvas.offsetWidth === 0 || canvas.offsetHeight === 0) {
        requestAnimationFrame(tryStart);
        return;
      }
      resize();
      raf = requestAnimationFrame(draw);
    }

    requestAnimationFrame(tryStart);
    ro.observe(canvas);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    io.observe(hero);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <section id="agente-hero" ref={heroRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className="ah-center">
          <span className="ah-eyebrow">Agente AI</span>
          <h1 className="ah-title">Un collaboratore,</h1>
          <p className="ah-kicker">non un chatbot</p>
        </div>
        <div className="ah-bottom">
          <p className="ah-sub">
            Un agente AI osserva informazioni, organizza richieste, legge dati e supporta decisioni. Lavora sul contesto reale della tua attività — non su risposte generiche.
          </p>
          <div className="ah-actions">
            <a href="#prova" className="ah-btn-primary">Provalo ora</a>
            <a href="#che-cose" className="ah-btn-ghost">Scopri come funziona</a>
          </div>
        </div>
      </section>
    </>
  );
}
