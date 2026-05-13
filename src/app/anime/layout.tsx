import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anime",
  description: "Browse top anime",
};

export default function AnimeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
