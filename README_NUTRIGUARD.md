# NutriGuard — Nutrition Tracking & Deficiency Detection

A complete, production-ready React 18 + Vite frontend for **NutriGuard**, a web application designed to balance diets and detect nutrient deficits in children and adolescents.

## 🚀 Features

### For Users
- 📊 **Dashboard**: Overview of daily nutrition, calories, deficiencies, and streaks
- 🍽️ **Meal Logging**: Log meals by food type with portion tracking
- 📈 **Nutrient Analysis**: View detailed nutrient intake vs RDA with charts
- 🎯 **Diet Plans**: AI-generated 7-day personalized meal plans
- 🔄 **Food Swaps**: Smart suggestions to fix nutrient deficiencies
- 📉 **Progress Tracking**: Historical trends and milestone achievements
- 👤 **Profile Management**: Manage health data, allergies, preferences

### For Admins
- 📊 **Dashboard**: System-wide metrics and alerts
- 🗄️ **Food Database**: Manage nutritional database with full CRUD
- 👥 **User Management**: Monitor users and their deficiencies
- ⚙️ **RDA Configuration**: Manage age-based nutritional standards
- 🔔 **Interventions**: Send health alerts and notifications
- 📊 **Analytics**: Population-level insights and trends

## 🛠️ Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool
- **React Router v6** — Client-side routing
- **Tailwind CSS** — Styling
- **Recharts** — Data visualization
- **React Hook Form + Zod** — Form management & validation
- **Zustand** — State management
- **Axios** — HTTP client
- **React Hot Toast** — Notifications
- **Lucide React** — Icon library

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Clone and navigate to project
cd nutri

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Development

```bash
npm run dev
```

The app runs on `http://localhost:5173` with Vite's HMR enabled.

### Production Build

```bash
npm run build
npm run preview
```

## 🔐 Authentication

### Demo Credentials

**Admin Account**
- Email: `admin@nutriguard.com`
- Password: `Admin@123`

**User Account**
- Email: `user@nutriguard.com`
- Password: `User@123`

## 📁 Project Structure

```
src/
├── api/              # API clients (authApi, userApi, adminApi)
├── components/       # Reusable UI components
│   ├── ui/          # Base components (Button, Input, Modal, etc.)
│   ├── layout/      # Layout components (AppShell, Sidebar, TopBar)
│   ├── charts/      # Chart components (Recharts wrappers)
│   └── shared/      # Shared business components
├── pages/           # Page components
│   ├── auth/        # Login, Register
│   ├── user/        # User features
│   └── admin/       # Admin features
├── store/           # Zustand stores (authStore, mealStore)
├── hooks/           # Custom React hooks
├── utils/           # Utilities (validators, formatters, calculators)
├── constants/       # App constants (nutrients, RDA values)
├── App.jsx          # Main routing
└── main.jsx         # Entry point
```

## 🎨 Design System

### Colors
- **Brand Green**: `#0E9254` — Primary actions
- **Slate**: Neutral palette for backgrounds & text
- **Semantic**: Red (danger), Amber (warning)

### Typography
- **Display**: Playfair Display (headings)
- **Body**: DM Sans (content)
- **Mono**: JetBrains Mono (code)

### Components

All components follow the design spec with consistent styling:
- `<Button />` — Primary, secondary, danger, ghost variants
- `<Input />` — With validation, icons, password toggles
- `<Card />` — White rounded container
- `<Badge />` — Status badges (success, warning, danger, info)
- `<Modal />` — Portal-based with Escape to close
- `<ProgressBar />` — With auto-coloring
- Charts with Recharts integration

## 🔄 API Integration

The app uses Axios with automatic token handling:

```javascript
// axiosInstance.js
- Automatically attaches Bearer token
- Handles 401 (redirect to /login)
- Handles 403 (access denied toast)
- Handles 500 (server error toast)
- Network errors show "Cannot reach server"
```

**Base URL**: `import.meta.env.VITE_API_URL` (default: `http://localhost:8080/api`)

## 📋 Validation

All forms use **react-hook-form + Zod** with real-time validation:

| Field | Rules |
|-------|-------|
| Email | Valid RFC format |
| Password | 8+ chars, 1 uppercase, 1 number, 1 special char |
| Age | 6–18 years |
| Weight | 10–150 kg |
| Height | 80–220 cm |
| Food Name | 2–100 chars |

## 🔑 Key Features

### Authentication Flow
1. User logs in or registers
2. Token stored in Zustand + localStorage
3. On app load, token validated via GET `/auth/me`
4. Expired token triggers redirect to `/login`
5. Role-based access control (USER vs ADMIN)

### Nutrient Tracking
- Calculate daily totals from logged meals
- Compare against RDA (age & gender specific)
- Flag deficiencies: red <50%, amber 50–69%, green ≥70%
- Suggest food swaps and improvements

### State Management
- **authStore**: User, token, auth functions
- **mealStore**: Meals, date selection
- Form state via react-hook-form (local component state)

## 🎯 Usage

### For Users

1. **Register** with health info (age, weight, height, allergies)
2. **Log meals** daily with portion tracking
3. **View analysis** to identify deficiencies
4. **Get food swaps** to fix gaps
5. **Track progress** over time

### For Admins

1. **Monitor population** deficiencies
2. **Manage food database** (add, edit, delete)
3. **Configure RDA values** per age group
4. **Send interventions** to at-risk users
5. **Analyze trends** via charts

## 🧪 Testing Login

Use the **demo credentials** on the login page to test both user and admin flows.

## 📝 Environment Variables

```bash
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=true                        # Use mock data (no backend)
VITE_APP_NAME=NutriGuard
```

## 🚀 Deployment

1. Build: `npm run build` → creates `dist/`
2. Deploy to Vercel, Netlify, or any static host
3. Set `VITE_API_URL` to your backend API URL
4. Ensure CORS is configured on backend

## 📊 Supported Nutrients

1. Iron
2. Calcium
3. Vitamin D
4. Vitamin B12
5. Zinc
6. Protein
7. Fiber
8. Vitamin C
9. Folate
10. Magnesium
11. Potassium
12. Omega-3

## 🤝 Contributing

This is a complete, fully implemented frontend. Extend by:
- Adding new nutrient types in `/constants/nutrients.js`
- Creating new pages in `/pages/`
- Adding new UI components in `/components/ui/`
- Extending Zustand stores in `/store/`

## 📄 License

Copyright © 2026 NutriGuard. All rights reserved.
