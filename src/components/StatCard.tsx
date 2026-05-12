"use client";

import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  animationDelay: number;
}

export default function StatCard({
  label,
  value,
  icon,
  animationDelay,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay);
    return () => clearTimeout(timer);
  }, [animationDelay]);

  useEffect(() => {
    if (!isVisible || hasAnimated.current || value === 0) return;
    hasAnimated.current = true;

    const duration = 1200;
    const steps = 40;
    const stepDuration = duration / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));

      if (current >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <div
      className={`rounded-xl border border-black/[.08] bg-white p-6 shadow-sm transition-all duration-500 dark:border-white/[.145] dark:bg-zinc-900 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {label}
          </span>
          <span className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {displayValue.toLocaleString()}
          </span>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          {icon}
        </div>
      </div>
    </div>
  );
}
