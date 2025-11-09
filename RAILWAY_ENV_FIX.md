# 🚨 RAILWAY ENVIRONMENT VARIABLES - URGENT FIX

## ⚡ **PROBLEM IDENTIFIED:**
- Frontend is correctly connecting to Railway backend ✅
- BUT Railway backend can't connect to MongoDB ❌
- Error: "Operation `users.findOne()` buffering timed out after 10000ms"

---

## 🔧 **SOLUTION: Add Environment Variables to Railway**

### **Step 1: Go to Railway Dashboard** 
1. **Open**: https://railway.app/dashboard
2. **Find your project**: `fwd`
3. **Click on your service**

### **Step 2: Add These Environment Variables** ⚡

**Click "Variables" tab and add:**

```bash
PORT=5000
MONGODB_URI=mongodb+srv://lalitsureliya8_db_user:6D7KfCGzExQk60ef@lalit.pbe7wlk.mongodb.net/campuseats
JWT_SECRET=campuseats_super_secret_jwt_key_2024_very_long_and_secure
NODE_ENV=production
```

### **Step 3: Save and Deploy** 🚀
1. **Click "Save"** after adding each variable
2. Railway will **automatically redeploy**
3. **Wait 2-3 minutes** for deployment

---

## 🧪 **Test After Deployment:**

1. **Test backend directly**:
   ```
   https://fwd-production.up.railway.app/
   ```
   Should show: `{"message":"CampusEats API is running"}`

2. **Test your frontend**:
   ```
   https://fwd-oxs1-id596tpll-lallibhais-projects.vercel.app/register
   ```
   Registration should work!

---

## 🎯 **CRITICAL VARIABLES EXPLANATION:**

- **MONGODB_URI**: Connects to your MongoDB Atlas database
- **JWT_SECRET**: Required for user authentication tokens
- **PORT**: Railway needs this set to 5000
- **NODE_ENV**: Tells the app it's running in production

---

## ⏱️ **ESTIMATED FIX TIME: 3 MINUTES**

**This will fix the 400 errors and make registration work!** 🎉