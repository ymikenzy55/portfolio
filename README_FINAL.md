# Portfolio Website - Full Stack Application

A modern, full-stack portfolio website with React frontend, Node.js/Express backend, and MongoDB database.

## 🎯 Quick Start

### 1. Verify Setup
```bash
npm run verify
```

### 2. Choose MongoDB Option

**Option A: MongoDB Atlas (Recommended)**
- Follow: `setup-mongodb-atlas.md`
- Time: 10 minutes
- Free forever

**Option B: Local MongoDB**
- Follow: `MONGODB_INSTALLATION.md`
- Time: 15 minutes
- Offline development

### 3. Seed Database
```bash
cd server
npm run seed
```

### 4. Start Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### 5. Login
- URL: http://localhost:3000/login
- Email: `admin@portfolio.com`
- Password: `admin123`

## 📚 Documentation

### Getting Started
- **ACTION_PLAN.md** ← Start here!
- **setup-mongodb-atlas.md** - MongoDB Atlas setup (10 min)
- **START_HERE.md** - Quick start guide
- **COMPLETE_SETUP.md** - Comprehensive guide

### Setup Guides
- **MONGODB_INSTALLATION.md** - Local MongoDB installation
- **BACKEND_SETUP_GUIDE.md** - Backend configuration
- **TRANSFORMATION_SUMMARY.md** - What changed from mock to real backend

### Reference
- **PROJECT_STRUCTURE.md** - File structure
- **TYPOGRAPHY.md** - Typography system
- **BACKEND_IMPLEMENTATION.md** - Backend architecture

## 🏗️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- React Router
- Custom CSS with animations

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Features
- ✅ Real-time authentication
- ✅ CRUD operations for projects, articles, team members
- ✅ Contact form with database storage
- ✅ Admin dashboard
- ✅ Responsive design
- ✅ Animated UI components
- ✅ SEO-friendly
- ✅ Production-ready

## 📁 Project Structure

```
portfolio-website/
├── src/                    # Frontend source
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── context/          # Auth context
│   ├── hooks/            # Custom hooks
│   └── utils/            # Utilities
├── server/                # Backend source
│   ├── controllers/      # API controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth & error handling
│   ├── config/           # Database config
│   └── scripts/          # Seed script
├── public/               # Static assets
└── Documentation files
```

## 🚀 Available Scripts

### Frontend
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run verify       # Verify setup
```

### Backend
```bash
cd server
npm run dev          # Start with auto-reload
npm start            # Start production server
npm run seed         # Seed database
```

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication
- `POST /auth/register` - Register user
- `POST /auth/login` - Login
- `POST /auth/logout` - Logout
- `GET /auth/me` - Get current user

### Projects
- `GET /projects` - Get all projects
- `POST /projects` - Create project (auth required)
- `PUT /projects/:id` - Update project (auth required)
- `DELETE /projects/:id` - Delete project (auth required)

### Articles
- `GET /articles` - Get published articles
- `GET /articles/all` - Get all articles (auth required)
- `POST /articles` - Create article (auth required)
- `PUT /articles/:id` - Update article (auth required)
- `DELETE /articles/:id` - Delete article (auth required)

### Other Endpoints
- Contacts: `/contacts`
- Team: `/team`
- Skills: `/skills`
- Gallery: `/gallery`
- Site Content: `/site-content`

## 🔒 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`server/.env`)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check MONGODB_URI in server/.env
- Verify MongoDB is running
- For Atlas: Check IP whitelist

### Port Already in Use
- Change PORT in server/.env
- Update VITE_API_URL in .env
- Restart servers

### Can't Login
- Run `npm run seed` in server folder
- Clear browser localStorage
- Verify backend is running

### More Help
- Run `npm run verify` to check setup
- See `ACTION_PLAN.md` for detailed steps
- Check documentation files

## 🚢 Deployment

### Backend
- Railway (recommended)
- Render
- Heroku
- DigitalOcean

### Frontend
- Vercel (recommended)
- Netlify
- GitHub Pages

### Database
- MongoDB Atlas (recommended)
- Self-hosted MongoDB

## 📊 Features

### Public Features
- Portfolio homepage with hero section
- Project showcase with filtering
- Blog/articles section
- Contact form
- Team member profiles
- Process workflow page
- Responsive design
- Animated UI components

### Admin Features
- Dashboard with statistics
- Project management (CRUD)
- Article management (CRUD)
- Contact submissions viewer
- Hero content editor
- Team member management
- Skills management
- Gallery management

## 🎓 Learning Resources

- React: https://react.dev/
- TypeScript: https://www.typescriptlang.org/
- Express: https://expressjs.com/
- MongoDB: https://www.mongodb.com/docs/
- Mongoose: https://mongoosejs.com/

## 📝 License

MIT

## 🤝 Contributing

This is a personal portfolio project, but feel free to fork and customize for your own use!

## 📧 Support

For issues or questions:
1. Check documentation files
2. Run `npm run verify`
3. Review error messages
4. Check browser console
5. Verify MongoDB connection

---

## 🎯 Next Steps

1. ✅ Run `npm run verify` to check setup
2. ✅ Follow `ACTION_PLAN.md` to set up MongoDB
3. ✅ Seed database with `npm run seed`
4. ✅ Start both servers
5. ✅ Login and explore admin dashboard
6. 📝 Customize content
7. 🎨 Modify styles
8. 🚀 Deploy to production

---

**Ready to start? Open `ACTION_PLAN.md` and choose your MongoDB setup path!**

**Questions? Check the documentation files or run `npm run verify`**

**Happy coding! 🚀**
