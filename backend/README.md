# FastAPI Backend

Backend API for Shreyas Website activities/blog posts.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

API documentation: `http://localhost:8000/docs`

## Environment Variables

- `DATABASE_URL`: Database connection string (default: SQLite)
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins

## API Endpoints

- `GET /api/activities` - List all activities
- `POST /api/activities` - Create new activity (with file uploads)
- `GET /api/activities/{id}` - Get single activity
- `DELETE /api/activities/{id}` - Delete activity

