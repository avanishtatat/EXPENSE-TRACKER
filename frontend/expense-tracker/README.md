# Expense Tracker Frontend

React frontend for the Expense Tracker application.

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4
- React Router
- Axios
- Recharts
- React Hot Toast

## Setup

```bash
npm install
```

Create `.env.local` or `.env`:

```bash
cp .env.example .env
```

Configure Cloudinary for profile image uploads:

1. Get your credentials from https://cloudinary.com (free account)
2. Go to Dashboard → Settings → Upload
3. Create an unsigned upload preset (or note the default one)
4. Set in `.env`:
   - `VITE_CLOUDINARY_CLOUD_NAME` = your cloud name
   - `VITE_CLOUDINARY_UPLOAD_PRESET` = your unsigned upload preset

## Run

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

## API Configuration

API base URL is defined in:

- `src/utils/apiPaths.js`

The app reads this environment variable:

- `VITE_API_BASE_URL`

Fallback for local development is `http://localhost:5000`.

Create a local env file if needed:

```bash
cp .env.example .env
```

## Deploy On Vercel

This project includes `vercel.json` with SPA rewrites so refresh on routes like `/dashboard` works.

Set this environment variable in Vercel project settings:

- `VITE_API_BASE_URL=https://your-backend-domain.vercel.app`

## Main Features

- User registration and login
- JWT-based protected dashboard access
- Income and expense management
- Dashboard charts and summaries
- Excel download for income/expense records
- Profile image upload

## Frontend Structure

- `src/pages` - auth and dashboard pages
- `src/components` - reusable UI components and charts
- `src/hooks` - custom hooks (including auth hook)
- `src/utils` - API paths, axios instance, helpers
- `src/context` - shared app state
