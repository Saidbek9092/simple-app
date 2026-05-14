"use client";

import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";
import type { Post } from "@/types/post";
import PageHeader from "@/components/PageHeader";
import ErrorBanner from "@/components/ErrorBanner";
import SkeletonCard from "@/components/SkeletonCard";
import StatCard from "@/components/StatCard";
import RecentPosts from "@/components/RecentPosts";
import TopCommenters from "@/components/TopCommenters";

interface TopCommenter {
  name: string;
  email: string;
  count: number;
}

interface StatsData {
  totalPosts: number;
  totalUsers: number;
  totalComments: number;
  recentPosts: Post[];
  topCommenters: TopCommenter[];
}

function PostsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CommentsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
    </svg>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className="rounded-xl border border-black/[.08] bg-white p-6 animate-pulse dark:border-white/[.145] dark:bg-zinc-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <div className="h-4 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-8 w-16 rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
              <div className="h-12 w-12 rounded-lg bg-zinc-200 dark:bg-zinc-700" />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} variant="post" />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonCard key={i} variant="user" />
          ))}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { data, loading, error, refetch } = useFetch<StatsData>(
    "/api/stats",
    t("dashboard.error"),
  );

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <PageHeader title={t("dashboard.title")} />
        </div>

        {error && (
          <div className="mb-6">
            <ErrorBanner message={error} onRetry={refetch} />
          </div>
        )}

        <div className="flex flex-col gap-8">
          {loading ? (
            <DashboardSkeleton />
          ) : data ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                  label={t("dashboard.totalPosts")}
                  value={data.totalPosts}
                  icon={<PostsIcon />}
                  animationDelay={0}
                />
                <StatCard
                  label={t("dashboard.totalUsers")}
                  value={data.totalUsers}
                  icon={<UsersIcon />}
                  animationDelay={150}
                />
                <StatCard
                  label={t("dashboard.totalComments")}
                  value={data.totalComments}
                  icon={<CommentsIcon />}
                  animationDelay={300}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <RecentPosts
                  title={t("dashboard.recentPosts")}
                  posts={data.recentPosts}
                  viewAllLabel={t("dashboard.viewAllPosts")}
                />
                <TopCommenters
                  title={t("dashboard.topCommenters")}
                  commenters={data.topCommenters}
                  commentLabel={t("dashboard.comment")}
                  commentsLabel={t("dashboard.comments")}
                />
              </div>
            </>
          ) : null}
        </div>
      </main>
      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 DataHub
      </footer>
    </div>
  );
}
