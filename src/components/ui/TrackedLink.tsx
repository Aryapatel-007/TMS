"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";
import { buttonClasses } from "./Button";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: TrackEvent;
  /** Style it as a button. Leave out for a plain text link. */
  button?: { variant?: "primary" | "secondary"; size?: "md" | "sm" };
  children: ReactNode;
};

// A link that calls track() when clicked: menu requests, calls, directions and WhatsApp.
export function TrackedLink({ event, button, className, onClick, children, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      className={button ? buttonClasses({ ...button, className }) : className}
      onClick={(e) => {
        track(event);
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
