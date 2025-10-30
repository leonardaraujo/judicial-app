// src/hooks/useDocuments.ts
import { useState, useEffect, useCallback } from 'react';
import { Document, UploadStep } from '../models/types';
import { DocumentController } from '../controllers/DocumentController';
import toast from 'react-hot-toast';

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const docs = await DocumentController.fetchDocuments();
      setDocuments(docs);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDocument = useCallback(async (id: number, updates: Partial<Document>) => {
    try {
      const updatedDoc = await DocumentController.updateDocument(id, updates);
      setDocuments(prev =>
        prev.map(doc => doc.id === id ? updatedDoc : doc)
      );
      toast.success('Documento actualizado correctamente');
      return updatedDoc;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const deleteDocument = useCallback(async (id: number, index: number) => {
    try {
      await DocumentController.deleteDocument(id);
      setDocuments(prev => prev.filter((_, i) => i !== index));
      toast.success('Documento eliminado correctamente');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al eliminar';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  const downloadDocument = useCallback(async (id: number, filename: string) => {
    try {
      await DocumentController.downloadDocument(id, filename);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al descargar';
      toast.error(errorMessage);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    fetchDocuments,
    updateDocument,
    deleteDocument,
    downloadDocument,
  };
};

export const useDocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<UploadStep>('idle');
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const validateAndSetFile = useCallback((selectedFile: File) => {
    const validation = DocumentController.validateFile(selectedFile);
    if (validation.isValid) {
      setFile(selectedFile);
      setResponse(null);
      setError(null);
      setStep('idle');
      return true;
    } else {
      setError(validation.error || 'Archivo inválido');
      setFile(null);
      setStep('idle');
      return false;
    }
  }, []);

  const uploadDocument = useCallback(async () => {
    if (!file) return;

    try {
      setStep('uploading');
      setResponse(null);
      setError(null);

      const result = await DocumentController.uploadDocument(file, setStep);
      setResponse(result);
      setFile(null);
      setStep('done');
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      setStep('idle');
      throw err;
    }
  }, [file]);

  const reset = useCallback(() => {
    setFile(null);
    setStep('idle');
    setResponse(null);
    setError(null);
  }, []);

  return {
    file,
    step,
    response,
    error,
    validateAndSetFile,
    uploadDocument,
    reset,
  };
};

export const useDocumentSearch = (documents: Document[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocuments = DocumentController.filterDocuments(documents, searchTerm);

  return {
    searchTerm,
    setSearchTerm,
    filteredDocuments,
  };
};