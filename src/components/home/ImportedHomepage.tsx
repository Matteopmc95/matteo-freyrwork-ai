"use client";

import { useEffect, useState } from "react";
import NewsletterSection from "@/components/newsletter/NewsletterSection";

const styles = `
:root{--bg:#0D0F14;--bg2:#0f1117;--acc:#4B6BFB;--acc2:#7B94FC;--txt:#F4F3EE;--muted:rgba(244,243,238,0.45);--border:rgba(255,255,255,0.07);--font:'Inter',sans-serif}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--txt);font-family:var(--font);-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{text-decoration:none;color:inherit}
#hero{position:relative;width:100%;min-height:min(100svh,900px);overflow:hidden;background:radial-gradient(ellipse 58% 42% at 50% 43%, rgba(75,107,251,.10), transparent 72%),linear-gradient(180deg, rgba(8,10,16,.96) 0%, rgba(13,15,20,.92) 58%, var(--bg) 100%)}
#hero canvas{display:block;position:absolute;inset:-4% 0 0 0;width:100%;height:108%;transform:scale(1.04);transform-origin:center 40%;z-index:0}
.hero-center{position:absolute;left:50%;top:43%;transform:translate(-50%,-50%);z-index:2;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;pointer-events:none;width:min(100%,980px);padding:0 24px}
.hero-title{font-size:clamp(72px,8.2vw,132px);font-weight:600;line-height:.96;letter-spacing:-.055em;color:#fff;text-shadow:0 0 24px rgba(123,148,252,.28),0 0 52px rgba(123,148,252,.12)}
.hero-kicker{margin-top:10px;font-size:clamp(30px,3vw,54px);font-weight:300;line-height:1.02;letter-spacing:-.035em;color:#5972ff;text-shadow:0 0 18px rgba(75,107,251,.28)}
.hero-bottom{position:absolute;left:50%;bottom:clamp(26px,4.35vh,52px);transform:translateX(-50%);width:min(100%,860px);background:linear-gradient(180deg, rgba(10,12,18,0) 0%, rgba(10,12,18,.18) 18%, rgba(10,12,18,.72) 100%);padding:28px 24px 0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:20px;will-change:transform,opacity;z-index:2}
.hero-sub{font-size:clamp(15px,1.35vw,19px);color:rgba(244,243,238,.62);max-width:700px;line-height:1.82;font-weight:300;letter-spacing:-.01em}
.hero-actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}
.btn-primary{font-size:15px;font-weight:500;color:#fff;padding:14px 28px;border-radius:10px;background:var(--acc2);border:1px solid var(--acc2);cursor:pointer;transition:opacity .2s,transform .15s,box-shadow .2s;display:inline-block;box-shadow:0 18px 44px rgba(123,148,252,.24)}
.btn-primary:hover{opacity:.9;transform:translateY(-1px);box-shadow:0 22px 48px rgba(123,148,252,.28)}
.btn-ghost{font-size:15px;font-weight:400;color:var(--txt);padding:14px 28px;border-radius:10px;border:1px solid var(--border);background:rgba(255,255,255,.02);cursor:pointer;transition:border-color .2s,background .2s,transform .15s;display:inline-block}
.btn-ghost:hover{border-color:rgba(75,107,251,.45);background:rgba(75,107,251,.07);transform:translateY(-1px)}
@media(max-width:900px){#hero{min-height:min(100svh,780px)}.hero-center{top:28%;width:min(100%,760px)}.hero-title{font-size:clamp(62px,9vw,108px)}.hero-kicker{font-size:clamp(28px,3.6vw,44px)}.hero-bottom{width:min(100%,740px);padding:24px 20px 0}#hero canvas{transform:scale(1.01);inset:-2% 0 0 0}}
@media(max-width:640px){#hero{min-height:100svh;padding:0;position:relative;overflow:hidden}.hero-center{position:absolute;top:90px;left:50%;transform:translateX(-50%);padding:0 18px;width:100%;z-index:2}.hero-title{font-size:clamp(52px,15vw,78px);line-height:.98}.hero-kicker{margin-top:8px;font-size:clamp(24px,7.2vw,34px)}#hero canvas{position:absolute;inset:0;top:28%;height:45%;width:100%;transform:scale(1);transform-origin:center center;z-index:1}.hero-bottom{position:absolute;left:50%;bottom:50px;transform:translateX(-50%);width:100%;padding:0 16px;gap:18px;background:transparent;z-index:2}.hero-sub{font-size:15px;line-height:1.74;margin-bottom:4px}.hero-actions{width:100%;flex-direction:column;align-items:center;gap:10px}.btn-primary,.btn-ghost{width:min(100%,320px);padding:15px 22px;text-align:center}}
section{padding:100px 8vw;position:relative}
section.alt{background:var(--bg2);position:relative}
section.alt::before{content:"";position:absolute;top:-60px;left:0;right:0;height:60px;background:linear-gradient(to bottom,var(--bg),var(--bg2));pointer-events:none;z-index:1}
section.alt + section:not(.alt){position:relative}
section.alt + section:not(.alt)::before{content:"";position:absolute;top:-60px;left:0;right:0;height:60px;background:linear-gradient(to bottom,var(--bg2),var(--bg));pointer-events:none;z-index:1}
.section-tag{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);font-weight:500;margin-bottom:18px}
.section-headline{font-size:clamp(24px,3vw,44px);font-weight:600;line-height:1.12;letter-spacing:-.02em;max-width:700px}
.section-sub{font-size:clamp(14px,1.2vw,17px);color:var(--muted);line-height:1.7;max-width:560px;margin-top:16px;font-weight:300}
.section-body{font-size:clamp(14px,1.1vw,16px);color:var(--muted);line-height:1.75;max-width:620px;margin-top:20px;font-weight:300}
#problema .prob-layout{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;margin-top:56px}
#problema .pain-stack{display:flex;flex-direction:column;gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.pain-card{background:var(--bg2);padding:28px 24px}
section:not(.alt) .pain-card{background:var(--bg2)}
.pain-card strong{display:block;font-size:14px;font-weight:500;color:var(--txt);margin-bottom:8px}
.pain-card p{font-size:13px;color:var(--muted);line-height:1.65}
.chaos-visual{position:relative;height:320px;border:none;border-radius:0;background:transparent;overflow:visible;transform:translateZ(0)}
.chaos-msg{position:absolute;background:#F4F3EE;border:1px solid rgba(0,0,0,0.08);border-radius:8px;padding:10px 14px;font-size:12px;color:#0D0F14;white-space:normal;max-width:180px;animation:floatMsg 6s ease-in-out infinite;will-change:transform,opacity;word-wrap:break-word;font-weight:500}
.chaos-msg .ch{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:8px;vertical-align:middle}
.chaos-msg.active{border-color:rgba(75,107,251,.4);color:rgba(244,243,238,.8)}
@keyframes floatMsg{0%{opacity:0;transform:translateY(8px)}15%{opacity:1;transform:translateY(0)}85%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}
.chaos-center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}
.chaos-center .ring{width:64px;height:64px;border-radius:50%;border:1px solid rgba(75,107,251,.4);display:flex;align-items:center;justify-content:center;margin:0 auto;animation:pulseRing 2.5s ease-in-out infinite;background:rgba(75,107,251,.06)}
.chaos-center .ring-inner{width:8px;height:8px;border-radius:50%;background:var(--acc)}
@keyframes pulseRing{0%,100%{box-shadow:0 0 0 0 rgba(75,107,251,.3)}50%{box-shadow:0 0 0 12px rgba(75,107,251,.0)}}
.chaos-center p{font-size:11px;color:var(--muted);margin-top:10px;letter-spacing:.06em;text-transform:uppercase}
.connector-line{position:absolute;top:50%;height:1px;transform-origin:left center;animation:drawLine 3s ease-in-out infinite}
@keyframes drawLine{0%{opacity:0;width:0}40%{opacity:.5;width:100%}80%{opacity:.5;width:100%}100%{opacity:0;width:100%}}
@media(max-width:768px){#problema .prob-layout{grid-template-columns:1fr}.chaos-visual{height:220px}.chaos-msg{max-width:140px;font-size:11px;padding:8px 10px}}
#soluzione .two-col{display:grid;grid-template-columns:1fr 1fr;gap:72px;align-items:center;margin-top:56px}
.feature-list{display:flex;flex-direction:column;gap:20px;margin-top:28px}
.feature-item{display:flex;gap:14px;align-items:flex-start}
.feat-dot{width:6px;height:6px;border-radius:50%;background:var(--acc);margin-top:7px;flex-shrink:0}
.feat-text strong{display:block;font-size:14px;font-weight:500;color:var(--txt);margin-bottom:3px}
.feat-text p{font-size:13px;color:var(--muted);line-height:1.65}
.agent-visual{background:rgba(75,107,251,.04);border:1px solid rgba(75,107,251,.14);border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:8px}
.agent-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid var(--border)}
.agent-name{font-size:13px;font-weight:500;color:var(--txt)}
.agent-status{display:flex;align-items:center;gap:6px;font-size:11px;color:#4ade80}
.agent-dot{width:6px;height:6px;border-radius:50%;background:#4ade80;animation:blink 2s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
.vis-row{display:flex;align-items:center;gap:12px;padding:11px 14px;background:rgba(13,15,20,.6);border:1px solid var(--border);border-radius:8px;transition:border-color .4s}
.vis-row.on{border-color:rgba(75,107,251,.35);background:rgba(75,107,251,.06);animation:rowPulse 5.5s ease-in-out infinite}
@keyframes rowPulse{0%,100%{border-color:rgba(75,107,251,.35)}50%{border-color:rgba(75,107,251,.6)}}
.vis-label{font-size:12px;font-weight:400;color:var(--muted);flex:1}
.vis-label.on{color:var(--txt)}
.vis-badge{font-size:10px;font-weight:500;padding:3px 9px;border-radius:4px;letter-spacing:.04em}
.vis-badge.active{background:rgba(75,107,251,.2);color:var(--acc2)}
.vis-badge.idle{background:rgba(255,255,255,.05);color:var(--muted)}
.vis-ticker{font-size:11px;color:#7B94FC;font-weight:500;margin-top:6px;margin-bottom:4px;height:16px;overflow:hidden;padding-left:4px}
.vis-ticker > span{display:block;transition:opacity .3s cubic-bezier(.4,0,.2,1),transform .3s cubic-bezier(.4,0,.2,1);will-change:opacity,transform}
@media(max-width:768px){#soluzione .two-col{grid-template-columns:1fr}}
#differenza .compare-table{margin-top:56px;border:1px solid var(--border);border-radius:12px;overflow:hidden}
.compare-header{display:grid;grid-template-columns:1fr 1fr 1fr;background:rgba(255,255,255,.03);border-bottom:1px solid var(--border)}
.compare-header div{padding:14px 24px;font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
.compare-header .col-acc{color:#0D0F14;background:#ffffff;font-weight:600}
.compare-row{display:grid;grid-template-columns:1fr 1fr 1fr;border-bottom:1px solid var(--border)}
.compare-row:last-child{border-bottom:none}
.compare-row div{padding:16px 24px;font-size:13px;color:var(--muted);line-height:1.5;border-right:1px solid var(--border)}
.compare-row div:last-child{border-right:none;background:#ffffff}
.compare-row .col-first{font-weight:500;color:rgba(244,243,238,.5);font-size:12px}
.compare-row .col-acc{color:#0D0F14;font-weight:500}
@media(max-width:640px){.compare-header{grid-template-columns:1fr 1fr}.compare-header div:first-child{display:none}.compare-row{grid-template-columns:1fr 1fr}.compare-row .col-first{display:none}#chi .biz-grid{gap:8px;margin-top:32px;justify-content:flex-start}.biz-pill{flex:1 1 calc(50% - 4px);text-align:center;padding:12px 10px;font-size:12px;white-space:normal;line-height:1.3;min-height:44px;display:flex;align-items:center;justify-content:center}#chi .section-cta{text-align:center}}
#chi .biz-grid{display:flex;flex-wrap:wrap;gap:10px;margin-top:48px}
.biz-pill{padding:10px 18px;border-radius:8px;font-size:13px;border:1px solid rgba(0,0,0,0.08);color:#0D0F14;background:#F4F3EE;font-weight:500;transition:border-color .2s,color .2s,background .2s,transform .15s;cursor:default}
.biz-pill:hover{border-color:rgba(75,107,251,.5);color:#0D0F14;background:#FFFFFF;transform:translateY(-1px)}
#chi .section-cta{margin-top:40px}
#come .steps-wrap{position:relative;margin-top:56px}
#come .steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.step{background:var(--bg2);padding:32px 24px;position:relative}
.step-num{font-size:40px;font-weight:700;color:rgba(75,107,251,.18);letter-spacing:-.03em;line-height:1;margin-bottom:20px}
.step h3{font-size:15px;font-weight:600;margin-bottom:10px}
.step p{font-size:13px;color:var(--muted);line-height:1.65}
.step-progress{height:2px;background:var(--border);margin-top:56px;border-radius:1px;overflow:hidden}
.step-progress-fill{height:100%;background:linear-gradient(90deg,var(--acc),var(--acc2));border-radius:1px;width:0;transition:width 1.6s cubic-bezier(.4,0,.2,1)}
.step-progress-fill.loaded{width:100%}
@media(max-width:768px){#come .steps{grid-template-columns:1fr 1fr}}
@media(max-width:480px){#come .steps{grid-template-columns:1fr}}
#cta-finale{padding:120px 8vw;text-align:center;background:radial-gradient(ellipse 80% 60% at 50% 100%,rgba(75,107,251,.12) 0%,transparent 70%)}
.cta-headline{font-size:clamp(28px,4vw,58px);font-weight:600;letter-spacing:-.03em;line-height:1.08;max-width:700px;margin:0 auto 20px}
.cta-sub{font-size:clamp(14px,1.2vw,17px);color:var(--muted);max-width:480px;margin:0 auto 40px;line-height:1.65;font-weight:300}
.cta-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}
.cta-micro{font-size:12px;color:var(--muted);margin-top:20px;letter-spacing:.02em}
footer{padding:40px 8vw;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
.footer-logo{font-size:14px;font-weight:600;color:rgba(244,243,238,.3);display:flex;align-items:center;gap:10px}
.footer-logo .brand-accent{color:var(--acc);opacity:.6}
.footer-logo img{width:28px;height:28px;object-fit:contain}
.footer-copy{font-size:12px;color:rgba(244,243,238,.18)}
.reveal{opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease}
.reveal.visible{opacity:1;transform:none}
.reveal-d1{transition-delay:.1s}.reveal-d2{transition-delay:.2s}.reveal-d3{transition-delay:.3s}
@media(max-width:768px){
  .reveal{transform:none!important;transition:opacity .5s ease!important}
  .reveal.visible{transform:none!important}
  .reveal-d1,.reveal-d2,.reveal-d3{transition-delay:0s!important}
}
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  .reveal{opacity:1!important;transform:none!important;transition:none!important}
  .reveal.visible{opacity:1!important;transform:none!important}
}
`;

const markupPre = `
<section id="hero">
  <canvas id="hero-canvas"></canvas>
  <div class="hero-center">
    <h1 class="hero-title">Agenti AI</h1>
    <p class="hero-kicker">per la tua azienda</p>
  </div>
  <div class="hero-bottom">
    <p class="hero-sub">Non semplici chatbot. Agenti AI costruiti sui processi reali della tua impresa — per lavorare con meno dispersione e più controllo.</p>
    <div class="hero-actions">
      <a href="#cta-finale" class="btn-primary">Scopri come funziona</a>
      <a href="#cta-finale" class="btn-ghost">Prenota una consulenza</a>
    </div>
  </div>
</section>
<section id="problema">
  <p class="section-tag reveal">Il problema</p>
  <h2 class="section-headline reveal reveal-d1">Il problema spesso non è quanto lavori.<br>È quanta energia perdi nel farlo.</h2>
  <div class="prob-layout">
    <div class="pain-stack reveal reveal-d1">
      <div class="pain-card">
        <strong>Richieste da ogni parte</strong>
        <p>Clienti che scrivono, chiamano, prenotano su canali diversi. Tutto in contemporanea, senza un punto centrale.</p>
      </div>
      <div class="pain-card">
        <strong>Dati che non parlano</strong>
        <p>Le informazioni ci sono ma sono sparse. Le decisioni si prendono per intuito, non per chiarezza.</p>
      </div>
      <div class="pain-card">
        <strong>Lavoro che si ripete</strong>
        <p>Passaggi manuali, operazioni ridondanti. Energia spesa ogni giorno su compiti a basso valore.</p>
      </div>
    </div>
    <div class="chaos-visual reveal reveal-d2" id="chaosVis">
      <div class="chaos-center">
        <div class="ring"><div class="ring-inner"></div></div>
        <p>La tua attività</p>
      </div>
    </div>
  </div>
  <p class="section-body reveal" style="margin-top:40px">Molte attività non hanno bisogno di lavorare di più. Hanno bisogno di lavorare con meno dispersione.</p>
</section>
<section id="soluzione" class="alt">
  <p class="section-tag reveal">La soluzione</p>
  <h2 class="section-headline reveal reveal-d1">Un collaboratore AI non ti complica il lavoro.<br>Ti aiuta a governarlo meglio.</h2>
  <div class="two-col">
    <div>
      <p class="section-sub reveal">FreyrtechnologyAI sviluppa agenti AI capaci di supportare richieste, processi, dati e flussi quotidiani in modo concreto e adattabile.</p>
      <div class="feature-list">
        <div class="feature-item reveal reveal-d1">
          <div class="feat-dot"></div>
          <div class="feat-text"><strong>Costruito sulla tua attività</strong><p>Non uno strumento generico. Un collaboratore progettato sui tuoi flussi reali.</p></div>
        </div>
        <div class="feature-item reveal reveal-d2">
          <div class="feat-dot"></div>
          <div class="feat-text"><strong>Operativo da subito</strong><p>Supporta prenotazioni, richieste, analisi e automazione senza complicare ciò che già funziona.</p></div>
        </div>
        <div class="feature-item reveal reveal-d3">
          <div class="feat-dot"></div>
          <div class="feat-text"><strong>Adattabile nel tempo</strong><p>Cresce con l'impresa. Si affina man mano che lavora con te.</p></div>
        </div>
      </div>
    </div>
    <div class="agent-visual reveal reveal-d2">
      <div class="agent-header">
        <span class="agent-name">Agente AI — La tua attività</span>
        <span class="agent-status"><span class="agent-dot"></span>Operativo</span>
      </div>
      <div class="vis-row on">
        <span class="vis-label on">Gestione richieste clienti</span>
        <span class="vis-badge active">Attivo</span>
      </div>
      <div class="vis-ticker">
        <span>
          <span>↳ 3 richieste gestite negli ultimi 10 min</span>
          <span>↳ Prenotazione confermata: ore 15:30</span>
          <span>↳ Risposta automatica inviata</span>
          <span>↳ Richiesta smistata al team</span>
          <span>↳ 3 richieste gestite negli ultimi 10 min</span>
        </span>
      </div>
      <div class="vis-row on" style="margin-top:4px">
        <span class="vis-label on">Sistema di prenotazioni</span>
        <span class="vis-badge active">Attivo</span>
      </div>
      <div class="vis-row">
        <span class="vis-label">Analisi andamento settimanale</span>
        <span class="vis-badge idle">In elaborazione</span>
      </div>
      <div class="vis-row on">
        <span class="vis-label on">Reportistica operativa</span>
        <span class="vis-badge active">Attivo</span>
      </div>
      <div class="vis-ticker">
        <span>
          <span>↳ Report settimanale generato</span>
          <span>↳ 14 ordini processati oggi</span>
          <span>↳ Dashboard aggiornata alle 10:30</span>
          <span>↳ Analisi trend completata</span>
          <span>↳ Report settimanale generato</span>
        </span>
      </div>
      <div class="vis-row">
        <span class="vis-label">Automazione flussi interni</span>
        <span class="vis-badge idle">Configurabile</span>
      </div>
    </div>
  </div>
</section>
<section id="differenza">
  <p class="section-tag reveal">La differenza</p>
  <h2 class="section-headline reveal reveal-d1">La differenza non è nell'etichetta "AI".<br>È in quello che fa davvero.</h2>
  <p class="section-sub reveal reveal-d2">Uno strumento generico può rispondere. Un agente AI progettato per un'impresa lavora sul contesto, sui flussi e sugli obiettivi reali.</p>
  <div class="compare-table reveal reveal-d2">
    <div class="compare-header">
      <div></div>
      <div>AI generica</div>
      <div class="col-acc">Il tuo Agente AI</div>
    </div>
    <div class="compare-row">
      <div class="col-first">Punto di partenza</div>
      <div>Risponde quando le chiedi qualcosa</div>
      <div class="col-acc">Lavora sui processi della tua attività</div>
    </div>
    <div class="compare-row">
      <div class="col-first">Adattamento</div>
      <div>Strumento standard, ti adatti tu</div>
      <div class="col-acc">Costruito attorno alla tua realtà</div>
    </div>
    <div class="compare-row">
      <div class="col-first">Utilità quotidiana</div>
      <div>Compiti occasionali e generici</div>
      <div class="col-acc">Supporto operativo continuo</div>
    </div>
    <div class="compare-row">
      <div class="col-first">Contesto</div>
      <div>Nessuna memoria del tuo business</div>
      <div class="col-acc">Impara i tuoi flussi e le tue esigenze</div>
    </div>
    <div class="compare-row">
      <div class="col-first">Risultato</div>
      <div>Utile saltuariamente</div>
      <div class="col-acc">Un collaboratore sempre presente</div>
    </div>
  </div>
</section>
<section id="chi" class="alt">
  <p class="section-tag reveal">Per chi</p>
  <h2 class="section-headline reveal reveal-d1">Ogni attività ha flussi diversi.<br>Ma molte difficoltà sono sorprendentemente simili.</h2>
  <p class="section-sub reveal reveal-d2">FreyrtechnologyAI lavora con imprese locali e PMI che ogni giorno devono coordinare persone, clienti, richieste e informazioni.</p>
  <div class="biz-grid reveal reveal-d2">
    <span class="biz-pill">Hotel e strutture ricettive</span>
    <span class="biz-pill">Ristoranti e locali</span>
    <span class="biz-pill">Parrucchieri e barber shop</span>
    <span class="biz-pill">Centri estetici e wellness</span>
    <span class="biz-pill">Negozi e attività retail</span>
    <span class="biz-pill">Liberi professionisti</span>
    <span class="biz-pill">Attività con prenotazioni</span>
    <span class="biz-pill">Servizi delivery</span>
    <span class="biz-pill">Pizzerie</span>
    <span class="biz-pill">Business locali ad alta operatività</span>
  </div>
  <div class="section-cta reveal" style="margin-top:40px">
    <a href="/casi-studio" class="btn-ghost">Vedi un esempio concreto</a>
  </div>
</section>
`;

const markupPost = `
<section id="come" class="alt">
  <p class="section-tag reveal">Come lavoriamo</p>
  <h2 class="section-headline reveal reveal-d1">Non ti lasciamo da solo<br>davanti a uno strumento</h2>
  <p class="section-sub reveal reveal-d2">FreyrtechnologyAI accompagna l'azienda passo dopo passo, dalla comprensione del problema fino all'applicazione concreta.</p>
  <div class="steps-wrap">
    <div class="steps reveal reveal-d1">
      <div class="step">
        <div class="step-num">01</div>
        <h3>Ascoltiamo</h3>
        <p>Partiamo dalla realtà della tua attività. Come funziona oggi, dove si perde tempo, cosa non torna.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <h3>Analizziamo</h3>
        <p>Osserviamo i flussi e i punti critici. Capiamo dove un supporto AI può fare davvero la differenza.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <h3>Adattiamo</h3>
        <p>Costruiamo il collaboratore AI coerente con il tuo caso. Senza forzare strumenti inutili.</p>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <h3>Accompagniamo</h3>
        <p>Seguiamo l'implementazione. L'obiettivo è rendere il lavoro più semplice, non impressionare.</p>
      </div>
    </div>
    <div class="step-progress reveal reveal-d2"><div class="step-progress-fill" id="stepFill"></div></div>
  </div>
</section>
<section id="cta-finale">
  <p class="section-tag reveal" style="text-align:center">Prossimo passo</p>
  <h2 class="cta-headline reveal reveal-d1">Capire se può servirti<br>è più semplice di quanto pensi</h2>
  <p class="cta-sub reveal reveal-d2">Non serve partire da una soluzione. Basta partire da un problema reale.</p>
  <div class="cta-actions reveal reveal-d2">
    <a href="/contatti" class="btn-primary">Prenota una consulenza</a>
    <a href="/contatti" class="btn-ghost">Analizziamo il tuo caso</a>
  </div>
  <p class="cta-micro reveal reveal-d3">Nessun tecnicismo inutile. Partiamo da come lavori oggi.</p>
</section>
<footer>
  <span class="footer-logo"><img src="/logo/logo.png" alt="FreyrtechnologyAI"><span>Freyr<span class="brand-accent">technology</span>AI</span></span>
  <span class="footer-copy">© 2025 FreyrtechnologyAI. Agenti AI per PMI e imprese locali.</span>
</footer>
`;

// ---- canvas types ----
type Vec3 = { x: number; y: number; z: number };
type CanvasNode = {
  base: Vec3;
  label: string;
  opacity: number;
  scale: number;
  active: boolean;
  pulsePhase: number;
  hubDone: boolean;
};
type CanvasEdge = { to: number; progress: number; done: boolean };
type MeshEdge = { from: number; to: number; progress: number; done: boolean };
type Particle = { type: "hub" | "mesh"; idx: number; t: number; speed: number };

function initializeCanvas(
  canvas: HTMLCanvasElement,
  hero: HTMLElement | null,
  prefersReducedMotion: boolean,
): () => void {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};

  const slowMode = prefersReducedMotion;
  const ACC = "#4B6BFB";
  const LABELS = [
    "Analisi e lettura del dato",
    "Statistiche in tempo reale",
    "Analisi di mercato",
    "Dashboard intelligenti",
    "Sistema di prenotazioni",
    "Gestione del personale",
    "Gestione amministrativa",
    "Automatizzazione flussi",
    "Automatizzazione dei processi",
    "Reportistica e progetti",
  ];

  let W = 0, H = 0, CX = 0, CY = 0, RADIUS = 0;
  let isMobile = false, dpr = 1;
  let rotY = 0, rotX = 0.22;
  let startTime: number | null = null, lastTime = 0, lastRenderTime = 0;
  let cOp = 0, raf = 0;
  let heroVisible = true, pageVisible = !document.hidden;
  let frameInterval = slowMode ? 1000 / 24 : 1000 / 36;

  const T0 = 0, T1 = 600, TS = 80, TD = 400;
  const TM = 1200, TMD = 200, TMS = 60, FOV = 850;

  let nodes: CanvasNode[] = [];
  let hubEdges: CanvasEdge[] = [];
  let meshEdges: MeshEdge[] = [];
  let particles: Particle[] = [];

  const fibSphere = (n: number, r: number): Vec3[] => {
    const phi = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: n }, (_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const rr = Math.sqrt(Math.max(0, 1 - y * y));
      const th = phi * i;
      return { x: rr * Math.cos(th) * r, y: y * r * 0.68, z: rr * Math.sin(th) * r };
    });
  };

  const ry3 = (p: Vec3, a: number): Vec3 => {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
  };

  const rx3 = (p: Vec3, a: number): Vec3 => {
    const c = Math.cos(a), s = Math.sin(a);
    return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c };
  };

  const d3 = (a: Vec3, b: Vec3) =>
    Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);

  const hRgb = (h: string) => ({
    r: parseInt(h.slice(1, 3), 16),
    g: parseInt(h.slice(3, 5), 16),
    b: parseInt(h.slice(5, 7), 16),
  });

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const eOut = (t: number) => 1 - (1 - t) ** 3;

  const proj = (p: Vec3) => {
    const z = p.z + FOV;
    const s = FOV / Math.max(z, 1);
    return { x: CX + p.x * s, y: CY + p.y * s, z: p.z };
  };

  const buildScene = () => {
    const activeLabels = isMobile ? LABELS.slice(0, 6) : LABELS;
    const pos = fibSphere(activeLabels.length, RADIUS);
    nodes = activeLabels.map((label, i) => ({
      base: { ...pos[i] },
      label,
      opacity: 0,
      scale: 0,
      active: false,
      pulsePhase: Math.random() * Math.PI * 2,
      hubDone: false,
    }));
    hubEdges = nodes.map((_, i) => ({ to: i, progress: 0, done: false }));
    const used = new Set<string>();
    meshEdges = [];
    for (let i = 0; i < nodes.length; i++) {
      nodes
        .map((n, j) => ({ j, d: d3(nodes[i].base, n.base) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const k = [Math.min(i, j), Math.max(i, j)].join("-");
          if (!used.has(k)) {
            used.add(k);
            meshEdges.push({ from: i, to: j, progress: 0, done: false });
          }
        });
    }
    particles = [];
  };

  const resize = () => {
    const wasMobile = isMobile;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    isMobile = W < 640;
    frameInterval = slowMode ? 1000 / 24 : (isMobile ? 1000 / 24 : 1000 / 36);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    CX = W / 2;
    CY = H * (isMobile ? 0.47 : 0.42);
    RADIUS = Math.min(W, H) * (isMobile ? 0.26 : 0.5);
    if (wasMobile !== isMobile) buildScene();
  };

  const getRot = (n: CanvasNode) => rx3(ry3(n.base, rotY), rotX);

  const dLine = (
    x1: number, y1: number, x2: number, y2: number,
    pg: number, al: number, thin: boolean,
  ) => {
    if (pg <= 0 || al < 0.01) return;
    const ac = hRgb(ACC);
    const tx = x1 + (x2 - x1) * pg;
    const ty = y1 + (y2 - y1) * pg;
    ctx.save();
    if (!thin) {
      ctx.globalAlpha = al * 0.18;
      ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
    } else {
      ctx.globalAlpha = al * 0.14;
      ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
    }
    ctx.globalAlpha = al * (thin ? 0.22 : 0.4);
    ctx.strokeStyle = `rgb(${ac.r},${ac.g},${ac.b})`;
    ctx.lineWidth = thin ? 0.6 : 0.9;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(tx, ty); ctx.stroke();
    ctx.restore();
  };

  const dPt = (x: number, y: number, a: number, sz: number) => {
    const ac = hRgb(ACC);
    ctx.save();
    const g = ctx.createRadialGradient(x, y, 0, x, y, sz * 3.5);
    g.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${a * 0.65})`);
    g.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, sz * 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = a;
    ctx.fillStyle = `rgb(${Math.min(255, ac.r + 80)},${Math.min(255, ac.g + 80)},${Math.min(255, ac.b + 80)})`;
    ctx.beginPath(); ctx.arc(x, y, sz, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };

  const rrect = (x: number, y: number, w: number, h: number, r: number) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  };

  const dLabel = (
    x: number, y: number, text: string,
    alpha: number, scale: number, active: boolean,
  ) => {
    if (alpha < 0.02) return;
    const ac = hRgb(ACC);
    const fs = Math.max(isMobile ? 9 : 11, (isMobile ? 9 : 11) * scale);
    const px = 10 * scale, py = 4.5 * scale, br = 6 * scale;
    ctx.font = `400 ${fs}px Inter,sans-serif`;
    const disp = text.toUpperCase();
    const tw = ctx.measureText(disp).width;
    const w = tw + px * 2, h = fs + py * 2;
    const bx = x - w / 2, by = y - h / 2;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "rgba(13,15,20,0.88)";
    rrect(bx, by, w, h, br); ctx.fill();
    if (active) {
      ctx.shadowColor = `rgba(${ac.r},${ac.g},${ac.b},0.45)`;
      ctx.shadowBlur = 8;
    }
    ctx.strokeStyle = active
      ? `rgba(${ac.r},${ac.g},${ac.b},0.9)`
      : `rgba(${ac.r},${ac.g},${ac.b},0.3)`;
    ctx.lineWidth = active ? 1.2 : 0.8;
    rrect(bx, by, w, h, br); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = active ? "#FFFFFF" : "rgba(244,243,238,0.85)";
    ctx.font = `400 ${fs}px Inter,sans-serif`;
    ctx.textBaseline = "middle"; ctx.textAlign = "center";
    ctx.fillText(disp, x, y);
    ctx.restore();
  };

  const dCenter = (alpha: number, t: number) => {
    if (alpha < 0.01) return;
    const ac = hRgb(ACC);
    const pulse = 0.92 + 0.08 * Math.sin(t * 0.0014);
    ctx.save();
    const hR = (isMobile ? 58 : 92) * pulse;
    const halo = ctx.createRadialGradient(CX, CY, 8, CX, CY, hR);
    halo.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${0.12 * alpha})`);
    halo.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(CX, CY, hR, 0, Math.PI * 2); ctx.fill();
    const dR = 4.2 * pulse;
    const dG = ctx.createRadialGradient(CX, CY, 0, CX, CY, dR * 5);
    dG.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${0.55 * alpha})`);
    dG.addColorStop(1, `rgba(${ac.r},${ac.g},${ac.b},0)`);
    ctx.fillStyle = dG;
    ctx.beginPath(); ctx.arc(CX, CY, dR * 5, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath(); ctx.arc(CX, CY, dR, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  };

  const spawnHub = (i: number) => {
    for (let k = 0; k < 2; k++)
      particles.push({ type: "hub", idx: i, t: k / 2, speed: 0.00032 + Math.random() * 0.00022 });
  };

  const spawnMesh = (i: number) => {
    particles.push({
      type: "mesh", idx: i, t: Math.random(),
      speed: (0.00015 + Math.random() * 0.0001) * (Math.random() > 0.5 ? 1 : -1),
    });
  };

  const updPart = (dt: number) => {
    for (const p of particles) p.t = ((p.t + p.speed * dt) % 1 + 1) % 1;
  };

  const draw = (now: number) => {
    raf = requestAnimationFrame(draw);
    if (!heroVisible || !pageVisible) return;
    if (!startTime) startTime = now;
    if (lastRenderTime && now - lastRenderTime < frameInterval) return;
    lastRenderTime = now;
    const el = now - startTime;
    const dt = Math.min(now - lastTime, 50);
    lastTime = now;
    rotY += (2 * Math.PI / (20 * 1000)) * dt;
    rotX = 0.18 + 0.08 * Math.sin(el * 0.0002);
    ctx.clearRect(0, 0, W, H);

    if (el >= T0) cOp = eOut(Math.min(1, (el - T0) / (T1 - T0)));
    dCenter(cOp, el);

    hubEdges.forEach((edge, i) => {
      const st = T1 + i * TS;
      if (el < st) return;
      const pg = eOut(Math.min(1, (el - st) / TD));
      edge.progress = pg;
      if (pg >= 1 && !edge.done) {
        edge.done = true;
        nodes[i].hubDone = true;
        spawnHub(i);
      }
      nodes[i].opacity = Math.min(1, pg * 1.6);
      nodes[i].scale = nodes[i].hubDone ? 1 : pg;
      nodes[i].active = nodes[i].hubDone && el - (st + TD) < 700;
      const rp = getRot(nodes[i]);
      const pr = proj(rp);
      const dep = Math.max(0.38, Math.min(1.16, (rp.z + RADIUS) / (RADIUS * 2)));
      dLine(CX, CY, pr.x, pr.y, pg, 0.55 * dep, false);
    });

    meshEdges.forEach((edge, i) => {
      const st = TM + i * TMS;
      if (el < st) return;
      edge.progress = eOut(Math.min(1, (el - st) / TMD));
      if (edge.progress >= 1 && !edge.done) {
        edge.done = true;
        spawnMesh(i);
      }
      const pA = proj(getRot(nodes[edge.from]));
      const pB = proj(getRot(nodes[edge.to]));
      const rA = getRot(nodes[edge.from]);
      const rB = getRot(nodes[edge.to]);
      const dep = Math.max(0.3, Math.min(1, ((rA.z + rB.z) * 0.5 + RADIUS) / (RADIUS * 2)));
      dLine(pA.x, pA.y, pB.x, pB.y, edge.progress, 0.55 * dep, true);
    });

    updPart(dt);

    for (const p of particles) {
      if (p.type === "hub") {
        if (!hubEdges[p.idx]?.done) continue;
        const rp = getRot(nodes[p.idx]);
        const pr = proj(rp);
        const dep = Math.max(0.38, Math.min(1.16, (rp.z + RADIUS) / (RADIUS * 2)));
        dPt(lerp(CX, pr.x, p.t), lerp(CY, pr.y, p.t), dep * 0.9, 2.4 * dep);
      } else {
        const edge = meshEdges[p.idx];
        if (!edge?.done) continue;
        const pA = proj(getRot(nodes[edge.from]));
        const pB = proj(getRot(nodes[edge.to]));
        const rA = getRot(nodes[edge.from]);
        const rB = getRot(nodes[edge.to]);
        const dep = Math.max(0.24, Math.min(0.84, (rA.z + rB.z) * 0.5 / RADIUS + 0.6));
        dPt(lerp(pA.x, pB.x, p.t), lerp(pA.y, pB.y, p.t), dep * 0.45, 1.4 * dep);
      }
    }

    nodes
      .map((n) => { const rp = getRot(n); const pr = proj(rp); return { n, rp, pr }; })
      .sort((a, b) => a.rp.z - b.rp.z)
      .forEach(({ n, rp, pr }) => {
        if (n.opacity < 0.01) return;
        const dep = Math.max(0.42, Math.min(1.08, (rp.z + RADIUS) / (RADIUS * 2)));
        const pulse = 1 + 0.024 * Math.sin(el * 0.0014 + n.pulsePhase);
        dLabel(pr.x, pr.y, n.label, n.opacity * Math.max(0.42, dep), n.scale * dep * pulse, n.active);
      });
  };

  const visibilityObserver = new IntersectionObserver(
    (entries) => { heroVisible = Boolean(entries[0]?.isIntersecting); },
    { threshold: 0.05 },
  );

  const onVisibilityChange = () => { pageVisible = !document.hidden; };

  let lastRoWidth = 0;
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const w = entry.contentRect.width;
      if (Math.abs(w - lastRoWidth) < 10) return;
      lastRoWidth = w;
      resize();
    }
  });
  resizeObserver.observe(canvas.parentElement || canvas);
  document.addEventListener("visibilitychange", onVisibilityChange);
  if (hero) visibilityObserver.observe(hero);

  const onMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    rotY += ((e.clientX - rect.left) / rect.width - 0.5) * 0.004;
  };
  const onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    rotY += ((touch.clientX - rect.left) / rect.width - 0.5) * 0.004;
  };
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("touchmove", onTouchMove, { passive: false });

  const initCanvas = () => {
    if (canvas.offsetWidth === 0) {
      requestAnimationFrame(initCanvas);
      return;
    }
    resize();
    buildScene();
    raf = requestAnimationFrame(draw);
  };
  requestAnimationFrame(initCanvas);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibilityChange);
    visibilityObserver.disconnect();
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("touchmove", onTouchMove);
  };
}

export default function ImportedHomepage() {
  const [instanceKey, setInstanceKey] = useState(0);

  useEffect(() => {
    const handlePageShow = () => setInstanceKey((key) => key + 1);
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nav = document.getElementById("nav");
    const hero = document.getElementById("hero");

    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // track all pending retry intervals for cleanup
    const pendingIntervals: ReturnType<typeof setInterval>[] = [];

    // chaosVis: populate with animated messages
    const setupChaosVis = (el: HTMLElement) => {
      const msgs = [
        { text: 'WhatsApp: "Posso prenotare per domani?"', color: "#25D366", delay: 0, top: "12%", left: "5%" },
        { text: 'Email: "Richiesta informazioni prezzi"', color: "#4B6BFB", delay: 1.2, top: "22%", left: "60%" },
        { text: "Tel: Cliente in attesa #3", color: "#FB923C", delay: 2.4, top: "60%", left: "8%" },
        { text: 'Instagram DM: "Siete aperti domenica?"', color: "#E1306C", delay: 0.6, top: "72%", left: "55%" },
        { text: "Form web: Prenotazione ricevuta", color: "#4B6BFB", delay: 1.8, top: "40%", left: "62%" },
        { text: "Google: Nuova recensione", color: "#FBBC04", delay: 3.0, top: "82%", left: "15%" },
      ];
      msgs.forEach((m) => {
        const msgEl = document.createElement("div");
        msgEl.className = "chaos-msg";
        msgEl.style.cssText = `top:${m.top};left:${m.left};animation-delay:${m.delay}s;max-width:180px`;
        msgEl.innerHTML = `<span class="ch" style="background:${m.color}"></span>${m.text}`;
        el.appendChild(msgEl);
        const line = document.createElement("div");
        line.className = "connector-line";
        line.style.cssText = `background:linear-gradient(90deg,rgba(75,107,251,0.0),rgba(75,107,251,0.25),rgba(75,107,251,0.0));animation-delay:${m.delay + 0.3}s`;
        el.appendChild(line);
      });
    };

    const chaosVisEl = document.getElementById("chaosVis");
    if (!chaosVisEl) {
      let attempts = 0;
      const iv = setInterval(() => {
        const found = document.getElementById("chaosVis");
        attempts++;
        if (found || attempts > 20) { clearInterval(iv); if (found) setupChaosVis(found); }
      }, 100);
      pendingIntervals.push(iv);
    } else {
      setupChaosVis(chaosVisEl);
    }

    // vis-ticker: smooth fade rotation
    document.querySelectorAll<HTMLElement>('.vis-ticker').forEach((ticker) => {
      const outer = ticker.querySelector<HTMLElement>(':scope > span');
      if (!outer) return;
      const msgs = Array.from(outer.querySelectorAll<HTMLElement>(':scope > span'))
        .map(s => s.textContent ?? '').filter(Boolean);
      if (!msgs.length) return;
      outer.textContent = msgs[0];
      outer.style.opacity = '1';
      outer.style.transform = 'translateY(0)';
      let idx = 0;
      const iv = setInterval(() => {
        outer.style.opacity = '0';
        outer.style.transform = 'translateY(-5px)';
        setTimeout(() => {
          idx = (idx + 1) % msgs.length;
          outer.textContent = msgs[idx];
          outer.style.opacity = '1';
          outer.style.transform = 'translateY(0)';
        }, 320);
      }, 2800);
      pendingIntervals.push(iv);
    });

    // reveal observer
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    if (prefersReducedMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    }

    // step progress observer
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => { document.getElementById("stepFill")?.classList.add("loaded"); }, 300);
          stepObserver.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" },
    );

    const stepFillEl = document.getElementById("stepFill");
    if (!stepFillEl) {
      let attempts = 0;
      const iv = setInterval(() => {
        const found = document.getElementById("stepFill");
        attempts++;
        if (found || attempts > 20) {
          clearInterval(iv);
          if (found) {
            const section = found.closest("section");
            if (section) stepObserver.observe(section);
          }
        }
      }, 100);
      pendingIntervals.push(iv);
    } else {
      const stepSection = stepFillEl.closest("section");
      if (stepSection) stepObserver.observe(stepSection);
    }

    // Mobile Safari fallback: force all animations if observers haven't fired after 2.5s
    const animFallbackTimer = setTimeout(() => {
document.querySelectorAll(".reveal:not(.visible)").forEach((el) => el.classList.add("visible"));
      document.querySelectorAll(".step-progress-fill:not(.loaded)").forEach((el) => el.classList.add("loaded"));
    }, 2500);

    // canvas with retry
    let cleanupCanvas: (() => void) | undefined;

    let canvasEl = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
    if (!canvasEl) {
      let attempts = 0;
      const iv = setInterval(() => {
        canvasEl = document.getElementById("hero-canvas") as HTMLCanvasElement | null;
        attempts++;
        if (canvasEl || attempts > 20) {
          clearInterval(iv);
          if (canvasEl) cleanupCanvas = initializeCanvas(canvasEl, hero, prefersReducedMotion);
        }
      }, 100);
      pendingIntervals.push(iv);
    } else {
      cleanupCanvas = initializeCanvas(canvasEl, hero, prefersReducedMotion);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
      stepObserver.disconnect();
      clearTimeout(animFallbackTimer);
      pendingIntervals.forEach(clearInterval);
      cleanupCanvas?.();
    };
  }, [instanceKey]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div key={instanceKey} dangerouslySetInnerHTML={{ __html: markupPre }} />
      <NewsletterSection />
      <div dangerouslySetInnerHTML={{ __html: markupPost }} />
    </>
  );
}
