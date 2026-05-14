"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import type { AnimeDetail } from "@/types/anime";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function AnimeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const {
    data: anime,
    loading,
    error,
    refetch,
  } = useFetch<AnimeDetail>(`/api/anime/${id}`, t("animeDetail.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <Link
            href="/anime"
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
            {t("animeDetail.back")}
          </Link>
        </div>

        {loading && (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-96 w-64 shrink-0 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              </div>
              <div className="space-y-2 mt-6">
                <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 w-2/3 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        )}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && !anime && (
          <EmptyState message={t("animeDetail.notFound")} />
        )}

        {!loading && !error && anime && (
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Poster image */}
            <div className="shrink-0">
              <Image
                src={anime.imageUrl}
                alt={anime.title}
                width={256}
                height={384}
                className="w-64 rounded-lg object-cover"
                unoptimized
              />
            </div>

            {/* Text content */}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                {anime.title}
              </h1>

              {/* Metadata grid */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {t("animeDetail.type")}
                  </span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {anime.type}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {t("animeDetail.episodes")}
                  </span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {anime.episodes ?? "?"}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {t("animeDetail.score")}
                  </span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {anime.score ? `★ ${anime.score}` : "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {t("animeDetail.status")}
                  </span>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {anime.status}
                  </p>
                </div>
              </div>

              {/* Genres */}
              {anime.genres.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t("animeDetail.genres")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <span
                        key={genre}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synopsis */}
              {anime.synopsis && (
                <div className="mt-6">
                  <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t("animeDetail.synopsis")}
                  </h2>
                  <div className="whitespace-pre-line text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {anime.synopsis}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 DataHub
      </footer>
    </div>
  );
}
