import clsx from "clsx";

// Thin copper line, a small four-point star, thin copper line.
// From the "Freshly Baked" post. Use only between major sections.
export function StarDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={clsx("flex items-center justify-center gap-4 text-copper", className)}>
      <span className="h-px w-full max-w-28 bg-current opacity-70 sm:max-w-40" />
      <FourPointStar className="size-3 shrink-0" />
      <span className="h-px w-full max-w-28 bg-current opacity-70 sm:max-w-40" />
    </div>
  );
}

export function FourPointStar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" focusable="false">
      <path d="M12 0C12.9 8.2 15.8 11.1 24 12 15.8 12.9 12.9 15.8 12 24 11.1 15.8 8.2 12.9 0 12 8.2 11.1 11.1 8.2 12 0Z" />
    </svg>
  );
}
