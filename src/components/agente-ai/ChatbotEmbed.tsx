'use client';

import { useEffect, useRef, useState } from 'react';

/*
  ChatbotEmbed — chat UI integrata nella pagina per far provare al cliente
  direttamente l'agente AI. Usa la Claude helper (window.claude.complete) già
  disponibile nel progetto. Nessuna dipendenza esterna. Stile allineato ai
  tokens Freyrwork (bg2, acc, muted, border).
*/

const C = {
  bg: '#0D0F14',
  bg2: '#0f1117',
  acc: '#4B6BFB',
  acc2: '#7B94FC',
  txt: '#F4F3EE',
  muted: 'rgba(244,243,238,0.45)',
  border: 'rgba(255,255,255,0.07)',
};

type Msg = { role: 'user' | 'assistant'; text: string };

const SYSTEM = `Sei un agente AI dimostrativo di Freyrwork, una software house che progetta collaboratori AI per PMI e attività locali in Italia (hotel, ristoranti, parrucchieri, negozi, professionisti, pizzerie, delivery, centri estetici).

Tono: chiaro, concreto, rassicurante. Professionale ma non freddo. Niente tecnicismi. Nessuna emoji. Frasi brevi, paragrafi respirati.

Il tuo ruolo è mostrare come un agente AI può aiutare un'attività:
- capire il problema dell'imprenditore
- spiegare cosa un agente AI potrebbe fare nel suo caso specifico
- rispondere con esempi pratici (gestione richieste, prenotazioni, analisi dati, automazione flussi interni)
- non inventare prezzi, tempistiche precise o promesse tecniche
- al massimo 4 frasi per risposta, una riga vuota tra paragrafi

Se l'utente è generico, fai 1 domanda per capire il settore. Se ti chiede il costo, invita a prenotare una consulenza gratuita.`;

const SUGGESTIONS = [
  'Ho un ristorante, come mi può aiutare?',
  "Che differenza c'è con ChatGPT?",
  'Gestisco un hotel, cosa può automatizzare?',
  'Quanto tempo serve per partire?',
];

export default function ChatbotEmbed() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'assistant',
      text: "Ciao. Sono un agente AI dimostrativo di Freyrwork. Raccontami com'è fatta la tua attività o chiedimi qualcosa di concreto — provo a mostrarti come un collaboratore AI potrebbe lavorare nel tuo caso.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  async function send(text: string) {
    const clean = text.trim();
    if (!clean || loading) return;
    setInput('');
    const next: Msg[] = [...messages, { role: 'user', text: clean }];
    setMessages(next);
    setLoading(true);

    try {
      const history = next.map((m) => `${m.role === 'user' ? 'Utente' : 'Agente'}: ${m.text}`).join('\n\n');
      const prompt = `${SYSTEM}\n\n--- Conversazione ---\n${history}\n\nAgente:`;
      // @ts-expect-error — window.claude is injected at runtime
      const reply = await window.claude?.complete(prompt);
      const cleaned = (reply || 'Scusa, non riesco a rispondere in questo momento. Riprova tra poco.').toString().trim();
      setMessages((m) => [...m, { role: 'assistant', text: cleaned }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          text: 'Ho un problema momentaneo nel rispondere. Riprova tra poco, oppure scrivici direttamente per una demo guidata.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        height: 640,
        background: 'linear-gradient(180deg, rgba(75,107,251,0.04), rgba(13,15,20,0) 60%), rgba(15,17,23,0.92)',
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes chatFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes typing {
          0% { opacity: 0.2; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-2px); }
          60% { opacity: 0.2; transform: translateY(0); }
          100% { opacity: 0.2; transform: translateY(0); }
        }
        .chat-msg { animation: chatFadeIn 0.35s ease both; }
        .typing-dot { width: 5px; height: 5px; border-radius: 50%; background: ${C.acc2}; display: inline-block; margin-right: 4px; animation: typing 1.2s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.15s; }
        .typing-dot:nth-child(3) { animation-delay: 0.3s; }
      `}</style>

      {/* Header */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(13,15,20,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'rgba(75,107,251,0.12)',
              border: '1px solid rgba(75,107,251,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              fontFamily: 'Syne, sans-serif',
              color: C.acc2,
              letterSpacing: '-0.02em',
            }}
          >
            AI
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <strong style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>Agente AI — demo</strong>
            <span style={{ fontSize: 11, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#4ade80',
                  animation: 'typing 1.8s ease-in-out infinite',
                }}
              />
              Operativo
            </span>
          </div>
        </div>
        <span
          style={{
            fontSize: 10,
            color: C.muted,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Dimostrazione live
        </span>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        style={{
          overflowY: 'auto',
          padding: '20px 20px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        {messages.map((m, i) => (
          <div
            key={i}
            className="chat-msg"
            style={{
              alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '82%',
              padding: '11px 14px',
              borderRadius: m.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
              background: m.role === 'user' ? 'rgba(75,107,251,0.14)' : 'rgba(13,15,20,0.7)',
              border: `1px solid ${m.role === 'user' ? 'rgba(75,107,251,0.3)' : C.border}`,
              fontSize: 13,
              lineHeight: 1.65,
              color: m.role === 'user' ? '#E4EBFF' : 'rgba(244,243,238,0.88)',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div
            className="chat-msg"
            style={{
              alignSelf: 'flex-start',
              padding: '12px 14px',
              borderRadius: '12px 12px 12px 4px',
              background: 'rgba(13,15,20,0.7)',
              border: `1px solid ${C.border}`,
            }}
          >
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        )}

        {messages.length === 1 && !loading && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  fontSize: 12,
                  color: C.acc2,
                  padding: '8px 14px',
                  borderRadius: 999,
                  background: 'rgba(75,107,251,0.07)',
                  border: '1px solid rgba(75,107,251,0.25)',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(75,107,251,0.14)';
                  e.currentTarget.style.borderColor = 'rgba(75,107,251,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(75,107,251,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(75,107,251,0.25)';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        style={{
          padding: 14,
          borderTop: `1px solid ${C.border}`,
          display: 'flex',
          gap: 10,
          alignItems: 'flex-end',
          background: 'rgba(13,15,20,0.6)',
        }}
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(input);
            }
          }}
          placeholder="Scrivi la tua domanda…"
          rows={1}
          style={{
            flex: 1,
            resize: 'none',
            minHeight: 42,
            maxHeight: 120,
            padding: '11px 14px',
            borderRadius: 10,
            border: `1px solid ${C.border}`,
            background: 'rgba(13,15,20,0.7)',
            color: C.txt,
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            lineHeight: 1.5,
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(75,107,251,0.45)'; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: '#fff',
            padding: '11px 20px',
            borderRadius: 10,
            background: loading || !input.trim() ? 'rgba(75,107,251,0.4)' : C.acc,
            border: `1px solid ${loading || !input.trim() ? 'rgba(75,107,251,0.4)' : C.acc}`,
            cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
            fontFamily: 'Inter, sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          Invia
        </button>
      </form>
    </div>
  );
}
