# NutriGuard Frontend - Complete Setup & Run Guide

## 🚀 Quick Start (Choose One)

### **Option 1: Double-Click (EASIEST - Windows)**
1. Navigate to project folder: `C:\Users\akshi\OneDrive\Desktop\nutri\nutri`
2. **Double-click** `start.bat`
3. Dev server starts automatically
4. Open: http://localhost:5175 (or next available port)

---

### **Option 2: PowerShell Terminal (Windows)**
```powershell
.\start.ps1
```

---

### **Option 3: Manual Commands**
```powershell
npm install --legacy-peer-deps
npm run dev
```

---

## 🔑 Demo Credentials

After starting, login with:

| Account | Email | Password |
|---------|-------|----------|
| Admin | admin@nutriguard.com | Admin@123 |
| User | user@nutriguard.com | User@123 |

---

## 📦 What's Included

✅ **55+ Files** - Complete React 18 + Vite frontend  
✅ **15 Pages** - Login, Register, User Dashboard, Admin Panel, etc.  
✅ **21 Components** - Reusable UI, Layout, Charts  
✅ **Mock Data** - No backend needed, works standalone  
✅ **Tailwind CSS** - Responsive design system  
✅ **Form Validation** - Zod + React Hook Form  
✅ **State Management** - Zustand with persistence  

---

## ⚡ Available Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Check code quality
```

---

## 🎯 Important Notes

### ⚠️ Always Use `--legacy-peer-deps`
React 19 has compatibility issues with some packages. Always use:
```bash
npm install --legacy-peer-deps
```

### Port Already in Use?
✅ The app automatically tries the next available port (5174, 5175, etc.)

### Need to Reinstall Dependencies?
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## 📁 Project Structure

```
nutri/
├── src/
│   ├── pages/          # 15 pages (auth, user, admin)
│   ├── components/     # 21 reusable components
│   ├── api/            # Axios + API clients
│   ├── store/          # Zustand stores
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Validators, formatters, mock data
│   └── constants/      # Nutrient definitions
├── package.json        # Dependencies
├── tailwind.config.js  # Design system
├── vite.config.js      # Vite config
├── start.bat           # Windows batch script
├── start.ps1           # PowerShell script
├── start.sh            # Bash script
└── Makefile            # Make commands

```

---

## 🔧 Troubleshooting

**Q: "Cannot find npm"**  
A: Make sure Node.js is installed. Download from https://nodejs.org/

**Q: "Port 5173 is in use"**  
A: Normal! The app automatically uses 5174, 5175, etc.

**Q: "Permission denied" on Mac/Linux**  
A: Run: `chmod +x start.sh && ./start.sh`

**Q: Everything is broken**  
A: Clean and reinstall:
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## ✨ Features

### For Users:
- 📊 Dashboard with daily metrics
- 🍽️ Meal logging
- 📈 Nutrient analysis
- 🎯 Diet plans
- 🔄 Food swap recommendations
- 📉 Progress tracking
- 👤 Profile management

### For Admins:
- 👥 User monitoring
- 🗄️ Food database management
- ⚙️ RDA configuration
- 🔔 Intervention system
- 📊 Analytics & insights

---

## 🎓 Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v6** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form + Zod** - Forms & validation
- **Recharts** - Data visualization

---

## 📞 Support

For detailed guides, see:
- `QUICK_START.md` - Quick reference
- `AUTOMATION_GUIDE.md` - All automation options
- `README_NUTRIGUARD.md` - Full feature documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical details

---

**Ready to start? Use one of the Quick Start options above! 🚀**
