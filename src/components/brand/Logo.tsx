import clsx from "clsx";
import { business } from "@/content/site";
import { Mark } from "./Mark";

type LogoProps = {
  variant?: "stacked" | "horizontal";
  className?: string;
  /** Screen reader name. Pass null when a parent already names it. */
  label?: string | null;
};

// The mark with the lowercase "tms" wordmark, set as live text in Cormorant Garamond.
export function Logo({ variant = "horizontal", className, label = business.name }: LogoProps) {
  const stacked = variant === "stacked";
  return (
    <span
      className={clsx(
        "inline-flex items-center leading-none",
        stacked ? "flex-col gap-[0.12em] text-[3rem]" : "gap-[0.3em] text-[1.6rem]",
        className,
      )}
    >
      {label ? <span className="sr-only">{label}</span> : null}
      <Mark className={clsx("shrink-0", stacked ? "size-[1.9em]" : "size-[1.25em]")} />
      <span aria-hidden="true" className="font-display font-medium tracking-[0.01em] lowercase">
        tms
      </span>
    </span>
  );
}
