"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/types/book";
import type { PaginatedResponse } from "@/types/api";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

const LIMIT = 12;
const DEBOUNCE_MS = 300;

function BooksSearch() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read initial values from URL params
  const initialSearch = searchParams.get("search") ?? "";
  const initialPage = Math.max(1, Number(searchParams.get("page") ?? "1"));

  // Immediate local state for the input — updates on every keystroke
  const [inputValue, setInputValue] = useState(initialSearch);

  // Debounced values that drive the API URL and URL params
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  // Keep a ref to the current pathname so we can build the URL
  const pathnameRef = useRef("/books");

  // Debounce the search input: 300 ms after the user stops typing,
  // flush the value and reset to page 1.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
      setPage(1);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [inputValue]);

  // Sync debounced search + page back into the URL (replace, not push,
  // so the user is not flooded with history entries while searching).
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(pathnameRef.current + (qs ? `?${qs}` : ""), {
      scroll: false,
    });
  }, [debouncedSearch, page, router]);

  // Build the API URL from the debounced state values
  const apiUrl = `/api/books?page=${page}&limit=${LIMIT}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}`;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useFetch<PaginatedResponse<Book>>(apiUrl, t("books.error"));

  const books = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = response?.totalPages ?? 1;

  const handlePageChange = useCallback((next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Showing X of Y range
  const showingStart = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const showingEnd = Math.min(page * LIMIT, total);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {t("books.title")}
          </h1>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-sm">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            placeholder={t("books.searchPlaceholder")}
          />
        </div>

        <div aria-live="polite">
          {/* Page info — only shown when data is available */}
          {!loading && !error && total > 0 && (
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              {t("pagination.showing")} {showingStart}&ndash;{showingEnd}{" "}
              {t("pagination.of")} {total}
            </p>
          )}

          {/* Error state */}
          {error && <ErrorBanner message={error} onRetry={refetch} />}

          {/* Skeleton loading — 6 cards in a grid */}
          {loading && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} variant="book" />
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && books.length === 0 && (
            <EmptyState
              message={t("books.empty")}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-10 w-10"
                  aria-hidden="true"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
                </svg>
              }
            />
          )}

          {/* Books grid */}
          {!loading && !error && books.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {books.map((book, index) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="animate-fade-up"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <article className="card-hover flex gap-4 rounded-lg border border-black/[.08] p-4 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]">
                    {book.coverUrl ? (
                      <Image
                        src={book.coverUrl}
                        alt={book.title}
                        width={80}
                        height={120}
                        className="h-28 w-20 shrink-0 rounded object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-28 w-20 shrink-0 items-center justify-center rounded bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className="h-8 w-8"
                          aria-hidden="true"
                        >
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
                        </svg>
                      </div>
                    )}
                    <div className="flex flex-col justify-center min-w-0">
                      <h2 className="text-base font-medium leading-snug text-black dark:text-zinc-50 line-clamp-2">
                        {book.title}
                      </h2>
                      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                        {book.author}
                      </p>
                      <div className="mt-2 flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
                        {book.firstPublishYear && (
                          <span>{book.firstPublishYear}</span>
                        )}
                        {book.editionCount > 0 && (
                          <span>
                            {book.editionCount} {t("bookDetail.editions")}
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 DataHub
      </footer>
    </div>
  );
}

// Wrap in Suspense because useSearchParams() causes CSR bailout during
// prerendering — the boundary prevents the whole page tree from being
// excluded from the static shell.
export default function BooksPage() {
  return (
    <Suspense>
      <BooksSearch />
    </Suspense>
  );
}
