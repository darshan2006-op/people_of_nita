"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = React.useState(false);

	const links = [
		{ label: "Home", href: "/" },
		{ label: "About", href: "/about" },
		{ label: "Contribute", href: "/contribute" },
	];

	return (
		<header className={styles.header}>
			<nav className="mx-auto max-w-6xl px-8 sm:px-10 lg:px-12">
				<div className="flex h-20 items-center justify-between gap-6">
					{/* Brand */}
					<Link href="/" className={styles.brand}>
						<span className={styles.brandText}>People of NIT</span>
				</Link>

				{/* Desktop links */}
				<ul className={`${styles.desktopNav} hidden md:flex items-center gap-4 sm:gap-6 lg:gap-8`}>
						{links.map(({ label, href }) => {
							const isActive = pathname === href;
							const isCTA = label === "Contribute";
							return (
								<li key={href}>
									{isCTA ? (
										<Link
											href={href}
											aria-current={isActive ? "page" : undefined}
											className={styles.ctaButton}
										>
											{label}
										</Link>
									) : (
										<Link
											href={href}
											aria-current={isActive ? "page" : undefined}
											className={`${styles.navLink} ${isActive ? styles.active : ""}`}
										>
											<span>{label}</span>
											<span className={styles.navLinkUnderline} />
										</Link>
									)}
								</li>
							);
						})}
					</ul>

					{/* Mobile toggle */}
					<button
						aria-label="Toggle menu"
						className={styles.mobileToggle}
						onClick={() => setOpen((v) => !v)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="22"
							height="22"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={`${styles.mobileIcon} ${open ? styles.open : ""}`}
						>
							{open ? (
								<path d="M18 6L6 18M6 6l12 12" />
							) : (
								<>
									<line x1="3" y1="12" x2="21" y2="12" />
									<line x1="3" y1="6" x2="21" y2="6" />
									<line x1="3" y1="18" x2="21" y2="18" />
								</>
							)}
						</svg>
					</button>
				</div>

				{/* Mobile menu */}
				{open && (
					<div className={styles.mobileMenu}>
						<ul className={styles.mobileMenuList}>
							{links.map(({ label, href }) => {
								const isActive = pathname === href;
								const isCTA = label === "Contribute";
								return (
									<li key={href}>
										{isCTA ? (
											<Link
												href={href}
												aria-current={isActive ? "page" : undefined}
												className={styles.mobileCta}
												onClick={() => setOpen(false)}
											>
												<span>{label}</span>
											</Link>
										) : (
												<Link
													href={href}
													aria-current={isActive ? "page" : undefined}
													className={`${styles.mobileNavLink} ${isActive ? styles.active : ""}`}
													onClick={() => setOpen(false)}
												>
													{label}
												</Link>
										)}
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</nav>
		</header>
	);
}

