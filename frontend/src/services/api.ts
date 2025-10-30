// src/services/api.ts
import axios, { AxiosResponse } from 'axios';
import { Document, UploadResponse, ApiResponse } from '../models/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor for adding headers if needed
api.interceptors.request.use(
  (config) => {
    // Add auth headers here if needed in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export class DocumentService {
  static async uploadDocument(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    const response: AxiosResponse<UploadResponse> = await api.post('/analyze_pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  static async getDocuments(): Promise<Document[]> {
    const response: AxiosResponse<Document[]> = await api.get('/documents/');
    return response.data;
  }

  static async getDocument(id: number): Promise<Document> {
    const response: AxiosResponse<Document> = await api.get(`/documents/${id}`);
    return response.data;
  }

  static async updateDocument(id: number, document: Partial<Document>): Promise<Document> {
    const response: AxiosResponse<Document> = await api.put(`/documents/${id}`, document);
    return response.data;
  }

  static async deleteDocument(id: number): Promise<void> {
    await api.delete(`/documents/${id}`);
  }

  static async downloadDocument(id: number): Promise<Blob> {
    const response: AxiosResponse<Blob> = await api.get(`/documents/download/${id}`, {
      responseType: 'blob',
    });
    return response.data;
  }
}

export default api;