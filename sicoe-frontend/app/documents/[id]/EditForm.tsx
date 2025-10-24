'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export default function EditForm({ id, initialName }: { id: string; initialName: string }) {
  const [name, setName] = useState(initialName);
  const [err, setErr] = useState('');
  const router = useRouter();

  async function onSave(e: FormEvent) {
    e.preventDefault();
    setErr('');
    const res = await fetch(`/api/documents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      router.push('/documents');
      router.refresh();
    } else {
      setErr(await res.text());
    }
  }

  async function onDelete() {
    setErr('');
    const res = await fetch(`/api/documents/${id}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/documents');
      router.refresh();
    } else {
      setErr(await res.text());
    }
  }

  return (
    <form onSubmit={onSave} style={{ display: 'grid', gap: 12, maxWidth: 520, marginTop: 16 }}>
      <input
        required
        minLength={2}
        maxLength={180}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do documento"
        style={{ padding: 8 }}
      />
      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" style={{ padding: '8px 12px' }}>Salvar</button>
        <button type="button" onClick={onDelete} style={{ padding: '8px 12px', background: '#fee', border: '1px solid #f99' }}>
          Remover
        </button>
      </div>
      {err && <span style={{ color: 'crimson' }}>{err}</span>}
    </form>
  );
}
