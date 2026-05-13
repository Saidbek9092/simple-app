"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/types/photo";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function PhotoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const {
    data: photo,
    loading,
    error,
    refetch,
  } = useFetch<Photo>(`/api/photos/${id}`, t("photoDetail.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <Link
            href="/photos"
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
            {t("photoDetail.back")}
          </Link>
        </div>

        {loading && (
          <div className="space-y-4">
            <div className="aspect-[16/9] w-full rounded-xl bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            <div className="flex gap-4">
              <div className="h-4 w-1/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="h-4 w-1/6 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            </div>
          </div>
        )}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && !photo && (
          <EmptyState message={t("photoDetail.notFound")} />
        )}

        {!loading && !error && photo && (
          <div>
            <div className="overflow-hidden rounded-xl">
              <div className="relative aspect-[16/9]">
                <Image
                  src={photo.thumbnailUrl}
                  alt={`Photo by ${photo.author}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-lg text-zinc-700 dark:text-zinc-300">
                {t("photoDetail.by")} {photo.author}
              </p>

              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {t("photoDetail.dimensions")}: {photo.width} &times;{" "}
                {photo.height}
              </p>

              <a
                href={photo.unsplashUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                {t("photoDetail.viewOriginal")}
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
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 Simple App
      </footer>
    </div>
  );
}
