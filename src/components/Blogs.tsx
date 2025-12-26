"use client";
import React from "react";
import Link from "next/link";
import styles from "./Blogs.module.css";
import { BlogPost } from "@/lib/posts";

interface BlogsProps {
	posts: BlogPost[];
}

export default function Blogs({ posts }: BlogsProps) {
	return (
		<section className={styles.blogsSection}>
			{/* Animated Airplane Background */}
			<div className={styles.airplaneBackground}>
				<div className={styles.airplane}>✈️</div>
				<div className={`${styles.airplane} ${styles.airplane2}`}>🛩️</div>
				<div className={styles.cloudLayer}>
					<div className={styles.cloud}>☁️</div>
					<div className={`${styles.cloud} ${styles.cloud2}`}>☁️</div>
					<div className={`${styles.cloud} ${styles.cloud3}`}>☁️</div>
				</div>
			</div>

			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					<h2 className={styles.sectionTitle}>
						Stories of <span className={styles.highlight}>Growth</span>
					</h2>
					<p className={styles.sectionSubtitle}>
						Inspiring journeys, achievements, and experiences from our vibrant NIT community
					</p>
				</div>

				{/* Blog Cards */}
				<div className={styles.blogGrid}>
					{posts.map((post, index) => (
						<Link
							key={post.id}
							href={`/blog/${post.id}`}
							className={`${styles.blogCard} ${
								index % 2 === 0 ? styles.cardLeft : styles.cardRight
							}`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<div className={styles.cardEmoji}>
								{post.imagePath ? (
									<img 
										src={post.imagePath} 
										alt={post.title}
										className={styles.cardImage}
									/>
								) : (
									post.image
								)}
							</div>
							<div className={styles.cardContent}>
								<div className={styles.cardMeta}>
									<span className={styles.category}>{post.category}</span>
									<span className={styles.readTime}>{post.readTime}</span>
								</div>
								<h3 className={styles.cardTitle}>{post.title}</h3>
								<p className={styles.cardExcerpt}>{post.excerpt}</p>
								<div className={styles.cardFooter}>
									<div className={styles.authorInfo}>
										<span className={styles.authorName}>{post.author}</span>
										<span className={styles.date}>{post.date}</span>
									</div>
									<button className={styles.readMoreBtn}>
										Read Story
										<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
											<path
												d="M6 3L11 8L6 13"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</button>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}
