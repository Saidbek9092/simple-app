"use client";

import type { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export default function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      {icon && (
        <span className="text-zinc-400 dark:text-zinc-600" aria-hidden="true">
          {icon}
        </span>
      )}
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}
