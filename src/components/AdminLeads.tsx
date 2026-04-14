import React, { useEffect, useState } from 'react';
import { Download, RefreshCw, ChevronLeft, Search } from 'lucide-react';

/** Must match `ADMIN_EXPORT_SECRET` in Netlify env (see netlify/functions/export.mts). */
const ADMIN_TOKEN =
  import.meta.env.VITE_ADMIN_EXPORT_SECRET ?? 'opora-admin-secret-2026';

type ExportLeadRow = {
  submissionId: string;
  submittedAt: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  answerSet?: Record<string, string>;
  metadata?: {
    funnelStage?: string;
    source?: string;
  };
};

const AdminLeads: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [leads, setLeads] = useState<ExportLeadRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`/api/export?secret=${ADMIN_TOKEN}`);
      if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`);
      const data = await resp.json();
      setLeads(data.leads || []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDownloadCsv = () => {
    window.location.href = `/api/export?secret=${ADMIN_TOKEN}&format=csv`;
  };

  const filteredLeads = leads.filter(l => 
    l.name?.toLowerCase().includes(search.toLowerCase()) || 
    l.contact?.toLowerCase().includes(search.toLowerCase()) ||
    l.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-leads container section">
      <div className="admin-header flex-center gap-4 mb-5" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="flex-center gap-3">
          <button onClick={onBack} className="btn btn--sm btn--outline" style={{ padding: '0.5rem' }}>
            <ChevronLeft size={20} />
          </button>
          <h1 style={{ margin: 0 }}>Адмін-панель лідів</h1>
        </div>
        
        <div className="flex-center gap-2">
          <div className="search-wrap" style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Пошук..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '0.5rem 1rem 0.5rem 2.2rem', borderRadius: '8px', border: '1px solid #ddd' }}
            />
            <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
          </div>
          <button onClick={fetchLeads} className="btn btn--sm btn--outline" disabled={loading}>
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button onClick={handleDownloadCsv} className="btn btn--sm btn--primary">
            <Download size={16} style={{ marginRight: '6px' }} /> EXPORT CSV
          </button>
        </div>
      </div>

      {error && <div className="alert alert--error mb-4" style={{ color: 'red', background: '#fee2e2', padding: '1rem', borderRadius: '8px' }}>{error}</div>}

      <div className="table-wrap" style={{ overflowX: 'auto', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
            <tr>
              <th style={{ padding: '1rem' }}>Дата</th>
              <th style={{ padding: '1rem' }}>Ім'я</th>
              <th style={{ padding: '1rem' }}>Контакт</th>
              <th style={{ padding: '1rem' }}>Питання</th>
              <th style={{ padding: '1rem' }}>Готовність</th>
              <th style={{ padding: '1rem' }}>Джерело</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>Завантаження...</td></tr>
            ) : filteredLeads.length === 0 ? (
              <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>Лідів не знайдено</td></tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.submissionId} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '1rem', whiteSpace: 'nowrap' }}>{new Date(lead.submittedAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{lead.name}</td>
                  <td style={{ padding: '1rem' }}>{lead.contact || lead.email || lead.phone}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.answerSet ? Object.values(lead.answerSet).join(', ') : '-'}
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '2px 8px', 
                      borderRadius: '12px', 
                      fontSize: '0.75rem',
                      background: lead.metadata?.funnelStage === 'clinic_intake' ? '#dcfce7' : '#fef9c3',
                      color: lead.metadata?.funnelStage === 'clinic_intake' ? '#166534' : '#854d0e'
                    }}>
                      {lead.metadata?.funnelStage || 'base'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#666', fontSize: '0.8rem' }}>{lead.metadata?.source || 'direct'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-center text-muted mt-5" style={{ fontSize: '0.8rem' }}>
        Всього: {leads.length} лідів. Останнє оновлення: {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
};

export default AdminLeads;
