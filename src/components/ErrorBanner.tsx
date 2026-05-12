"use client";

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorBanner({ message, onRetry }: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
    >
      <p className="text-red-800 dark:text-red-200">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-sm font-medium text-red-800 underline hover:text-red-900 dark:text-red-200 dark:hover:text-red-100"
        >
          Try again
        </button>
      )}
    </div>
  );
}
