# Backend Setup Guide

## Prerequisites

Before starting, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB** (v5.0 or higher)
   - **Windows**: Download from https://www.mongodb.com/try/download/community
   - **Mac**: `brew install mongodb-community`
   - **Linux**: Follow official MongoDB installation guide
   - Verify: `mongod --version`

3. **npm** or **yarn** (comes with Node.js)
   - Verify: `npm --version`

## Step 1: Install MongoDB

### Windows Installation:
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer (choose "Complete" installation)
3. Install MongoDB as a Windows Service (recommended)
4. MongoDB will start automatically

### Verify MongoDB is Running:
```bash
# Check if MongoDB service is running
mongosh
# or
mongo
```

If you see a MongoDB shell, it's working!

## Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT authentication)
- cors (cross-origin requests)
- dotenv (environment variables)
- And more...

## Step 3: Configure Environment Variables

The `.env` file has already been created in the `server` folder with default values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123
CLIENT_URL=http://localhost:3000
```

**Important**: Change `JWT_SECRET` to a random string in production!

## Step 4: Seed the Database

This creates an admin user and sample data:

```bash
cd server
npm run seed
```

You should see:
```
MongoDB Connected: localhost
✓ Admin user created
✓ Sample data seeded
Database seeded successfully!
```

## Step 5: Start the Backend Server

```bash
cd server
npm run dev
```

You should see:
```
Server running in development mode on port 5000
MongoDB Connected: localhost
```

The backend API is now running at: **http://localhost:5000**

## Step 6: Start the Frontend

In a new terminal:

```bash
# From project root
npm run dev
```

The frontend will run at: **http://localhost:3000** (or 3001 if 3000 is busy)

## Step 7: Test the Application

1. **Visit**: http://localhost:3000
2. **Login**: Go to `/login`
   - Email: `admin@portfolio.com`
   - Password: `admin123`
3. **Admin Dashboard**: After login, you'll be redirected to `/admin`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project (auth required)
- `PUT /api/projects/:id` - Update project (auth required)
- `DELETE /api/projects/:id` - Delete project (auth required)

### Articles
- `GET /api/articles` - Get published articles
- `GET /api/articles/all` - Get all articles (auth required)
- `POST /api/articles` - Create article (auth required)
- `PUT /api/articles/:id` - Update article (auth required)
- `DELETE /api/articles/:id` - Delete article (auth required)

### Contacts
- `GET /api/contacts` - Get all contacts (auth required)
- `POST /api/contacts` - Submit contact form
- `DELETE /api/contacts/:id` - Delete contact (auth required)

### Team
- `GET /api/team` - Get all team members
- `POST /api/team` - Add team member (auth required)
- `PUT /api/team/:id` - Update team member (auth required)
- `DELETE /api/team/:id` - Delete team member (auth required)

### Skills
- `GET /api/skills` - Get all skills
- `POST /api/skills` - Add skill (auth required)
- `PUT /api/skills/:id` - Update skill (auth required)
- `DELETE /api/skills/:id` - Delete skill (auth required)

### Gallery
- `GET /api/gallery` - Get all gallery items
- `POST /api/gallery` - Add gallery item (auth required)
- `PUT /api/gallery/:id` - Update gallery item (auth required)
- `DELETE /api/gallery/:id` - Delete gallery item (auth required)

### Site Content
- `GET /api/site-content` - Get site content
- `PUT /api/site-content` - Update site content (auth required)

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution**:
1. Make sure MongoDB is running:
   ```bash
   # Windows (if not running as service)
   mongod
   
   # Mac/Linux
   brew services start mongodb-community
   # or
   sudo systemctl start mongod
   ```

2. Check MongoDB connection string in `server/.env`:
   ```
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
1. Change port in `server/.env`:
   ```
   PORT=5001
   ```

2. Update frontend `.env`:
   ```
   VITE_API_URL=http://localhost:5001/api
   ```

3. Restart both servers

### CORS Errors

**Error**: `Access to fetch blocked by CORS policy`

**Solution**:
1. Check `CLIENT_URL` in `server/.env` matches your frontend URL
2. Restart the backend server

### Authentication Not Working

**Solution**:
1. Clear browser localStorage:
   ```javascript
   // In browser console
   localStorage.clear();
   location.reload();
   ```

2. Re-seed the database:
   ```bash
   cd server
   npm run seed
   ```

3. Try logging in again with:
   - Email: `admin@portfolio.com`
   - Password: `admin123`

### Database Not Seeding

**Solution**:
1. Drop the existing database:
   ```bash
   mongosh
   use portfolio
   db.dropDatabase()
   exit
   ```

2. Run seed again:
   ```bash
   npm run seed
   ```

## Development Workflow

### Running Both Servers

**Terminal 1** (Backend):
```bash
cd server
npm run dev
```

**Terminal 2** (Frontend):
```bash
npm run dev
```

### Checking Database

```bash
mongosh
use portfolio
db.users.find()
db.projects.find()
db.articles.find()
```

### Resetting Everything

```bash
# Stop both servers (Ctrl+C)

# Drop database
mongosh
use portfolio
db.dropDatabase()
exit

# Re-seed
cd server
npm run seed

# Restart servers
npm run dev  # in server folder
npm run dev  # in root folder
```

## Production Deployment

### Environment Variables

Update these for production:

```env
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=generate-a-strong-random-secret
CLIENT_URL=https://your-domain.com
```

### MongoDB Atlas (Cloud Database)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in production `.env`

### Deployment Platforms

**Backend**:
- Heroku
- Railway
- Render
- DigitalOcean
- AWS

**Frontend**:
- Vercel
- Netlify
- GitHub Pages (with backend elsewhere)

## Security Notes

⚠️ **Important for Production**:

1. Change `JWT_SECRET` to a strong random string
2. Use environment variables (never commit `.env`)
3. Enable HTTPS
4. Set up rate limiting (already configured)
5. Use strong admin password
6. Enable MongoDB authentication
7. Keep dependencies updated

## Need Help?

- Check server logs in terminal
- Check browser console for frontend errors
- Verify MongoDB is running
- Ensure all environment variables are set
- Check API endpoints with Postman or curl

## Quick Commands Reference

```bash
# Install dependencies
cd server && npm install
cd .. && npm install

# Start MongoDB (if not running as service)
mongod

# Seed database
cd server && npm run seed

# Start backend
cd server && npm run dev

# Start frontend (new terminal)
npm run dev

# Check MongoDB
mongosh
use portfolio
show collections
db.users.find()

# Reset database
mongosh
use portfolio
db.dropDatabase()
```

---

**Your backend is now fully configured and ready to use!**
