# 🚀 Portfolio Website - Vercel Deployment Guide

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Current Status](#current-status)
3. [Deployment Files](#deployment-files)
4. [Step-by-Step Deployment](#step-by-step-deployment)
5. [Environment Variables](#environment-variables)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)
8. [Resources](#resources)

---

## ⚡ Quick Start

**Total Time: ~30 minutes**

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy Backend
cd server
vercel --prod

# 4. Deploy Frontend
cd ..
vercel --prod

# 5. Configure environment variables in Vercel Dashboard
# 6. Redeploy both projects
```

**📖 For detailed instructions, see [deploy.md](./deploy.md)**

---

## ✅ Current Status

### Local Development Servers
- ✅ **Backend**: Running on http://localhost:5001
- ✅ **Frontend**: Running on http://127.0.0.1:3000
- ✅ **Database**: MongoDB connected locally

### Deployment Readiness
- ✅ All configuration files created
- ✅ API configuration with environment switching
- ✅ CORS configured
- ✅ Error handling implemented
- ✅ Authentication system ready
- ✅ Admin dashboard functional

---

## 📦 Deployment Files

All necessary files have been created for you:

### Backend Configuration
- ✅ `server/vercel.json` - Vercel serverless configuration
- ✅ `server/.vercelignore` - Files to exclude from deployment

### Frontend Configuration
- ✅ `vercel.json` - SPA routing configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `.env.production` - Production environment template
- ✅ `src/config/api.ts` - API URL configuration

### Documentation
- ✅ `VERCEL_DEPLOYMENT_GUIDE.md` - Complete deployment guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist
- ✅ `DEPLOYMENT_SUMMARY.md` - Visual overview
- ✅ `MONGODB_ATLAS_SETUP.md` - Database setup guide
- ✅ `deploy.md` - Quick deploy commands

---

## 🎯 Step-by-Step Deployment

### Phase 1: Prerequisites (5 minutes)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Create Accounts**
   - Vercel: https://vercel.com
   - MongoDB Atlas: https://mongodb.com/cloud/atlas

3. **Set Up MongoDB Atlas**
   - Follow [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md)
   - Get your connection string
   - Save it securely

### Phase 2: Deploy Backend (10 minutes)

1. **Navigate to server directory**
   ```bash
   cd server
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Answer prompts:
   - Project name: `portfolio-backend`
   - Directory: `./`
   - Override settings: `No`

3. **Add Environment Variables**
   - Go to https://vercel.com/dashboard
   - Select `portfolio-backend` project
   - Settings → Environment Variables
   - Add all variables (see [Environment Variables](#environment-variables))

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

5. **Save Backend URL**
   ```
   https://portfolio-backend-xxx.vercel.app
   ```

### Phase 3: Deploy Frontend (10 minutes)

1. **Update Production Config**
   
   Edit `.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

2. **Navigate to root directory**
   ```bash
   cd ..
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```
   
   Answer prompts:
   - Project name: `portfolio-frontend`
   - Directory: `./`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Development command: `npm run dev`

4. **Add Environment Variables**
   - Go to Vercel dashboard
   - Select `portfolio-frontend` project
   - Settings → Environment Variables
   - Add: `VITE_API_URL=https://your-backend-url.vercel.app/api`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

6. **Save Frontend URL**
   ```
   https://portfolio-frontend-xxx.vercel.app
   ```

### Phase 4: Final Configuration (5 minutes)

1. **Update Backend CORS**
   - Go to backend project in Vercel dashboard
   - Settings → Environment Variables
   - Update `CLIENT_URL=https://your-frontend-url.vercel.app`

2. **Redeploy Backend**
   ```bash
   cd server
   vercel --prod
   ```

3. **Seed Production Database**
   ```bash
   MONGODB_URI="your-production-uri" node scripts/seed.js
   ```

4. **Test Everything**
   - Open frontend URL
   - Test all pages
   - Try admin login
   - Verify API calls work

---

## 🔐 Environment Variables

### Backend Variables (Vercel Dashboard)

```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your-super-secret-production-key-min-32-chars
JWT_EXPIRE=7d
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=your-secure-admin-password
CLIENT_URL=https://your-frontend-url.vercel.app
MAX_FILE_SIZE=5242880
```

**Important Notes**:
- `MONGODB_URI`: Get from MongoDB Atlas (see [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md))
- `JWT_SECRET`: Generate a strong random string (min 32 characters)
- `ADMIN_PASSWORD`: Change from default immediately
- `CLIENT_URL`: Update after deploying frontend

### Frontend Variables (Vercel Dashboard)

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

**Important**: Must include `/api` at the end!

---

## 🧪 Testing

### Backend Tests

```bash
# Health check
curl https://your-backend-url.vercel.app/api/health

# Get projects
curl https://your-backend-url.vercel.app/api/projects

# Get gallery
curl https://your-backend-url.vercel.app/api/gallery
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Frontend Tests

1. ✅ Homepage loads
2. ✅ Navigation works
3. ✅ All pages accessible
4. ✅ Data loads from API
5. ✅ Images display correctly
6. ✅ Admin login works
7. ✅ Contact form submits
8. ✅ Mobile responsive
9. ✅ No console errors
10. ✅ Fast load times

### Admin Panel Test

1. Go to `https://your-frontend-url.vercel.app/admin`
2. Login with credentials from `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Test CRUD operations
4. Verify changes reflect on frontend

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| CORS Error | CLIENT_URL mismatch | Update backend `CLIENT_URL` to match frontend URL exactly |
| API 404 | Wrong API URL | Check `VITE_API_URL` includes `/api` suffix |
| MongoDB Connection Failed | IP not whitelisted | Add 0.0.0.0/0 to MongoDB Atlas Network Access |
| Environment Variables Not Working | Not redeployed | Redeploy after adding environment variables |
| Build Fails | Missing dependencies | Check build logs, install missing packages |
| Slow API Response | Wrong region | Use same region for MongoDB and Vercel |
| Admin Login Fails | Wrong credentials | Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` |
| Images Not Loading | Wrong path | Check image URLs and CORS settings |

### Debug Commands

```bash
# View deployment logs
vercel logs https://your-url.vercel.app

# List all deployments
vercel ls

# Inspect specific deployment
vercel inspect https://your-url.vercel.app

# Pull environment variables locally
vercel env pull

# Check build logs
# Go to Vercel Dashboard → Deployments → Click deployment → View logs
```

### Getting Help

1. Check [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)
2. Review [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
3. Check Vercel logs
4. Visit [Vercel Support](https://vercel.com/support)
5. Check [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

## 📚 Resources

### Documentation
- [Complete Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md) - Detailed instructions
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist
- [Quick Deploy Commands](./deploy.md) - Fast track deployment
- [MongoDB Atlas Setup](./MONGODB_ATLAS_SETUP.md) - Database configuration
- [Deployment Summary](./DEPLOYMENT_SUMMARY.md) - Visual overview

### External Links
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Express on Vercel](https://vercel.com/guides/using-express-with-vercel)

### Video Tutorials
- [Deploying to Vercel](https://www.youtube.com/results?search_query=deploy+to+vercel)
- [MongoDB Atlas Setup](https://www.youtube.com/results?search_query=mongodb+atlas+setup)
- [Full Stack Deployment](https://www.youtube.com/results?search_query=full+stack+vercel+deployment)

---

## 🎉 Deployment Complete!

Once deployed, your portfolio will be live at:

- **Frontend**: https://your-frontend-url.vercel.app
- **Backend**: https://your-backend-url.vercel.app
- **Admin Panel**: https://your-frontend-url.vercel.app/admin

### Next Steps

1. ✅ Test all functionality
2. ✅ Change admin password
3. ✅ Add your content via admin panel
4. ✅ Set up custom domain (optional)
5. ✅ Enable Vercel Analytics (optional)
6. ✅ Share your portfolio!

---

## 🔄 Continuous Deployment

### Connect GitHub (Recommended)

1. Push your code to GitHub
2. Go to Vercel Dashboard
3. Import your GitHub repository
4. Configure build settings
5. Every push to main branch auto-deploys!

### Manual Deployment

```bash
# Deploy backend
cd server
vercel --prod

# Deploy frontend
cd ..
vercel --prod
```

---

## 📊 Monitoring

### Vercel Dashboard
- **Deployments**: View all deployments
- **Analytics**: Track visitors and performance
- **Logs**: Real-time function logs
- **Speed Insights**: Performance metrics
- **Usage**: Monitor bandwidth and functions

### MongoDB Atlas Dashboard
- **Metrics**: Database performance
- **Connections**: Active connections
- **Storage**: Database size
- **Queries**: Slow query analysis

---

## 🔐 Security

### Immediate Actions
- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (min 32 chars)
- [ ] Verify MongoDB IP whitelist
- [ ] Check CORS settings
- [ ] Review environment variables

### Regular Maintenance
- [ ] Update dependencies monthly
- [ ] Rotate passwords quarterly
- [ ] Review access logs
- [ ] Monitor for security alerts
- [ ] Backup database regularly

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Test changes before production
2. **Environment Variables**: Different values for preview vs production
3. **Automatic Deployments**: Connect GitHub for CI/CD
4. **Instant Rollback**: Revert to previous deployment instantly
5. **Edge Functions**: Better performance with edge computing
6. **Image Optimization**: Use Vercel's image optimization
7. **Caching**: Configure headers for better performance
8. **Custom Domain**: Professional look with your own domain
9. **Analytics**: Track visitors and optimize
10. **Monitoring**: Set up alerts for issues

---

## 📞 Support

Need help? Here's how to get support:

1. **Documentation**: Check the guides in this repository
2. **Vercel Support**: https://vercel.com/support
3. **MongoDB Support**: https://www.mongodb.com/support
4. **Community**: 
   - [Vercel Discussions](https://github.com/vercel/vercel/discussions)
   - [MongoDB Community](https://www.mongodb.com/community/forums/)
5. **Stack Overflow**: Tag questions with `vercel` and `mongodb`

---

## 🎓 Learning More

### Recommended Courses
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses
- [Vercel Documentation](https://vercel.com/docs) - Official guides
- [Full Stack Development](https://www.youtube.com/results?search_query=full+stack+development)

### Best Practices
- [Express.js Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [React Best Practices](https://react.dev/learn)
- [MongoDB Best Practices](https://docs.mongodb.com/manual/administration/production-notes/)
- [API Security](https://owasp.org/www-project-api-security/)

---

**Ready to deploy? Start with [deploy.md](./deploy.md) for quick commands!** 🚀

**Questions? Check [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) for detailed help!** 📖
