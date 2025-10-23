export const dynamic = 'force-dynamic';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/health', { cache: 'no-store' });
  const ok = res.ok;
  let body: unknown = null;
  try { body = await res.json(); } catch {}

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, Arial, sans-serif' }}>
      <h1 style={{ marginBottom: 12 }}>SICOE — Frontend ↔ Backend</h1>
      <p><strong>Status do backend:</strong> {ok ? 'ok' : 'offline'}</p>
      <pre style={{ background: '#f6f6f6', padding: 12, borderRadius: 8 }}>
{JSON.stringify(body, null, 2)}
      </pre>
      <hr style={{ margin: '16px 0' }} />
      <p><strong>Base URL (server):</strong> {process.env.BACKEND_INTERNAL_URL || 'http://backend:3001'}</p>
      <p><strong>Base URL (browser):</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}</p>
    </main>
  );
}
