'use client';

import { useEffect, useRef } from 'react';

const AGENT_ID = 'agent_6601kqbzq5hcf0m9j3qrkv944ypv';

export default function ChatbotEmbed() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carica lo script ElevenLabs
    if (!document.querySelector('script[src*="elevenlabs"]')) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }

    // Inietta il custom element nel contenitore
    const container = widgetRef.current;
    if (container && !container.querySelector('elevenlabs-convai')) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', AGENT_ID);
      widget.style.cssText = 'width:100%;height:100%;min-height:500px;display:block;';
      container.appendChild(widget);
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 760,
        margin: '0 auto',
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.07)',
        background: '#0f1117',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: '#0f1117',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: 9,
              background: 'rgba(75,107,251,0.15)',
              border: '1px solid rgba(75,107,251,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#7B94FC', fontWeight: 700, fontSize: 14,
            }}
          >
            AI
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#F4F3EE' }}>Agente AI — demo</div>
            <div style={{ fontSize: 12, color: '#4ade80', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#4ade80', display: 'inline-block',
                }}
              />
              Operativo
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: 11, letterSpacing: '0.1em',
            color: 'rgba(244,243,238,0.35)', textTransform: 'uppercase',
          }}
        >
          Dimostrazione live
        </div>
      </div>

      {/* Widget ElevenLabs — iniettato via useEffect per evitare conflitti TypeScript con custom elements */}
      <div
        ref={widgetRef}
        style={{
          flex: 1,
          minHeight: 500,
          background: '#F4F3EE',
          position: 'relative',
        }}
      />
    </div>
  );
}
