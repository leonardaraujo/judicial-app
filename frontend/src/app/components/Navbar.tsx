import Link from 'next/link';
import { Scale, Upload, FileSearch } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">Sistema Judicial</h1>
              <p className="text-xs text-muted-foreground">Gestión de Documentos Legales</p>
            </div>
          </Link>
          <div className="flex gap-2">
            <Link href="/subir">
              <button className="px-4 py-2 rounded-lg hover:bg-muted transition flex items-center gap-2 text-foreground">
                <Upload className="w-4 h-4" />
                Subir documento
              </button>
            </Link>
            <Link href="/consultar">
              <button className="px-4 py-2 rounded-lg hover:bg-muted transition flex items-center gap-2 text-foreground">
                <FileSearch className="w-4 h-4" />
                Consultar documentos
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}