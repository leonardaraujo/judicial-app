# Buscador Jurídico

## Descripción General

Este proyecto implementa una arquitectura de aplicación web compuesta por dos partes principales:

## Tipo de arquitectura

El sistema utiliza una **arquitectura en capas (multi-tier)**, separando claramente:

- **Frontend (capa de presentación):** Next.js + Tailwind CSS. Responsable de la interfaz de usuario, carga de documentos y visualización de resultados.
- **Backend (capa de lógica de negocio y acceso a datos):** FastAPI (Python). Encargado del procesamiento de PDFs, extracción de metadatos, generación de embeddings, búsquedas semánticas y acceso a la base de datos PostgreSQL (con soporte vectorial mediante pgvector).

Esta separación permite escalabilidad, mantenibilidad y desarrollo independiente de cada parte.

---

## Componentes principales

- **Backend (Python, FastAPI):**
  - Procesa y analiza documentos PDF.
  - Extrae texto, metadatos y genera embeddings semánticos usando modelos de lenguaje (transformers).
  - Permite búsquedas semánticas sobre los documentos procesados.
  - Puede almacenar los resultados y embeddings en una base de datos PostgreSQL con soporte vectorial (pgvector).

  - Proporciona una interfaz moderna para que el usuario suba documentos PDF y realice búsquedas.
  - Muestra los resultados de la búsqueda y la metadata extraída de los documentos.
  - Se comunica con el backend mediante API REST (por ejemplo, usando axios).

## Estructura del Proyecto

```
buscador_juridico/
├── buscado_juridico_backend/   # Backend Python (FastAPI)
│   ├── main.py
│   ├── ...
│   └── .gitignore
├── frontend/                   # Frontend Next.js (React + Tailwind)
│   ├── src/
│   ├── public/
│   └── .gitignore
└── README.md                   # Este archivo
```

## Flujo de Trabajo

1. El usuario sube un PDF desde el frontend.
2. El frontend envía el archivo al backend mediante una petición HTTP.
3. El backend procesa el PDF, extrae texto, metadatos y genera embeddings.
4. El backend responde con la metadata y/o resultados de búsqueda.
5. El frontend muestra los resultados al usuario.

## Tecnologías principales

- **Backend:** Python, FastAPI, PyPDF2/pdfplumber, transformers, PostgreSQL + pgvector
- **Frontend:** Next.js, React, Tailwind CSS, axios

## Notas
- El backend y el frontend pueden desplegarse juntos o por separado.
- El sistema es escalable y permite búsquedas semánticas en grandes volúmenes de documentos.
