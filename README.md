# Expense Tracker

A full-stack personal finance management application that helps users track income and expenses, visualize spending patterns, and export financial data — built with the MERN stack and deployed on Vercel.

## Live Demo

- Frontend: https://avanish-expense-tracker.vercel.app
- Backend API: https://expense-tracker-seven-omega-12.vercel.app

## Features

- **Authentication** — Secure user registration and login with JWT-based session management
- **Income Tracking** — Add, view, and delete income entries with emoji icons and date tracking
- **Expense Tracking** — Categorize and manage expenses with full CRUD operations
- **Dashboard Overview** — Real-time summary of total balance, income, and expenses
- **Data Visualization** — Interactive bar charts, line charts, and pie charts powered by Recharts
- **Excel Export** — Download income and expense records as `.xlsx` files
- **Profile Image Upload** — Client-side image upload directly to Cloudinary
- **Responsive UI** — Mobile-friendly layout built with Tailwind CSS
- **Protected Routes** — JWT-secured API endpoints with client-side route guards

## Tech Stack

### Backend

| Technology           | Purpose                         |
| -------------------- | ------------------------------- |
| Node.js + Express 5  | REST API server                 |
| MongoDB + Mongoose   | Database and ODM                |
| JSON Web Token (JWT) | Stateless authentication        |
| bcryptjs             | Password hashing                |
| XLSX                 | In-memory Excel file generation |
| Multer               | Multipart form parsing          |
| dotenv               | Environment configuration       |

### Frontend

| Technology      | Purpose                                  |
| --------------- | ---------------------------------------- |
| React 19        | UI framework                             |
| Vite 7          | Build tool and dev server                |
| Tailwind CSS 4  | Utility-first styling                    |
| React Router v7 | Client-side routing                      |
| Axios           | HTTP client with interceptors            |
| Recharts        | Chart and data visualization             |
| Cloudinary      | Cloud image storage (client-side upload) |
| React Hot Toast | Toast notifications                      |
| Moment.js       | Date formatting                          |

### Infrastructure

| Technology    | Purpose                                    |
| ------------- | ------------------------------------------ |
| Vercel        | Serverless deployment (frontend + backend) |
| MongoDB Atlas | Cloud database                             |
| Cloudinary    | Persistent image storage                   |

## Architecture

```
┌─────────────────────────────────────────┐
│              Client (React)              │
│  - SPA with React Router (BrowserRouter) │
│  - Axios instance with JWT interceptors  │
│  - Cloudinary direct upload              │
└────────────────┬────────────────────────┘
                 │ HTTPS (REST)
┌────────────────▼────────────────────────┐
│          Backend (Express API)           │
│  - Vercel Serverless Function            │
│  - JWT middleware on protected routes    │
│  - Mongoose models + MongoDB Atlas       │
└─────────────────────────────────────────┘
```

## Project Structure

```
EXPENSE-TRACKER/
├── backend/                  # Express REST API
│   ├── api/index.js          # Vercel serverless entrypoint
│   ├── server.js             # Express app (exported for serverless)
│   ├── config/db.js          # MongoDB connection with serverless caching
│   ├── controllers/          # Route handler logic
│   ├── middleware/           # Auth + upload middleware
│   ├── models/               # Mongoose schemas (User, Income, Expense)
│   ├── routes/               # Express route definitions
│   └── vercel.json           # Vercel routing config
│
└── frontend/expense-tracker/ # React + Vite SPA
    ├── src/
    │   ├── pages/            # Auth and Dashboard pages
    │   ├── components/       # Reusable UI components and charts
    │   ├── context/          # UserContext (global auth state)
    │   ├── hooks/            # useUserAuth (protected route guard)
    │   └── utils/            # Axios instance, API paths, helpers
    └── vercel.json           # SPA rewrite rule for client-side routing
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud)
- [Cloudinary](https://cloudinary.com) account (free tier)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Setup backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173
```

```bash
npm run dev
```

### 3. Setup frontend

```bash
cd frontend/expense-tracker
npm install
cp .env.example .env
```

Edit `frontend/expense-tracker/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployment (Vercel)

Both apps are deployed as separate Vercel projects from this monorepo.

### Backend Project

| Setting          | Value                        |
| ---------------- | ---------------------------- |
| Root Directory   | `backend`                    |
| Framework Preset | Other                        |
| MONGO_URI        | your Atlas connection string |
| JWT_SECRET       | strong random secret         |
| CLIENT_URL       | frontend Vercel URL          |

### Frontend Project

| Setting                       | Value                      |
| ----------------------------- | -------------------------- |
| Root Directory                | `frontend/expense-tracker` |
| Framework Preset              | Vite                       |
| VITE_API_BASE_URL             | backend Vercel URL         |
| VITE_CLOUDINARY_CLOUD_NAME    | your cloud name            |
| VITE_CLOUDINARY_UPLOAD_PRESET | unsigned upload preset     |

> Frontend SPA routing on refresh is handled via `vercel.json` rewrites.

## API Reference

| Method | Endpoint                        | Auth | Description                |
| ------ | ------------------------------- | ---- | -------------------------- |
| POST   | `/api/v1/auth/register`         | No   | Register new user          |
| POST   | `/api/v1/auth/login`            | No   | Login and receive JWT      |
| GET    | `/api/v1/auth/getUser`          | Yes  | Get logged in user info    |
| GET    | `/api/v1/dashboard`             | Yes  | Dashboard summary data     |
| POST   | `/api/v1/income/add`            | Yes  | Add income entry           |
| GET    | `/api/v1/income/get`            | Yes  | Get all income             |
| DELETE | `/api/v1/income/:id`            | Yes  | Delete income entry        |
| GET    | `/api/v1/income/downloadexcel`  | Yes  | Download income as Excel   |
| POST   | `/api/v1/expense/add`           | Yes  | Add expense entry          |
| GET    | `/api/v1/expense/get`           | Yes  | Get all expenses           |
| DELETE | `/api/v1/expense/:id`           | Yes  | Delete expense entry       |
| GET    | `/api/v1/expense/downloadexcel` | Yes  | Download expenses as Excel |

Protected routes require: `Authorization: Bearer <token>`

## Key Technical Decisions

- **Serverless-compatible DB connection** — MongoDB connection is cached across Vercel function invocations to avoid connection overhead on each request.
- **Client-side image upload** — Profile images upload directly from the browser to Cloudinary, bypassing the backend entirely. This avoids Vercel's read-only filesystem constraint.
- **In-memory Excel generation** — Excel files are generated as buffers in memory using `xlsx` and streamed directly in the HTTP response, avoiding any disk write operations required by serverless environments.
- **SPA routing** — `vercel.json` rewrites all routes to `index.html` so React Router handles navigation on page refresh.

## License

ISC
