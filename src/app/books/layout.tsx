import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Books",
  description: "Browse all books",
};

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
