"use client";

import clsx from "clsx";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Section, SectionHeading } from "@/components/ui/Section";
import { gallery } from "@/content/site";

// All frames share one height. Kept modest so no photo is shown much larger than
// its native size (the chandelier photo is 290px tall, the window photo 370px).
// Raise it when the owner's original photos arrive.
const FRAME_HEIGHT = "h-[300px] lg:h-[320px]";
const MAX_FRAME_HEIGHT = 320;

export function SpacesGallery() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [state, setState] = useState({ start: 0, size: 1, atStart: true, atEnd: false });

  const update = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setState({
      start: el.scrollLeft / el.scrollWidth,
      size: el.clientWidth / el.scrollWidth,
      atStart: el.scrollLeft <= 2,
      atEnd: el.scrollLeft >= max - 2,
    });
  }, []);

  useEffect(() => {
    update();
    const el = scroller.current;
    if (!el) return;
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [update]);

  // Scroll so the given item lines up with the start edge, like scroll snap does.
  const scrollToItem = (item: HTMLElement) => {
    const el = scroller.current;
    if (!el) return;
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: item.offsetLeft - padding, behavior: reduce ? "auto" : "smooth" });
  };

  const items = () => Array.from(scroller.current?.querySelectorAll<HTMLElement>("[data-gallery-item]") ?? []);

  const step = (direction: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const current = el.scrollLeft + padding;
    const list = items();
    const target =
      direction === 1
        ? list.find((item) => item.offsetLeft > current + 4)
        : [...list].reverse().find((item) => item.offsetLeft < current - 4);
    if (target) scrollToItem(target);
  };

  // Mouse drag on desktop. Touch devices already swipe natively.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const el = scroller.current;
    if (!el || !drag.current) return;
    drag.current = null;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    setDragging(false);
    // settle on the nearest photo
    const padding = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;
    const here = el.scrollLeft + padding;
    const nearest = items().reduce<HTMLElement | null>(
      (best, item) =>
        !best || Math.abs(item.offsetLeft - here) < Math.abs(best.offsetLeft - here) ? item : best,
      null,
    );
    if (nearest) scrollToItem(nearest);
  };

  return (
    <Section id="spaces" labelledBy="spaces-title">
      <SectionHeading id="spaces-title" intro={gallery.intro}>
        {gallery.heading}
      </SectionHeading>

      <div
        ref={scroller}
        role="region"
        aria-label={gallery.label}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={clsx(
          "relative -mx-5 mt-14 flex gap-5 overflow-x-auto px-5 pb-2 select-none [scrollbar-width:none] sm:-mx-8 sm:gap-6 sm:px-8 lg:mt-16",
          "scroll-px-5 sm:scroll-px-8 [&::-webkit-scrollbar]:hidden",
          dragging ? "cursor-grabbing snap-none" : "snap-x snap-mandatory [@media(pointer:fine)]:cursor-grab",
        )}
      >
        {gallery.items.map((item) => (
          <figure key={item.image.src} data-gallery-item className="group w-min shrink-0 snap-start">
            <ArchFrame
              image={item.image}
              sizes={`${Math.ceil((MAX_FRAME_HEIGHT * item.image.width) / item.image.height)}px`}
              capWidth={false}
              className={clsx(FRAME_HEIGHT, "w-auto!")}
              imageClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            />
            <figcaption className="mt-4 font-display text-lg leading-snug text-candle-cream italic">
              {item.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div aria-hidden="true" className="relative h-px flex-1 bg-copper/30">
          <div
            className="absolute inset-y-0 bg-copper-glow"
            style={{ left: `${state.start * 100}%`, width: `${state.size * 100}%` }}
          />
        </div>
        <div className="flex gap-3">
          <GalleryButton label={gallery.previous} disabled={state.atStart} onClick={() => step(-1)} flip />
          <GalleryButton label={gallery.next} disabled={state.atEnd} onClick={() => step(1)} />
        </div>
      </div>
    </Section>
  );
}

function GalleryButton({
  label,
  disabled,
  onClick,
  flip,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      // aria-disabled rather than disabled, so keyboard focus stays on the button at either end
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      className="inline-flex size-11 items-center justify-center rounded-full border border-copper text-candle-cream transition-colors hover:border-copper-glow hover:bg-copper/15 aria-disabled:cursor-default aria-disabled:opacity-35 aria-disabled:hover:border-copper aria-disabled:hover:bg-transparent"
    >
      <svg
        viewBox="0 0 24 24"
        className={clsx("size-5", flip && "-scale-x-100")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M9 5.5 15.5 12 9 18.5" />
      </svg>
    </button>
  );
}
