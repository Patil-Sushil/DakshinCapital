# 🔥 Quick Fix: Gallery Deletion Error

## The Problem

Getting this error when deleting images:

```
Firebase Storage: User does not have permission to access 'gallery/...'
(storage/unauthorized)
```

## The Solution (2 Steps)

### Step 1: Open Firebase Storage Rules

**Direct Link**: https://console.firebase.google.com/project/dakshincapital-2ecf2/storage/rules

### Step 2: Copy & Paste These Rules

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write, delete: if request.auth != null;
    }
  }
}
```

### Step 3: Click "Publish"

Done! Wait 1 minute, then try deleting again.

---

## Why This Works

**Before**: Only read access allowed  
**After**: Authenticated users can delete

**Security**:

- ✅ Public can view images
- ✅ Only logged-in admins can delete
- ✅ Prevents unauthorized access

---

## Test It

1. Update rules (above)
2. Wait 1 minute
3. Refresh admin panel
4. Try deleting an image
5. ✅ Should work!

---

**Time**: 2 minutes  
**Difficulty**: Copy & Paste  
**Result**: Gallery deletion works perfectly!
