# MongoDB Atlas Setup - Step by Step

## Why MongoDB Atlas?
- ✅ No installation needed
- ✅ Free forever (512MB storage)
- ✅ Works immediately
- ✅ Cloud-based (access from anywhere)
- ✅ Automatic backups

## Step-by-Step Setup (10 minutes)

### Step 1: Create Account (2 minutes)

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up with:
   - Email
   - Google account
   - GitHub account
3. Verify your email

### Step 2: Create Free Cluster (3 minutes)

1. After login, click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select:
   - Provider: AWS (or any)
   - Region: Choose closest to you
   - Cluster Name: Keep default or name it "portfolio"
4. Click **"Create"**
5. Wait 3-5 minutes for cluster creation

### Step 3: Create Database User (1 minute)

1. You'll see "Security Quickstart"
2. Create a database user:
   - Username: `admin`
   - Password: Click "Autogenerate Secure Password" (SAVE THIS!)
   - Or create your own password (SAVE THIS!)
3. Click **"Create User"**

### Step 4: Add IP Address (1 minute)

1. Still in Security Quickstart
2. Under "Where would you like to connect from?"
3. Click **"Add My Current IP Address"**
4. Or click **"Allow Access from Anywhere"** (easier for development)
5. Click **"Finish and Close"**

### Step 5: Get Connection String (2 minutes)

1. Click **"Database"** in left sidebar
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Driver: Node.js
5. Version: 5.5 or later
6. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Your Project (1 minute)

1. Open `server/.env` file
2. Find this line:
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

3. Replace with your Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://admin:YOUR_ACTUAL_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

4. **IMPORTANT**: Replace `<password>` with your actual password!
5. Add `/portfolio` before the `?` to specify database name

### Example:
```env
# Before
MONGODB_URI=mongodb://localhost:27017/portfolio

# After (with your actual values)
MONGODB_URI=mongodb+srv://admin:MySecurePass123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Step 7: Test Connection

Open terminal and run:

```bash
cd server
npm run seed
```

You should see:
```
MongoDB Connected: cluster0.xxxxx.mongodb.net
✓ Admin user created
✓ Sample data seeded
Database seeded successfully!
```

## Step 8: Start Your Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

Expected output:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Expected output:
```
VITE ready in 703 ms
➜ Local: http://localhost:3000/
```

## Step 9: Login and Test

1. Visit: http://localhost:3000
2. Click "Login" or go to: http://localhost:3000/login
3. Enter:
   - Email: `admin@portfolio.com`
   - Password: `admin123`
4. You should be redirected to admin dashboard!

## Troubleshooting

### "Authentication failed"
- Check your password in the connection string
- Make sure you replaced `<password>` with actual password
- Password should NOT have `<` or `>` symbols

### "IP not whitelisted"
- Go to Atlas → Network Access
- Click "Add IP Address"
- Choose "Allow Access from Anywhere"
- Wait 1-2 minutes

### "Connection timeout"
- Check your internet connection
- Verify connection string is correct
- Make sure cluster is active (not paused)

### Still not working?
1. Copy your connection string
2. Remove password from it (for security)
3. Check the format matches:
   ```
   mongodb+srv://admin:PASSWORD@cluster0.XXXXX.mongodb.net/portfolio?retryWrites=true&w=majority
   ```

## View Your Data

### Option 1: MongoDB Atlas Dashboard
1. Go to: https://cloud.mongodb.com
2. Click "Database" → "Browse Collections"
3. Select "portfolio" database
4. View collections: users, projects, articles, etc.

### Option 2: MongoDB Compass (Desktop App)
1. Download: https://www.mongodb.com/try/download/compass
2. Install and open
3. Paste your connection string
4. Click "Connect"
5. Browse your data visually

## What's Next?

✅ MongoDB Atlas is set up  
✅ Database is seeded  
✅ Backend is running  
✅ Frontend is running  
✅ You can login  

Now you can:
- Add your own projects
- Write articles
- Manage team members
- Customize content
- Deploy to production

## Production Tips

For production deployment:
1. Keep your MongoDB Atlas cluster (it's free!)
2. Update `CLIENT_URL` in server/.env to your production URL
3. Change `JWT_SECRET` to a strong random string
4. Deploy backend to Railway/Render/Heroku
5. Deploy frontend to Vercel/Netlify
6. Update `VITE_API_URL` in frontend .env to production backend URL

## Need Help?

Common issues:
- Password has special characters? URL encode them
- Can't connect? Check Network Access in Atlas
- Seed fails? Check connection string format
- Login fails? Run `npm run seed` again

---

**You're all set! Your portfolio now has a real database in the cloud! 🚀**
