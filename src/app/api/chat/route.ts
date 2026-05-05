import { NextRequest, NextResponse } from 'next/server';
import WebSocket from 'ws';

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

    const reply = await new Promise<string>((resolve, reject) => {
      const wsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${AGENT_ID}`;
      const ws = new WebSocket(wsUrl, {
        headers: { 'xi-api-key': apiKey },
      });

      let agentResponse = '';
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error('Timeout'));
      }, 15000);

      ws.on('open', () => {
        ws.send(JSON.stringify({
          type: 'conversation_initiation_client_data',
          conversation_config_override: {
            conversation: { text_only: true },
          },
          ...(conversationId ? { conversation_id: conversationId } : {}),
        }));
      });

      ws.on('message', (data: Buffer) => {
        try {
          const msg = JSON.parse(data.toString());
          console.log('ElevenLabs WS event type:', msg.type, 'full:', JSON.stringify(msg).slice(0, 300));

          if (msg.type === 'conversation_initiation_metadata') {
            ws.send(JSON.stringify({
              user_message: message,
            }));
            console.log('Sent user message:', message);
          }

          if (msg.type === 'agent_response' && msg.agent_response_event?.agent_response) {
            agentResponse = msg.agent_response_event.agent_response;
            console.log('Got agent response:', agentResponse);
          }

          if (msg.type === 'agent_response_correction' && msg.agent_response_correction_event?.corrected_agent_response) {
            agentResponse = msg.agent_response_correction_event.corrected_agent_response;
          }

          if (msg.type === 'agent_response' || msg.type === 'turn_end' || msg.type === 'agent_turn_end') {
            if (agentResponse) {
              clearTimeout(timeout);
              ws.close();
              resolve(agentResponse);
            }
          }
        } catch (e) {
          console.error('WS parse error:', e);
        }
      });

      ws.on('error', (err) => {
        clearTimeout(timeout);
        console.error('WebSocket error:', err);
        reject(err);
      });

      ws.on('close', () => {
        clearTimeout(timeout);
        if (agentResponse) resolve(agentResponse);
      });
    });

    return NextResponse.json({ reply, conversationId });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      reply: 'Mi dispiace, si è verificato un errore. Riprova tra un momento.',
    }, { status: 500 });
  }
}
