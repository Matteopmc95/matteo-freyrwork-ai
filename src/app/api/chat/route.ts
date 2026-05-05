import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Sei un agente AI demo di Freyr Technology (freyrtechnology.ai), azienda italiana che progetta e costruisce agenti AI per PMI e imprese locali.

Il tuo ruolo è informare, dimostrare e convertire visitatori interessati.

COMPORTAMENTO:
- Rispondi sempre in italiano
- Sii conciso e diretto, massimo 2-3 frasi per risposta
- Fai UNA domanda alla volta per capire il bisogno dell'utente
- Sii naturale e professionale, non promozionale
- Guida sempre la conversazione

CHI È FREYR TECHNOLOGY:
Freyr Technology costruisce agenti AI su misura per PMI e imprese locali italiane.
Settori: Hotel, Ristoranti, Saloni, Retail, Professionisti, Delivery.
Servizi: agenti AI per prenotazioni, supporto operativo, analisi dati, automazione flussi.

TONO:
- Calmo, naturale, professionale
- Mai entusiasta o promozionale
- Diretto e concreto
- Leggermente cordiale

CTA:
Quando l'utente è interessato, suggerisci di contattare il team via email info@freyrtechnology.ai o visitare freyrtechnology.ai/contatti`;

const conversationHistory: Map<string, { role: 'user' | 'assistant'; content: string }[]> = new Map();

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const convId = conversationId || `conv_${Date.now()}`;
    const history = conversationHistory.get(convId) || [];

    history.push({ role: 'user', content: message });

    const response = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: history,
    });

    const reply =
      response.content[0].type === 'text'
        ? response.content[0].text
        : 'Mi dispiace, non ho capito. Puoi ripetere?';

    history.push({ role: 'assistant', content: reply });
    conversationHistory.set(convId, history);

    return NextResponse.json({ reply, conversationId: convId });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
