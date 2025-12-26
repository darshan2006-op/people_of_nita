# Build Metadata System - Technical Documentation

## Overview

The People of NIT website includes an automatic metadata update system designed for CI/CD deployments on Vercel. This ensures that every build has fresh, accurate timestamps and deployment information.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                        │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  1. Git Push to main branch                             │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  2. Vercel triggers: npm run build                      │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  3. Prebuild script: scripts/update-metadata.js         │
│     - Scans posts/ directory                            │
│     - Captures file modification times                  │
│     - Records build timestamp                           │
│     - Saves Vercel environment variables                │
│     - Generates build-metadata.json                     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  4. Next.js Build Process                               │
│     - Reads build-metadata.json via lib/build-info.ts   │
│     - Generates static pages (13 pages)                 │
│     - Creates sitemap with fresh timestamps             │
│     - Creates robots.txt                                │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│  5. Deployment                                          │
│     - Static files exported to /out                     │
│     - Deployed to Vercel CDN                            │
│     - Cache invalidated                                 │
└─────────────────────────────────────────────────────────┘
```

## Components

### 1. Prebuild Script (`scripts/update-metadata.js`)

**Purpose:** Generate build metadata before Next.js compilation

**Features:**
- Scans markdown files in `posts/` directory
- Captures file modification timestamps
- Records build time with timezone
- Extracts Vercel environment variables
- Creates machine-readable JSON metadata

**Environment Variables Used:**
- `VERCEL_GIT_COMMIT_SHA` - Git commit identifier
- `VERCEL_URL` - Deployment URL
- Fallbacks to 'local' and 'localhost' for local builds

**Output:** `build-metadata.json` in project root

**Example Output:**
```json
{
  "lastBuildTime": "2025-12-26T17:44:21.199Z",
  "buildNumber": "a7f3b9e1234567890abcdef",
  "deploymentUrl": "people-of-nit.vercel.app",
  "totalPosts": 6,
  "posts": [
    {
      "filename": "from-classroom-to-startup.md",
      "lastModified": "2025-12-26T17:14:14.795Z",
      "size": 3329
    }
  ]
}
```

### 2. Build Info Library (`src/lib/build-info.ts`)

**Purpose:** TypeScript interface for reading build metadata

**Exports:**
- `BuildMetadata` interface (TypeScript type)
- `getBuildMetadata()` - Read and parse metadata file
- `getLastBuildTime()` - Get build time with fallback

**Features:**
- Safe file reading with error handling
- Returns `null` if metadata unavailable
- Fallback to current time for local dev
- TypeScript type safety

**Usage:**
```typescript
import { getLastBuildTime } from '@/lib/build-info';

const lastBuild = getLastBuildTime(); // Date object
```

### 3. Dynamic Sitemap (`src/app/sitemap.ts`)

**Purpose:** Generate sitemap with accurate timestamps

**Features:**
- Uses real build time from metadata
- Homepage and About page get fresh timestamps
- Blog posts use their publication dates
- Proper priority and change frequency
- XML format for search engines

**Timestamp Strategy:**
- **Homepage:** `lastBuildTime` (always fresh)
- **About page:** `lastBuildTime` (always fresh)
- **Blog posts:** Original `post.date` (historical)

**Benefits:**
- Search engines see recent activity
- Homepage prioritized for crawling
- Blog posts maintain original dates
- Accurate `lastModified` for SEO

### 4. Package Configuration (`package.json`)

**Critical Addition:**
```json
{
  "scripts": {
    "prebuild": "node scripts/update-metadata.js",
    "build": "next build"
  }
}
```

**How it works:**
- npm automatically runs `prebuild` before `build`
- No manual intervention needed
- Works on Vercel, Netlify, and local builds
- Guarantees metadata freshness

## Vercel Integration

### Automatic Environment Variables

Vercel provides these automatically:

| Variable | Description | Example |
|----------|-------------|---------|
| `VERCEL_URL` | Deployment URL | `people-of-nit.vercel.app` |
| `VERCEL_GIT_COMMIT_SHA` | Git commit hash | `a7f3b9e123...` |
| `VERCEL_ENV` | Environment | `production` / `preview` |
| `VERCEL_GIT_COMMIT_REF` | Branch name | `main` |
| `VERCEL_GIT_COMMIT_MESSAGE` | Commit message | `"Add new blog post"` |

### Configuration (`vercel.json`)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "headers": [
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400"
        }
      ]
    }
  ]
}
```

**Cache Strategy:**
- Sitemap cached for 1 hour at CDN
- Stale content served while revalidating (24 hours)
- Robots.txt cached for 24 hours
- Static pages cached until new deployment

## Build Process Flow

### Local Development
```bash
$ npm run build

> prebuild
> node scripts/update-metadata.js

✅ Build metadata updated
📅 Build time: 2025-12-26T17:44:21.199Z
📝 Total posts: 6
🔗 Deployment: localhost

> build
> next build

▲ Next.js 16.1.1
  Creating an optimized production build ...
✓ Compiled successfully in 2.5s
  Generating static pages (13/13)
✓ Build complete

Output: /out directory
```

### Vercel Production Build
```bash
[Vercel] Running build command: npm run build

> prebuild
> node scripts/update-metadata.js

✅ Build metadata updated
📅 Build time: 2025-12-26T18:30:15.789Z
📝 Total posts: 6
🔗 Deployment: people-of-nit.vercel.app

> build
> next build

▲ Next.js 16.1.1
  Creating an optimized production build ...
✓ Compiled successfully in 3.2s
  Generating static pages (13/13)
✓ Build complete

[Vercel] Deploying to CDN...
[Vercel] ✓ Deployment ready
```

## SEO Benefits

### 1. Fresh Timestamps
- Search engines see recent activity
- Signals active maintenance
- Improves crawl priority

### 2. Accurate Sitemap
- Homepage always shows latest build
- Content pages show real modification dates
- Proper priority hierarchy

### 3. Deployment Tracking
- Git commit SHA in metadata
- Deployment URL recorded
- Build history preserved

### 4. Cache Optimization
- Sitemap cached but fresh (1 hour)
- CDN serves stale while revalidating
- Balance between speed and freshness

## Monitoring & Debugging

### Check Build Metadata
```bash
# Local
cat build-metadata.json | jq

# Production (if exposed)
curl https://yoursite.com/api/build-info
```

### Verify Sitemap Timestamps
```bash
# Check homepage timestamp
curl https://yoursite.com/sitemap.xml | grep -A 3 "<loc>https://yoursite.com</loc>"

# Should show recent build time
<loc>https://yoursite.com</loc>
<lastmod>2025-12-26T17:44:21.199Z</lastmod>
```

### Vercel Build Logs
1. Dashboard → Deployments → Click deployment
2. Look for prebuild output:
   ```
   ✅ Build metadata updated
   📅 Build time: [timestamp]
   📝 Total posts: [count]
   ```

### Common Issues

**❌ Timestamps not updating**
- Check: `build-metadata.json` generated?
- Check: `prebuild` in package.json?
- Solution: Clear Vercel build cache

**❌ Metadata file not found during build**
- Check: Script runs before Next.js build?
- Check: File permissions (should be readable)
- Solution: Verify prebuild script path

**❌ Wrong deployment URL**
- Check: Vercel environment variables set?
- Check: Custom domain configured?
- Solution: Update `VERCEL_URL` if needed

## Performance Impact

**Prebuild Script:**
- Execution time: <100ms
- File operations: ~10 file stats
- JSON write: ~1KB file
- **Total overhead: Negligible**

**Build Impact:**
- No additional Next.js build time
- Metadata read once during sitemap generation
- No runtime performance impact
- Static files only

## Future Enhancements

### Potential Additions:

1. **API Endpoint for Metadata**
   ```typescript
   // src/app/api/build-info/route.ts
   export async function GET() {
     const metadata = getBuildMetadata();
     return Response.json(metadata);
   }
   ```

2. **Build Badge in Footer**
   ```tsx
   // Show build info in UI
   <footer>
     Built on {buildTime} • Commit {commitSha.slice(0, 7)}
   </footer>
   ```

3. **Post Update Tracking**
   ```typescript
   // Track when each post was last modified
   // Update sitemap accordingly
   ```

4. **RSS Feed with Fresh Timestamps**
   ```typescript
   // Generate RSS feed using build metadata
   ```

## Testing

### Local Testing
```bash
# Clean build
rm -rf .next out build-metadata.json

# Full build
npm run build

# Verify metadata
cat build-metadata.json | jq '.lastBuildTime'

# Check sitemap
grep -A 3 "peopleofnit.com</loc>" out/sitemap.xml
```

### Integration Testing
```bash
# Simulate Vercel environment
export VERCEL_URL="test.vercel.app"
export VERCEL_GIT_COMMIT_SHA="abc123"

npm run build

# Check metadata reflects env vars
cat build-metadata.json | jq '.deploymentUrl, .buildNumber'
```

## Documentation

- **Quick Start:** `QUICKSTART.md`
- **Full Deployment Guide:** `DEPLOYMENT.md`
- **Technical Docs:** This file
- **Project README:** `README.md`

## Support

**Issues:**
- Check prebuild script output
- Verify `build-metadata.json` exists
- Review Vercel build logs
- Test locally with same Node version

**Debugging:**
```bash
# Verbose prebuild
DEBUG=* node scripts/update-metadata.js

# Verify Next.js reads metadata
npm run build 2>&1 | grep -E "(metadata|Build)"
```

---

**System Status:** ✅ Fully operational

**Last Updated:** December 26, 2025

**Version:** 1.0.0
