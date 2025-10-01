from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers.document_controller import router as documento_router
from controllers.document_crud_controller import router as crud_router
from services.qdrant_service import ensure_collection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ensure_collection()
app.include_router(documento_router)
app.include_router(crud_router)