import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const base = process.env.BACKEND_INTERNAL_URL || 'http://backend:3001';
  try {
    const r = await fetch(`${base}/health`, { cache: 'no-store' });
    const data = await r.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ status: 'offline' }, { status: 503 });
  }
}
