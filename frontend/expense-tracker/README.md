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

API base URL is currently defined in:

- `src/utils/apiPaths.js`

Current value:

- `http://localhost:5000`

Make sure the backend runs on port `5000` or update that file accordingly.

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
