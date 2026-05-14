"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Photo } from "@/types/photo";
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

function PhotosGallery() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialPage = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const [inputValue, setInputValue] = useState(initialSearch);
  const [debouncedSearch, setDebouncedSearch] = useState(initialSearch);
  const [page, setPage] = useState(initialPage);
  const pathnameRef = useRef("/photos");

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

  const apiUrl = `/api/photos?page=${page}&limit=${LIMIT}${debouncedSearch ? `&search=${encodeURIComponent(debouncedSearch)}` : ""}`;

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useFetch<PaginatedResponse<Photo>>(apiUrl, t("photos.error"));

  const photos = response?.data ?? [];
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
            {t("photos.title")}
          </h1>
        </div>

        <div className="mb-6 max-w-sm">
          <SearchInput
            value={inputValue}
            onChange={setInputValue}
            placeholder={t("photos.searchPlaceholder")}
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
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonCard key={i} variant="photo" />
              ))}
            </div>
          )}

          {!loading && !error && photos.length === 0 && (
            <EmptyState
              message={t("photos.empty")}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              }
            />
          )}

          {!loading && !error && photos.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {photos.map((photo, index) => (
                <Link
                  key={photo.id}
                  href={`/photos/${photo.id}`}
                  className="animate-fade-up"
                  style={{ "--i": index } as React.CSSProperties}
                >
                  <article className="card-hover group overflow-hidden rounded-lg border border-black/[.08] dark:border-white/[.145]">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={photo.thumbnailUrl}
                        alt={`Photo by ${photo.author}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {photo.author}
                      </p>
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

export default function PhotosPage() {
  return (
    <Suspense>
      <PhotosGallery />
    </Suspense>
  );
}
