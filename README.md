# Sistema Judicial - Buscador y Gestor de Documentos Legales

## 📋 Descripción General

Sistema completo de gestión y análisis de documentos jurídicos que combina inteligencia artificial con una interfaz moderna para el procesamiento automatizado de sentencias penales y expedientes judiciales.

## 🚀 Funcionalidades Principales

### 📄 Gestión de Documentos
- **Carga de Documentos PDF**: Subida segura de documentos penales al sistema
- **Almacenamiento Seguro**: Los archivos se guardan en el servidor para descarga posterior
- **Validación de Archivos**: Solo acepta archivos PDF con validación de tamaño y tipo

### 🤖 Análisis Inteligente con IA
- **Extracción Automática de Metadatos** usando Google Gemini 2.5 Flash:
  - Número de expediente (automático desde el documento)
  - Año del caso (extraído del número de expediente)
  - Delito específico (clasificación precisa del tipo penal)
  - Veredicto (Absuelto, Culpable, Sobreseído, Archivado, Prescrito, Desestimado, Nulidad)
  - Jurisprudencia citada (referencias completas a casos y sentencias)

### 🔍 Sistema de Búsqueda y Consulta
- **Búsqueda Avanzada**: Por expediente, delito, año o texto libre
- **Búsqueda Semántica**: Usando embeddings vectoriales con Qdrant
- **Filtrado en Tiempo Real**: Resultados instantáneos mientras escribes
- **Vista de Tabla Profesional**: Interfaz clara con toda la información relevante

### 📊 CRUD Completo
- **Visualización**: Lista completa de documentos procesados
- **Edición**: Modificación de metadatos extraídos (expediente, año, delito, veredicto, jurisprudencia)
- **Eliminación**: Borrado seguro de documentos con confirmación
- **Descarga**: Acceso directo a los archivos PDF originales

### 🎨 Interfaz de Usuario Moderna
- **Diseño Responsivo**: Optimizado para desktop y móvil
- **Tema Judicial Profesional**: Colores y tipografía especializada
- **Notificaciones Toast**: Feedback inmediato de acciones
- **Navegación Intuitiva**: Navbar con acceso rápido a todas las funciones

## 🏗️ Arquitectura del Sistema

### **Arquitectura en Capas (Multi-tier)**
- **Frontend (Presentación)**: Next.js 15 + Tailwind CSS v4
- **Backend (Lógica de Negocio)**: FastAPI + Python
- **Base de Datos**: PostgreSQL + Qdrant (vectorial)
- **IA**: Google Gemini 2.5 Flash

## 🛠️ Stack Tecnológico

### **Backend (Python)**
- **FastAPI**: Framework web moderno y rápido
- **SQLAlchemy**: ORM para PostgreSQL
- **Google Generative AI**: Procesamiento con Gemini 2.5 Flash
- **Qdrant**: Base de datos vectorial para búsquedas semánticas
- **PyPDF2**: Extracción de texto de documentos PDF
- **Sentence Transformers**: Generación de embeddings

### **Frontend (TypeScript/React)**
- **Next.js 15**: Framework React con App Router
- **Tailwind CSS v4**: Estilos utilitarios modernos
- **Lucide React**: Iconografía profesional
- **React Hot Toast**: Notificaciones elegantes
- **Axios**: Cliente HTTP para comunicación con API

### **Base de Datos**
- **PostgreSQL**: Base de datos relacional principal
- **Qdrant**: Motor de búsqueda vectorial
- **Docker**: Contenedorización de servicios

## 📁 Estructura del Proyecto

```
buscador_juridico/
├── buscado_juridico_backend/          # Backend FastAPI
│   ├── controllers/
│   │   ├── document_controller.py     # Análisis y carga de PDFs
│   │   └── document_crud_controller.py # CRUD de documentos
│   ├── models/
│   │   └── document.py               # Modelo de datos
│   ├── services/
│   │   ├── pdf_service.py            # Procesamiento PDF
│   │   ├── embeddings_service.py     # Generación de embeddings
│   │   └── qdrant_service.py         # Servicio vectorial
│   ├── uploaded_docs/                # Almacén de archivos
│   ├── main.py                       # Punto de entrada
│   └── requirements.txt              # Dependencias Python
├── frontend/                         # Frontend Next.js
│   ├── src/app/
│   │   ├── components/
│   │   │   └── Navbar.tsx           # Navegación principal
│   │   ├── consultar/
│   │   │   └── page.tsx             # Página de consulta y CRUD
│   │   ├── subir/
│   │   │   └── page.tsx             # Página de carga
│   │   ├── globals.css              # Estilos globales
│   │   └── layout.tsx               # Layout principal
│   ├── package.json                 # Dependencias Node.js
│   └── tailwind.config.js           # Configuración Tailwind
└── README.md
```

## 🔄 Flujo de Trabajo Completo

### **1. Carga de Documento**
```
Usuario → Selecciona PDF → Frontend valida → Backend procesa → IA extrae metadatos → Guarda en BD
```

### **2. Procesamiento con IA**
```
PDF → Extracción de texto → Análisis con Gemini → Metadatos estructurados → Embeddings vectoriales
```

### **3. Consulta y Búsqueda**
```
Usuario busca → Query semántica → Qdrant + PostgreSQL → Resultados ordenados → Interfaz actualizada
```

### **4. Gestión CRUD**
```
Lista documentos → Edita metadatos → Confirma cambios → Actualiza BD → Notificación de éxito
```

## ⚡ Características Técnicas

### **Validaciones y Seguridad**
- Validación de tipos de archivo (solo PDF)
- Límite de tamaño de archivos (10MB)
- Sanitización de entradas de usuario
- Manejo de errores robusto
- Confirmaciones para acciones destructivas

### **Performance y Escalabilidad**
- Procesamiento asíncrono con FastAPI
- Búsquedas vectoriales optimizadas
- Caching de embeddings
- Interfaz reactiva sin recargas de página
- Componentes optimizados de React

### **Experiencia de Usuario**
- Indicadores de carga en tiempo real
- Feedback inmediato con toast notifications
- Interfaz responsiva y accesible
- Navegación intuitiva entre secciones
- Tooltips informativos

## 🚦 Estado del Proyecto

**✅ Funcionalidades Implementadas:**
- ✅ Carga y análisis de PDFs
- ✅ Extracción automática con IA
- ✅ CRUD completo de documentos
- ✅ Búsqueda semántica avanzada
- ✅ Interfaz moderna y responsiva
- ✅ Sistema de notificaciones

**🔮 Mejoras Futuras:**
- 📊 Dashboard con estadísticas
- 📱 Aplicación móvil nativa
- 🔐 Sistema de autenticación
- 📈 Analytics de uso
- 🌐 API pública documentada

## 💡 Casos de Uso

- **Bufetes de Abogados**: Gestión centralizada de expedientes
- **Tribunales**: Análisis rápido de documentos judiciales
- **Estudiantes de Derecho**: Investigación de jurisprudencia
- **Investigadores Jurídicos**: Análisis de patrones en sentencias
