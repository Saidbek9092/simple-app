"use client";

interface TopCommenter {
  name: string;
  email: string;
  count: number;
}

interface TopCommentersProps {
  title: string;
  commenters: TopCommenter[];
  commentsLabel: string;
}

export default function TopCommenters({
  title,
  commenters,
  commentsLabel,
}: TopCommentersProps) {
  return (
    <div className="rounded-xl border border-black/[.08] bg-white p-6 shadow-sm dark:border-white/[.145] dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
        {commenters.map((commenter, index) => (
          <li key={commenter.email} className="flex items-center gap-3 py-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                {commenter.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {commenter.email}
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {commenter.count} {commentsLabel}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
