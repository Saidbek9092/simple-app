import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "Browse all posts",
};

export default function PostsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
