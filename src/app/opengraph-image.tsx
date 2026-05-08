import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FreyrtechnologyAI — Agenti AI su misura per PMI italiane';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0D0F14 0%, #13151c 100%)',
          padding: 80,
          position: 'relative',
        }}
      >
        {/* Glow accent top-right */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(75,107,251,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />
        {/* Glow accent bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(123,148,252,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo / brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 60,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: 'linear-gradient(140deg, rgba(123,148,252,0.4), rgba(75,107,251,0.15))',
              border: '1px solid rgba(75,107,251,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            F
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#F4F3EE',
              display: 'flex',
              gap: 4,
            }}
          >
            <span>Freyr</span>
            <span style={{ color: '#7B94FC' }}>technology</span>
            <span>AI</span>
          </div>
        </div>

        {/* Main title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: '#F4F3EE',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
            marginBottom: 30,
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Agenti AI su misura</span>
          <span style={{ color: '#7B94FC', fontWeight: 300 }}>per PMI italiane</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(244,243,238,0.65)',
            fontWeight: 300,
            lineHeight: 1.4,
            maxWidth: 900,
            zIndex: 1,
            display: 'flex',
          }}
        >
          Hotel · Ristoranti · Saloni · Retail · Professionisti
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            fontSize: 22,
            color: 'rgba(244,243,238,0.45)',
            fontWeight: 400,
            letterSpacing: '0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#4ade80',
              display: 'flex',
            }}
          />
          freyrtechnology.ai
        </div>
      </div>
    ),
    { ...size }
  );
}
