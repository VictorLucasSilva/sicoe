'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateForm() {
  const [name, setName] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const r = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!r.ok) {
        let msg = `Erro ${r.status}`;
        try {
          const j = await r.json();
          msg = (Array.isArray(j?.message) ? j.message.join(', ') : j?.message) || msg;
        } catch {}
        setErr(msg);
        return;
      }

      // ok – volta para a lista
      router.push('/documents');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
      <label>
        Nome do documento
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength={2}
          maxLength={180}
          required
          placeholder="Ex.: Alvará de Funcionamento"
          style={{ width: '100%', padding: 8 }}
        />
      </label>

      {err && (
        <div style={{ background: '#fee', color: '#900', padding: 8, borderRadius: 6 }}>
          {err}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? 'Enviando...' : 'Criar'}
      </button>
    </form>
  );
}
