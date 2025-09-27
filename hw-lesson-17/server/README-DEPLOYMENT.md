# 🚀 Deployment Guide

## Frontend on Vercel (Free)

### 1. Preparation
```bash
cd client
npm run build
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Import Project → select repository
4. Root Directory: `client`
5. Build Command: `npm run build`
6. Output Directory: `dist`

### 3. Environment Variables in Vercel
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

## Backend on Render.com (Free) - Recommended

### 1. Preparation
```bash
cd server
```

### 2. Deploy to Render
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. **New** → **Web Service**
4. **Connect GitHub** → select repository
5. **Root Directory:** `server`
6. **Environment:** `Node`
7. **Build Command:** `npm install`
8. **Start Command:** `npm start`

### 3. Environment Variables in Render
```
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=your-super-secret-jwt-key
```

### 4. Render Dashboard Settings
- **Auto-Deploy:** Yes (automatic deploy on push)
- **Health Check Path:** `/api/health`
- **Plan:** Free

---

## Alternative: Railway (Free)

### 1. Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. New Project → Deploy from GitHub repo
4. Select `server` folder
5. Railway auto-detects Node.js

### 2. Environment Variables in Railway
```
PORT=4000
FRONTEND_URL=https://your-app.vercel.app
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
```

## Other Backend Options

### Heroku (Paid)
1. [heroku.com](https://heroku.com) → Create New App
2. Connect GitHub → Deploy Branch
3. Add Config Vars in Settings

### DigitalOcean App Platform
1. [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Create App → Source: GitHub
3. Path: `/server`

## After Deployment

1. Copy backend URL (e.g., `https://your-app.onrender.com`)
2. Update `VITE_API_URL` in Vercel to `https://your-app.onrender.com/api`
3. Rebuild frontend in Vercel

## Testing
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com/api/health`

## Render.com Advantages:
✅ **Free** - 750 hours per month  
✅ **Automatic deployment** from GitHub  
✅ **Built-in health checks**  
✅ **Easy environment variables** setup  
✅ **Real-time logs**  
✅ **Automatic SSL certificate**  
✅ **Simple web interface** configuration
