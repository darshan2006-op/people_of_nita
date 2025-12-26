import Blogs from "@/components/Blogs";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stories of Growth",
	description: "Explore inspiring journeys, achievements, and experiences from the vibrant NIT community. Read stories about entrepreneurship, leadership, social impact, research, sports, and technology.",
	openGraph: {
		title: "Stories of Growth | People of NIT",
		description: "Explore inspiring journeys, achievements, and experiences from the vibrant NIT community.",
	},
};

export default function AboutPage() {
	const posts = getAllPosts();
	
	return (
		<div>
			<Blogs posts={posts} />
		</div>
	);
}
