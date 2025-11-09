# Vercel Deployment Instructions for CampusEats

## Problem
Vercel is trying to build from the root directory, but the React app is in `frontend/campuseats/`.

## Solution Options

### Option 1: Configure Root Directory in Vercel Dashboard (RECOMMENDED)
1. Go to your Vercel project dashboard
2. Go to Settings → General
3. Set **Root Directory** to: `frontend/campuseats`
4. Save and redeploy

### Option 2: Use Build Commands in Vercel Dashboard
1. In Vercel project settings
2. Go to Settings → General → Build & Output Settings
3. Set:
   - **Build Command**: `cd frontend/campuseats && npm install && npm run build`
   - **Output Directory**: `frontend/campuseats/dist`
   - **Install Command**: `npm install`

### Option 3: Environment Variables (if needed)
If your app needs environment variables, add them in Vercel dashboard:
- `VITE_API_URL=https://your-backend-url.com`

## Files Created for Deployment:

### 1. vercel.json (Root)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "frontend/campuseats/dist"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. .gitignore files
- Root .gitignore ✅
- Frontend .gitignore ✅  
- Backend .gitignore ✅

## Quick Fix Steps:
1. Push these changes to GitHub
2. In Vercel dashboard → Settings → General → Root Directory: `frontend/campuseats`
3. Redeploy

## Expected Build Output:
```
✅ Installing dependencies
✅ Building React app with Vite
✅ Deploying to Vercel
```

## Notes:
- Backend deployment will be separate (use Railway, Render, or Heroku)
- Frontend will be deployed as static site on Vercel
- Make sure API calls point to deployed backend URL