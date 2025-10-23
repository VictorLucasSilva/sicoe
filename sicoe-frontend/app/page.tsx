// app/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Health = { status: string };

async function getHealth(base?: string): Promise<{ status: string; raw: unknown }> {
  // Use o APP_ORIGIN quando estiver em container; em dev local também funciona.
  const origin = base || process.env.APP_ORIGIN || 'http://localhost:3000';
  const res = await fetch(`${origin}/api/health`, { cache: 'no-store' });
  const data = (await res.json()) as Health;
  return { status: data?.status ?? 'offline', raw: data };
}

export default async function Home() {
  const { status, raw } = await getHealth();

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, Arial, sans-serif' }}>
      <h1>SICOE — Frontend ↔ Backend</h1>
      <p><strong>Status do backend:</strong> {status}</p>
      <pre style={{ background: '#f6f6f6', padding: 12, borderRadius: 8 }}>
        {JSON.stringify(raw, null, 2)}
      </pre>
      <hr style={{ margin: '16px 0' }} />
      <p><strong>Base URL (server):</strong> {process.env.BACKEND_INTERNAL_URL || 'http://backend:3001'}</p>
      <p><strong>Base URL (browser):</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001'}</p>
    </main>
  );
}
