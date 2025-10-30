// src/controllers/DocumentController.ts
import { Document, UploadResponse, UploadStep } from '../models/types';
import { DocumentService } from '../services/api';

export class DocumentController {
  static validateFile(file: File): { isValid: boolean; error?: string } {
    // Check file type
    if (file.type !== 'application/pdf') {
      return { isValid: false, error: 'Por favor selecciona un archivo PDF válido' };
    }

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return { isValid: false, error: 'El archivo no puede superar los 10MB' };
    }

    return { isValid: true };
  }

  static async uploadDocument(
    file: File,
    onProgress?: (step: UploadStep) => void
  ): Promise<UploadResponse> {
    try {
      onProgress?.('uploading');

      // Simulate upload delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      onProgress?.('analyzing');

      const response = await DocumentService.uploadDocument(file);

      onProgress?.('done');

      return response;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Error al analizar el PDF. Por favor intente nuevamente.');
    }
  }

  static async fetchDocuments(): Promise<Document[]> {
    try {
      return await DocumentService.getDocuments();
    } catch (error) {
      console.error('Fetch documents error:', error);
      throw new Error('Error al cargar documentos');
    }
  }

  static async updateDocument(id: number, updates: Partial<Document>): Promise<Document> {
    try {
      return await DocumentService.updateDocument(id, updates);
    } catch (error) {
      console.error('Update document error:', error);
      throw new Error('Error al actualizar el documento');
    }
  }

  static async deleteDocument(id: number): Promise<void> {
    try {
      await DocumentService.deleteDocument(id);
    } catch (error) {
      console.error('Delete document error:', error);
      throw new Error('Error al eliminar el documento');
    }
  }

  static async downloadDocument(id: number, filename: string): Promise<void> {
    try {
      const blob = await DocumentService.downloadDocument(id);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      throw new Error('Error al descargar el documento');
    }
  }

  static filterDocuments(documents: Document[], searchTerm: string): Document[] {
    if (!searchTerm.trim()) return documents;

    const term = searchTerm.toLowerCase();
    return documents.filter(doc =>
      doc.case_number.toLowerCase().includes(term) ||
      doc.crime.toLowerCase().includes(term) ||
      doc.case_year.includes(term)
    );
  }
}