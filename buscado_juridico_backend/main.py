from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import re
from PyPDF2 import PdfReader
from transformers import AutoTokenizer, AutoModel
import torch

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Cambia esto según tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def extract_metadata(text):
    expediente = re.search(r'EXPEDIENTE N[°º]\s*[:\-]?\s*(\S+)', text, re.IGNORECASE)
    delito = re.search(r'DELITO\s*[:\-]?\s*([^\n]+)', text, re.IGNORECASE)
    agraviado = re.search(r'AGRAVIADO\s*[:\-]?\s*([^\n]+)', text, re.IGNORECASE)
    return {
        "expediente": expediente.group(1) if expediente else None,
        "delito": delito.group(1).strip() if delito else None,
        "agraviado": agraviado.group(1).strip() if agraviado else None,
    }

def chunk_text(text, max_length=512):
    words = text.split()
    return [' '.join(words[i:i+max_length]) for i in range(0, len(words), max_length)]

def get_embeddings(chunks):
    tokenizer = AutoTokenizer.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    model = AutoModel.from_pretrained("sentence-transformers/all-MiniLM-L6-v2")
    embeddings = []
    for chunk in chunks:
        inputs = tokenizer(chunk, return_tensors="pt", truncation=True, padding=True)
        with torch.no_grad():
            outputs = model(**inputs)
            emb = outputs.last_hidden_state.mean(dim=1).squeeze().tolist()
            embeddings.append(emb)
    return embeddings

@app.post("/analizar_pdf")
async def analizar_pdf(file: UploadFile = File(...)):
    # Leer PDF
    pdf = PdfReader(file.file)
    text = ""
    for page in pdf.pages:
        text += page.extract_text() or ""
    # Extraer metadata
    metadata = extract_metadata(text)
    # Chunking
    chunks = chunk_text(text)
    # Embeddings
    embeddings = get_embeddings(chunks)
    return JSONResponse(content={
        "metadata": metadata,
        "embeddings": embeddings
    })