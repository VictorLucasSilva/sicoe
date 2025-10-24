import EditForm from './EditForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Doc = { id: string; name: string; createdAt: string; updatedAt: string };

export default async function DocumentEditPage({ params }: { params: { id: string } }) {
  const r = await fetch(`http://localhost:3000/api/documents/${params.id}`, { cache: 'no-store' });
  if (!r.ok) {
    return (
      <main style={{ padding: 24 }}>
        <h1>Documento</h1>
        <p>Erro: {r.status}</p>
      </main>
    );
  }
  const doc = (await r.json()) as Doc;
  return (
    <main style={{ padding: 24 }}>
      <h1>Editar documento</h1>
      <EditForm id={doc.id} initialName={doc.name} />
    </main>
  );
}
