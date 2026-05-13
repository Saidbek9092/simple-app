"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "@/i18n/context";
import { type Locale } from "@/i18n/translations";
import ThemeToggle from "./ThemeToggle";

type NavLink = {
  href: string;
  labelKey:
    | "nav.home"
    | "nav.posts"
    | "nav.users"
    | "nav.comments"
    | "nav.books"
    | "nav.photos"
    | "nav.anime";
};

const NAV_LINKS: NavLink[] = [
  { href: "/", labelKey: "nav.home" },
  { href: "/posts", labelKey: "nav.posts" },
  { href: "/users", labelKey: "nav.users" },
  { href: "/comments", labelKey: "nav.comments" },
  { href: "/books", labelKey: "nav.books" },
  { href: "/photos", labelKey: "nav.photos" },
  { href: "/anime", labelKey: "nav.anime" },
];

export default function Header() {
  const { t, locale, setLocale } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  function handleLocaleToggle() {
    const next: Locale = locale === "en" ? "es" : "en";
    setLocale(next);
  }

  function isActive(href: string): boolean {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    hamburgerRef.current?.focus();
  }, []);
  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    if (focusable.length === 0) return;
    focusable[0].focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen, closeMenu]);

  const activeLinkClass =
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
    "bg-zinc-100 text-zinc-900 border-b-2 border-zinc-900 " +
    "dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-100";

  const inactiveLinkClass =
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors " +
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 " +
    "dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

  const mobileActiveLinkClass =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors " +
    "bg-zinc-100 text-zinc-900 border-l-2 border-zinc-900 " +
    "dark:bg-zinc-800 dark:text-zinc-100 dark:border-zinc-100";

  const mobileInactiveLinkClass =
    "rounded-md px-3 py-2 text-sm font-medium transition-colors " +
    "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 " +
    "dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

  return (
    <header className="sticky top-0 z-50 border-b border-black/[.08] bg-white/90 backdrop-blur dark:border-white/[.08] dark:bg-black/90">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Desktop navigation links */}
        <nav
          className="hidden sm:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={isActive(href) ? activeLinkClass : inactiveLinkClass}
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          {menuOpen ? (
            /* Close (X) icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            /* Hamburger icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        {/* Right controls -- always visible */}
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

      {/* Mobile dropdown menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={
          "sm:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out " +
          (menuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none")
        }
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col gap-1 px-4 pb-4 pt-1 sm:px-6 lg:px-8 border-t border-black/[.06] dark:border-white/[.06]"
        >
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={closeMenu}
              className={
                isActive(href) ? mobileActiveLinkClass : mobileInactiveLinkClass
              }
            >
              {t(labelKey)}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
