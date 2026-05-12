"use client";

import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export default function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
        {title}
      </h1>
      {children && (
        <div className="flex items-center gap-2">{children}</div>
      )}
    </div>
  );
}
