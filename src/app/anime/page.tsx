"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Anime } from "@/types/anime";
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

function AnimeSearch() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialPage = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const [inputValue, setInputValue] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);

  const pathnameRef = useRef("/anime");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(inputValue);
      setPage(1);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    router.replace(pathnameRef.current + (qs ? `?${qs}` : ""), {
      scroll: false,
    });
  }, [debouncedSearch, page, router]);

  const apiUrl = `/api/anime?page=${page}&limit=${LIMIT}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}`;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useFetch<PaginatedResponse<Anime>>(apiUrl, t("anime.error"));

  const anime = response?.data ?? [];
  const total = response?.total ?? 0;
  const totalPages = response?.totalPages ?? 1;

  const handlePageChange = useCallback((next: number) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showingStart = total === 0 ? 0 : (page - 1) * LIMIT + 1;
  const showingEnd = Math.min(page * LIMIT, total);

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {t("anime.title")}
          </h1>
        </div>

        <div className="mb-6 max-w-sm">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            placeholder={t("anime.searchPlaceholder")}
          />
        </div>

        <div aria-live="polite">
          {!loading && !error && total > 0 && (
            <p className="mb-4 text-sm text-zinc-500 dark:text-zinc-400">
              {t("pagination.showing")} {showingStart}&ndash;{showingEnd}{" "}
              {t("pagination.of")} {total}
            </p>
          )}

          {error && <ErrorBanner message={error} onRetry={refetch} />}

          {loading && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} variant="anime" />
              ))}
            </div>
          )}

          {!loading && !error && anime.length === 0 && (
            <EmptyState
              message={t("anime.empty")}
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
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="2.18"
                    ry="2.18"
                  />
                  <line x1="7" y1="2" x2="7" y2="22" />
                  <line x1="17" y1="2" x2="17" y2="22" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <line x1="2" y1="7" x2="7" y2="7" />
                  <line x1="2" y1="17" x2="7" y2="17" />
                  <line x1="17" y1="17" x2="22" y2="17" />
                  <line x1="17" y1="7" x2="22" y2="7" />
                </svg>
              }
            />
          )}

          {!loading && !error && anime.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {anime.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/anime/${item.id}`}
                  className="animate-fade-up"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <article className="card-hover overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-3">
                      <h2 className="text-sm font-medium leading-snug text-black dark:text-zinc-50 line-clamp-2">
                        {item.title}
                      </h2>
                      <div className="mt-1 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                        <span>{item.type}</span>
                        {item.score && <span>★ {item.score}</span>}
                        {item.year && <span>{item.year}</span>}
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

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

export default function AnimePage() {
  return (
    <Suspense>
      <AnimeSearch />
    </Suspense>
  );
}
