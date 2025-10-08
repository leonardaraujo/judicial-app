import Link from 'next/link';
import { Scale, Upload, FileSearch } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary flex-shrink-0">
              <Scale className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-lg sm:text-xl font-bold text-primary">Sistema Judicial</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Gestión de Documentos Legales</p>
            </div>
          </Link>
          <div className="flex flex-row gap-2 w-full sm:w-auto">
            <Link href="/subir" className="flex-1 sm:flex-initial">
              <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Subir documento</span>
                <span className="sm:hidden">Subir</span>
              </button>
            </Link>
            <Link href="/consultar" className="flex-1 sm:flex-initial">
              <button className="w-full px-3 sm:px-4 py-2 rounded-lg hover:bg-muted transition flex items-center justify-center gap-2 text-foreground text-sm">
                <FileSearch className="w-4 h-4" />
                <span className="hidden sm:inline">Consultar documentos</span>
                <span className="sm:hidden">Consultar</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}