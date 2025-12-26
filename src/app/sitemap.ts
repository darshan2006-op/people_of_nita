import { getAllPosts } from "@/lib/posts";
import { getLastBuildTime } from "@/lib/build-info";
import { MetadataRoute } from "next";

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://peopleofnit.com";
  const lastBuild = getLastBuildTime();
  
  // Get all blog posts
  const posts = getAllPosts();
  
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: lastBuild,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: lastBuild,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...blogUrls,
  ];
}
