# 🧹 Clear Old Data & Test Backend Integration

## Problem
The login might still be using old localStorage data instead of the backend API.

## Solution

### Step 1: Clear Browser Data

1. **Open your browser** (while on http://localhost:3000)
2. **Open Developer Tools** (Press F12)
3. **Go to Console tab**
4. **Paste and run this command:**

```javascript
// Clear all old authentication data
localStorage.clear();
console.log('✅ All localStorage cleared!');
```

5. **Refresh the page** (F5 or Ctrl+R)

### Step 2: Restart Frontend (Optional but Recommended)

In your terminal running the frontend:
1. Press `Ctrl + C` to stop
2. Run `npm run dev` again
3. Wait for it to start

### Step 3: Test Backend Login

1. Go to http://localhost:3000/login
2. Try logging in with **wrong credentials**:
   - Email: `test@test.com`
   - Password: `wrongpassword`
   - **Expected:** ❌ Should show "Email ou mot de passe incorrect"

3. Try logging in with **correct backend credentials**:
   - Email: `admin@bestlife.com`
   - Password: `admin123`
   - **Expected:** ✅ Should successfully log in

### Step 4: Verify Backend is Being Used

**Open Browser Console (F12) → Network tab:**
- Filter by "Fetch/XHR"
- Try logging in
- You should see a request to: `http://localhost:5000/api/auth/login`
- Click on it to see the response

### What You Should See:

**If backend is working:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "...",
    "nom": "Admin",
    "prenom": "BestLife",
    "email": "admin@bestlife.com",
    "role": "admin"
  }
}
```

**If backend is NOT running:**
```
Error: Erreur de connexion. Vérifiez que le backend est démarré.
```

## Quick Test Commands

### Check if backend is running:
```bash
# Open browser and go to:
http://localhost:5000

# You should see:
{
  "success": true,
  "message": "BestLife API is running",
  "version": "1.0.0"
}
```

### Restart backend if needed:
```bash
cd backend
npm run dev
```

## Troubleshooting

### Issue: Login works with any credentials
**Cause:** Old localStorage data still present
**Solution:** Clear localStorage (see Step 1)

### Issue: "Erreur de connexion" message
**Cause:** Backend is not running
**Solution:** 
```bash
cd backend
npm run dev
```

### Issue: CORS error in console
**Cause:** Backend CORS not configured properly
**Solution:** Backend should already have CORS enabled for http://localhost:3000

### Issue: Changes not appearing
**Cause:** Browser cache
**Solution:** 
1. Hard refresh (Ctrl + Shift + R)
2. Clear cache in Developer Tools
3. Restart frontend server
