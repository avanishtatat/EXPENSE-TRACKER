# Expense Tracker — Backend API

RESTful API built with Node.js, Express 5, and MongoDB. Handles authentication, income/expense CRUD operations, dashboard aggregation, and Excel report generation. Deployed as a Vercel serverless function.

## Tech Stack

- **Runtime** — Node.js 18+
- **Framework** — Express 5
- **Database** — MongoDB with Mongoose ODM
- **Auth** — JWT (jsonwebtoken) + bcryptjs password hashing
- **File Export** — XLSX (in-memory buffer generation)
- **File Upload** — Multer (multipart parsing; image storage handled client-side via Cloudinary)
- **Deployment** — Vercel serverless

## Local Setup

```bash
npm install
cp .env.example .env
```

Configure `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_strong_random_secret
CLIENT_URL=http://localhost:5173
```

```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

Server starts at `http://localhost:5000`

## Project Structure

```
backend/
├── api/
│   └── index.js          # Vercel serverless function entrypoint
├── config/
│   └── db.js             # MongoDB connection with serverless connection caching
├── controllers/
│   ├── authController.js
│   ├── incomeController.js
│   ├── expenseController.js
│   └── dashboardController.js
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── uploadMiddleware.js
├── models/
│   ├── User.js
│   ├── Income.js
│   └── Expense.js
├── routes/
│   ├── authRoutes.js
│   ├── incomeRoutes.js
│   ├── expenseRoutes.js
│   └── dashboardRoutes.js
├── server.js             # Express app — exported for serverless, listens only when run directly
└── vercel.json           # Routes all requests to api/index.js
```

## API Reference

### Authentication

| Method | Endpoint                | Auth Required | Description           |
| ------ | ----------------------- | ------------- | --------------------- |
| POST   | `/api/v1/auth/register` | No            | Register new user     |
| POST   | `/api/v1/auth/login`    | No            | Login, returns JWT    |
| GET    | `/api/v1/auth/getUser`  | Yes           | Get current user info |

### Income

| Method | Endpoint                       | Auth Required | Description                          |
| ------ | ------------------------------ | ------------- | ------------------------------------ |
| POST   | `/api/v1/income/add`           | Yes           | Add income entry                     |
| GET    | `/api/v1/income/get`           | Yes           | Get all income (sorted by date desc) |
| DELETE | `/api/v1/income/:id`           | Yes           | Delete income entry by ID            |
| GET    | `/api/v1/income/downloadexcel` | Yes           | Download income report as `.xlsx`    |

### Expense

| Method | Endpoint                        | Auth Required | Description                            |
| ------ | ------------------------------- | ------------- | -------------------------------------- |
| POST   | `/api/v1/expense/add`           | Yes           | Add expense entry                      |
| GET    | `/api/v1/expense/get`           | Yes           | Get all expenses (sorted by date desc) |
| DELETE | `/api/v1/expense/:id`           | Yes           | Delete expense entry by ID             |
| GET    | `/api/v1/expense/downloadexcel` | Yes           | Download expense report as `.xlsx`     |

### Dashboard

| Method | Endpoint            | Auth Required | Description                               |
| ------ | ------------------- | ------------- | ----------------------------------------- |
| GET    | `/api/v1/dashboard` | Yes           | Aggregated totals and recent transactions |

### Authorization Header

All protected routes require:

```http
Authorization: Bearer <your_jwt_token>
```

## Vercel Deployment

The server is serverless-compatible:

- `server.js` exports the Express `app` and only calls `app.listen()` when run directly (`require.main === module`)
- `api/index.js` re-exports the app as the Vercel function handler
- `config/db.js` caches the MongoDB connection across warm invocations to avoid reconnecting on every request
- Excel files are generated as in-memory buffers (no disk writes) — required because Vercel's filesystem is read-only

**Required environment variables in Vercel:**

| Variable     | Description                         |
| ------------ | ----------------------------------- |
| `MONGO_URI`  | MongoDB Atlas connection string     |
| `JWT_SECRET` | Secret key for signing JWT tokens   |
| `CLIENT_URL` | Frontend Vercel URL (used for CORS) |

## Common Issues

| Issue                 | Cause                         | Fix                                                   |
| --------------------- | ----------------------------- | ----------------------------------------------------- |
| CORS error            | `CLIENT_URL` mismatch         | Set `CLIENT_URL` to your exact frontend domain        |
| 401 Unauthorized      | Missing or expired token      | Ensure `Authorization: Bearer <token>` header is sent |
| DB connection failure | Wrong `MONGO_URI`             | Verify Atlas connection string and IP whitelist       |
| Excel download fails  | Write to read-only filesystem | Already fixed — using in-memory buffer generation     |
