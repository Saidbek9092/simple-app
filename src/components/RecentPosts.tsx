"use client";

import type { Post } from "@/types/post";
import Link from "next/link";

interface RecentPostsProps {
  title: string;
  posts: Post[];
  viewAllLabel: string;
}

export default function RecentPosts({
  title,
  posts,
  viewAllLabel,
}: RecentPostsProps) {
  return (
    <div className="rounded-xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h2>
        <Link
          href="/posts"
          className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          {viewAllLabel}
        </Link>
      </div>
      <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {posts.map((post) => (
          <li key={post.id}>
            <Link
              href="/posts"
              className="block py-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50 -mx-2 px-2 rounded-md"
            >
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 line-clamp-1">
                {post.title}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
