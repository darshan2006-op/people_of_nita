import Hero from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to People of NIT - A platform showcasing incredible stories, achievements, and journeys of students and alumni from National Institutes of Technology.",
};

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
