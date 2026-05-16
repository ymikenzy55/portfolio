# 🚀 START HERE - Portfolio Website Setup

## Current Status

✅ Frontend dependencies installed  
✅ Backend dependencies installed  
✅ Environment files configured  
✅ Code updated to use real backend  
⚠️ **MongoDB needs to be installed**  

## What You Need To Do Now

### Option 1: Quick Setup with MongoDB Atlas (Cloud) - 10 minutes

**Best for**: Quick start, no local installation needed

1. **Create free MongoDB Atlas account**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (it's free!)

2. **Create a cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Click "Create"
   - Wait 3-5 minutes

3. **Create database user**
   - Click "Database Access"
   - Add user: `admin` with a password (save it!)
   - Role: "Atlas admin"

4. **Allow network access**
   - Click "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"

5. **Get connection string**
   - Click "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string

6. **Update server/.env**
   ```env
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   (Replace YOUR_PASSWORD with your actual password)

7. **Seed and start**
   ```bash
   cd server
   npm run seed
   npm run dev
   ```

8. **Start frontend** (new terminal)
   ```bash
   npm run dev
   ```

9. **Done!** Visit http://localhost:3000

---

### Option 2: Local MongoDB Installation - 15 minutes

**Best for**: Offline development, faster performance

1. **Download MongoDB**
   - Visit: https://www.mongodb.com/try/download/community
   - Download Windows x64 MSI

2. **Install**
   - Run the installer
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Install MongoDB Compass"
   - Click Install

3. **Verify installation**
   ```powershell
   mongosh
   ```
   You should see MongoDB shell. Type `exit` to quit.

4. **Seed database**
   ```bash
   cd server
   npm run seed
   ```

5. **Start backend**
   ```bash
   npm run dev
   ```

6. **Start frontend** (new terminal)
   ```bash
   npm run dev
   ```

7. **Done!** Visit http://localhost:3000

---

## After Setup

### Login Credentials
- **URL**: http://localhost:3000/login
- **Email**: admin@portfolio.com
- **Password**: admin123

### What You Can Do
- ✅ View portfolio homepage
- ✅ Login to admin dashboard
- ✅ Add/edit projects
- ✅ Write articles
- ✅ Manage team members
- ✅ View contact submissions
- ✅ Edit hero content

---

## Troubleshooting

### MongoDB won't connect?
- **Atlas**: Check IP whitelist and password
- **Local**: Run `net start MongoDB` in PowerShell

### Port already in use?
- Change `PORT=5001` in `server/.env`
- Change `VITE_API_URL=http://localhost:5001/api` in `.env`

### Can't login?
- Run `npm run seed` in server folder
- Clear browser localStorage: `localStorage.clear()` in console

### Need more help?
- See `COMPLETE_SETUP.md` for detailed guide
- See `MONGODB_INSTALLATION.md` for MongoDB help
- See `BACKEND_SETUP_GUIDE.md` for backend details

---

## Quick Commands

```bash
# Seed database (run once)
cd server && npm run seed

# Start backend (Terminal 1)
cd server && npm run dev

# Start frontend (Terminal 2)
npm run dev

# View database (if using local MongoDB)
mongosh
use portfolio
db.users.find()
```

---

## 📚 Documentation

- `COMPLETE_SETUP.md` - Full setup guide
- `MONGODB_INSTALLATION.md` - MongoDB installation
- `BACKEND_SETUP_GUIDE.md` - Backend details
- `BACKEND_IMPLEMENTATION.md` - Architecture

---

## 🎯 Recommended Path

1. **Choose MongoDB option** (Atlas is faster to start)
2. **Follow steps above**
3. **Seed database**
4. **Start both servers**
5. **Login and explore**
6. **Customize your content**

---

**Need help? Check the documentation files or the troubleshooting section above!**

**Ready to start? Pick Option 1 or Option 2 above! 🚀**
