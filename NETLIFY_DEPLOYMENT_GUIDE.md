# Netlify Deployment Guide - Dakshin Capital

## ✅ Build Status: Success

Your project has been successfully built and is ready for deployment to Netlify!

**Build Output**: `client/dist/` (484.84 kB Firebase + 387.77 kB EMI Calculator + other assets)

---

## Deployment Options

### Option 1: Deploy via Netlify CLI (Recommended - Fastest)

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Login to Netlify

```bash
netlify login
```

This will open your browser to authenticate.

#### Step 3: Deploy from the client directory

```bash
cd client
netlify deploy
```

When prompted:

- **Create & configure a new site**: Yes
- **Team**: Select your team
- **Site name**: `dakshin-capital` (or your preferred name)
- **Publish directory**: `dist`

#### Step 4: Deploy to Production

After testing the draft URL, deploy to production:

```bash
netlify deploy --prod
```

---

### Option 2: Deploy via Netlify Web UI (Drag & Drop)

#### Step 1: Build the Project (Already Done ✅)

The build is complete in `client/dist/`

#### Step 2: Go to Netlify

1. Visit https://app.netlify.com/
2. Sign in or create an account
3. Click "Add new site" → "Deploy manually"

#### Step 3: Drag & Drop

1. Drag the entire `client/dist` folder to the upload area
2. Wait for deployment to complete
3. Your site will be live at a random URL like `random-name-123456.netlify.app`

#### Step 4: Configure Custom Domain (Optional)

1. Go to Site settings → Domain management
2. Add your custom domain
3. Update DNS records as instructed

---

### Option 3: Deploy via Git (Continuous Deployment)

#### Step 1: Push to GitHub/GitLab/Bitbucket

```bash
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

#### Step 2: Connect to Netlify

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Choose your Git provider
4. Select your repository
5. Configure build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`
   - **Node version**: 18

#### Step 3: Add Environment Variables

In Netlify dashboard → Site settings → Environment variables, add:

```
VITE_FIREBASE_API_KEY=AIzaSyAMyRDYYe7ORg8WEbkvUkCNoGaVEfiW38E
VITE_FIREBASE_AUTH_DOMAIN=dakshincapital-2ecf2.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=dakshincapital-2ecf2
VITE_FIREBASE_STORAGE_BUCKET=dakshincapital-2ecf2.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=422735832405
VITE_FIREBASE_APP_ID=1:422735832405:web:6784946315d5a3754dfbdc
VITE_EMAILJS_SERVICE_ID=service_y0lqk3r
VITE_EMAILJS_TEMPLATE_ID=template_vvcb5s7
VITE_EMAILJS_PUBLIC_KEY=4JY9QAfXg9eIfDSN4
```

#### Step 4: Deploy

Click "Deploy site" and wait for the build to complete.

---

## Configuration Files (Already Set Up ✅)

### 1. netlify.toml

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 2. \_redirects

```
/*    /index.html   200
```

Both files are already configured correctly! ✅

---

## Post-Deployment Checklist

### 1. Test the Deployed Site

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Theme toggle works (light/dark mode)
- [ ] Forms submit successfully
- [ ] Admin login works
- [ ] Images load correctly
- [ ] EMI Calculator works
- [ ] Gallery loads
- [ ] Contact form works
- [ ] Mobile responsive design works

### 2. Configure Firebase (If Not Done)

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `dakshincapital-2ecf2`
3. Go to Authentication → Settings → Authorized domains
4. Add your Netlify domain: `your-site-name.netlify.app`
5. If using custom domain, add that too

### 3. Configure EmailJS (If Not Done)

1. Go to EmailJS Dashboard: https://dashboard.emailjs.com/
2. Go to Email Services → Settings
3. Add your Netlify domain to allowed origins
4. Test email sending from the deployed site

### 4. Update Site Settings

In Netlify dashboard:

- [ ] Set custom domain (if you have one)
- [ ] Enable HTTPS (automatic)
- [ ] Configure form notifications (optional)
- [ ] Set up deploy notifications (optional)

---

## Custom Domain Setup (Optional)

### If You Have a Custom Domain:

#### Step 1: Add Domain in Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `dakshincapital.com`)

#### Step 2: Update DNS Records

Add these records in your domain registrar:

**For Root Domain (dakshincapital.com):**

```
Type: A
Name: @
Value: 75.2.60.5
```

**For WWW Subdomain:**

```
Type: CNAME
Name: www
Value: your-site-name.netlify.app
```

#### Step 3: Wait for DNS Propagation

- Usually takes 1-24 hours
- Netlify will automatically provision SSL certificate

---

## Troubleshooting

### Build Fails

**Issue**: Build fails on Netlify
**Solution**:

- Check Node version is set to 18
- Verify all dependencies are in package.json
- Check build logs for specific errors

### 404 Errors on Refresh

**Issue**: Page not found when refreshing on routes
**Solution**:

- Ensure `_redirects` file exists in `public/` folder ✅
- Ensure `netlify.toml` has redirect rules ✅
- Both are already configured!

### Environment Variables Not Working

**Issue**: Firebase or EmailJS not working
**Solution**:

- Add all environment variables in Netlify dashboard
- Redeploy the site after adding variables
- Variables must start with `VITE_` for Vite projects

### Images Not Loading

**Issue**: Images return 404
**Solution**:

- Ensure images are in `public/assets/` folder ✅
- Use absolute paths: `/assets/logo.png` ✅
- Already configured correctly!

### Firebase Authentication Fails

**Issue**: Can't login on deployed site
**Solution**:

- Add Netlify domain to Firebase authorized domains
- Go to Firebase Console → Authentication → Settings → Authorized domains

---

## Performance Optimization (Already Implemented ✅)

- ✅ Asset caching (1 year for static assets)
- ✅ HTML caching (no cache, must revalidate)
- ✅ Code splitting (Vite automatic)
- ✅ Image optimization
- ✅ Minified CSS/JS
- ✅ Gzip compression (automatic by Netlify)

---

## Monitoring & Analytics

### Add Analytics (Optional)

1. Go to Site settings → Analytics
2. Enable Netlify Analytics ($9/month) or
3. Add Google Analytics to your site

### Monitor Performance

- Use Netlify's built-in analytics
- Check Core Web Vitals
- Monitor form submissions
- Track deploy history

---

## Continuous Deployment

Once connected to Git:

- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Rollback to previous deployments anytime
- Deploy previews for testing

---

## Quick Commands Reference

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy draft
cd client
netlify deploy

# Deploy to production
netlify deploy --prod

# Open site in browser
netlify open:site

# Open admin dashboard
netlify open:admin

# Check deploy status
netlify status

# View logs
netlify logs
```

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Support**: https://www.netlify.com/support/
- **Community Forum**: https://answers.netlify.com/
- **Status Page**: https://www.netlifystatus.com/

---

## Summary

Your Dakshin Capital project is **production-ready** and can be deployed to Netlify using any of the three methods above. All configuration files are set up correctly, and the build is successful.

**Recommended Method**: Use Netlify CLI for fastest deployment, or drag & drop the `dist` folder for simplest deployment.

**Next Steps**:

1. Choose a deployment method
2. Deploy the site
3. Test all features
4. Configure Firebase authorized domains
5. Set up custom domain (optional)
6. Share your live site! 🚀

---

**Build Status**: ✅ Success  
**Configuration**: ✅ Complete  
**Ready to Deploy**: ✅ Yes  
**Estimated Deploy Time**: 2-5 minutes
