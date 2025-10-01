'use client';

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Upload, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function SubirPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setResponse(null);
        setError(null);
      } else {
        setError('Por favor selecciona un archivo PDF válido');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setResponse(null);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/analyze_pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponse(res.data);
      setFile(null);
    } catch (err) {
      setError('Error al analizar el PDF. Por favor intente nuevamente.');
    }
    setUploading(false);
  };

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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="file-upload" className="text-base font-medium text-foreground block">
                    Seleccionar archivo
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer border border-border rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground">Solo archivos PDF. Tamaño máximo: 10MB</p>
                </div>

                {file && (
                  <div className="bg-card border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                    <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">Archivo seleccionado:</span> {file.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  </div>
                )}

                {response && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800 mb-2">¡Documento cargado exitosamente!</p>
                      <div className="text-sm text-green-700 space-y-1">
                        <p><span className="font-medium">ID del documento:</span> {response.document_id}</p>
                        <p><span className="font-medium">Tiempo Gemini:</span> {response.gemini_processing_time_seconds}s</p>
                        <p><span className="font-medium">Tiempo total:</span> {response.total_processing_time_seconds}s</p>
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
                    disabled={!file || uploading}
                    className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        Subir y Analizar PDF
                      </>
                    )}
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
}