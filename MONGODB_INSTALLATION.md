# MongoDB Installation Guide

MongoDB is not currently installed on your system. You have two options:

## Option 1: Install MongoDB Locally (Recommended for Development)

### Windows Installation

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows x64
   - Version: Latest (7.0 or higher)
   - Package: MSI

2. **Run the Installer**
   - Double-click the downloaded `.msi` file
   - Choose "Complete" installation type
   - **Important**: Check "Install MongoDB as a Service"
   - **Important**: Check "Install MongoDB Compass" (GUI tool)
   - Click "Install"

3. **Verify Installation**
   ```powershell
   # Check if MongoDB is running
   Get-Service MongoDB
   
   # Should show: Status = Running
   ```

4. **Test Connection**
   ```powershell
   # Connect to MongoDB shell
   mongosh
   
   # You should see:
   # Current Mongosh Log ID: ...
   # Connecting to: mongodb://127.0.0.1:27017
   # Using MongoDB: ...
   ```

5. **If MongoDB Service Didn't Start**
   ```powershell
   # Start MongoDB service
   net start MongoDB
   ```

### Add MongoDB to PATH (if needed)

If `mongosh` command is not recognized:

1. Find MongoDB installation directory (usually `C:\Program Files\MongoDB\Server\7.0\bin`)
2. Add to System PATH:
   - Search "Environment Variables" in Windows
   - Edit "Path" variable
   - Add: `C:\Program Files\MongoDB\Server\7.0\bin`
   - Click OK
   - Restart terminal

## Option 2: Use MongoDB Atlas (Cloud Database)

If you don't want to install MongoDB locally, use the free cloud version:

### Step 1: Create MongoDB Atlas Account

1. Go to: https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Choose "Free" tier (M0 Sandbox)

### Step 2: Create a Cluster

1. Click "Build a Database"
2. Choose "Free" (M0) tier
3. Select a cloud provider and region (closest to you)
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster creation

### Step 3: Create Database User

1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: Generate a secure password (save it!)
6. Database User Privileges: "Atlas admin"
7. Click "Add User"

### Step 4: Whitelist Your IP

1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address
4. Click "Confirm"

### Step 5: Get Connection String

1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 6: Update Backend Configuration

Edit `server/.env`:

```env
# Replace this line:
MONGODB_URI=mongodb://localhost:27017/portfolio

# With your Atlas connection string:
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

**Important**: Replace `<password>` with your actual database user password!

## After Installation

### Test Your Setup

1. **Start the backend server**:
   ```bash
   cd server
   npm run seed
   ```

2. **You should see**:
   ```
   MongoDB Connected: localhost (or your Atlas cluster)
   ✓ Admin user created
   ✓ Sample data seeded
   Database seeded successfully!
   ```

3. **Start the server**:
   ```bash
   npm run dev
   ```

4. **You should see**:
   ```
   Server running in development mode on port 5000
   MongoDB Connected: localhost
   ```

## Troubleshooting

### Local MongoDB Issues

**Service won't start**:
```powershell
# Check service status
Get-Service MongoDB

# Try starting manually
net start MongoDB

# If still fails, check logs at:
# C:\Program Files\MongoDB\Server\7.0\log\mongod.log
```

**Port 27017 already in use**:
```powershell
# Find what's using the port
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### MongoDB Atlas Issues

**Connection timeout**:
- Check your IP is whitelisted in Network Access
- Verify connection string is correct
- Check your internet connection

**Authentication failed**:
- Verify username and password in connection string
- Make sure you're using the database user password (not your Atlas account password)
- Check user has correct permissions

**Can't connect**:
- Make sure you selected "Allow Access from Anywhere" in Network Access
- Wait a few minutes after creating the cluster
- Try using MongoDB Compass to test connection first

## Using MongoDB Compass (GUI)

MongoDB Compass is a visual tool for MongoDB:

1. **Open MongoDB Compass**
2. **Connection String**:
   - Local: `mongodb://localhost:27017`
   - Atlas: Your Atlas connection string
3. **Click "Connect"**
4. **Browse your databases**:
   - Database: `portfolio`
   - Collections: `users`, `projects`, `articles`, etc.

## Quick Reference

### Local MongoDB Commands

```powershell
# Start MongoDB
net start MongoDB

# Stop MongoDB
net stop MongoDB

# Connect to shell
mongosh

# In mongosh:
show dbs                    # List databases
use portfolio              # Switch to portfolio database
show collections           # List collections
db.users.find()           # View users
db.projects.find()        # View projects
db.dropDatabase()         # Delete database (careful!)
exit                       # Exit shell
```

### MongoDB Atlas

- Dashboard: https://cloud.mongodb.com
- View data in "Browse Collections"
- Monitor performance in "Metrics"
- View logs in "Logs"

## Recommendation

**For Development**: Install MongoDB locally (Option 1)
- Faster
- Works offline
- No internet dependency
- Free forever

**For Production**: Use MongoDB Atlas (Option 2)
- Managed service
- Automatic backups
- Scalable
- Secure

**Best Practice**: Use local MongoDB for development, Atlas for production!

## Next Steps

After MongoDB is set up:

1. ✅ MongoDB installed/configured
2. ✅ Backend dependencies installed (`npm install` in server folder)
3. ✅ Environment variables configured (server/.env)
4. ⏭️ Seed the database (`npm run seed` in server folder)
5. ⏭️ Start backend server (`npm run dev` in server folder)
6. ⏭️ Start frontend (`npm run dev` in root folder)
7. ⏭️ Login and test!

---

**Choose your option and follow the steps above!**
