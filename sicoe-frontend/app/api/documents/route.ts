import { NextRequest, NextResponse } from 'next/server';

const base = process.env.BACKEND_INTERNAL_URL || 'http://backend:3001';

export async function GET() {
  const r = await fetch(`${base}/documents`, { cache: 'no-store' });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const r = await fetch(`${base}/documents`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  let data: unknown = {};
  try { data = await r.json(); } catch {}
  return NextResponse.json(data, { status: r.status });
}
