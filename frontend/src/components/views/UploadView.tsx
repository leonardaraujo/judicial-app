// src/components/views/UploadView.tsx
import Link from 'next/link';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { UploadStep } from '../../models/types';
import { formatFileSize } from '../../utils/file';

interface UploadViewProps {
  file: File | null;
  step: UploadStep;
  response: any;
  error: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const UploadView: React.FC<UploadViewProps> = ({
  file,
  step,
  response,
  error,
  onFileChange,
  onSubmit,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-border rounded-lg shadow-sm">
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Subir Documento PDF</h2>
                  <p className="text-sm text-muted-foreground">Cargue documentos penales al sistema</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="text-base font-medium text-foreground block">
                    Seleccionar archivo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={onFileChange}
                    disabled={step === 'uploading' || step === 'analyzing'}
                    className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <p className="text-sm text-muted-foreground">Solo archivos PDF. Tamaño máximo: 10MB</p>
                </div>

                {file && step === 'idle' && (
                  <div className="bg-card border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Archivo seleccionado:</span> {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ({formatFileSize(file.size)})
                      </p>
                    </div>
                  </div>
                )}

                {/* Componente de Estado de Proceso */}
                {(step === 'uploading' || step === 'analyzing' || step === 'done') && (
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="space-y-4">
                      {/* Paso 1: Subiendo */}
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          step === 'uploading' ? 'bg-blue-500' : step === 'analyzing' || step === 'done' ? 'bg-green-500' : 'bg-slate-300'
                        }`}>
                          {step === 'uploading' ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                          ) : step === 'analyzing' || step === 'done' ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Upload className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${
                            step === 'uploading' ? 'text-blue-700' : step === 'analyzing' || step === 'done' ? 'text-green-700' : 'text-slate-500'
                          }`}>
                            {step === 'uploading' ? 'Subiendo archivo...' : 'Archivo subido correctamente'}
                          </p>
                          <p className="text-xs text-slate-500">Enviando documento al servidor</p>
                        </div>
                      </div>

                      {/* Línea conectora */}
                      <div className={`ml-5 w-0.5 h-6 transition-all ${
                        step === 'analyzing' || step === 'done' ? 'bg-green-500' : 'bg-slate-300'
                      }`}></div>

                      {/* Paso 2: Analizando */}
                      <div className="flex items-center gap-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                          step === 'analyzing' ? 'bg-yellow-500' : step === 'done' ? 'bg-green-500' : 'bg-slate-300'
                        }`}>
                          {step === 'analyzing' ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                          ) : step === 'done' ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-semibold text-sm ${
                            step === 'analyzing' ? 'text-yellow-700' : step === 'done' ? 'text-green-700' : 'text-slate-500'
                          }`}>
                            {step === 'analyzing' ? 'Analizando con IA...' : step === 'done' ? 'Análisis completado' : 'Esperando análisis'}
                          </p>
                          <p className="text-xs text-slate-500">Extrayendo información del documento</p>
                        </div>
                      </div>

                      {/* Línea conectora */}
                      {step === 'done' && (
                        <>
                          <div className="ml-5 w-0.5 h-6 bg-green-500"></div>

                          {/* Paso 3: Completado */}
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-green-700">Proceso completado</p>
                              <p className="text-xs text-slate-500">Documento guardado en base de datos</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Resultados */}
                {response && step === 'done' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Información del análisis
                    </h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-green-700 font-medium">ID del documento:</p>
                        <p className="text-green-900">{response.document_id}</p>
                      </div>
                      <div>
                        <p className="text-green-700 font-medium">Tiempo Gemini:</p>
                        <p className="text-green-900">{response.gemini_processing_time_seconds}s</p>
                      </div>
                      <div>
                        <p className="text-green-700 font-medium">Tiempo total:</p>
                        <p className="text-green-900">{response.total_processing_time_seconds}s</p>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!file || step === 'uploading' || step === 'analyzing'}
                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Subir y Analizar PDF
                  </button>
                  <Link href="/consultar">
                    <button
                      type="button"
                      className="px-6 py-3 rounded-lg font-medium border border-border hover:bg-muted transition"
                    >
                      Ver Documentos
                    </button>
                  </Link>
                </div>
              </form>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-foreground">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  Información importante
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
                  <li>Los documentos serán procesados automáticamente</li>
                  <li>Se extraerá información relevante del expediente</li>
                  <li>Los datos estarán disponibles en la sección de consulta</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};