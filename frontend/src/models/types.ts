// src/models/types.ts
export interface Document {
  id: number;
  case_number: string;
  case_year: string;
  crime: string;
  verdict: string;
  cited_jurisprudence: string[];
  file_path: string;
}

export interface DocumentMetadata {
  case_number: string;
  case_year: string;
  crime: string;
  verdict: string;
  cited_jurisprudence: string[];
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface UploadResponse {
  metadata: DocumentMetadata;
  document_id: number;
  file_url: string;
  gemini_processing_time_seconds: number;
  total_processing_time_seconds: number;
  msg: string;
}

export type UploadStep = 'idle' | 'uploading' | 'analyzing' | 'done';

export type VerdictType =
  | 'Absuelto'
  | 'Culpable'
  | 'Sobreseído'
  | 'Archivado'
  | 'Prescrito'
  | 'Desestimado'
  | 'Nulidad';