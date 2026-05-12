"use client";

import Image from "next/image";
import type { User } from "@/types/user";
import { useTranslation } from "@/i18n/context";
import { useFetch } from "@/hooks/useFetch";

export default function UsersPage() {
  const { t } = useTranslation();
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>("/api/users", t("users.error"));

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {t("users.title")}
          </h1>
        </div>

        {loading && (
          <p className="text-zinc-600 dark:text-zinc-400">
            {t("users.loading")}
          </p>
        )}

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <p className="text-red-800 dark:text-red-200">{error}</p>
            <button
              onClick={refetch}
              className="mt-2 text-sm font-medium text-red-800 underline dark:text-red-200"
            >
              {t("users.tryAgain")}
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(users ?? []).map((user) => (
              <article
                key={user.id}
                className="flex items-center gap-4 rounded-lg border border-black/[.08] p-5 transition-colors hover:border-black/[.16] dark:border-white/[.145] dark:hover:border-white/[.25]"
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                  unoptimized
                />
                <div>
                  <h2 className="text-lg font-medium leading-snug text-black dark:text-zinc-50">
                    {user.name}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {user.email}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 Simple App
      </footer>
    </div>
  );
}
