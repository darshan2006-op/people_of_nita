import { getAllPostIds, getPostById } from "@/lib/posts";
import styles from "./page.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
	const posts = getAllPostIds();
	return posts.map((post) => ({
		id: post.params.id,
	}));
}

interface BlogPostPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
	const { id } = await params;
	const post = getPostById(id);
	
	return {
		title: post.title,
		description: post.excerpt,
		keywords: [post.category, "NIT", "student story", post.author, "inspiration"],
		authors: [{ name: post.author }],
		openGraph: {
			title: post.title,
			description: post.excerpt,
			type: "article",
			publishedTime: post.date,
			authors: [post.author],
			tags: [post.category, "NIT"],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.excerpt,
		},
	};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { id } = await params;
	const post = getPostById(id);

	// Structured data for SEO
	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: post.title,
		description: post.excerpt,
		author: {
			"@type": "Person",
			name: post.author,
		},
		datePublished: post.date,
		articleBody: post.excerpt,
		keywords: [post.category, "NIT", "student story"],
		publisher: {
			"@type": "Organization",
			name: "People of NIT",
		},
	};

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			
			<article className={styles.blogPost}>
			{/* Back Button */}
			<Link href="/about" className={styles.backButton}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none">
					<path
						d="M12 4L6 10L12 16"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
				Back to Stories
			</Link>

			{/* Header */}
			<header className={styles.header}>
				<div className={styles.meta}>
					<span className={styles.category}>{post.category}</span>
					<span className={styles.readTime}>{post.readTime}</span>
				</div>
				<h1 className={styles.title}>{post.title}</h1>
				<p className={styles.excerpt}>{post.excerpt}</p>
				<div className={styles.authorInfo}>
					<div className={styles.avatar}>
						{post.imagePath ? (
							<img 
								src={post.imagePath} 
								alt={post.author}
								className={styles.avatarImage}
							/>
						) : (
							post.image
						)}
					</div>
					<div className={styles.authorDetails}>
						<span className={styles.authorName}>{post.author}</span>
						<span className={styles.date}>{post.date}</span>
					</div>
				</div>
			</header>

			{/* Content */}
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: post.content || "" }}
			/>

			{/* Footer */}
			<footer className={styles.footer}>
				<div className={styles.shareSection}>
					<h3>Share this story</h3>
					<div className={styles.shareButtons}>
						<button className={styles.shareBtn}>Twitter</button>
						<button className={styles.shareBtn}>LinkedIn</button>
						<button className={styles.shareBtn}>Facebook</button>
					</div>
				</div>
				<Link href="/about" className={styles.backToBlogs}>
					← Back to All Stories
				</Link>
			</footer>
		</article>
		</>
	);
}
