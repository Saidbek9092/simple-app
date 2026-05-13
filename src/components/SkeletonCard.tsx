"use client";

export type SkeletonCardVariant = "post" | "user" | "comment";

interface SkeletonCardProps {
  variant: SkeletonCardVariant;
}

export default function SkeletonCard({ variant }: SkeletonCardProps) {
  if (variant === "user") {
    return (
      <div
        aria-hidden="true"
        className="flex items-center gap-4 rounded-lg border border-black/[.08] p-5 animate-pulse animate-shimmer dark:border-white/[.145]"
      >
        {/* Avatar circle */}
        <div className="h-12 w-12 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        <div className="flex flex-col gap-2 flex-1">
          {/* Name line */}
          <div className="h-4 w-2/5 rounded bg-zinc-200 dark:bg-zinc-700" />
          {/* Email line */}
          <div className="h-3 w-3/5 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  if (variant === "comment") {
    return (
      <div
        aria-hidden="true"
        className="rounded-lg border border-black/[.08] p-5 animate-pulse animate-shimmer dark:border-white/[.145]"
      >
        {/* Author + email row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="h-4 w-1/4 rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
        {/* Body lines */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    );
  }

  // variant === "post"
  return (
    <div
      aria-hidden="true"
      className="rounded-lg border border-black/[.08] p-5 animate-pulse animate-shimmer dark:border-white/[.145]"
    >
      {/* Title lines */}
      <div className="flex flex-col gap-2 mb-3">
        <div className="h-5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-5 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
      {/* Excerpt lines */}
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-3 w-3/5 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
