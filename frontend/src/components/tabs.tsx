"use client";

import { useId } from "react";
import { motion } from "motion/react";

export function Tabs<T extends string>({
  tabs,
  value,
  onChange,
  label,
}: {
  tabs: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  label: string;
}) {
  const layoutId = useId();
  return (
    <div role="tablist" aria-label={label} className="flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`relative shrink-0 px-4 py-3 text-sm transition-colors ${active ? "text-accent-soft" : "text-muted hover:text-foreground"}`}
          >
            {tab.label}
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
