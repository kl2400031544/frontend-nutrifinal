# 🚀 Complete Automation Guide - NutriGuard

## Choose Your Preferred Method

---

## 1️⃣ **EASIEST - Double-Click (Windows)**

1. Navigate to the project folder: `C:\Users\akshi\OneDrive\Desktop\nutri\nutri`
2. **Double-click** `start.bat`
3. The dev server starts automatically
4. Browser opens to http://localhost:5173

✨ **That's it!** No terminal knowledge needed.

---

## 2️⃣ **Terminal Command (Windows)**

Open PowerShell in the project folder and run:

```powershell
.\start.ps1
```

Or use the batch file:
```powershell
.\start.bat
```

---

## 3️⃣ **Terminal Command (Mac/Linux)**

Open terminal in the project folder and run:

```bash
chmod +x start.sh
./start.sh
```

---

## 4️⃣ **Make Command (All Platforms)**

If you have `make` installed:

```bash
make start    # Install deps (if needed) and start dev server
make dev      # Just start dev server
make install  # Just install dependencies
make build    # Build for production
make clean    # Remove all dependencies
```

---

## 5️⃣ **Manual NPM Commands**

### First Time Only
```bash
cd nutri
npm install --legacy-peer-deps
```

### Every Time You Want to Run
```bash
npm run dev
```

### Other Commands
```bash
npm run build      # Build for production
npm run preview    # Test production build locally
npm run lint       # Check code quality
```

---

## 📊 Comparison Table

| Method | Difficulty | Speed | Best For |
|--------|-----------|-------|----------|
| Double-Click `.bat` | ⭐ (Easiest) | Fastest | Non-developers |
| PowerShell Script | ⭐⭐ (Easy) | Fast | Windows users |
| Bash Script | ⭐⭐ (Easy) | Fast | Mac/Linux users |
| Make Command | ⭐⭐ (Easy) | Medium | Developers |
| Manual NPM | ⭐⭐⭐ (Intermediate) | Flexible | Terminal experts |

---

## 🎯 Quick Decision Guide

**Choose based on your skill level:**

- **"I just want to run the app"** → Use `start.bat` (Windows) or `start.sh` (Mac/Linux)
- **"I like using the terminal"** → Use `make start` or manual npm commands
- **"I'm a developer who likes automating things"** → Use the Makefile
- **"I prefer PowerShell"** → Use `start.ps1`

---

## 🔑 After Starting

The dev server will display:

```
VITE v8.0.10 ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Test Credentials:
- **Admin**: admin@nutriguard.com / Admin@123
- **User**: user@nutriguard.com / User@123

---

## 🆘 Troubleshooting

### "Permission denied" error on Mac/Linux?
```bash
chmod +x start.sh
./start.sh
```

### "Port 5173 is already in use"?
✅ No problem! The app automatically uses 5174, 5175, etc.

### Need to clear everything?
```bash
make clean
make start
```

Or manually:
```bash
rm -r node_modules package-lock.json
npm install --legacy-peer-deps
npm run dev
```

---

## 💾 For CI/CD or Deployment

```bash
# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# The dist/ folder is ready to deploy
```

---

## 📝 Pro Tips

✅ **Fastest on subsequent runs**: Just use `npm run dev` (no install needed)
✅ **Save time**: Use `make start` if you have Make installed
✅ **Automation**: Scripts automatically check for dependencies and install if missing
✅ **HMR enabled**: Changes auto-reload in browser without losing state

---

**Start using NutriGuard with your preferred method! 🎉**
