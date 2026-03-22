# Expense Tracker — Frontend

A responsive single-page application (SPA) built with React 19 and Vite. Provides a full personal finance dashboard with interactive charts, transaction management, and Excel export. Deployed on Vercel.

## Tech Stack

| Technology         | Version | Purpose                                        |
| ------------------ | ------- | ---------------------------------------------- |
| React              | 19      | UI framework                                   |
| Vite               | 7       | Build tool and dev server                      |
| Tailwind CSS       | 4       | Utility-first CSS framework                    |
| React Router       | 7       | Client-side routing                            |
| Axios              | 1.x     | HTTP client with request/response interceptors |
| Recharts           | 3.x     | Composable chart library                       |
| Cloudinary         | —       | Direct browser-to-cloud image upload           |
| React Hot Toast    | 2.x     | Toast notification system                      |
| Moment.js          | 2.x     | Date parsing and formatting                    |
| emoji-picker-react | 4.x     | Emoji selector for transaction icons           |

## Local Setup

```bash
npm install
cp .env.example .env
```

Configure `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
```

**Setting up Cloudinary upload preset:**

1. Login to [cloudinary.com](https://cloudinary.com)
2. Go to **Settings → Upload → Upload Presets**
3. Create a new preset with Signing Mode set to **Unsigned**
4. Copy the preset name into `VITE_CLOUDINARY_UPLOAD_PRESET`

```bash
npm run dev
```

App runs at [http://localhost:5173](http://localhost:5173)

## Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start development server with HMR    |
| `npm run build`   | Build optimized production bundle    |
| `npm run preview` | Locally preview the production build |
| `npm run lint`    | Run ESLint                           |

## Project Structure

```
src/
├── App.jsx                  # Route definitions and root layout
├── main.jsx                 # React DOM entry point
├── context/
│   └── UserContext.jsx      # Global auth state (user info, token)
├── hooks/
│   └── useUserAuth.jsx      # Redirect unauthenticated users to login
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   └── Dashboard/
│       ├── Home.jsx         # Dashboard overview page
│       ├── Income.jsx
│       └── Expense.jsx
├── components/
│   ├── layouts/             # DashboardLayout, AuthLayout, Navbar, SideMenu
│   ├── Charts/              # CustomBarChart, CustomLineChart, CustomPieChart
│   ├── Dashboard/           # RecentTransactions, FinanceOverview, Last30DaysExpenses
│   ├── Income/              # AddIncomeForm, IncomeList, IncomeOverview
│   ├── Expense/             # AddExpenseFrom, ExpenseList, ExpenseOverview
│   ├── Cards/               # InfoCard, TransactionInfoCard, CharAvatar
│   └── Inputs/              # Input, ProfilePhotoSelector
└── utils/
    ├── apiPaths.js          # Centralized API endpoint constants
    ├── axiosinstance.js     # Axios instance with JWT + error interceptors
    ├── uploadImage.js       # Cloudinary upload (with local backend fallback)
    ├── helper.js            # Data formatting and chart data preparation
    └── data.js              # Static data (side menu config, etc.)
```

## Key Implementation Details

**Axios interceptors** (`src/utils/axiosinstance.js`)

- Request interceptor automatically attaches `Authorization: Bearer <token>` from localStorage
- Response interceptor handles 401 (redirects to login) and 500 errors globally

**Protected routing** (`src/hooks/useUserAuth.jsx`)

- Custom hook used on every dashboard page
- Verifies token validity against backend on mount and redirects to `/login` if invalid

**Client-side image upload** (`src/utils/uploadImage.js`)

- Images upload directly from the browser to Cloudinary using an unsigned upload preset
- Returns a `secure_url` which is then saved to the user record in MongoDB
- Local backend upload mode is included as a commented fallback for non-serverless deployments

**SPA routing on Vercel** (`vercel.json`)

- All requests are rewritten to `index.html` so React Router handles navigation on hard refresh

## Deployment (Vercel)

| Setting          | Value                      |
| ---------------- | -------------------------- |
| Root Directory   | `frontend/expense-tracker` |
| Framework Preset | Vite                       |

**Required environment variables in Vercel:**

| Variable                        | Value                       |
| ------------------------------- | --------------------------- |
| `VITE_API_BASE_URL`             | Your backend Vercel URL     |
| `VITE_CLOUDINARY_CLOUD_NAME`    | Your Cloudinary cloud name  |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | Your unsigned upload preset |
