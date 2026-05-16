# Quick Start Guide

Get your portfolio website running in 5 minutes!

## Prerequisites Check

Before starting, ensure you have:
- [ ] Node.js installed (v18+) - Check with `node --version`
- [ ] npm installed - Check with `npm --version`
- [ ] MongoDB installed OR MongoDB Atlas account

## Step-by-Step Setup

### 1. Install Dependencies (2 minutes)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Set Up MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# macOS
brew services start mongodb-community

# Windows
net start MongoDB

# Linux
sudo systemctl start mongodb
```

**Option B: MongoDB Atlas**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Skip to step 3 and use Atlas URI

### 3. Configure Backend (30 seconds)

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:
```env
# For local MongoDB (default):
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Keep these as-is for development:
PORT=5000
JWT_SECRET=dev-secret-change-in-production
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

### 4. Seed Database (30 seconds)

```bash
# Still in server directory
npm run seed
```

You should see:
```
✅ Database seeded successfully!

Admin Credentials:
Email: admin@portfolio.com
Password: admin123
```

### 5. Start Everything (30 seconds)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Wait for: `Server running in development mode on port 5000`

**Terminal 2 - Frontend:**
```bash
# In root directory
npm run dev
```

Wait for: `Local: http://127.0.0.1:3000/`

### 6. Test It! (30 seconds)

Open your browser:

1. **Public Site**: http://localhost:3000
   - Should see homepage with hero section

2. **Admin Login**: http://localhost:3000/login
   - Email: `admin@portfolio.com`
   - Password: `admin123`

3. **Admin Dashboard**: http://localhost:3000/padmin
   - Should see dashboard with stats

## Verify Everything Works

### Test Checklist
- [ ] Homepage loads
- [ ] Can navigate to /clients and /recruiters
- [ ] Can login with admin credentials
- [ ] Admin dashboard displays
- [ ] Can create a new project
- [ ] Can edit site content
- [ ] Contact form works

### Quick API Test

```bash
# Health check
curl http://localhost:5000/api/health

# Get projects
curl http://localhost:5000/api/projects

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

## Common Issues & Fixes

### "MongoDB connection failed"
```bash
# Check if MongoDB is running
# macOS:
brew services list

# Windows:
net start MongoDB

# Linux:
sudo systemctl status mongodb
```

### "Port 5000 already in use"
```bash
# Change PORT in server/.env to 5001
# Or kill the process:
# macOS/Linux:
lsof -ti:5000 | xargs kill

# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### "Cannot find module"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

cd server
rm -rf node_modules package-lock.json
npm install
```

### "CORS error"
- Ensure backend is running on port 5000
- Ensure frontend is running on port 3000
- Check `CLIENT_URL` in `server/.env`

### "Authentication not working"
```bash
# Clear browser data
# Chrome: Ctrl+Shift+Delete
# Then clear cookies and localStorage

# Or use incognito mode
```

## What's Next?

### Customize Your Portfolio

1. **Add Your Projects**
   - Login to admin dashboard
   - Go to Projects tab
   - Click "Add Project"

2. **Write Articles**
   - Go to Articles tab
   - Create your first blog post

3. **Update Site Content**
   - Go to Hero tab
   - Edit headline and tagline
   - Update About section

4. **Add Team Members**
   - Go to Team tab
   - Add your profile

5. **Customize Skills**
   - Go to Skills tab
   - Add your technical skills

### Change Admin Password

```bash
# Option 1: Via seed script
# Edit server/.env:
ADMIN_PASSWORD=your-new-password

# Re-seed database:
cd server
npm run seed

# Option 2: Via MongoDB
mongo portfolio
db.users.updateOne(
  { email: "admin@portfolio.com" },
  { $set: { password: "<bcrypt-hash>" } }
)
```

### Deploy to Production

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for deployment guide.

## Development Workflow

```bash
# Daily workflow:

# 1. Start MongoDB (if local)
brew services start mongodb-community

# 2. Start backend (Terminal 1)
cd server && npm run dev

# 3. Start frontend (Terminal 2)
npm run dev

# 4. Make changes and test

# 5. Commit changes
git add .
git commit -m "Your changes"
git push
```

## Need More Help?

- **Detailed Setup**: [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- **Architecture**: [BACKEND_IMPLEMENTATION.md](./BACKEND_IMPLEMENTATION.md)
- **API Docs**: [server/README.md](./server/README.md)
- **Main README**: [README.md](./README.md)

## Success! 🎉

You now have a fully functional portfolio website with:
- ✅ React frontend
- ✅ Node.js backend
- ✅ MongoDB database
- ✅ Admin dashboard
- ✅ Authentication
- ✅ CRUD operations

Start customizing and make it your own!
