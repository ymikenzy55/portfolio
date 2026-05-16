# MongoDB Atlas Setup Guide

## 🗄️ Complete MongoDB Atlas Configuration

This guide will help you set up MongoDB Atlas for your production deployment.

---

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **"Try Free"** or **"Sign Up"**
3. Sign up with:
   - Email and password, OR
   - Google account, OR
   - GitHub account
4. Verify your email address

---

## Step 2: Create a New Cluster

### 2.1 Start Cluster Creation
1. After login, click **"Build a Database"**
2. Choose **"Shared"** (Free tier - M0)
3. Click **"Create"**

### 2.2 Configure Cluster
1. **Cloud Provider**: Choose AWS, Google Cloud, or Azure
2. **Region**: Choose closest to your Vercel deployment region
   - US East (N. Virginia) - `us-east-1` (Recommended for Vercel)
   - Europe (Ireland) - `eu-west-1`
   - Asia Pacific (Singapore) - `ap-southeast-1`
3. **Cluster Tier**: M0 Sandbox (Free Forever)
4. **Cluster Name**: `portfolio-cluster` (or your choice)
5. Click **"Create Cluster"**

⏱️ **Wait 3-5 minutes** for cluster to be created

---

## Step 3: Create Database User

### 3.1 Add Database User
1. Click **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method
4. Enter credentials:
   - **Username**: `portfolio_admin` (or your choice)
   - **Password**: Click **"Autogenerate Secure Password"** (recommended)
   - **Copy and save this password securely!**
5. **Database User Privileges**: Select **"Read and write to any database"**
6. Click **"Add User"**

### 3.2 Save Credentials
```
Username: portfolio_admin
Password: [your-generated-password]
```
**⚠️ Important**: Save these credentials - you'll need them for the connection string!

---

## Step 4: Configure Network Access

### 4.1 Whitelist IP Addresses
1. Click **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Choose **"Allow Access from Anywhere"**
   - This adds `0.0.0.0/0` (required for Vercel)
4. Click **"Confirm"**

**Why 0.0.0.0/0?**
- Vercel serverless functions use dynamic IPs
- This allows connections from any IP
- Security is handled by username/password authentication

### 4.2 Alternative: Specific IP (Optional)
If you want to restrict access:
1. Add your local IP for development
2. Add Vercel's IP ranges (check Vercel docs)

---

## Step 5: Get Connection String

### 5.1 Connect to Cluster
1. Go back to **"Database"** (or **"Clusters"**)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**

### 5.2 Copy Connection String
1. **Driver**: Node.js
2. **Version**: 4.1 or later
3. Copy the connection string:
```
mongodb+srv://portfolio_admin:<password>@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5.3 Modify Connection String
Replace `<password>` with your actual password:
```
mongodb+srv://portfolio_admin:YourActualPassword123@portfolio-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Add database name** (optional but recommended):
```
mongodb+srv://portfolio_admin:YourActualPassword123@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Step 6: Test Connection Locally

### 6.1 Update Local .env
Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://portfolio_admin:YourPassword@portfolio-cluster.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 6.2 Test Connection
```bash
cd server
npm start
```

Look for:
```
MongoDB Connected: portfolio-cluster-shard-00-00.xxxxx.mongodb.net
```

### 6.3 Seed Database
```bash
npm run seed
```

---

## Step 7: Configure for Vercel

### 7.1 Add to Vercel Environment Variables
1. Go to https://vercel.com/dashboard
2. Select your **backend** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your full connection string
   - **Environment**: Production, Preview, Development (select all)
5. Click **"Save"**

### 7.2 Redeploy Backend
```bash
cd server
vercel --prod
```

---

## Step 8: Verify Production Connection

### 8.1 Check Vercel Logs
```bash
vercel logs https://your-backend.vercel.app --follow
```

Look for:
```
MongoDB Connected: portfolio-cluster-shard-00-00.xxxxx.mongodb.net
```

### 8.2 Test API Endpoint
```bash
curl https://your-backend.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

---

## Step 9: Seed Production Database

### Option 1: From Local Machine
```bash
cd server
MONGODB_URI="your-production-connection-string" node scripts/seed.js
```

### Option 2: Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect using your connection string
3. Create database: `portfolio`
4. Import JSON data manually

### Option 3: Using mongosh (CLI)
```bash
# Install mongosh
npm install -g mongosh

# Connect
mongosh "your-connection-string"

# Use database
use portfolio

# Insert sample data
db.projects.insertOne({...})
```

---

## 📊 MongoDB Atlas Dashboard Overview

### Database Tab
- View clusters
- Monitor performance
- Check storage usage
- View connection strings

### Database Access Tab
- Manage database users
- Set user privileges
- Rotate passwords

### Network Access Tab
- Manage IP whitelist
- Configure VPC peering
- Set up private endpoints

### Metrics Tab
- Monitor operations
- Track connections
- View query performance
- Check resource usage

---

## 🔧 Connection String Format Explained

```
mongodb+srv://username:password@cluster.mongodb.net/database?options
```

**Components**:
- `mongodb+srv://` - Protocol (SRV record for automatic failover)
- `username` - Database user username
- `password` - Database user password (URL-encoded if special chars)
- `cluster.mongodb.net` - Cluster hostname
- `database` - Database name (optional)
- `options` - Connection options (retryWrites, w, etc.)

**Common Options**:
- `retryWrites=true` - Automatically retry write operations
- `w=majority` - Write concern (wait for majority of nodes)
- `authSource=admin` - Authentication database
- `ssl=true` - Use SSL/TLS (default for Atlas)

---

## 🐛 Troubleshooting

### Issue: "Authentication failed"
**Solutions**:
- Check username and password are correct
- Ensure password doesn't contain special characters (or URL-encode them)
- Verify user has correct privileges
- Check user is created in correct database

### Issue: "Connection timeout"
**Solutions**:
- Verify IP whitelist includes 0.0.0.0/0
- Check cluster is running (not paused)
- Verify connection string format
- Check network/firewall settings

### Issue: "Database not found"
**Solutions**:
- Database is created automatically on first write
- Explicitly specify database name in connection string
- Check database name spelling

### Issue: "Too many connections"
**Solutions**:
- Free tier has connection limit (500 concurrent)
- Close unused connections
- Implement connection pooling
- Upgrade to paid tier if needed

### Issue: "Cluster paused"
**Solutions**:
- Free tier clusters pause after 60 days of inactivity
- Resume cluster from Atlas dashboard
- Make a connection to keep it active

---

## 🔐 Security Best Practices

### Password Security
- ✅ Use strong, auto-generated passwords
- ✅ Never commit passwords to git
- ✅ Use environment variables
- ✅ Rotate passwords regularly
- ❌ Don't use simple passwords like "password123"

### Network Security
- ✅ Use 0.0.0.0/0 for Vercel (required)
- ✅ Add specific IPs for local development
- ✅ Use VPC peering for enhanced security (paid)
- ✅ Enable audit logs (paid)

### User Privileges
- ✅ Use least privilege principle
- ✅ Create separate users for different apps
- ✅ Use read-only users where possible
- ❌ Don't use admin user for applications

### Connection String Security
- ✅ Store in environment variables
- ✅ Never expose in client-side code
- ✅ Use secrets management (Vercel handles this)
- ❌ Don't log connection strings

---

## 📈 Monitoring & Maintenance

### Regular Tasks
- [ ] Monitor storage usage (512 MB free tier limit)
- [ ] Check connection count
- [ ] Review slow queries
- [ ] Monitor error logs
- [ ] Backup important data
- [ ] Update indexes for performance

### Atlas Alerts (Optional)
1. Go to **Alerts** tab
2. Configure alerts for:
   - High connection count
   - Storage usage > 80%
   - Slow queries
   - Replication lag

### Performance Optimization
- Create indexes for frequently queried fields
- Use projection to limit returned fields
- Implement pagination for large datasets
- Monitor and optimize slow queries

---

## 💰 Free Tier Limits

| Resource | Limit |
|----------|-------|
| Storage | 512 MB |
| RAM | Shared |
| Connections | 500 concurrent |
| Clusters | 1 per project |
| Databases | Unlimited |
| Collections | Unlimited |
| Backups | None (manual only) |

**Upgrade Options**:
- M10: $0.08/hour (~$57/month) - 2GB RAM, 10GB storage
- M20: $0.20/hour (~$144/month) - 4GB RAM, 20GB storage
- M30: $0.54/hour (~$389/month) - 8GB RAM, 40GB storage

---

## 🎓 Additional Resources

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MongoDB University (Free Courses)](https://university.mongodb.com/)
- [Connection String Format](https://docs.mongodb.com/manual/reference/connection-string/)
- [Security Checklist](https://docs.atlas.mongodb.com/security-checklist/)
- [Performance Best Practices](https://docs.mongodb.com/manual/administration/analyzing-mongodb-performance/)

---

## ✅ Setup Complete!

Your MongoDB Atlas is now configured and ready for production use!

**Next Steps**:
1. ✅ Connection string saved
2. ✅ Added to Vercel environment variables
3. ✅ Backend deployed and connected
4. ✅ Database seeded with initial data
5. ✅ Production tested and verified

**Your connection string**:
```
mongodb+srv://portfolio_admin:YourPassword@portfolio-cluster.xxxxx.mongodb.net/portfolio
```

**Keep this secure and never commit it to version control!** 🔐
