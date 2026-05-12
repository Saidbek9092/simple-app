"use client";

import type { Comment } from "@/types/comment";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";

export default function CommentsPage() {
  const { t } = useTranslation();
  const {
    data: comments,
    loading,
    error,
    refetch,
  } = useFetch<Comment[]>("/api/comments", t("comments.error"));

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-8 py-16 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {t("comments.title")}
        </h1>

        {loading && (
          <p className="text-zinc-600 dark:text-zinc-400">
            {t("comments.loading")}
          </p>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={refetch}
              className="mt-2 text-sm font-medium text-red-800 underline dark:text-red-200"
            >
              {t("comments.tryAgain")}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(comments ?? []).map((comment) => (
              <article
                key={comment.id}
                className="rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]"
              >
                <h2 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                  {comment.author}
                </h2>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                  {comment.email}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {comment.excerpt}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
