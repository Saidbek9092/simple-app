import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "Browse photos",
};

export default function PhotosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
