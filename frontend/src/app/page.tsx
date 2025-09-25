'use client';

import { useRef, useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected && selected.type === 'application/pdf') {
      setFileName(selected.name);
      setFile(selected);
    } else {
      setFileName(null);
      setFile(null);
    }
  }

  async function handleUpload() {
    if (!file) return;
    setLoading(true);
    setResponse(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post('http://localhost:8000/analizar_pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResponse(res.data);
    } catch (err) {
      setResponse({ error: 'Error al analizar el PDF' });
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Subir documento PDF</h1>
        <form
          className="flex flex-col items-center"
          onSubmit={e => { e.preventDefault(); handleUpload(); }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="mb-4 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={handleFileChange}
          />
          {fileName && (
            <div className="mb-4 text-green-700 font-medium">
              Archivo seleccionado: {fileName}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            disabled={!file || loading}
          >
            {loading ? 'Analizando...' : 'Subir y analizar PDF'}
          </button>
        </form>
        {response && (
          <div className="mt-6">
            {response.error ? (
              <div className="text-red-600">{response.error}</div>
            ) : (
              <>
                <h2 className="font-bold mb-2 text-gray-700">Metadata:</h2>
                <pre className="bg-gray-800 p-3 rounded text-sm text-green-200 mb-4 overflow-x-auto">
                  {JSON.stringify(response.metadata, null, 2)}
                </pre>
                <h2 className="font-bold mb-2 text-gray-700">Embeddings (primer chunk):</h2>
                <pre className="bg-gray-800 p-3 rounded text-sm text-blue-200 overflow-x-auto">
                  {JSON.stringify(response.embeddings?.[0], null, 2)}
                </pre>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}