import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comments",
  description: "Browse all comments",
};

export default function CommentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
