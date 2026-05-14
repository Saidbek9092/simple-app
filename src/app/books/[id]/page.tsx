"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BookDetail } from "@/types/book";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { t } = useTranslation();
  const {
    data: book,
    loading,
    error,
    refetch,
  } = useFetch<BookDetail>(`/api/books/${id}`, t("bookDetail.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <Link
            href="/books"
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
            {t("bookDetail.back")}
          </Link>
        </div>

        {loading && (
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-80 w-56 shrink-0 rounded-lg bg-zinc-200 animate-pulse dark:bg-zinc-700" />
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="h-4 w-1/3 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="h-4 w-1/4 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              <div className="space-y-2 mt-6">
                <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 w-full rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
                <div className="h-4 w-2/3 rounded bg-zinc-200 animate-pulse dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        )}

        {error && <ErrorBanner message={error} onRetry={refetch} />}

        {!loading && !error && !book && (
          <EmptyState message={t("bookDetail.notFound")} />
        )}

        {!loading && !error && book && (
          <div className="flex min-h-[50vh] flex-col gap-8 md:flex-row">
            {book.coverUrl && (
              <div className="shrink-0">
                <Image
                  src={book.coverUrl}
                  alt={book.title}
                  width={224}
                  height={320}
                  className="w-56 rounded-lg object-cover"
                  unoptimized
                />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
                {book.title}
              </h1>
              <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
                {t("bookDetail.by")} {book.author}
              </p>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                {book.firstPublishYear && (
                  <span>
                    {t("bookDetail.firstPublished")}: {book.firstPublishYear}
                  </span>
                )}
                {book.editionCount !== null && (
                  <span>
                    {book.editionCount} {t("bookDetail.editions")}
                  </span>
                )}
              </div>

              {book.description && (
                <div className="mt-6 whitespace-pre-line text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {book.description}
                </div>
              )}

              {book.subjects.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {t("bookDetail.subjects")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                      >
                        {subject}
                      </span>
                    ))}
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
