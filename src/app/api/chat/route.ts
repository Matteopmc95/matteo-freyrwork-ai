import { NextRequest, NextResponse } from 'next/server';

const AGENT_ID = 'agent_6601kqbzq5hcf0m9j3qrkv944ypv';

export async function POST(req: NextRequest) {
  try {
    const { message, conversationId } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Step 1 — crea o riusa una conversazione
    let convId = conversationId;
    if (!convId) {
      const createResponse = await fetch(
        'https://api.elevenlabs.io/v1/convai/conversations',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
          },
          body: JSON.stringify({ agent_id: AGENT_ID }),
        }
      );
      console.log('Create conversation status:', createResponse.status);
      const createData = await createResponse.json();
      console.log('Create conversation response:', JSON.stringify(createData));
      convId = createData.conversation_id ?? null;
    }

    // Step 2 — invia il messaggio
    const msgResponse = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${convId}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({ text: message }),
      }
    );
    console.log('Send message status:', msgResponse.status);
    const msgData = await msgResponse.json();
    console.log('Send message response:', JSON.stringify(msgData));

    if (!msgResponse.ok) {
      console.error('ElevenLabs message error:', msgResponse.status, JSON.stringify(msgData));
      return NextResponse.json({ error: 'AI service error' }, { status: 500 });
    }

    return NextResponse.json({
      reply: msgData.text ?? msgData.answer ?? msgData.response ?? msgData.agent_response ?? JSON.stringify(msgData),
      conversationId: convId,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
