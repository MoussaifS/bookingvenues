import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { eventId, name, email, message } = payload || {};

    if (!eventId || !name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields.' }, { status: 400 });
    }

    console.log('[event-contact] Message received', { eventId, name, email, messageSnippet: (message as string).slice(0,120) });
    await new Promise(r => setTimeout(r, 200));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[event-contact] Error', err);
    return NextResponse.json({ success: false, message: 'Internal error' }, { status: 500 });
  }
}
