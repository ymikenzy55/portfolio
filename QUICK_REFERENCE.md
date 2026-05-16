# 🚀 Quick Reference Card

## Current Status
- ✅ Backend: http://localhost:5001
- ✅ Frontend: http://127.0.0.1:3000
- ✅ Ready to deploy!

---

## 📖 Documentation Quick Links

| Need | Document | Time |
|------|----------|------|
| **Start Here** | [START_DEPLOYMENT.md](./START_DEPLOYMENT.md) | 5 min |
| **Quick Deploy** | [deploy.md](./deploy.md) | 30 min |
| **Full Guide** | [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md) | 1 hour |
| **Checklist** | [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) | 45 min |
| **Overview** | [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) | 15 min |
| **Architecture** | [DEPLOYMENT_ARCHITECTURE.md](./DEPLOYMENT_ARCHITECTURE.md) | 30 min |
| **Database** | [MONGODB_ATLAS_SETUP.md](./MONGODB_ATLAS_SETUP.md) | 20 min |
| **Main README** | [README_DEPLOYMENT.md](./README_DEPLOYMENT.md) | 20 min |

---

## ⚡ Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy Backend
cd server && vercel --prod

# Deploy Frontend
cd .. && vercel --prod
```

---

## 🔐 Environment Variables

### Backend (Vercel Dashboard)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
CLIENT_URL=https://your-frontend.vercel.app
```

### Frontend (Vercel Dashboard)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

---

## 🐛 Quick Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS Error | Update `CLIENT_URL` in backend |
| API 404 | Check `VITE_API_URL` has `/api` |
| MongoDB Error | Whitelist 0.0.0.0/0 in Atlas |
| Env Vars Not Working | Redeploy after adding |

---

## 📞 Support

- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Docs](https://docs.atlas.mongodb.com/)
- [Vercel Support](https://vercel.com/support)

---

## 🎯 Deployment Paths

### 🏃 Fast (30 min)
[deploy.md](./deploy.md)

### 📖 Detailed (1 hour)
[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

### ✅ Checklist (45 min)
[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

---

**Ready? Start with [START_DEPLOYMENT.md](./START_DEPLOYMENT.md)!** 🚀
