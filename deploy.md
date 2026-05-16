# Quick Deploy Commands

## 🚀 Fast Track Deployment

### Prerequisites
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login
```

---

## Backend Deployment (5 minutes)

```bash
# 1. Navigate to server directory
cd server

# 2. Deploy to Vercel
vercel

# 3. Deploy to production
vercel --prod

# 4. Copy the production URL
# Example: https://portfolio-backend-abc123.vercel.app
```

**Then add environment variables in Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select `portfolio-backend` project
3. Settings → Environment Variables
4. Add all variables from `server/.env` (use MongoDB Atlas URI)

**Redeploy after adding variables:**
```bash
vercel --prod
```

---

## Frontend Deployment (5 minutes)

```bash
# 1. Go back to root directory
cd ..

# 2. Update .env.production with your backend URL
# VITE_API_URL=https://your-backend-url.vercel.app/api

# 3. Deploy to Vercel
vercel

# 4. Deploy to production
vercel --prod
```

**Then add environment variables in Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Select `portfolio-frontend` project
3. Settings → Environment Variables
4. Add: `VITE_API_URL=https://your-backend-url.vercel.app/api`

**Update backend CORS:**
1. Go to backend project settings
2. Update `CLIENT_URL=https://your-frontend-url.vercel.app`
3. Redeploy backend: `cd server && vercel --prod`

---

## Done! 🎉

Your portfolio is now live:
- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.vercel.app
- **Admin**: https://your-frontend-url.vercel.app/admin

---

## MongoDB Atlas Quick Setup

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create free cluster (M0)
4. Database Access → Add User (username + password)
5. Network Access → Add IP Address → Allow Access from Anywhere (0.0.0.0/0)
6. Connect → Connect your application → Copy connection string
7. Replace `<password>` in connection string with your password
8. Use this as `MONGODB_URI` in Vercel environment variables

---

## Seed Production Database

```bash
# From your local machine
cd server
MONGODB_URI="your-production-mongodb-uri" node scripts/seed.js
```

---

## Troubleshooting

**CORS Error?**
- Check `CLIENT_URL` in backend matches frontend URL exactly

**API 404 Error?**
- Check `VITE_API_URL` includes `/api` at the end

**MongoDB Connection Error?**
- Verify IP whitelist (0.0.0.0/0)
- Check connection string format
- Verify database user credentials

**Environment Variables Not Working?**
- Redeploy after adding variables
- Check variable names are exact (case-sensitive)

---

## View Logs

```bash
# Backend logs
vercel logs https://your-backend-url.vercel.app

# Frontend logs
vercel logs https://your-frontend-url.vercel.app
```

---

## Useful Commands

```bash
# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-name]

# Pull environment variables locally
vercel env pull

# Check deployment status
vercel inspect [deployment-url]
```
