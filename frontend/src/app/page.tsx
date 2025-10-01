import Link from "next/link";
import { Upload, Search, Scale } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">Bienvenido al Sistema</h2>
            <p className="text-lg text-muted-foreground">
              Gestione sus documentos legales de manera eficiente y segura
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/subir" className="group">
              <div className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">Subir Documento</h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Cargue documentos penales al sistema de manera segura
                  </p>
                  <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    Ir a Subir
                  </button>
                </div>
              </div>
            </Link>

            <Link href="/consultar" className="group">
              <div className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-secondary bg-white rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4 group-hover:bg-secondary/20 transition-colors">
                    <Search className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-card-foreground">Consultar Documentos</h3>
                  <p className="text-base text-muted-foreground mb-4">
                    Busque y consulte expedientes judiciales existentes
                  </p>
                  <button className="w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition">
                    Ir a Consultar
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}