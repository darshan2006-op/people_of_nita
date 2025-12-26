# Quick Start - Vercel Deployment

## 🚀 Deploy in 5 Minutes

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/people-of-nit.git
git push -u origin main
```

### 2. Import to Vercel
- Visit: https://vercel.com/new
- Click "Import Git Repository"
- Select your repo
- Click "Deploy" (all settings auto-detected)

### 3. Done! 🎉
Your site is live at: `https://your-project.vercel.app`

---

## 📝 Add New Blog Post

```bash
# Create markdown file
cat > posts/my-story.md << 'EOF'
---
title: "My Amazing Journey"
excerpt: "How I made it happen"
author: "Your Name"
date: "2025-12-26"
category: "Innovation"
image: "🚀"
readTime: "5 min read"
---

# Your story here...
EOF

# Push to trigger auto-deploy
git add posts/my-story.md
git commit -m "Add new story"
git push origin main
```

**Build + Deploy time:** ~2 minutes  
**Sitemap:** Auto-updated  
**SEO:** Auto-generated

---

## 🔄 What Happens on Every Push

1. ✅ Metadata script runs (`prebuild`)
2. 📦 Static site generated (13 pages)
3. 🗺️ Sitemap updated with fresh timestamps
4. 🚀 Deployed to Vercel CDN
5. ♻️ Cache invalidated
6. 🔍 Google notified (if sitemap submitted)

**Build logs show:**
```
✅ Build metadata updated
📅 Build time: 2025-12-26T17:42:25.435Z
📝 Total posts: 6
🔗 Deployment: your-project.vercel.app
```

---

## 📊 Monitor Deployments

**Vercel Dashboard:**
- Real-time build logs
- Deployment history
- Performance metrics
- Domain settings

**Access at:** https://vercel.com/dashboard

---

## 🛠️ Common Commands

```bash
# Local development
npm run dev

# Test production build
npm run build

# Check for errors
npm run lint

# View build metadata
cat build-metadata.json

# Clean build
rm -rf .next out build-metadata.json
```

---

## 🔗 Important URLs

After deployment:
- **Website:** `https://your-project.vercel.app`
- **Sitemap:** `https://your-project.vercel.app/sitemap.xml`
- **Robots:** `https://your-project.vercel.app/robots.txt`

---

## 📱 Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add: `peopleofnit.com`
3. Update DNS (as shown)
4. Wait 5-10 minutes
5. SSL auto-configured ✅

---

## 🆘 Quick Fixes

**Build failed?**
```bash
# Test locally first
npm run build

# Fix errors, then push
git add .
git commit -m "Fix build"
git push
```

**Need to rollback?**
- Vercel Dashboard → Deployments
- Click previous deployment → "Promote to Production"

**Clear cache?**
- Settings → General → Clear Build Cache
- Redeploy latest

---

## 📚 Full Documentation

See `DEPLOYMENT.md` for complete guide including:
- SEO validation checklist
- Google Search Console setup
- Performance optimization
- Troubleshooting guide
- Branch deployment strategy

---

**Questions?** Open an issue on GitHub or check Vercel docs.

**Happy deploying!** 🎉
