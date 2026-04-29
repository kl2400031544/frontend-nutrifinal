# 🚀 Quick Start Guide - NutriGuard

## ⚡ Fastest Way to Run (One Click)

### Windows Users
Simply **double-click** the `start.bat` file in the project root:
```
start.bat
```
This will automatically:
- ✅ Install dependencies (if needed)
- ✅ Start the dev server
- ✅ Display demo credentials

### Mac/Linux Users
Run the `start.sh` script:
```bash
chmod +x start.sh
./start.sh
```

---

## 📋 Manual Commands (If You Prefer)

### First Time Setup
```bash
cd nutri
npm install --legacy-peer-deps
```

### Start Development Server
```bash
npm run dev
```

The app will be available at:
- **http://localhost:5173** (or 5174 if port is busy)

---

## 🔑 Demo Credentials

Use these to test the app:

**Admin Account:**
- Email: `admin@nutriguard.com`
- Password: `Admin@123`

**User Account:**
- Email: `user@nutriguard.com`
- Password: `User@123`

---

## 📦 Other Useful Commands

```bash
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

---

## ✨ Features Available

✅ **User Dashboard** - View daily metrics and deficiencies
✅ **Meal Logging** - Log meals by type
✅ **Nutrient Analysis** - Detailed nutrient tracking
✅ **Diet Plans** - 7-day meal plans
✅ **Food Swaps** - Smart recommendations
✅ **Progress Tracking** - Historical trends
✅ **Profile Management** - Update health info
✅ **Admin Dashboard** - Population monitoring
✅ **Food Database** - CRUD operations
✅ **Analytics** - System-wide insights

---

## 🐛 Troubleshooting

**Port Already in Use?**
- The app will automatically try the next available port (5174, 5175, etc.)

**Dependency Issues?**
```bash
npm install --legacy-peer-deps
```

**Want to clear everything and start fresh?**
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 🟢 Real-Time Sync Demo (User & Admin)

1. **Open two browser tabs:**
   - Tab 1: Log in as a **User** (use demo credentials from the login page)
   - Tab 2: Log in as an **Admin**
2. **Try these actions:**
   - Log a meal as the user. See the update appear instantly on the Admin Dashboard and User Activity Monitor.
   - Send an intervention or alert from the Admin Interventions page. See the notification appear live on the User Dashboard.
   - Update the user's diet plan as admin. The Diet Plan page for the user will refresh in real time.
3. **No backend required!**
   - All sync is handled in-browser using the custom event bus and Zustand store.

---

## 📖 Further Documentation
- [SYNC_IMPLEMENTATION_GUIDE.md](SYNC_IMPLEMENTATION_GUIDE.md): How the sync system works and how to extend it.
- [SYNC_TESTING_GUIDE.md](SYNC_TESTING_GUIDE.md): Step-by-step testing instructions.
- [COMPLETION_FINAL_REPORT.md](COMPLETION_FINAL_REPORT.md): Executive summary and verification status.

---

## ✅ Project Status
- Real-time sync: **COMPLETE**
- Build: **PASSING**
- Ready for deployment or further extension.
