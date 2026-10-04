import clsx from "clsx";
import type { ReactNode } from "react";

export type SectionTheme = "night" | "parchment" | "navy";

type SectionProps = {
  theme?: SectionTheme;
  id?: string;
  labelledBy?: string;
  label?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
};

// Handles the background, text colours, vertical rhythm and max width.
// Parchment sections read like pages from the printed menu, with a faint paper grain.
export function Section({
  theme = "night",
  id,
  labelledBy,
  label,
  className,
  innerClassName,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={label}
      className={clsx(
        `theme-${theme}`,
        "bg-(--bg) py-section text-(--fg)",
        theme === "parchment" && "paper-grain",
        className,
      )}
    >
      <div className={clsx("mx-auto w-full max-w-content px-5 sm:px-8", innerClassName)}>{children}</div>
    </section>
  );
}

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  intro?: ReactNode;
  className?: string;
};

// Centred section title in Cormorant, with an optional one-paragraph intro.
export function SectionHeading({ id, children, intro, className }: SectionHeadingProps) {
  return (
    <header className={clsx("mx-auto max-w-prose text-center", className)}>
      <h2 id={id} className="text-2xl text-(--heading) sm:text-3xl">
        {children}
      </h2>
      {intro ? <p className="mx-auto mt-5 max-w-[56ch] text-(--fg-muted)">{intro}</p> : null}
    </header>
  );
}
