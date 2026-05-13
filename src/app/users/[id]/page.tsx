"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/types/user";
import type { Post } from "@/types/post";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

interface UserDetail extends User {
  posts: Post[];
}

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useFetch<UserDetail>(`/api/users/${id}`, t("userDetail.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <Link
            href="/users"
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
            {t("userDetail.back")}
          </Link>
        </div>

        {loading && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="space-y-2">
                <div className="h-6 w-48 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 w-32 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="post" />
              ))}
            </div>
          </div>
        )}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && !user && (
          <EmptyState message={t("userDetail.notFound")} />
        )}

        {!loading && !error && user && (
          <>
            <div className="mb-8 flex items-center gap-4">
              <Image
                src={user.avatar}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full"
                unoptimized
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
                  {user.name}
                </h1>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {user.email}
                </p>
              </div>
            </div>

            <section>
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
                {t("userDetail.posts")} ({user.posts.length})
              </h2>

              {user.posts.length === 0 ? (
                <EmptyState message={t("userDetail.noPosts")} />
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {user.posts.map((post, index) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className="animate-fade-up"
                      style={{ "--i": index } as React.CSSProperties}
                    >
                      <article className="card-hover rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]">
                        <h3 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                          {post.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {post.excerpt}
                        </p>
                      </article>
                    </Link>
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
