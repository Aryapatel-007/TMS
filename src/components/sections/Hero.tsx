import Image from "next/image";
import { Lockup } from "@/components/brand/Lockup";
import { Button } from "@/components/ui/Button";
import { hero, images } from "@/content/site";

// The one orchestrated moment of the site, after the light across the menu cover:
// darkness, a warm beam sweeps across and reveals the lockup, then the room fades up.
//
// The sequence is CSS keyframes in globals.css, switched on by html[data-intro="play"].
// An inline script in the layout sets that before first paint, only on the first visit
// of the session and only without reduced motion. Running it in CSS means it starts on
// first paint instead of waiting for JavaScript to load, which matters on slow phones.
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="theme-night relative isolate flex min-h-[560px] h-svh flex-col overflow-hidden bg-night-walnut text-candle-cream"
    >
      <Image
        src={images.heroAngelHall.src}
        alt={images.heroAngelHall.alt}
        fill
        preload
        fetchPriority="high"
        quality={85}
        sizes="100vw"
        className="-z-30 object-cover object-[50%_42%]"
      />

      {/* Dark overlay (72% at the bottom, 45% at the top) and a soft vignette so text always reads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,rgb(26_18_14/0.78)_0%,rgb(26_18_14/0.62)_45%,rgb(26_18_14/0.45)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_50%_45%,transparent_35%,rgb(26_18_14/0.7)_100%)]"
      />

      {/* Darkness the room fades up from */}
      <div data-hero="cover" aria-hidden="true" className="absolute inset-0 -z-10 bg-night-walnut opacity-0" />

      {/* The beam of light, resting diagonally over the lockup, with a candle glow behind it */}
      <div
        data-hero="beam"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[170%] w-[78vw] max-w-[720px] -translate-x-1/2 -translate-y-1/2 opacity-50 sm:w-[52vw]"
      >
        <div className="absolute inset-0 rotate-[26deg] bg-[linear-gradient(90deg,transparent_0%,rgb(201_149_114/0.16)_22%,rgb(239_226_211/0.3)_50%,rgb(201_149_114/0.16)_78%,transparent_100%)] blur-2xl" />
        <div className="absolute top-1/2 left-1/2 h-[30%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgb(201_149_114/0.22),transparent_70%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col items-center justify-center px-5 pt-20 pb-24 text-center sm:px-8">
        <div data-hero="lockup">
          <Lockup as="h1" size="hero" className="text-candle-cream" />
        </div>

        <div data-hero="reveal" className="mt-8 flex flex-col items-center sm:mt-10">
          <p className="max-w-[28ch] text-lg font-light text-candle-cream sm:max-w-none">{hero.line1}</p>
          <p className="mt-3 font-display text-xl italic text-candle-cream">{hero.line2}</p>
          <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button href={hero.primary.href} className="w-full max-w-xs sm:w-auto">
              {hero.primary.label}
            </Button>
            <Button href={hero.secondary.href} variant="secondary" className="w-full max-w-xs sm:w-auto">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      <p data-hero="reveal" className="absolute inset-x-0 bottom-7 px-5 text-center text-sm text-smoke">
        {hero.note}
      </p>
    </section>
  );
}
