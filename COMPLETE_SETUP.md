# Complete Portfolio Website Setup

## 🎯 Overview

This is a full-stack portfolio website with:
- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + MongoDB
- **Authentication**: JWT-based auth system
- **Database**: MongoDB (local or cloud)

## 📋 Prerequisites Checklist

Before starting, install:

- [ ] Node.js (v16+) - https://nodejs.org/
- [ ] MongoDB (see MONGODB_INSTALLATION.md)
- [ ] Git (optional)
- [ ] Code editor (VS Code recommended)

## 🚀 Quick Start (5 Steps)

### Step 1: Install MongoDB

**Choose one option:**

**Option A - Local Installation (Recommended)**
1. Download: https://www.mongodb.com/try/download/community
2. Install as Windows Service
3. Verify: `mongosh` in terminal

**Option B - Cloud (MongoDB Atlas)**
1. Sign up: https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update `server/.env` with connection string

📖 **Detailed guide**: See `MONGODB_INSTALLATION.md`

### Step 2: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 3: Configure Environment

Environment files are already created with default values:

**Frontend** (`.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend** (`server/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

✅ **No changes needed for local development!**

### Step 4: Seed the Database

```bash
cd server
npm run seed
```

Expected output:
```
MongoDB Connected: localhost
✓ Admin user created
✓ Sample data seeded
Database seeded successfully!
```

### Step 5: Start Both Servers

**Terminal 1 - Backend**:
```bash
cd server
npm run dev
```

Expected output:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

**Terminal 2 - Frontend**:
```bash
npm run dev
```

Expected output:
```
VITE ready in 703 ms
➜ Local: http://localhost:3000/
```

## 🎉 You're Done!

Visit: **http://localhost:3000**

Login at: **http://localhost:3000/login**
- Email: `admin@portfolio.com`
- Password: `admin123`

## 📁 Project Structure

```
portfolio-website/
├── src/                      # Frontend source
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── context/            # React context (auth)
│   ├── hooks/              # Custom hooks
│   ├── data/               # Static data
│   └── utils/              # Utilities
├── server/                  # Backend source
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error handling
│   ├── config/             # Database config
│   └── scripts/            # Seed script
├── public/                  # Static assets
└── dist/                    # Build output
```

## 🔑 Features

### Public Features
- ✅ Responsive portfolio homepage
- ✅ Project showcase with filtering
- ✅ Blog/articles section
- ✅ Contact form
- ✅ Team member profiles
- ✅ Process workflow page
- ✅ Animated UI components

### Admin Features (After Login)
- ✅ Dashboard with statistics
- ✅ Manage projects (CRUD)
- ✅ Manage articles (CRUD)
- ✅ View contact submissions
- ✅ Edit hero content
- ✅ Manage team members
- ✅ Gallery management
- ✅ Skills management

## 🛠️ Development

### Available Scripts

**Frontend**:
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

**Backend**:
```bash
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
npm run seed         # Seed database
```

### API Endpoints

Base URL: `http://localhost:5000/api`

**Authentication**:
- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

**Projects**:
- `GET /projects` - Get all projects
- `POST /projects` - Create (auth)
- `PUT /projects/:id` - Update (auth)
- `DELETE /projects/:id` - Delete (auth)

**Articles**:
- `GET /articles` - Get published
- `GET /articles/all` - Get all (auth)
- `POST /articles` - Create (auth)
- `PUT /articles/:id` - Update (auth)
- `DELETE /articles/:id` - Delete (auth)

**Contacts**:
- `GET /contacts` - Get all (auth)
- `POST /contacts` - Submit form
- `DELETE /contacts/:id` - Delete (auth)

**Team**:
- `GET /team` - Get all
- `POST /team` - Create (auth)
- `PUT /team/:id` - Update (auth)
- `DELETE /team/:id` - Delete (auth)

**Skills**:
- `GET /skills` - Get all
- `POST /skills` - Create (auth)
- `PUT /skills/:id` - Update (auth)
- `DELETE /skills/:id` - Delete (auth)

**Gallery**:
- `GET /gallery` - Get all
- `POST /gallery` - Create (auth)
- `PUT /gallery/:id` - Update (auth)
- `DELETE /gallery/:id` - Delete (auth)

**Site Content**:
- `GET /site-content` - Get content
- `PUT /site-content` - Update (auth)

## 🐛 Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError`

**Solutions**:
1. Check MongoDB is running:
   ```bash
   # Windows
   Get-Service MongoDB
   net start MongoDB
   ```

2. Verify connection string in `server/.env`

3. For Atlas: Check IP whitelist and credentials

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Change port in server/.env
PORT=5001

# Update frontend .env
VITE_API_URL=http://localhost:5001/api

# Restart both servers
```

### CORS Errors

**Error**: `Access blocked by CORS policy`

**Solution**:
1. Check `CLIENT_URL` in `server/.env` matches frontend URL
2. Restart backend server

### Can't Login

**Solutions**:
1. Clear browser data:
   ```javascript
   // Browser console
   localStorage.clear();
   location.reload();
   ```

2. Re-seed database:
   ```bash
   cd server
   npm run seed
   ```

3. Verify credentials:
   - Email: `admin@portfolio.com`
   - Password: `admin123`

### Frontend Not Loading Data

**Solutions**:
1. Check backend is running on port 5000
2. Check browser console for errors
3. Verify API_URL in `.env`
4. Check network tab in browser DevTools

## 📚 Documentation Files

- `BACKEND_SETUP_GUIDE.md` - Detailed backend setup
- `MONGODB_INSTALLATION.md` - MongoDB installation guide
- `BACKEND_IMPLEMENTATION.md` - Backend architecture
- `PROJECT_STRUCTURE.md` - Project file structure
- `TYPOGRAPHY.md` - Typography system

## 🔒 Security Notes

### Development
- Default credentials are fine for local development
- JWT secret is pre-configured
- CORS allows localhost

### Production
⚠️ **Before deploying**:

1. Change `JWT_SECRET` to a strong random string
2. Update `ADMIN_PASSWORD` to a secure password
3. Set `NODE_ENV=production`
4. Use MongoDB Atlas (not local MongoDB)
5. Enable HTTPS
6. Restrict CORS to your domain
7. Set up proper environment variables
8. Never commit `.env` files

## 🚢 Deployment

### Backend Deployment

**Recommended platforms**:
- Railway (easiest)
- Render
- Heroku
- DigitalOcean

**Steps**:
1. Create account on platform
2. Connect GitHub repo
3. Set environment variables
4. Deploy

### Frontend Deployment

**Recommended platforms**:
- Vercel (easiest)
- Netlify
- GitHub Pages

**Steps**:
1. Build: `npm run build`
2. Deploy `dist` folder
3. Set `VITE_API_URL` to production backend URL

### Database

**Production**: Use MongoDB Atlas
- Free tier available
- Automatic backups
- Scalable
- Secure

## 🎓 Learning Resources

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/

## 🤝 Need Help?

1. Check the troubleshooting section above
2. Review documentation files
3. Check browser console for errors
4. Check server terminal for errors
5. Verify MongoDB is running
6. Ensure all dependencies are installed

## ✅ Verification Checklist

After setup, verify:

- [ ] MongoDB is running
- [ ] Backend server starts without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Can login with admin credentials
- [ ] Admin dashboard loads
- [ ] Can create/edit projects
- [ ] Contact form works
- [ ] All pages load correctly

## 🎯 Next Steps

1. ✅ Complete setup (you're here!)
2. 📝 Customize content in admin dashboard
3. 🎨 Modify styles to match your brand
4. 📸 Add your own images
5. 📱 Test on mobile devices
6. 🚀 Deploy to production

---

**Happy coding! 🚀**

If you encounter any issues, refer to the specific documentation files or check the troubleshooting section.
