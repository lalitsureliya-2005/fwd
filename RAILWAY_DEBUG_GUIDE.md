# 🚨 RAILWAY ENVIRONMENT VARIABLES DEBUG GUIDE

## ❌ **PROBLEM:** Still getting MongoDB timeout after setting environment variables

**Error**: `"Operation users.findOne() buffering timed out after 10000ms"`

---

## 🔍 **STEP-BY-STEP FIX:**

### **STEP 1: Verify Railway Environment Variables** ⚡

1. **Go to**: https://railway.app/dashboard
2. **Click your `fwd` project**
3. **Click "Variables" tab**
4. **VERIFY these 4 variables exist EXACTLY as shown:**

```bash
PORT=5000
MONGODB_URI=mongodb+srv://lalitsureliya8_db_user:6D7KfCGzExQk60ef@lalit.pbe7wlk.mongodb.net/campuseats?appName=lalit
JWT_SECRET=campuseats_super_secret_jwt_key_2024_very_long_and_secure
NODE_ENV=production
```

### **STEP 2: Force Railway Redeploy** 🚀

**If variables are set but still getting errors:**

1. **Go to "Deployments" tab** in Railway
2. **Click "Deploy" button** to force a new deployment
3. **Wait 2-3 minutes** for deployment to complete
4. **Watch the deployment logs** for any errors

### **STEP 3: Check Railway Deployment Logs** 📋

1. **In Railway project** → **Click "View Logs"**
2. **Look for these messages:**
   - ✅ `Connected to MongoDB successfully`
   - ✅ `CampusEats API is running`
   - ❌ `MongoDB connection error` or `ENOTFOUND`

---

## 🎯 **COMMON ISSUES & SOLUTIONS:**

### **Issue 1: Variables Not Applied**
- **Solution**: Click "Deploy" button in Railway to force redeploy

### **Issue 2: Wrong MONGODB_URI Format**
- **Check**: Make sure URI is EXACTLY:
  ```
  mongodb+srv://lalitsureliya8_db_user:6D7KfCGzExQk60ef@lalit.pbe7wlk.mongodb.net/campuseats?appName=lalit
  ```

### **Issue 3: MongoDB Atlas IP Whitelist**
- **Solution**: In MongoDB Atlas → Network Access → Add `0.0.0.0/0` (allow all IPs)

### **Issue 4: Case Sensitive Variables**
- **Check**: Variable names are EXACTLY `MONGODB_URI` (not `MONGODB_URL`)

---

## 🧪 **TEST STEPS AFTER FIX:**

1. **Test backend**: https://fwd-production.up.railway.app/
2. **Should show**: `{"message":"CampusEats API is running"}`
3. **Test registration** on your frontend
4. **Should work without timeout errors**

---

## ⚡ **QUICK CHECKLIST:**

- [ ] All 4 environment variables set in Railway
- [ ] Railway has been redeployed after setting variables
- [ ] MongoDB Atlas allows connections from 0.0.0.0/0
- [ ] MONGODB_URI exactly matches the format above

**If all above are checked and still not working, the issue might be with MongoDB Atlas network access settings.**