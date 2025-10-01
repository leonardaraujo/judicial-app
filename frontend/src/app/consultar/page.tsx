'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Download, Edit, Trash2, FileText, Calendar, Gavel, Shield } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

type Document = {
  id: number;
  case_number: string;
  case_year: string;
  crime: string;
  verdict: string;
  cited_jurisprudence: string[];
  file_path: string;
};

export default function ConsultarPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await axios.get('http://localhost:8000/documents/');
        setDocuments(res.data);
      } catch (err) {
        setError('Error al cargar documentos');
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  async function handleDelete(idx: number) {
    const doc = documents[idx];
    if (!window.confirm('¿Seguro que deseas eliminar este documento?')) return;
    try {
      await axios.delete(`http://localhost:8000/documents/${doc.id}`);
      setDocuments(docs => docs.filter((_, i) => i !== idx));
      toast.success('Documento eliminado correctamente');
    } catch {
      toast.error('Error al eliminar el documento');
    }
  }

  async function handleEditSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editIdx === null) return;
    const doc = documents[editIdx];
    try {
      await axios.put(`http://localhost:8000/documents/${doc.id}`, doc);
      toast.success('Documento actualizado correctamente');
      setEditIdx(null);
    } catch {
      toast.error('Error al actualizar el documento');
    }
  }

  const filteredDocs = documents.filter(doc =>
    doc.case_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.crime.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.case_year.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <Toaster position="top-center" toastOptions={{
        style: { fontSize: '1rem' },
        success: { style: { background: '#16a34a', color: '#fff' } },
        error: { style: { background: '#be123c', color: '#fff' } }
      }} />
      <main className="container mx-auto px-4 py-8">
        {/* Search Card */}
        <div className="bg-white border-2 border-border rounded-lg shadow-sm mb-6">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10">
                <Search className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Buscar Expedientes</h2>
                <p className="text-sm text-muted-foreground">Consulte documentos legales por expediente, delito o año</p>
              </div>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por expediente, delito, año..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-white border-2 border-border rounded-lg shadow-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-xl font-bold flex items-center gap-2 text-primary">
              <FileText className="w-5 h-5" />
              Resultados de la Búsqueda
            </h3>
            <p className="text-sm mt-1 text-muted-foreground">
              {loading ? 'Cargando...' : `${filteredDocs.length} expediente(s) encontrado(s)`}
            </p>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Cargando...</div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">{error}</div>
            ) : filteredDocs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No hay documentos.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="text-left p-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Expediente
                        </div>
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Año
                        </div>
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <Gavel className="w-4 h-4" />
                          Delito
                        </div>
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground">
                        <div className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Veredicto
                        </div>
                      </th>
                      <th className="text-left p-3 font-semibold text-foreground">Jurisprudencia</th>
                      <th className="text-right p-3 font-semibold text-foreground">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocs.map((doc, idx) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/30 transition">
                        <td className="p-3 font-mono text-sm font-medium text-foreground">{doc.case_number}</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-md border border-border text-sm font-medium text-foreground">
                            {doc.case_year}
                          </span>
                        </td>
                        <td className="p-3 max-w-xs">
                          <p className="truncate text-foreground" title={doc.crime}>{doc.crime}</p>
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-md text-sm font-medium text-secondary-foreground bg-secondary">
                            {doc.verdict}
                          </span>
                        </td>
                        <td className="p-3 max-w-md">
                          <div className="space-y-1">
                            {doc.cited_jurisprudence && doc.cited_jurisprudence.length > 0
                              ? doc.cited_jurisprudence.slice(0, 3).map((j, i) => (
                                  <p key={i} className="text-xs truncate text-muted-foreground">
                                    • {j}
                                  </p>
                                ))
                              : <p className="text-xs text-muted-foreground">-</p>
                            }
                            {doc.cited_jurisprudence.length > 3 && (
                              <p className="text-xs font-medium text-primary">+{doc.cited_jurisprudence.length - 3} más...</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex justify-end gap-2">
                            {doc.file_path && (
                              <a
                                href={`http://localhost:8000/documents/download/${doc.id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition flex items-center gap-1.5 text-sm text-foreground"
                              >
                                <Download className="w-4 h-4" />
                                Descargar
                              </a>
                            )}
                            <button
                              onClick={() => setEditIdx(idx)}
                              className="px-3 py-1.5 rounded-lg border border-border hover:bg-muted transition flex items-center gap-1.5 text-sm text-foreground"
                            >
                              <Edit className="w-4 h-4" />
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(idx)}
                              className="px-3 py-1.5 rounded-lg border border-border hover:bg-red-50 transition flex items-center gap-1.5 text-sm text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editIdx !== null && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 text-foreground">
              <h2 className="font-bold mb-4 text-xl text-primary">Editar documento</h2>
              <form onSubmit={handleEditSubmit} className="flex flex-col gap-3">
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Expediente:</span>
                  <input
                    className="border border-border rounded-lg px-3 py-2 bg-input text-foreground"
                    value={documents[editIdx].case_number}
                    onChange={e => {
                      const newDocs = [...documents];
                      newDocs[editIdx].case_number = e.target.value;
                      setDocuments(newDocs);
                    }}
                  />
                </label>
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Año:</span>
                  <input
                    className="border border-border rounded-lg px-3 py-2 bg-input text-foreground"
                    value={documents[editIdx].case_year}
                    onChange={e => {
                      const newDocs = [...documents];
                      newDocs[editIdx].case_year = e.target.value;
                      setDocuments(newDocs);
                    }}
                  />
                </label>
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Delito:</span>
                  <input
                    className="border border-border rounded-lg px-3 py-2 bg-input text-foreground"
                    value={documents[editIdx].crime}
                    onChange={e => {
                      const newDocs = [...documents];
                      newDocs[editIdx].crime = e.target.value;
                      setDocuments(newDocs);
                    }}
                  />
                </label>
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Veredicto:</span>
                  <input
                    className="border border-border rounded-lg px-3 py-2 bg-input text-foreground"
                    value={documents[editIdx].verdict}
                    onChange={e => {
                      const newDocs = [...documents];
                      newDocs[editIdx].verdict = e.target.value;
                      setDocuments(newDocs);
                    }}
                  />
                </label>
                <label className="flex flex-col text-sm">
                  <span className="mb-1 font-medium">Jurisprudencia (una por línea):</span>
                  <textarea
                    className="border border-border rounded-lg px-3 py-2 bg-input text-foreground"
                    rows={4}
                    value={documents[editIdx].cited_jurisprudence.join('\n')}
                    onChange={e => {
                      const newDocs = [...documents];
                      newDocs[editIdx].cited_jurisprudence = e.target.value.split('\n').filter(j => j.trim() !== '');
                      setDocuments(newDocs);
                    }}
                  />
                </label>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-lg px-4 py-2 mt-2 font-medium hover:opacity-90 transition"
                >
                  Guardar cambios
                </button>
                <button
                  type="button"
                  className="bg-muted text-foreground rounded-lg px-4 py-2 hover:bg-muted/80 transition"
                  onClick={() => setEditIdx(null)}
                >
                  Cancelar
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}