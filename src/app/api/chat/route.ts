import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'https://n8n-ai-agent-automations.mioservermt5.win/webhook/freyr-demo-chat';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const params = new URLSearchParams({
      message,
      conversationId: conversationId || `conv_${Date.now()}`,
    });

    const response = await fetch(`${N8N_WEBHOOK_URL}?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('n8n webhook error:', response.status, await response.text());
      return NextResponse.json({
        reply: 'Mi dispiace, si è verificato un errore. Riprova tra un momento.',
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('n8n response:', JSON.stringify(data));

    const reply = data.reply || data.response || data.text || data.message || data.output || 'Risposta non disponibile';
    const newConversationId = data.conversationId || conversationId;

    return NextResponse.json({
      reply,
      conversationId: newConversationId,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      reply: 'Errore di connessione. Riprova tra un momento.',
    }, { status: 500 });
  }
}
