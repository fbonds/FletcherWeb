# Deployment Guide for fletcherbonds.com

## Current Situation
- Your site is built with React + Vite
- Currently hosted on Weebly (which doesn't support custom React apps)
- Need to migrate to a modern hosting platform

## Recommended: Deploy to Netlify

### Why Netlify?
- ✅ **Free** for personal sites
- ✅ **Automatic deployments** from GitHub
- ✅ **Custom domain** support (fletcherbonds.com)
- ✅ **Free SSL** certificate (HTTPS)
- ✅ **Environment variables** for API keys
- ✅ **Continuous deployment** - auto-updates when you push code
- ✅ **Contact forms** work perfectly

---

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
cd /Users/fletcher/code/fletchweb

# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Fletcher Bonds portfolio site"

# Create repo on GitHub (github.com/fbonds)
# Then connect and push
git remote add origin https://github.com/fbonds/FletcherWeb.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Netlify

1. Go to https://netlify.com and sign up (use your GitHub account)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize Netlify
4. Select your **FletcherWeb** repository
5. Configure build settings (should auto-detect):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Branch**: `main`
6. Click **"Deploy site"**

### 3. Add Environment Variables

1. In Netlify dashboard, go to **Site settings** → **Environment variables**
2. Add new variable:
   - **Key**: `VITE_WEB3FORMS_ACCESS_KEY`
   - **Value**: `your_web3forms_key_here`
3. Click **"Redeploy site"** to apply changes

### 4. Connect Your Domain (fletcherbonds.com)

#### In Netlify:
1. Go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter: `fletcherbonds.com`
4. Netlify will show you DNS records to add

#### In Your Domain Registrar (where you bought fletcherbonds.com):
1. Log into your domain registrar (GoDaddy, Namecheap, etc.)
2. Go to DNS settings for fletcherbonds.com
3. Add these records (Netlify provides the exact values):
   - **A record**: Point to Netlify's IP
   - **CNAME for www**: Point to your-site.netlify.app
4. Wait 24-48 hours for DNS propagation (usually much faster)

### 5. Enable HTTPS
- Netlify automatically provisions a free SSL certificate
- Once DNS propagates, HTTPS will be enabled
- Force HTTPS in Netlify settings

---

## Continuous Development Workflow

Once deployed, your workflow becomes:

### Local Development:
```bash
# 1. Make changes to your code
# 2. Test locally
npm run dev

# 3. Commit and push when ready
git add .
git commit -m "Updated 3D animations"
git push origin main
```

### Automatic Deployment:
- Netlify detects the push
- Automatically builds your site
- Deploys to fletcherbonds.com
- Usually takes 1-2 minutes

### Live Preview:
- Every branch gets a preview URL
- Test changes before merging to main

---

## Alternative: Vercel

If you prefer Vercel (similar to Netlify):

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click **"Import Project"**
4. Select your repo
5. Click **Deploy**
6. Add environment variables in Vercel dashboard
7. Connect custom domain

---

## What About Weebly?

### Option 1: Full Migration (Recommended)
- Deploy this React site to Netlify/Vercel
- Point fletcherbonds.com to new host
- Cancel Weebly subscription

### Option 2: Keep Weebly for Other Content
- Deploy React site to subdomain: `app.fletcherbonds.com`
- Keep main site on Weebly: `fletcherbonds.com`
- Not recommended - better to have one unified site

---

## Development Best Practices

### Local Development:
```bash
npm run dev          # Start dev server with hot reload
npm run build        # Test production build
npm run preview      # Preview production build locally
npm run lint         # Check code quality
```

### Git Workflow:
```bash
# Create feature branch for major changes
git checkout -b feature/new-animation
# Make changes, test locally
git add .
git commit -m "Add new 3D animation effect"
git push origin feature/new-animation
# Merge to main when ready
```

### Environment Variables:
- Never commit `.env` file to GitHub (already in .gitignore)
- Add all keys in Netlify/Vercel dashboard
- Document required variables in `.env.example`

---

## Cost Breakdown

| Service | Cost |
|---------|------|
| Netlify/Vercel | **FREE** |
| Domain (fletcherbonds.com) | $10-15/year |
| Web3Forms | **FREE** |
| **Total** | **~$12/year** |

Compare to Weebly: Usually $10-25/month = $120-300/year

---

## Need Help?

If you have questions about:
- Moving your domain from Weebly
- Setting up GitHub
- Netlify configuration

Let me know and I'll guide you through it step by step!
