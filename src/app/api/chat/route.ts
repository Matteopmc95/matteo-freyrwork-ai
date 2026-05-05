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

    const response = await fetch(
      'https://api.elevenlabs.io/v1/convai/conversation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          agent_id: AGENT_ID,
          user_message: message,
          ...(conversationId ? { conversation_id: conversationId } : {}),
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error('ElevenLabs error:', response.status, errText);
      return NextResponse.json({ error: 'AI service error' }, { status: 500 });
    }

    const data = await response.json();
    console.log('ElevenLabs response:', JSON.stringify(data));

    return NextResponse.json({
      reply: data.answer ?? data.text ?? data.response ?? data.agent_response ?? data.message ?? JSON.stringify(data),
      conversationId: data.conversation_id ?? conversationId ?? null,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
