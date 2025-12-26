# Quick Reference - Blog Post Images

## ✅ Image Support Added!

Your blog posts now support **actual images** from the `public/post_images/` directory, with emoji fallback for backward compatibility.

## 📁 Directory Structure

```
public/
└── post_images/          # Your blog post images go here
    ├── README.md         # Instructions (this file is ignored)
    ├── startup.jpg       # Example: 500x500px, <500KB
    └── your-image.jpg    # Add your images here
```

## 🎯 Usage

### Option 1: Emoji Only (Current Default)

```markdown
---
title: "My Story"
image: "🚀"
---
```
→ Displays emoji in blog cards and post headers

### Option 2: Image with Fallback (Recommended)

```markdown
---
title: "My Story"
image: "🚀"                              # Fallback
imagePath: "/post_images/my-story.jpg"  # Actual image
---
```
→ Displays image if available, emoji if not

## 📸 Adding Images

### Step 1: Add image file
```bash
cp ~/Downloads/your-photo.jpg public/post_images/
```

### Step 2: Update markdown frontmatter
```markdown
---
title: "From Classroom to Startup"
excerpt: "My journey..."
author: "John Doe"
date: "2024-12-26"
category: "Entrepreneurship"
image: "🚀"
imagePath: "/post_images/your-photo.jpg"  # ← Add this
readTime: "5 min read"
---
```

### Step 3: Commit and deploy
```bash
git add public/post_images/your-photo.jpg posts/your-post.md
git commit -m "Add image for blog post"
git push origin main
```

## 🎨 Image Specs

| Property | Recommendation |
|----------|----------------|
| **Format** | JPG, PNG, WebP |
| **Size** | < 500KB |
| **Dimensions** | 500x500px (square) |
| **Naming** | kebab-case.jpg |

## 🖼️ Display Sizes

- **Blog Cards:** 120x120px rounded square
- **Post Header:** 56x56px circle
- **Fit:** `object-fit: cover` (crops to center)

## 🛠️ Optimize Images

```bash
# Resize and compress
convert input.jpg -resize 500x500 -quality 85 output.jpg

# Or use online tools:
# - tinypng.com
# - squoosh.app
```

## ✨ Features

✅ Backward compatible (works with emojis)  
✅ Automatic fallback if image missing  
✅ Responsive design  
✅ Works with static export  
✅ SEO-friendly alt tags  
✅ Build-time validation  

## 📚 Documentation

- **Full Guide:** `IMAGE_GUIDE.md` (comprehensive documentation)
- **Deployment:** `DEPLOYMENT.md` (includes image handling)
- **Quick Start:** `QUICKSTART.md`

## 🔍 Troubleshooting

**Image not showing?**
1. Check file exists: `ls public/post_images/`
2. Path starts with `/`: `/post_images/image.jpg`
3. Filename matches exactly (case-sensitive)
4. File committed to git

**Test locally:**
```bash
npm run build
# Visit: http://localhost:3000/post_images/your-image.jpg
```

## 💡 Examples

### With Image
```markdown
---
title: "Tech Leadership Journey"
image: "👥"
imagePath: "/post_images/tech-team.jpg"
---
```

### Emoji Only
```markdown
---
title: "Sports Achievement"
image: "🏆"
---
```

## 🚀 Next Steps

1. Add images to `public/post_images/`
2. Update markdown frontmatter with `imagePath`
3. Build and test locally
4. Push to trigger deployment

---

**Your blog posts can now use real images!** 📸

Backward compatible with existing emoji posts. Add images progressively as needed.
