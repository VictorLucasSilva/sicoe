export const dynamic = 'force-dynamic';
export const revalidate = 0;

import CreateForm from '../CreateForm';

export default function NewDocumentPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Novo Documento</h1>
      <CreateForm />
    </main>
  );
}
