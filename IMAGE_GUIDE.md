# Image Guide for Blog Posts

## Overview

Blog posts support two types of visuals:
1. **Emoji fallback** - Simple emoji icon (backward compatible)
2. **Image file** - Actual image from `public/post_images/` directory

## Directory Structure

```
public/
└── post_images/
    ├── startup-journey.jpg
    ├── tech-team.jpg
    ├── social-impact.png
    └── ...
```

## Using Images in Blog Posts

### Option 1: Emoji Only (Current Default)

```markdown
---
title: "My Story"
excerpt: "An inspiring journey..."
author: "John Doe"
date: "2024-12-26"
category: "Innovation"
image: "🚀"  # Emoji icon
readTime: "5 min read"
---
```

**Result:** Displays 🚀 emoji in card and post header

### Option 2: Image with Emoji Fallback (Recommended)

```markdown
---
title: "My Story"
excerpt: "An inspiring journey..."
author: "John Doe"
date: "2024-12-26"
category: "Innovation"
image: "🚀"  # Fallback if image not found
imagePath: "/post_images/my-story.jpg"  # Actual image
readTime: "5 min read"
---
```

**Result:** 
- Displays `my-story.jpg` from `public/post_images/`
- Falls back to 🚀 emoji if image missing

## Image Requirements

### Recommended Specifications

| Property | Value |
|----------|-------|
| **Format** | JPG, PNG, WebP |
| **Size** | Max 500KB (optimized) |
| **Dimensions** | 500x500px (square) |
| **Aspect Ratio** | 1:1 (square) or 4:3 |
| **Resolution** | 72-150 DPI |

### Blog Card Display
- **Size:** 120x120px
- **Shape:** Rounded square (1rem border-radius)
- **Fit:** `object-fit: cover` (maintains aspect ratio)

### Blog Post Header Display
- **Size:** 56x56px
- **Shape:** Circle
- **Fit:** `object-fit: cover`

## Adding Images

### Step 1: Prepare Image

```bash
# Resize to optimal dimensions
convert input.jpg -resize 500x500^ -gravity center -extent 500x500 output.jpg

# Or use online tools:
# - TinyPNG (compression)
# - Squoosh (Google's image optimizer)
# - ImageOptim (Mac)
```

### Step 2: Add to Directory

```bash
# Copy image to public/post_images/
cp ~/Downloads/my-image.jpg public/post_images/startup-journey.jpg
```

### Step 3: Update Markdown Frontmatter

```markdown
---
title: "From Classroom to Startup"
excerpt: "How a college project became a startup"
author: "Rajesh Kumar"
date: "2024-01-15"
category: "Entrepreneurship"
image: "🚀"
imagePath: "/post_images/startup-journey.jpg"  # Add this line
readTime: "5 min read"
---
```

### Step 4: Build and Deploy

```bash
npm run build

# Or push to trigger CI/CD
git add public/post_images/startup-journey.jpg posts/from-classroom-to-startup.md
git commit -m "Add image for startup story"
git push origin main
```

## Image Naming Convention

**Format:** `kebab-case-description.ext`

**Examples:**
- `startup-journey.jpg`
- `tech-team-leadership.png`
- `quantum-research.jpg`
- `sports-champion.jpg`
- `open-source-contrib.png`

**Best Practices:**
- Use descriptive names
- No spaces or special characters
- Keep filenames short (<50 chars)
- Match post slug when possible

## Optimization Tips

### 1. Compress Images

```bash
# Using ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# Using jpegoptim
jpegoptim --size=300k input.jpg

# Using pngcrush
pngcrush -rem alla -reduce input.png output.png
```

### 2. WebP Format (Modern)

```bash
# Convert to WebP (better compression)
cwebp -q 85 input.jpg -o output.webp
```

Then use:
```markdown
imagePath: "/post_images/my-story.webp"
```

### 3. Responsive Images (Future)

For different screen sizes:
```
public/post_images/
├── startup-journey.jpg      # Original (500x500)
├── startup-journey-sm.jpg   # Small (250x250)
└── startup-journey-lg.jpg   # Large (1000x1000)
```

## Troubleshooting

### Image Not Displaying

**Check:**
1. File exists in `public/post_images/`
2. Path starts with `/` → `/post_images/image.jpg`
3. Filename matches exactly (case-sensitive)
4. Image format supported (jpg, png, webp, gif)

**Debug:**
```bash
# Verify file exists
ls -lh public/post_images/

# Check file size
du -h public/post_images/*

# Test in browser
# Visit: http://localhost:3000/post_images/your-image.jpg
```

### Image Too Large

**Symptoms:**
- Slow page load
- Large build output
- High bandwidth usage

**Solution:**
```bash
# Compress to <300KB
convert input.jpg -resize 500x500 -quality 80 -strip output.jpg
```

### Broken on Deployment

**Common Issues:**
1. File not committed to git
2. Case-sensitive paths (Linux vs Mac)
3. Special characters in filename

**Fix:**
```bash
# Ensure file is tracked
git add public/post_images/
git status

# Check for uncommitted images
git ls-files public/post_images/
```

## Example: Complete Blog Post with Image

```markdown
---
title: "From Classroom to Startup: A Journey of Innovation"
excerpt: "How a simple college project transformed into a successful tech venture"
author: "Rajesh Kumar"
date: "2024-01-15"
category: "Entrepreneurship"
image: "🚀"
imagePath: "/post_images/startup-journey.jpg"
readTime: "5 min read"
---

# From Classroom to Startup

Your content here...
```

## Default Images Available

If you don't have custom images, you can use emojis:

| Category | Emoji | Unicode |
|----------|-------|---------|
| Entrepreneurship | 🚀 | U+1F680 |
| Leadership | 👥 | U+1F465 |
| Social Impact | 🌱 | U+1F331 |
| Research | 🔬 | U+1F52C |
| Sports | 🏆 | U+1F3C6 |
| Open Source | 💻 | U+1F4BB |
| Innovation | 💡 | U+1F4A1 |
| Education | 📚 | U+1F4DA |

## Future Enhancements

### Planned Features:
1. **Next.js Image Optimization** (when not using static export)
2. **Lazy loading** for images
3. **Blur placeholders** while loading
4. **Automatic WebP conversion** during build
5. **Responsive srcset** for different screen sizes
6. **CDN integration** for image hosting

### Image Component (Future)

```tsx
import Image from 'next/image';

<Image
  src={post.imagePath}
  alt={post.title}
  width={500}
  height={500}
  placeholder="blur"
/>
```

## Best Practices Summary

✅ **DO:**
- Optimize images before uploading
- Use descriptive filenames
- Keep images under 500KB
- Use square aspect ratio (1:1)
- Provide emoji fallback
- Test locally before deploying

❌ **DON'T:**
- Upload huge files (>1MB)
- Use spaces in filenames
- Forget to commit images
- Use copyrighted images
- Skip image optimization

## Resources

**Image Optimization Tools:**
- [TinyPNG](https://tinypng.com/) - Online compression
- [Squoosh](https://squoosh.app/) - Google's optimizer
- [ImageOptim](https://imageoptim.com/) - Mac app
- [ImageMagick](https://imagemagick.org/) - CLI tool

**Free Image Sources:**
- [Unsplash](https://unsplash.com/) - High-quality photos
- [Pexels](https://pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images

**License:** Use only images you have rights to or that are properly licensed (CC0, Creative Commons, etc.)

---

**Ready to add images!** 📸

Your posts will look more professional with actual photos while maintaining backward compatibility with emoji fallbacks.
