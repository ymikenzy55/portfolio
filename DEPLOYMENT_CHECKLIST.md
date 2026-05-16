# Vercel Deployment Checklist

## ✅ Pre-Deployment Checklist

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create a free cluster
- [ ] Create database user with password
- [ ] Whitelist all IPs (0.0.0.0/0) for Vercel
- [ ] Get connection string
- [ ] Test connection locally

### 2. Environment Variables Ready
- [ ] Generate strong JWT_SECRET
- [ ] Prepare MongoDB Atlas connection string
- [ ] Choose secure admin password
- [ ] List all required environment variables

### 3. Code Preparation
- [ ] All configuration files created (vercel.json, .vercelignore)
- [ ] API configuration file created (src/config/api.ts)
- [ ] Update all API calls to use API_BASE_URL
- [ ] Test locally with both servers running
- [ ] Commit all changes to git

---

## 🚀 Backend Deployment Steps

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy Backend
```bash
cd server
vercel
# Answer prompts:
# - Project name: portfolio-backend
# - Directory: ./
# - Override settings: No
```

### Step 4: Add Environment Variables
Go to Vercel Dashboard → Project → Settings → Environment Variables

Add these variables:
```
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-strong-secret-key
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your-secure-password
CLIENT_URL=https://your-frontend.vercel.app
MAX_FILE_SIZE=5242880
```

### Step 5: Deploy to Production
```bash
vercel --prod
```

### Step 6: Note Backend URL
- [ ] Copy backend URL: `https://portfolio-backend-xxx.vercel.app`

---

## 🎨 Frontend Deployment Steps

### Step 1: Update API Configuration
Edit `.env.production`:
```
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

Edit `src/config/api.ts` - update production URL

### Step 2: Deploy Frontend
```bash
cd ..  # Back to root directory
vercel
# Answer prompts:
# - Project name: portfolio-frontend
# - Directory: ./
# - Build command: npm run build
# - Output directory: dist
# - Development command: npm run dev
```

### Step 3: Add Environment Variables
Go to Vercel Dashboard → Frontend Project → Settings → Environment Variables

Add:
```
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

### Step 4: Deploy to Production
```bash
vercel --prod
```

### Step 5: Update Backend CORS
Go to Backend Project → Settings → Environment Variables

Update:
```
CLIENT_URL=https://your-frontend-domain.vercel.app
```

Redeploy backend:
```bash
cd server
vercel --prod
```

---

## 🧪 Post-Deployment Testing

### Test Backend
```bash
# Health check
curl https://your-backend-domain.vercel.app/api/health

# Test public endpoint
curl https://your-backend-domain.vercel.app/api/projects
```

### Test Frontend
- [ ] Open frontend URL in browser
- [ ] Check homepage loads
- [ ] Test navigation
- [ ] Test API data loading
- [ ] Test admin login
- [ ] Check console for errors
- [ ] Test on mobile device

---

## 🗄️ Database Seeding

### Option 1: Seed from Local Machine
```bash
cd server
MONGODB_URI="your-production-mongodb-uri" node scripts/seed.js
```

### Option 2: Create Seed Endpoint (Temporary)
Add to server.js:
```javascript
app.post('/api/seed', async (req, res) => {
  // Add authentication check
  // Run seed script
  // Remove this endpoint after seeding
});
```

---

## 🔧 Configuration Files Created

- [x] `server/vercel.json` - Backend Vercel configuration
- [x] `server/.vercelignore` - Backend ignore file
- [x] `vercel.json` - Frontend Vercel configuration
- [x] `.vercelignore` - Frontend ignore file
- [x] `.env.production` - Production environment variables
- [x] `src/config/api.ts` - API configuration

---

## 📝 Important URLs to Save

```
Backend URL: https://_____________________.vercel.app
Frontend URL: https://_____________________.vercel.app
MongoDB Atlas: https://cloud.mongodb.com
Vercel Dashboard: https://vercel.com/dashboard
```

---

## 🐛 Common Issues & Solutions

### Issue: CORS Error
**Solution**: Update `CLIENT_URL` in backend environment variables to match frontend URL exactly.

### Issue: API Calls Return 404
**Solution**: Check `VITE_API_URL` in frontend environment variables includes `/api` at the end.

### Issue: MongoDB Connection Failed
**Solution**: 
1. Check IP whitelist in MongoDB Atlas (use 0.0.0.0/0)
2. Verify connection string format
3. Check database user permissions

### Issue: Environment Variables Not Working
**Solution**: Redeploy after adding environment variables.

### Issue: Build Fails
**Solution**: Check build logs in Vercel dashboard, fix errors, and redeploy.

---

## 🎉 Deployment Complete!

Once all steps are completed:

1. ✅ Backend deployed and running
2. ✅ Frontend deployed and running
3. ✅ Database connected
4. ✅ CORS configured
5. ✅ All features tested
6. ✅ Admin panel accessible

**Your portfolio is now live!** 🚀

---

## 📊 Next Steps

- [ ] Set up custom domain
- [ ] Enable Vercel Analytics
- [ ] Set up monitoring alerts
- [ ] Configure automatic deployments from GitHub
- [ ] Add SSL certificate (automatic with Vercel)
- [ ] Set up backup strategy for MongoDB
- [ ] Document admin procedures
- [ ] Share your portfolio URL!

---

## 🔐 Security Reminders

- [ ] Change default admin password immediately
- [ ] Use strong, unique JWT_SECRET
- [ ] Regularly update dependencies
- [ ] Monitor access logs
- [ ] Set up rate limiting
- [ ] Enable 2FA on Vercel account
- [ ] Regular database backups

---

**Need Help?**
- Check `VERCEL_DEPLOYMENT_GUIDE.md` for detailed instructions
- Vercel Documentation: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
