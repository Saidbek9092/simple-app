import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Browse all users",
};

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
