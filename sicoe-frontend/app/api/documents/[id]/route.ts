import { NextRequest, NextResponse } from 'next/server';
const base = process.env.BACKEND_INTERNAL_URL || 'http://backend:3001';

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const r = await fetch(`${base}/documents/${id}`, { cache: 'no-store' });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const r = await fetch(`${base}/documents/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json();
  return NextResponse.json(data, { status: r.status });
}

export async function DELETE(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const r = await fetch(`${base}/documents/${id}`, { method: 'DELETE' });
  let data: unknown = {};
  try { data = await r.json(); } catch {}
  return NextResponse.json(data, { status: r.status });
}
