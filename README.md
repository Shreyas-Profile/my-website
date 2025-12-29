# Shreyas Website

Personal website with FastAPI backend and React frontend.

## Project Structure

```
.
├── backend/          # FastAPI backend
│   ├── main.py      # FastAPI application
│   ├── models.py    # Database models
│   ├── schemas.py   # Pydantic schemas
│   ├── database.py  # Database configuration
│   └── routers/     # API routes
├── frontend/         # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service
│   │   └── App.jsx      # Main app component
│   └── package.json
└── README.md
```

## Setup

### Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Run the server:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`
API docs at `http://localhost:8000/docs`

### Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Frontend will be available at `http://localhost:5173`

## Features

- Personal portfolio website
- Daily activities/blog posts
- File uploads for activities
- Responsive design
- FastAPI backend with SQLite/PostgreSQL support
- React frontend with Vite

## AWS Deployment

The project is structured to be AWS-compatible:
- Environment variables for configuration
- Database connection string configurable
- File storage path configurable
- CORS origins configurable

