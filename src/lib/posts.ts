import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string; // Emoji fallback
  imagePath?: string; // Optional: /post_images/filename.jpg
  readTime: string;
  content?: string;
}

/**
 * Get all blog posts metadata (without content)
 */
export function getAllPosts(): BlogPost[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        id,
        title: matterResult.data.title,
        excerpt: matterResult.data.excerpt,
        author: matterResult.data.author,
        date: matterResult.data.date,
        category: matterResult.data.category,
        image: matterResult.data.image,
        imagePath: matterResult.data.imagePath,
        readTime: matterResult.data.readTime,
      } as BlogPost;
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Get a single post by ID with full content
 */
export function getPostById(id: string): BlogPost {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = remark()
    .use(html)
    .processSync(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    title: matterResult.data.title,
    excerpt: matterResult.data.excerpt,
    author: matterResult.data.author,
    date: matterResult.data.date,
    category: matterResult.data.category,
    image: matterResult.data.image,
    imagePath: matterResult.data.imagePath,
    readTime: matterResult.data.readTime,
    content: contentHtml,
  } as BlogPost;
}

/**
 * Get all post IDs for static generation
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md') && fileName !== 'README.md')
    .map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
}
