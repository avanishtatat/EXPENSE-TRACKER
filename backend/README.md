# Expense Tracker Backend

Express + MongoDB backend for the Expense Tracker project.

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- JWT authentication
- Multer for image uploads
- XLSX export for income/expense reports

## Setup

```bash
npm install
```

Create `.env` in this folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173
```

You can also start from:

```bash
cp .env.example .env
```

## Run

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Server entry point: `server.js`

## Deploy On Vercel

This backend is configured for Vercel serverless deployment using:

- `api/index.js`
- `vercel.json`

Required environment variables in Vercel:

- `MONGO_URI`
- `JWT_SECRET`
- `CLIENT_URL` (your frontend Vercel URL)

Optional:

- `PORT` (not required by Vercel)

## API Routes

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/getUser` (protected)
- `POST /api/v1/auth/upload-image` (multipart/form-data, field: `image`)

### Income (protected)

- `POST /api/v1/income/add`
- `GET /api/v1/income/get`
- `DELETE /api/v1/income/:id`
- `GET /api/v1/income/downloadexcel`

### Expense (protected)

- `POST /api/v1/expense/add`
- `GET /api/v1/expense/get`
- `DELETE /api/v1/expense/:id`
- `GET /api/v1/expense/downloadexcel`

### Dashboard (protected)

- `GET /api/v1/dashboard`

## Auth Header

For protected routes:

```http
Authorization: Bearer <token>
```

## Uploads

Image uploads now happen directly from the client (frontend) to Cloudinary.

User's profileImageUrl is stored in the database as a Cloudinary URL.

Backend `/api/v1/auth/upload-image` endpoint is deprecated but can remain for backward compatibility.

## Common Issues

- CORS errors: confirm `CLIENT_URL` matches your frontend URL.
- DB connection failure: verify `MONGO_URI`.
- Unauthorized responses: ensure token is sent in `Authorization` header.
