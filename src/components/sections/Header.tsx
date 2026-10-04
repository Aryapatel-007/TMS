"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { business, nav } from "@/content/site";

const SCROLL_THRESHOLD = 80;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Lock page scroll, close on Escape, keep focus inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const button = menuButtonRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      // After closing, either jump to the chosen section or return focus to the menu button.
      const hash = pendingHash.current;
      pendingHash.current = null;
      if (hash) {
        const target = document.querySelector<HTMLElement>(hash);
        target?.scrollIntoView();
        history.replaceState(null, "", hash);
        target?.focus({ preventScroll: true });
      } else {
        button?.focus();
      }
    };
  }, [open, close]);

  const onPanelLink = (e: MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href") ?? "";
    if (href.startsWith("#")) {
      e.preventDefault();
      pendingHash.current = href;
    }
    close();
  };

  return (
    <header
      data-site-header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-copper/45 bg-night-walnut/95 backdrop-blur-sm"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]">
        <a href="#top" aria-label={nav.homeLabel} className="rounded-[2px] text-candle-cream">
          <Logo variant="horizontal" label={null} className="[&_svg]:text-copper-glow" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          <ul className="flex items-center gap-7">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-[2px] text-[0.9375rem] text-candle-cream transition-colors hover:text-copper-glow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Button href={nav.cta.href} size="sm">
            {nav.cta.label}
          </Button>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] text-candle-cream lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={nav.openMenu}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={nav.menuTitle}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night-deep lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
              <a
                href="#top"
                aria-label={nav.homeLabel}
                onClick={onPanelLink}
                className="rounded-[2px] text-candle-cream"
              >
                <Logo variant="horizontal" label={null} className="[&_svg]:text-copper-glow" />
              </a>
              <button
                type="button"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-[2px] text-candle-cream"
                aria-label={nav.closeMenu}
                onClick={close}
              >
                <CloseIcon />
              </button>
            </div>

            <motion.nav
              aria-label="Main"
              className="flex flex-1 flex-col justify-center px-8 pb-10"
              initial={{ y: 16 }}
              animate={{ y: 0 }}
              exit={{ y: 8 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <ul className="space-y-1">
                {nav.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={onPanelLink}
                      className="block rounded-[2px] py-1.5 font-display text-[2.5rem] leading-tight text-candle-cream transition-colors hover:text-copper-glow"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-10 space-y-2 border-t border-copper/40 pt-8">
                <a
                  href={business.phones[0].href}
                  className="block w-fit rounded-[2px] text-lg text-candle-cream hover:text-copper-glow"
                >
                  {business.phones[0].display}
                </a>
                <a
                  href={business.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-fit rounded-[2px] text-copper-glow hover:text-copper-glow-bright"
                >
                  {business.instagram.handle}
                </a>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8.5h18M3 15.5h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
    </svg>
  );
}
