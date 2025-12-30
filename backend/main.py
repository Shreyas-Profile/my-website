from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from pathlib import Path
from dotenv import load_dotenv

from database import init_db
from routers import activities

load_dotenv()

app = FastAPI(title="Shreyas Website API", version="1.0.0")

# CORS configuration - Allow Amplify domains and localhost for development
CORS_ORIGINS_ENV = os.getenv("CORS_ORIGINS", "")
if CORS_ORIGINS_ENV:
    CORS_ORIGINS = [origin.strip() for origin in CORS_ORIGINS_ENV.split(",")]
else:
    # Default: allow localhost for development
    # In production, set CORS_ORIGINS environment variable with your frontend URL
    CORS_ORIGINS = [
        "http://localhost:5173",
        "http://localhost:3000",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploads
UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

# Include routers
app.include_router(activities.router)


@app.on_event("startup")
def startup_event():
    """Initialize database on startup"""
    init_db()


@app.get("/")
def root():
    return {"message": "Shreyas Website API", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}

