// src/lib/constants.ts
export const API_ENDPOINTS = {
  ANALYZE_PDF: '/analyze_pdf',
  DOCUMENTS: '/documents',
} as const;

export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['application/pdf'],
  ALLOWED_EXTENSIONS: ['pdf'],
} as const;

export const VERDICT_OPTIONS = [
  'Absuelto',
  'Culpable',
  'Sobreseído',
  'Archivado',
  'Prescrito',
  'Desestimado',
  'Nulidad',
] as const;

export const UI_MESSAGES = {
  UPLOAD_SUCCESS: 'Documento subido y analizado correctamente',
  UPDATE_SUCCESS: 'Documento actualizado correctamente',
  DELETE_SUCCESS: 'Documento eliminado correctamente',
  DELETE_CONFIRM: '¿Seguro que deseas eliminar este documento?',
  ERROR_UPLOAD: 'Error al analizar el PDF. Por favor intente nuevamente.',
  ERROR_LOAD: 'Error al cargar documentos',
  ERROR_UPDATE: 'Error al actualizar el documento',
  ERROR_DELETE: 'Error al eliminar el documento',
  ERROR_DOWNLOAD: 'Error al descargar el documento',
  INVALID_FILE_TYPE: 'Por favor selecciona un archivo PDF válido',
  FILE_TOO_LARGE: 'El archivo no puede superar los 10MB',
} as const;