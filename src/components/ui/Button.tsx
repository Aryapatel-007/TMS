import clsx from "clsx";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Common = {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  className?: string;
  children: ReactNode;
};

type LinkProps = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ButtonProps = LinkProps | NativeButtonProps;

// Colours come from the section theme variables in globals.css,
// so the same button reads well on night, parchment and navy.
export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<Common, "variant" | "size" | "className">) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-[2px] text-center font-sans font-medium",
    "transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-60",
    size === "md" ? "min-h-12 px-6 text-[0.9375rem]" : "min-h-10 px-4 text-sm",
    variant === "primary"
      ? "bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-bg-hover)"
      : "border border-(--btn2-line) text-(--btn2-fg) hover:border-(--btn2-line-hover) hover:bg-(--btn2-line)/10",
    className,
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...rest } = props;
    return (
      <a className={buttonClasses({ variant, size, className })} {...rest}>
        {children}
      </a>
    );
  }
  const { variant, size, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
