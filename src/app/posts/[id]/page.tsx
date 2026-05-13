"use client";

import { use } from "react";
import Link from "next/link";
import type { Post } from "@/types/post";
import type { Comment } from "@/types/comment";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

interface PostDetail extends Post {
  comments: Comment[];
}

export default function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const {
    data: post,
    loading,
    error,
    refetch,
  } = useFetch<PostDetail>(`/api/posts/${id}`, t("postDetail.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            {t("postDetail.back")}
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="h-4 w-2/3 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} variant="comment" />
              ))}
            </div>
          </div>
        )}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && !post && (
          <EmptyState message={t("postDetail.notFound")} />
        )}

        {!loading && !error && post && (
          <>
            <article className="mb-10">
              <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                {post.title}
              </h1>
              <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {post.body}
              </div>
            </article>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
                {t("postDetail.comments")} ({post.comments.length})
              </h2>

              {post.comments.length === 0 ? (
                <EmptyState message={t("postDetail.noComments")} />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {post.comments.map((comment, index) => (
                    <article
                      key={comment.id}
                      className="animate-fade-up rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]"
                      style={{ "--i": index } as React.CSSProperties}
                    >
                      <h3 className="text-sm font-medium text-black dark:text-zinc-50">
                        {comment.author}
                      </h3>
                      <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-500">
                        {comment.email}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {comment.body}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 Simple App
      </footer>
    </div>
  );
}
