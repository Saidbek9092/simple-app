"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Post } from "@/types/post";
import type { PaginatedResponse } from "@/types/api";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

const LIMIT = 10;
const DEBOUNCE_MS = 300;

function PostsSearch() {
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
  const pathnameRef = useRef("/posts");

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
  const apiUrl = `/api/posts?page=${page}&limit=${LIMIT}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}`;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useFetch<PaginatedResponse<Post>>(apiUrl, t("posts.error"));

  const posts = response?.data ?? [];
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
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {t("posts.title")}
          </h1>
        </div>

        {/* Search */}
        <div className="mb-6 max-w-sm">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            placeholder={t("posts.searchPlaceholder")}
          />
        </div>

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
              <SkeletonCard key={i} variant="post" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && posts.length === 0 && (
          <EmptyState
            message={t("posts.empty")}
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
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            }
          />
        )}

        {/* Posts grid */}
        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="animate-fade-up"
                style={{ "--i": index } as React.CSSProperties}
              >
                <article className="card-hover rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]">
                  <h2 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {post.excerpt}
                  </p>
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
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 Simple App
      </footer>
    </div>
  );
}

// Wrap in Suspense because useSearchParams() causes CSR bailout during
// prerendering — the boundary prevents the whole page tree from being
// excluded from the static shell.
export default function PostsPage() {
  return (
    <Suspense>
      <PostsSearch />
    </Suspense>
  );
}
