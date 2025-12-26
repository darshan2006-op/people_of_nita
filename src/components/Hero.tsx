"use client";
import React from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
	return (
		<section className={styles.hero}>
			{/* Animated Gradient Mesh Background */}
			<div className={styles.gradientMesh}>
				<div className={styles.meshLayer1} />
				<div className={styles.meshLayer2} />
				<div className={styles.meshLayer3} />
			</div>

			{/* Floating Particles */}
			<div className={styles.particles}>
				{[...Array(12)].map((_, i) => (
					<div key={i} className={styles.particle} style={{ animationDelay: `${i * 0.5}s` }} />
				))}
			</div>

			<div className={styles.container}>
				<div className={styles.content}>
					{/* Main Heading */}
					<h1 className={styles.heading}>
						<span className={styles.headingLine}>
							Welcome to
							<span className={styles.highlight}> People of NIT</span>
						</span>
					</h1>

					{/* Description */}
					<p className={styles.description}>
						A vibrant platform showcasing the incredible stories, achievements, and journeys 
						of students and alumni from the National Institutes of Technology. 
						Connect, inspire, and be inspired by the people who shape our community.
					</p>

					{/* CTA Button */}
					<div className={styles.ctaGroup}>
						<Link href="/about" className={styles.ctaPrimary}>
							<span>Explore Stories</span>
							<svg
								width="16"
								height="16"
								viewBox="0 0 16 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 3L11 8L6 13"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</div>

			{/* Decorative Wave */}
			<div className={styles.wave}>
				<svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
						fill="var(--color-bg-main)"
					/>
				</svg>
			</div>
		</section>
	);
}
