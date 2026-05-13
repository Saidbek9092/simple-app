"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { User } from "@/types/user";
import type { PaginatedResponse } from "@/types/api";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import SearchInput from "@/components/SearchInput";
import Pagination from "@/components/Pagination";
import SkeletonCard from "@/components/SkeletonCard";
import ErrorBanner from "@/components/ErrorBanner";
import EmptyState from "@/components/EmptyState";

const LIMIT = 10;

// Inner component that uses useSearchParams — must be wrapped in Suspense
function UsersContent() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Immediate local state for the input value (updates on every keystroke)
  const [inputValue, setInputValue] = useState(
    () => searchParams.get("search") ?? "",
  );

  // Derive page and search from URL params — single source of truth for fetching
  const currentPage = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const debouncedSearch = searchParams.get("search") ?? "";

  // Build the API URL from URL params
  const apiUrl = `/api/users?search=${encodeURIComponent(debouncedSearch)}&page=${currentPage}&limit=${LIMIT}`;

  const { data, loading, error, refetch } = useFetch<PaginatedResponse<User>>(
    apiUrl,
    t("users.error"),
  );

  // Debounce: push search value to URL after 300 ms, reset to page 1
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (inputValue) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Keep local input in sync when the URL changes externally
  // (e.g. browser back/forward navigation)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInputValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  function handlePageChange(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const users = data?.data ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const showingStart = total === 0 ? 0 : (currentPage - 1) * LIMIT + 1;
  const showingEnd = Math.min(currentPage * LIMIT, total);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          {t("users.title")}
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          placeholder={t("users.searchPlaceholder")}
        />
      </div>

      {/* Error state */}
      {error && <ErrorBanner message={error} onRetry={refetch} />}

      {/* Skeleton loading */}
      {loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} variant="user" />
          ))}
        </div>
      )}

      {/* Results */}
      {!loading && !error && (
        <>
          {/* Page info */}
          {total > 0 && (
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              {t("pagination.showing")} {showingStart}&ndash;{showingEnd}{" "}
              {t("pagination.of")} {total}
            </p>
          )}

          {/* Empty state */}
          {users.length === 0 ? (
            <EmptyState
              message={t("users.empty")}
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
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((user, index) => (
                <Link
                  key={user.id}
                  href={`/users/${user.id}`}
                  className="animate-fade-up"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <article className="card-hover flex items-center gap-4 rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                      unoptimized
                    />
                    <div>
                      <h2 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                        {user.name}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {user.email}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                page={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}

// Skeleton used as the Suspense fallback while useSearchParams resolves
function UsersLoadingFallback() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-9 w-32 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="mb-6 h-9 max-w-sm rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} variant="user" />
        ))}
      </div>
    </main>
  );
}

export default function UsersPage() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <Suspense fallback={<UsersLoadingFallback />}>
        <UsersContent />
      </Suspense>
      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 Simple App
      </footer>
    </div>
  );
}
