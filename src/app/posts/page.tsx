"use client";

import type { Post } from "@/types/post";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";

export default function PostsPage() {
  const { t } = useTranslation();
  const { data: posts, loading, error, refetch } = useFetch<Post[]>(
    "/api/posts",
    t("posts.error")
  );

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col gap-8 py-16 px-16 bg-white dark:bg-black">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {t("posts.title")}
        </h1>

        {loading && (
          <p className="text-zinc-600 dark:text-zinc-400">{t("posts.loading")}</p>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={refetch}
              className="mt-2 text-sm font-medium text-red-800 underline dark:text-red-200"
            >
              {t("posts.tryAgain")}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(posts ?? []).map((post) => (
              <article
                key={post.id}
                className="rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]"
              >
                <h2 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
