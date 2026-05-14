"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/context";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "submitting" | "success";

export default function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<FormState>>({});

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "Required";
    if (!form.email.trim()) {
      next.email = "Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "Invalid email";
    }
    if (!form.message.trim()) next.message = "Required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((res) => setTimeout(res, 800));
    setStatus("success");
  }

  function handleReset() {
    setForm({ name: "", email: "", message: "" });
    setErrors({});
    setStatus("idle");
  }

  const inputBase =
    "w-full rounded-lg border px-3.5 py-2.5 text-sm leading-6 " +
    "bg-white text-zinc-900 placeholder-zinc-400 " +
    "dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-500 " +
    "transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100";

  const inputNormal = `${inputBase} border-black/[.12] dark:border-white/[.12]`;
  const inputError = `${inputBase} border-red-500 dark:border-red-400`;

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            {t("contact.title")}
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {t("contact.subtitle")}
          </p>
        </div>

        <div className="max-w-lg">
          {status === "success" ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-6 py-8 text-center dark:border-green-800 dark:bg-green-950">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-green-800 dark:text-green-200">
                {t("contact.successTitle")}
              </h2>
              <p className="mt-1 text-sm text-green-700 dark:text-green-300">
                {t("contact.successBody")}
              </p>
              <button
                onClick={handleReset}
                className="mt-6 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
              >
                {t("contact.sendAnother")}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5 rounded-xl border border-black/[.08] bg-white p-6 dark:border-white/[.08] dark:bg-zinc-900"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {t("contact.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("contact.namePlaceholder")}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? inputError : inputNormal}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {t("contact.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("contact.emailPlaceholder")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={errors.email ? inputError : inputNormal}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
                >
                  {t("contact.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t("contact.messagePlaceholder")}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${errors.message ? inputError : inputNormal} resize-none`}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {status === "submitting" ? t("contact.submitting") : t("contact.submit")}
              </button>
            </form>
          )}
        </div>
      </main>

      <footer className="w-full py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        &copy; 2026 DataHub
      </footer>
    </div>
  );
}
