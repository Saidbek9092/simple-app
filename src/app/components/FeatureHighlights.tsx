"use client";

const features = [
  {
    title: "Fast by Default",
    description:
      "Built on Next.js with automatic code splitting, optimized images, and edge-ready rendering.",
    icon: "⚡",
  },
  {
    title: "Type Safe",
    description:
      "Full TypeScript support with strict mode enabled for confident refactoring and fewer runtime errors.",
    icon: "🛡️",
  },
  {
    title: "Modern Styling",
    description:
      "Tailwind CSS v4 for utility-first styling with zero-config dark mode and responsive design.",
    icon: "🎨",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex flex-col gap-3 rounded-xl border border-zinc-200 p-6 transition-shadow hover:shadow-md dark:border-zinc-800"
        >
          <span className="text-3xl">{feature.icon}</span>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {feature.title}
          </h3>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  );
}
