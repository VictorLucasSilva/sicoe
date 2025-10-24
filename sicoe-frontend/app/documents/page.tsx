import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Doc = { id: string; name: string; createdAt: string; updatedAt: string };

export default async function DocumentsPage() {
  const r = await fetch('http://localhost:3000/api/documents', { cache: 'no-store' });
  const docs = (await r.json()) as Doc[];

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui, Arial, sans-serif' }}>
      <h1>Documentos</h1>
      <p><Link href="/documents/new">+ Novo documento</Link></p>
      {docs.length === 0 ? (
        <p>Nenhum documento ainda.</p>
      ) : (
        <ul>
          {docs.map(d => (
            <li key={d.id}>
              <Link href={`/documents/${d.id}`}>{d.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
