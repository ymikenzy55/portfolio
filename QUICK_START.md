# Quick Start Guide

## 🚀 Running the Application

```bash
npm install
npm run dev
```

The app will be available at: **http://127.0.0.1:3000/** (or next available port)

## 🔐 Admin Login

**URL:** `/login` or click "Admin" in navigation

**Credentials:**
```
Email: admin@portfolio.com
Password: admin123
```

## 📍 Key Routes

- `/` - Home page with hero and CTAs
- `/clients` - Client-focused portfolio view
- `/recruiters` - Recruiter-focused skills view
- `/articles` - Blog/articles page
- `/process` - Workflow process page
- `/contact` - Contact form
- `/login` - Admin login
- `/padmin` - Admin dashboard (requires login)

## 🎨 Features

### Public Features
- Responsive design with glassmorphic UI
- Animated text and scroll effects
- Project showcase with filtering
- Blog articles
- Contact form
- Team member profiles

### Admin Features (after login)
- Manage projects
- Manage articles
- View contact submissions
- Edit hero content
- Manage team members
- Gallery management
- Process workflow editing

## 💾 Data Storage

All data is stored in browser localStorage:
- Projects
- Articles
- Contacts
- Team members
- Site content
- Gallery items

**To reset data:** Clear browser cache or run in console:
```javascript
localStorage.clear();
location.reload();
```

## 🔧 Tech Stack

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** CSS with custom animations
- **State:** React hooks + Context API
- **Storage:** localStorage (no backend required)
- **Routing:** React Router

## 📝 Making Changes

### Update Admin Credentials
Edit `src/context/AuthContext.tsx` - look for `ADMIN_CREDENTIALS`

### Add Default Data
Edit `src/services/mockDataService.ts` - look for `initializeData()`

### Modify UI Components
Components are in `src/components/ui/`

### Update Pages
Pages are in `src/pages/`

## 🐛 Troubleshooting

**Can't login?**
- Check credentials match exactly
- Clear localStorage and try again
- Check browser console for errors

**Data not saving?**
- Check localStorage isn't full
- Verify browser allows localStorage
- Check console for errors

**Page not loading?**
- Verify dev server is running
- Check correct port number
- Clear browser cache

**Build errors?**
- Run `npm install` again
- Delete `node_modules` and reinstall
- Check Node.js version (should be 16+)

## 📚 Documentation

- `FRONTEND_ONLY_SETUP.md` - Detailed technical documentation
- `ADMIN_CREDENTIALS.md` - Login credentials reference
- `PROJECT_STRUCTURE.md` - Project file structure
- `TYPOGRAPHY.md` - Typography system guide

## 🎯 Next Steps

1. ✅ Run the application
2. ✅ Login to admin dashboard
3. ✅ Add your own projects
4. ✅ Write articles
5. ✅ Customize hero content
6. ✅ Add team members
7. ✅ Update contact information

## 💡 Tips

- Use the admin dashboard to manage all content
- Data persists across sessions
- Each browser has separate data
- Export important data before clearing cache
- Test in incognito mode for fresh experience

## 🚢 Deployment

Since this is a frontend-only app, deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Just run `npm run build` and deploy the `dist` folder.

---

**Need help?** Check the documentation files or browser console for errors.
