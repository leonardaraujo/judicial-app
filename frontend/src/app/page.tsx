import Link from "next/link";
import { Upload, Search } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3 sm:mb-4">
              Bienvenido al Sistema
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">
              Gestione sus documentos legales de manera eficiente y segura
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <Link href="/subir" className="group">
              <div className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary bg-white rounded-lg overflow-hidden">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors mx-auto sm:mx-0">
                    <Upload className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-card-foreground text-center sm:text-left">
                    Subir Documento
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center sm:text-left">
                    Cargue documentos penales al sistema de manera segura
                  </p>
                  <button className="w-full bg-primary text-primary-foreground px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base">
                    Ir a Subir
                  </button>
                </div>
              </div>
            </Link>

            <Link href="/consultar" className="group">
              <div className="h-full transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-secondary bg-white rounded-lg overflow-hidden">
                <div className="p-5 sm:p-6">
                  <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary/10 mb-3 sm:mb-4 group-hover:bg-secondary/20 transition-colors mx-auto sm:mx-0">
                    <Search className="w-7 h-7 sm:w-8 sm:h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-card-foreground text-center sm:text-left">
                    Consultar Documentos
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4 text-center sm:text-left">
                    Busque y consulte expedientes judiciales existentes
                  </p>
                  <button className="w-full bg-secondary text-secondary-foreground px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base">
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