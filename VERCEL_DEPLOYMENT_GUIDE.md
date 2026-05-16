# Complete Vercel Deployment Guide

## ✅ Servers Running Successfully

- **Backend Server**: Running on http://localhost:5001
- **Frontend Server**: Running on http://127.0.0.1:3000

---

## 🚀 Deploying to Vercel - Step by Step

### Prerequisites

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub, GitLab, or Bitbucket

3. **MongoDB Atlas Setup** (Required for production):
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string (we'll use this later)

---

## 📦 Part 1: Deploy Backend to Vercel

### Step 1: Prepare Backend for Vercel

Create a `vercel.json` file in the `server` directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Step 2: Update server.js for Vercel

Add this at the end of your `server/server.js`:

```javascript
// Export for Vercel serverless
export default app;
```

### Step 3: Create .vercelignore in server directory

```
node_modules
.env
*.log
.DS_Store
```

### Step 4: Deploy Backend

```bash
# Navigate to server directory
cd server

# Login to Vercel (first time only)
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? portfolio-backend (or your choice)
# - Directory? ./
# - Override settings? No

# After successful deployment, deploy to production:
vercel --prod
```

### Step 5: Configure Backend Environment Variables on Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your backend project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```
NODE_ENV = production
PORT = 5001
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET = your-super-secret-production-jwt-key-change-this
JWT_EXPIRE = 7d
ADMIN_EMAIL = admin@portfolio.com
ADMIN_PASSWORD = your-secure-admin-password
CLIENT_URL = https://your-frontend-domain.vercel.app
MAX_FILE_SIZE = 5242880
```

**Important**: 
- Replace `MONGODB_URI` with your MongoDB Atlas connection string
- Generate a strong `JWT_SECRET` (use a password generator)
- Update `CLIENT_URL` after deploying frontend

### Step 6: Redeploy Backend

After adding environment variables:
```bash
vercel --prod
```

Your backend will be available at: `https://portfolio-backend-xxx.vercel.app`

---

## 🎨 Part 2: Deploy Frontend to Vercel

### Step 1: Update Frontend API Configuration

Create or update `src/config/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-backend-domain.vercel.app/api'
    : 'http://localhost:5001/api');

export { API_BASE_URL };
```

### Step 2: Update All API Calls

Make sure all your API calls use the `API_BASE_URL`. Example:

```typescript
import { API_BASE_URL } from '../config/api';

// In your service files
const response = await fetch(`${API_BASE_URL}/projects`);
```

### Step 3: Create vercel.json in Root Directory

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Step 4: Create .vercelignore in Root Directory

```
node_modules
.env
.env.local
dist
*.log
.DS_Store
server
```

### Step 5: Create .env.production

```
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

### Step 6: Deploy Frontend

```bash
# Navigate to root directory
cd ..

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? portfolio-frontend (or your choice)
# - Directory? ./
# - Override settings? Yes
# - Build command? npm run build
# - Output directory? dist
# - Development command? npm run dev

# Deploy to production:
vercel --prod
```

### Step 7: Configure Frontend Environment Variables

1. Go to Vercel dashboard
2. Select your frontend project
3. Go to **Settings** → **Environment Variables**
4. Add:

```
VITE_API_URL = https://your-backend-domain.vercel.app/api
```

### Step 8: Update Backend CORS Settings

Go back to your backend project on Vercel:
1. Settings → Environment Variables
2. Update `CLIENT_URL`:

```
CLIENT_URL = https://your-frontend-domain.vercel.app
```

3. Redeploy backend:
```bash
cd server
vercel --prod
```

---

## 🔄 Alternative: Deploy Both as Monorepo

If you want to deploy both from a single repository:

### Step 1: Create Root vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    },
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### Step 2: Update package.json Scripts

Add to root `package.json`:

```json
{
  "scripts": {
    "vercel-build": "npm run build"
  }
}
```

### Step 3: Deploy

```bash
vercel --prod
```

This will deploy both frontend and backend to the same domain:
- Frontend: `https://your-domain.vercel.app`
- Backend: `https://your-domain.vercel.app/api`

---

## 🔧 Post-Deployment Steps

### 1. Test Your Deployment

```bash
# Test backend
curl https://your-backend-domain.vercel.app/api/health

# Test frontend
# Open https://your-frontend-domain.vercel.app in browser
```

### 2. Seed Production Database

```bash
# Update server/scripts/seed.js to use production MongoDB
# Then run locally pointing to production DB:
MONGODB_URI="your-production-mongodb-uri" node server/scripts/seed.js
```

### 3. Set Up Custom Domain (Optional)

1. Go to Vercel dashboard
2. Select your project
3. Go to **Settings** → **Domains**
4. Add your custom domain
5. Update DNS records as instructed

### 4. Enable Analytics (Optional)

1. Go to **Analytics** tab in Vercel dashboard
2. Enable Web Analytics
3. View traffic and performance metrics

---

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution**: Make sure `CLIENT_URL` in backend matches your frontend domain exactly.

```bash
# Update backend environment variable
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### Issue: API Calls Failing

**Solution**: Check that `VITE_API_URL` is set correctly in frontend.

```bash
# Frontend environment variable
VITE_API_URL=https://your-backend-domain.vercel.app/api
```

### Issue: MongoDB Connection Failed

**Solution**: 
1. Check MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
2. Verify connection string format
3. Check database user permissions

### Issue: Build Fails

**Solution**: Check build logs in Vercel dashboard:
1. Go to **Deployments**
2. Click on failed deployment
3. View build logs
4. Fix errors and redeploy

### Issue: Environment Variables Not Working

**Solution**: 
1. Verify variables are set in Vercel dashboard
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

---

## 📝 Quick Reference Commands

```bash
# Deploy backend
cd server
vercel --prod

# Deploy frontend
cd ..
vercel --prod

# View logs
vercel logs [deployment-url]

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-name]

# Pull environment variables locally
vercel env pull
```

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Use HTTPS only
- [ ] Set secure CORS origins
- [ ] Enable rate limiting
- [ ] Review and limit API permissions
- [ ] Set up monitoring and alerts
- [ ] Regular security updates

---

## 📊 Monitoring Your Deployment

### Vercel Dashboard Features:

1. **Deployments**: View all deployments and their status
2. **Analytics**: Track page views and performance
3. **Logs**: Real-time function logs
4. **Speed Insights**: Performance metrics
5. **Usage**: Monitor bandwidth and function invocations

### Set Up Alerts:

1. Go to **Settings** → **Notifications**
2. Enable deployment notifications
3. Add webhook for custom alerts

---

## 🎉 Success!

Your portfolio website is now live on Vercel!

- **Frontend**: https://your-frontend-domain.vercel.app
- **Backend**: https://your-backend-domain.vercel.app
- **Admin Panel**: https://your-frontend-domain.vercel.app/admin

### Next Steps:

1. Share your portfolio URL
2. Set up custom domain
3. Monitor analytics
4. Regular content updates via admin panel
5. Keep dependencies updated

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Every git push creates a preview deployment
2. **Environment Variables**: Use different values for preview vs production
3. **Automatic Deployments**: Connect GitHub for automatic deployments
4. **Rollback**: Instantly rollback to previous deployment if needed
5. **Edge Functions**: Consider using Vercel Edge Functions for better performance
6. **Image Optimization**: Use Vercel's built-in image optimization
7. **Caching**: Configure caching headers for better performance

---

**Need Help?** 
- Vercel Support: https://vercel.com/support
- Community: https://github.com/vercel/vercel/discussions
