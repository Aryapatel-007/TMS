import clsx from "clsx";
import type { ElementType } from "react";
import { hero } from "@/content/site";

type LockupProps = {
  size?: "hero" | "large" | "small";
  as?: ElementType;
  className?: string;
};

const sizes = {
  hero: { root: "text-hero", the: "text-[0.27em] -top-[1.85em]" },
  large: { root: "text-[clamp(2.5rem,8vw,4.209rem)]", the: "text-[0.3em] -top-[1.6em]" },
  small: { root: "text-[1.777rem]", the: "text-[0.42em] -top-[1.1em]" },
};

// "the मसाला Secrêts" as live text, after the lockup on the menu cover.
// Screen readers hear "The Masala Secrets"; the visual lockup is hidden from them.
export function Lockup({ size = "large", as: Tag = "p", className }: LockupProps) {
  const s = sizes[size];
  return (
    <Tag className={clsx("font-normal leading-none", s.root, className)}>
      <span className="sr-only">{hero.lockupName}</span>
      <span
        aria-hidden="true"
        className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.2em] gap-y-[0.05em]"
      >
        <span className="inline-flex items-baseline">
          <span className={clsx("relative mr-[0.35em] font-display font-medium tracking-[0.02em]", s.the)}>the</span>
          <span lang="hi" className="font-deva text-[0.9em] leading-[1.15]">
            मसाला
          </span>
        </span>
        <span className="font-display font-medium italic">
          Secr
          <CircumflexE />
          ts
        </span>
      </span>
    </Tag>
  );
}

// Cormorant's own ê has a tall, sharp accent. The menu cover uses a small, soft one,
// so the accent is drawn over a plain "e".
function CircumflexE() {
  return (
    <span className="relative inline-block">
      e
      <svg
        viewBox="0 0 20 11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute top-[0.27em] left-[0.14em] h-[0.11em] w-[0.23em]"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M2.5 9 10 2.5 17.5 9" />
      </svg>
    </span>
  );
}
