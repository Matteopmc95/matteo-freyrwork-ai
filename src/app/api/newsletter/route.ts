import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, firstName, lastName, company, phone } = await req.json();

    if (!email || !firstName || !lastName || !company) {
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

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: firstName,
          LASTNAME: lastName,
          COMPANY: company,
          ...(phone ? { SMS: phone } : {}),
        },
        listIds: [3],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo error:', response.status, error);

      if (response.status === 400 && error.includes('duplicate')) {
        return NextResponse.json({ success: true, message: 'Già iscritto' });
      }

      return NextResponse.json({ error: "Errore durante l'iscrizione" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Errore del server' }, { status: 500 });
  }
}
