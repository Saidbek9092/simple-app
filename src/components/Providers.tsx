"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { I18nProvider } from "@/i18n/context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
