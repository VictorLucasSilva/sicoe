import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.BACKEND_INTERNAL_URL ?? 'http://backend:3001';
  try {
    const { data, status } = await axios.get(`${base}/health`, {
      timeout: 2000,
      headers: { 'Cache-Control': 'no-cache' },
    });
    return NextResponse.json(data, { status });
  } catch (e: unknown) {
    return NextResponse.json({ status: 'offline' }, { status: 503 });
  }
}
