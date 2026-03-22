# Expense Tracker

Full-stack Expense Tracker application with:

- Backend API: Node.js, Express, MongoDB, JWT authentication, file uploads
- Frontend app: React + Vite + Tailwind CSS + Recharts

## Project Structure

- `backend` - Express API, auth, income/expense CRUD, dashboard, Excel export
- `frontend/expense-tracker` - React client application

## Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or cloud)

## Quick Start

### 1) Start Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

### 2) Start Frontend

```bash
cd frontend/expense-tracker
npm install
npm run dev
```

Open the app at the URL shown by Vite (usually `http://localhost:5173`).

## Notes

- Frontend API base URL uses `VITE_API_BASE_URL` and falls back to `http://localhost:5000`.
- Uploaded files are served from `/uploads` on the backend.

## Deploy To Vercel (Frontend + Backend)

Deploy as two separate Vercel projects from the same repository.

### 1) Backend Project

- Root Directory: `backend`
- Framework Preset: `Other`
- Build settings: default (uses `backend/vercel.json`)
- Environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `CLIENT_URL=https://<frontend-project>.vercel.app`

### 2) Frontend Project

- Root Directory: `frontend/expense-tracker`
- Framework Preset: `Vite`
- Environment variables:
  - `VITE_API_BASE_URL=https://<backend-project>.vercel.app`

Frontend routing refresh is handled by `frontend/expense-tracker/vercel.json`.

## API Base Paths

- `/api/v1/auth`
- `/api/v1/income`
- `/api/v1/expense`
- `/api/v1/dashboard`

## License

ISC (as currently set in backend `package.json`).
