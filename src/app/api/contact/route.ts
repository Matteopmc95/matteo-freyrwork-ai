import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key non configurata' }, { status: 500 });
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        sender: {
          name: 'Sito FreyrtechnologyAI',
          email: 'info@freyrtechnology.it',
        },
        to: [
          {
            email: 'info@freyrtechnology.it',
            name: 'Freyr Technology',
          },
        ],
        replyTo: {
          email,
          name,
        },
        subject: `Nuovo contatto dal sito — ${name}${company ? ` (${company})` : ''}`,
        htmlContent: `
          <h2>Nuovo messaggio dal form contatti</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Telefono:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Azienda:</strong> ${company}</p>` : ''}
          <p><strong>Messaggio:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px; background: #f5f5f5; border-radius: 8px;">${message}</p>
          <hr>
          <p style="color: #888; font-size: 12px;">Inviato dal form contatti di freyrtechnology.ai</p>
        `,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo email error:', response.status, error);
      return NextResponse.json({ error: "Errore durante l'invio del messaggio" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}
