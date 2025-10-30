'use client';

import { useState } from 'react';
import { useDocuments, useDocumentSearch } from '../../hooks/useDocuments';
import { DocumentsView } from '../../components/views/DocumentsView';
import { UI_MESSAGES } from '../../lib/constants';
import { Document } from '../../models/types';

export default function ConsultarPage() {
  const { documents, loading, error, updateDocument, deleteDocument, downloadDocument } = useDocuments();
  const { searchTerm, setSearchTerm, filteredDocuments } = useDocumentSearch(documents);

  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Document>({
    id: 0,
    case_number: '',
    case_year: '',
    crime: '',
    verdict: '',
    cited_jurisprudence: [],
    file_path: '',
  });

  const handleEdit = (index: number) => {
    setEditIdx(index);
    setEditFormData({ ...filteredDocuments[index] });
  };

  const handleDelete = async (index: number) => {
    const doc = filteredDocuments[index];
    if (!window.confirm(UI_MESSAGES.DELETE_CONFIRM)) return;

    try {
      await deleteDocument(doc.id, index);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleDownload = async (id: number, filename: string) => {
    try {
      await downloadDocument(id, filename);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editIdx === null) return;

    try {
      await updateDocument(filteredDocuments[editIdx].id, editFormData);
      setEditIdx(null);
    } catch (error) {
      // Error handled in hook
    }
  };

  const handleEditFormChange = (field: keyof Document, value: any) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <DocumentsView
      documents={filteredDocuments}
      loading={loading}
      error={error}
      searchTerm={searchTerm}
      editIdx={editIdx}
      onSearchChange={setSearchTerm}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onDownload={handleDownload}
      onEditSubmit={handleEditSubmit}
      onEditCancel={() => setEditIdx(null)}
      editFormData={editFormData}
      onEditFormChange={handleEditFormChange}
    />
  );
}