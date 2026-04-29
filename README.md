# NutriGuard - Comprehensive Adolescent Nutrition Monitoring Platform

A production-ready React 18 + Vite application for real-time nutrition monitoring and intervention delivery. Features complete USER and ADMIN role separation with **real-time synchronization**, comprehensive nutrient tracking, and AI-powered interventions.

## ✨ Key Features

### User Features (7 Pages)
- **Dashboard** - Real-time metrics, meal tracking, interventions, notifications
- **Meal Log** - Log meals with Indian food database (20+ foods)
- **Nutrient Analysis** - Visual nutrient intake analysis vs RDA
- **Diet Plan** - AI-generated personalized diet plans
- **Food Swaps** - Smart food substitution recommendations
- **Progress Tracking** - Visual charts and progress metrics
- **Profile Management** - User preferences and health info

### Admin Features (7 Pages)
- **Overview Dashboard** - Real-time population metrics and alerts
- **User Activity Monitor** - Live user action feed (NEW ✨)
- **User Management** - Manage users and track engagement
- **Intervention Management** - Send & track interventions in real-time
- **Food Database** - Manage food items and nutrients
- **RDA Configuration** - Customize RDA values
- **Analytics** - Population-wide analytics and trends

### Real-Time Synchronization (NEW ✨)
- **EventEmitter-based pub/sub system** - Instant event broadcasting
- **Live admin dashboards** - Real-time user metrics updates
- **Real-time interventions** - Admins send, users receive instantly
- **Activity monitoring** - Live user action feeds
- **Status updates** - Track intervention acknowledgments in real-time
- **No backend required** - Mock mode supports full sync testing

### Authentication & Authorization
- Role-based access (USER / ADMIN)
- Protected routes with automatic redirects
- Token-based auth with localStorage persistence
- Demo credentials included

### Data & Analytics
- 20+ Indian foods with complete nutrient profiles
- Comprehensive RDA data for adolescents
- Real-time deficiency detection
- Visual nutrient charts and trends

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

Or use automation scripts (see [AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md)):
- Windows: Double-click `start.bat`
- PowerShell: `.\start.ps1`
- Make: `make start`

### Default Demo Credentials

**User Account:**
- Email: `user@nutriguard.com`
- Password: `User@123`
- Role: USER

**Admin Account:**
- Email: `admin@nutriguard.com`
- Password: `Admin@123`
- Role: ADMIN

### Dev Server
- URL: `http://localhost:5175`
- HMR enabled
- Mock API mode: `VITE_USE_MOCK=true`

## 📁 Project Structure

```
src/
├── pages/
│   ├── auth/              # Login & Register
│   ├── user/              # 7 user pages
│   └── admin/             # 7 admin pages (+ Activity Monitor)
├── components/
│   ├── layout/            # AppShell, Sidebar, TopBar
│   ├── ui/                # Reusable components (Button, Card, Badge, etc)
│   ├── charts/            # Data visualization
│   └── shared/            # Shared components
├── hooks/
│   ├── useAuth.js         # Authentication hook
│   └── useSync.js         # Sync hooks (useSync, useSyncAdmin, useSyncListener)
├── store/
│   ├── authStore.js       # Auth state (Zustand)
│   └── syncStore.js       # Sync state + EventEmitter (NEW)
├── api/
│   ├── authApi.js         # Auth endpoints
│   ├── userApi.js         # User endpoints
│   └── adminApi.js        # Admin endpoints
└── utils/
    ├── formatters.js      # Data formatting utilities
    ├── validators.js      # Form validators
    └── constants.js       # App constants
```

## 🔄 Real-Time Synchronization

### Architecture
- **EventEmitter** - Publish/subscribe event system
- **Sync Store** - Zustand store managing all sync operations
- **Hooks** - `useSync()`, `useSyncAdmin()`, `useSyncListener()`

### Event Types
```javascript
'meal_logged'              // User logs meal
'meal_deleted'             // User deletes meal
'deficiency_detected'      // System detects deficiency
'profile_updated'          // User updates profile
'intervention_sent'        // Admin sends intervention
'intervention_acknowledged' // User acknowledges intervention
'user_activity'            // Generic user activity
'notification_added'       // New notification created
```

### Usage Examples

**Track user action:**
```javascript
const { trackMealLogged } = useSync()
trackMealLogged(meal, nutrients)  // Broadcasts to all admins
```

**Listen for admin updates:**
```javascript
const { newNotification } = useSync()
useEffect(() => {
  if (newNotification?.type === 'intervention_received') {
    showInterventionBanner()
  }
}, [newNotification])
```

**Admin real-time dashboard:**
```javascript
const { userActivityFeed } = useSyncAdmin()
useEffect(() => {
  // Update metrics as userActivityFeed updates
}, [userActivityFeed])
```

See [SYNC_IMPLEMENTATION_GUIDE.md](SYNC_IMPLEMENTATION_GUIDE.md) for complete documentation.

## 🎨 Design System

**Colors:**
- Primary: NutriGuard Green (#0E9254)
- Neutral: Slate 50-900
- Semantic: Red (danger), Amber (warning), Green (success), Blue (info)

**Typography:**
- Display: Playfair Display
- Body: DM Sans
- Code: JetBrains Mono

**Components:**
- Button (primary, secondary, outlined, danger)
- Card (elevated, bordered)
- Badge (success, warning, danger, info)
- DeficiencyAlert
- Chart components (Bar, Line, Weekly Trend)

## 📊 Integrated Components (55+ Files)

- **6 Chart Components** - Data visualization
- **12 UI Components** - Reusable design elements
- **7 Layout Components** - Page structure
- **14 Page Components** - Full app pages
- **3 API Modules** - Backend integration
- **Multiple utilities & hooks**

## 🔐 Security & State Management

- **Zustand** - Efficient state management with persistence
- **React Router** - Protected routes
- **Axios** - HTTP client with interceptors
- **localStorage** - Secure token + auth state storage
- **CORS-ready** - Mock API compatible with backend

## 🛠️ Development

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

### Mock API Mode

Set `VITE_USE_MOCK=true` in `.env` to enable mock data:
- No backend required
- Realistic data responses
- Full CRUD operations simulated
- Perfect for testing

### Environment Variables

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK=true
```

## ✅ Tested & Verified

- ✅ 55+ files fully implemented (no placeholders)
- ✅ All 14 pages functional with mock data
- ✅ Authentication working with persistence
- ✅ Real-time sync tested end-to-end
- ✅ Responsive design (mobile-first)
- ✅ Production build optimized
- ✅ HMR working in dev mode

## 📚 Documentation

- [SYNC_IMPLEMENTATION_GUIDE.md](SYNC_IMPLEMENTATION_GUIDE.md) - Real-time sync patterns & API
- [AUTOMATION_GUIDE.md](AUTOMATION_GUIDE.md) - Setup automation scripts
- [QUICK_START.md](QUICK_START.md) - Development quick start

## 🚢 Deployment

### Production Build
```bash
npm run build
```

Outputs optimized files to `dist/` directory.

### Environment Setup
1. Create `.env.production`
2. Set `VITE_API_BASE_URL` to your backend
3. Set `VITE_USE_MOCK=false` to use real API
4. Deploy `dist/` folder

### Backend Integration
Replace mock API implementations in:
- `src/api/authApi.js`
- `src/api/userApi.js`
- `src/api/adminApi.js`

Connect with your Node.js/Django/FastAPI backend.

## 🐛 Troubleshooting

### Blank dashboard after login
→ Fixed: `isAuthenticated` now persists in localStorage

### npm dependency conflicts
→ Use: `npm install --legacy-peer-deps` (React 19 compatibility)

### Sync events not broadcasting
→ Verify: `useSync()` or `useSyncAdmin()` hook is initialized

See [SYNC_IMPLEMENTATION_GUIDE.md](SYNC_IMPLEMENTATION_GUIDE.md#troubleshooting) for more.

## 📦 Dependencies

- React 18+ with Hooks
- Vite (fast build tool)
- React Router (navigation)
- Zustand (state management)
- Axios (HTTP client)
- Tailwind CSS (styling)
- Lucide React (icons)
- Recharts (charts)
- Zod (validation)
- clsx (conditional CSS)

## 📄 License

This project is provided as-is for educational and demonstration purposes.
