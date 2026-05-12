"use client";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const isFirst = page === 1;
  const isLast = page === totalPages;

  // Build page number array, capping at a window around the current page
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
  }

  const buttonBase =
    "flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-500";
  const activeClass =
    "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-black";
  const inactiveClass =
    "border-black/[.08] bg-white text-zinc-700 hover:bg-zinc-50 hover:border-black/[.16] dark:border-white/[.145] dark:bg-black dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:border-white/[.25]";
  const disabledClass =
    "border-black/[.05] bg-white text-zinc-300 cursor-not-allowed dark:border-white/[.06] dark:bg-black dark:text-zinc-600";

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1 flex-wrap"
    >
      {/* Previous button */}
      <button
        onClick={() => !isFirst && onPageChange(page - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        className={`${buttonBase} ${isFirst ? disabledClass : inactiveClass}`}
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
      </button>

      {/* Page numbers */}
      {pages.map((p, idx) => {
        if (p === "ellipsis") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="flex h-9 w-9 items-center justify-center text-sm text-zinc-400 dark:text-zinc-600"
              aria-hidden="true"
            >
              &hellip;
            </span>
          );
        }
        const isCurrent = p === page;
        return (
          <button
            key={p}
            onClick={() => !isCurrent && onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={isCurrent ? "page" : undefined}
            className={`${buttonBase} ${isCurrent ? activeClass : inactiveClass}`}
          >
            {p}
          </button>
        );
      })}

      {/* Next button */}
      <button
        onClick={() => !isLast && onPageChange(page + 1)}
        disabled={isLast}
        aria-label="Next page"
        className={`${buttonBase} ${isLast ? disabledClass : inactiveClass}`}
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  );
}
