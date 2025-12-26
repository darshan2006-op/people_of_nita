# Deployment Guide - People of NIT Website

## Vercel CI/CD Deployment (Recommended)

### Quick Setup

1. **Push to GitHub**
   ```bash
   cd /home/electro-dracula/Desktop/people_of_nit_website/frontend
   git init
   git add .
   git commit -m "Initial commit with CI/CD metadata system"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/people-of-nit.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Vercel auto-detects Next.js settings:
     - **Framework:** Next.js
     - **Build Command:** `npm run build` (includes prebuild script)
     - **Output Directory:** `out`
     - **Install Command:** `npm install`

3. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for initial build
   - Your site will be live at `https://your-project.vercel.app`

4. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add `peopleofnit.com`
   - Update DNS records as shown by Vercel
   - SSL certificate auto-generated

### Automatic Updates

Every push to `main` branch triggers:
1. ✅ Pre-build metadata update (`scripts/update-metadata.js`)
2. 📦 Next.js static build
3. 🚀 Automatic deployment
4. 🗺️ Fresh sitemap with build timestamps
5. ♻️ CDN cache invalidation

### Environment Variables on Vercel

Automatically available (no setup needed):
- `VERCEL_URL` - Deployment URL
- `VERCEL_GIT_COMMIT_SHA` - Git commit hash
- `VERCEL_ENV` - Environment (production/preview/development)

These are used by `scripts/update-metadata.js` to track deployments.

### Build Metadata System

**How it works:**
1. `npm run build` triggers `prebuild` script
2. `scripts/update-metadata.js` runs before Next.js build:
   - Scans `posts/` directory
   - Captures file modification times
   - Records build timestamp
   - Saves Vercel environment info
   - Generates `build-metadata.json`
3. Next.js build reads metadata via `src/lib/build-info.ts`
4. Sitemap uses real build time for `lastModified`
5. Each deployment gets fresh, accurate timestamps

**Generated metadata example:**
```json
{
  "lastBuildTime": "2025-12-26T17:42:25.435Z",
  "buildNumber": "a7f3b9e",
  "deploymentUrl": "people-of-nit.vercel.app",
  "totalPosts": 6,
  "posts": [...]
}
```

### Vercel Configuration (`vercel.json`)

Already configured with:
- ✅ Build command with metadata prebuild
- ✅ Output directory (`out`)
- ✅ Auto-deployment on push
- ✅ Cache headers for sitemap (1 hour)
- ✅ Security headers (X-Frame-Options, etc.)

### Branch Deployments

- **Production:** `main` branch → `peopleofnit.com`
- **Preview:** Other branches → `branch-name-people-of-nit.vercel.app`
- **Pull Requests:** Auto-preview deployments with unique URLs

### Monitoring & Analytics

**Built-in Vercel Features:**
- Real-time logs
- Build history
- Deployment status
- Performance metrics

**Add Vercel Analytics** (Optional):
```bash
npm install @vercel/analytics
```

Then in `src/app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Alternative Platforms

### Netlify

1. **Build Settings:**
   - Build command: `npm run build`
   - Publish directory: `out`

2. **Deploy:**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=out
   ```

### GitHub Pages

```bash
# Build locally
npm run build

# Deploy to gh-pages branch
npx gh-pages -d out
```

Configure in repo settings:
- Settings → Pages → Source: `gh-pages` branch

### Cloudflare Pages

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `out`

---

## Post-Deployment Checklist

### 1. Verify Deployment
- [ ] Site loads at production URL
- [ ] All pages accessible (Home, About, Blog posts)
- [ ] Navigation works correctly
- [ ] Mobile responsive design works

### 2. SEO Validation
- [ ] Sitemap accessible: `https://yoursite.com/sitemap.xml`
- [ ] Robots.txt accessible: `https://yoursite.com/robots.txt`
- [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Check metadata with browser inspector (F12 → Elements → head)

### 3. Google Search Console
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property: `https://peopleofnit.com`
3. Verify ownership (HTML tag or DNS)
4. Submit sitemap: `https://peopleofnit.com/sitemap.xml`
5. Request indexing for main pages

### 4. Performance Testing
- [ ] [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] [GTmetrix](https://gtmetrix.com/)
- [ ] [WebPageTest](https://www.webpagetest.org/)

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

### 5. Social Media Preview
Test link previews:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## Adding New Blog Posts (Production)

### Method 1: Direct Push (Recommended)
```bash
# Create new post
echo "---
title: 'New Story'
excerpt: 'An inspiring journey'
author: 'John Doe'
date: '$(date +%Y-%m-%d)'
category: 'Innovation'
image: '💡'
readTime: '4 min read'
---

# Your content here
" > posts/new-story.md

# Commit and push
git add posts/new-story.md
git commit -m "Add new story: New Story"
git push origin main

# Vercel auto-deploys in ~2 minutes
```

### Method 2: GitHub Web Interface
1. Navigate to `posts/` folder on GitHub
2. Click "Add file" → "Create new file"
3. Name: `your-story.md`
4. Add frontmatter and content
5. Commit directly to `main`
6. Auto-deployment triggers

### Method 3: Pull Request Workflow
```bash
# Create feature branch
git checkout -b post/new-story

# Add post
echo "..." > posts/new-story.md

# Push and create PR
git add posts/new-story.md
git commit -m "Add: New inspiring story"
git push origin post/new-story

# Create PR on GitHub → Review → Merge
# Deployment happens automatically on merge
```

**Note:** Every new post automatically:
- Updates sitemap.xml
- Gets fresh build timestamp
- Appears in blog listing
- Includes SEO metadata
- Generates structured data

---

## Rollback Procedure

### Instant Rollback on Vercel
1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click "⋯" menu → "Promote to Production"
4. Instant rollback (no rebuild needed)

### Git Rollback
```bash
# Find commit to revert
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or hard reset (destructive)
git reset --hard <commit-hash>
git push origin main --force
```

---

## Troubleshooting

### Build Fails on Vercel

**Check build logs:**
1. Vercel Dashboard → Deployment → View logs
2. Look for errors in prebuild or build phase

**Common issues:**
- Missing dependencies → Check `package.json`
- TypeScript errors → Run `npm run lint` locally
- Markdown parsing → Verify frontmatter syntax

**Fix locally:**
```bash
# Clean and rebuild
rm -rf .next out node_modules build-metadata.json
npm install
npm run build

# If successful, push
git add .
git commit -m "Fix: Build errors"
git push origin main
```

### Sitemap Not Updating

**Verify prebuild runs:**
```bash
# Check build logs for:
# ✅ Build metadata updated
# 📅 Build time: ...

# Test locally
npm run build
cat build-metadata.json
```

**Force fresh build on Vercel:**
1. Settings → General → Clear Cache
2. Redeploy latest deployment

### Metadata Shows Wrong Date

**Check system:**
```bash
# Metadata should show current build time
cat build-metadata.json | grep lastBuildTime

# Sitemap should use this timestamp
cat out/sitemap.xml | grep -A 3 "peopleofnit.com</loc>"
```

### Custom Domain Not Working

1. Verify DNS records in domain registrar
2. Wait 24-48 hours for propagation
3. Check Vercel domain status (should show "Valid Configuration")
4. Try incognito/private browsing (cache issue)

---

## Maintenance

### Regular Updates
```bash
# Update dependencies (monthly)
npm update
npm audit fix

# Test locally
npm run build

# Push if successful
git add package*.json
git commit -m "Update dependencies"
git push origin main
```

### Monitor Build Times
- Target: <3 minutes per build
- If slower, check for:
  - Large dependencies
  - Many blog posts (100+)
  - Slow prebuild script

### Cache Strategy
- Sitemap: 1 hour cache (CDN), 24 hour stale-while-revalidate
- Static pages: Cached until new deployment
- Images: Unoptimized (static export limitation)

---

## Support

**Resources:**
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [GitHub Issues](https://github.com/YOUR_USERNAME/people-of-nit/issues)

**Community:**
- Vercel Discord: [vercel.com/discord](https://vercel.com/discord)
- Next.js Discord: [nextjs.org/discord](https://nextjs.org/discord)

---

**Ready to deploy!** 🚀

Your site includes:
- ✅ Automatic metadata updates on every build
- ✅ Fresh timestamps in sitemap
- ✅ Vercel environment tracking
- ✅ SEO optimization
- ✅ CI/CD pipeline
- ✅ Security headers
- ✅ Cache optimization

Just push to GitHub and Vercel handles the rest!
