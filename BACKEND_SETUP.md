# Backend Setup Guide

Complete guide to set up the Node.js + Express + MongoDB backend for the portfolio website.

## Quick Start

### 1. Install MongoDB

#### Option A: Local MongoDB (Recommended for Development)

**Windows:**
1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will start automatically as a service

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### Option B: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/portfolio

# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Admin Credentials (for seeding)
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

⚠️ **Important:** Change `JWT_SECRET` to a random string in production!

### 4. Seed the Database

Populate the database with initial data:

```bash
npm run seed
```

This creates:
- Admin user (admin@portfolio.com / admin123)
- 3 sample projects
- 3 sample articles
- 2 team members
- 12 skills
- Site content (hero, process, about)

### 5. Start the Backend Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

### 6. Verify Backend is Running

Open your browser or use curl:
```bash
curl http://localhost:5000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-..."
}
```

### 7. Test Authentication

Try logging in:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'
```

You should receive a token and user data.

## Frontend Integration

The frontend is already configured to use the backend API. Just make sure:

1. Backend is running on `http://localhost:5000`
2. Frontend is running on `http://localhost:3000`
3. CORS is properly configured (already done)

### Testing the Full Stack

1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd .. && npm run dev` (in root directory)
3. Open `http://localhost:3000`
4. Try logging in with: `admin@portfolio.com` / `admin123`

## API Endpoints Overview

### Public Endpoints (No Authentication Required)
- `GET /api/projects` - View all projects
- `GET /api/articles` - View published articles
- `GET /api/team` - View team members
- `GET /api/skills` - View skills
- `GET /api/gallery` - View gallery
- `GET /api/site-content` - View site content
- `POST /api/contacts` - Submit contact form
- `POST /api/auth/login` - Login

### Protected Endpoints (Admin Only)
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `GET /api/contacts` - View contact submissions
- `DELETE /api/contacts/:id` - Delete contact
- `POST /api/team` - Create team member
- `PUT /api/team/:id` - Update team member
- `DELETE /api/team/:id` - Delete team member
- And more...

## Troubleshooting

### MongoDB Connection Failed

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
1. Check if MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongodb
   ```

2. Verify connection string in `.env`
3. For Atlas: Check network access settings (allow your IP)

### Port 5000 Already in Use

**Error:** `EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Change PORT in `.env` to another port (e.g., 5001)
2. Kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -ti:5000 | xargs kill
   ```

### CORS Errors in Frontend

**Error:** `Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS`

**Solutions:**
1. Verify `CLIENT_URL` in `.env` matches your frontend URL
2. Ensure `credentials: 'include'` is set in frontend fetch calls
3. Restart backend server after changing `.env`

### Authentication Not Working

**Error:** `401 Unauthorized` or token not persisting

**Solutions:**
1. Clear browser cookies and localStorage
2. Check if backend is running
3. Verify credentials are correct
4. Check browser console for errors
5. Ensure `credentials: 'include'` in fetch calls

### Seed Script Fails

**Error:** Various errors during `npm run seed`

**Solutions:**
1. Ensure MongoDB is running
2. Check connection string in `.env`
3. Drop existing database if needed:
   ```bash
   # MongoDB Shell
   mongo
   use portfolio
   db.dropDatabase()
   ```
4. Run seed script again

## Database Management

### View Database Contents

Using MongoDB Compass (GUI):
1. Download from https://www.mongodb.com/products/compass
2. Connect to `mongodb://localhost:27017`
3. Browse `portfolio` database

Using MongoDB Shell:
```bash
mongo
use portfolio
db.projects.find().pretty()
db.users.find().pretty()
```

### Reset Database

To start fresh:
```bash
# Drop database
mongo portfolio --eval "db.dropDatabase()"

# Re-seed
cd server
npm run seed
```

### Backup Database

```bash
mongodump --db portfolio --out ./backup
```

### Restore Database

```bash
mongorestore --db portfolio ./backup/portfolio
```

## Production Deployment

### Environment Variables for Production

Update `.env` for production:
```env
NODE_ENV=production
MONGODB_URI=<your-production-mongodb-uri>
JWT_SECRET=<strong-random-secret>
CLIENT_URL=<your-production-frontend-url>
```

### Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Set secure cookie flags
- [ ] Configure proper CORS origins
- [ ] Set up MongoDB authentication
- [ ] Enable rate limiting (already configured)
- [ ] Set up monitoring and logging
- [ ] Regular database backups

### Deployment Platforms

**Recommended platforms:**
- Backend: Heroku, Railway, Render, DigitalOcean
- Database: MongoDB Atlas (free tier available)
- Frontend: Vercel, Netlify

## Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [JWT.io](https://jwt.io/)

## Support

If you encounter issues:
1. Check this troubleshooting guide
2. Review server logs in terminal
3. Check MongoDB logs
4. Verify all environment variables
5. Ensure all dependencies are installed

## Next Steps

After successful setup:
1. Customize the seed data in `server/scripts/seed.js`
2. Add your own projects and articles via the admin dashboard
3. Update site content (hero, about, process)
4. Configure email service for contact form (optional)
5. Set up file upload for images (optional)
6. Deploy to production

Happy coding! 🚀
