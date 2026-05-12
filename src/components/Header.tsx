"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/context";
import { type Locale } from "@/i18n/translations";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { t, locale, setLocale } = useTranslation();

  function handleLocaleToggle() {
    const next: Locale = locale === "en" ? "es" : "en";
    setLocale(next);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/90 backdrop-blur dark:border-white/[.08] dark:bg-black/90">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
        {/* Navigation links */}
        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {t("nav.home")}
          </Link>
          <Link
            href="/posts"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {t("nav.posts")}
          </Link>
          <Link
            href="/users"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {t("nav.users")}
          </Link>
          <Link
            href="/comments"
            className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {t("nav.comments")}
          </Link>
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1">
          {/* Language switcher */}
          <button
            onClick={handleLocaleToggle}
            aria-label={`Switch to ${locale === "en" ? t("lang.es") : t("lang.en")}`}
            className="flex items-center justify-center rounded-lg px-2.5 h-9 text-sm font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          >
            {locale === "en" ? t("lang.es") : t("lang.en")}
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
