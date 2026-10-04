import type { Metadata } from "next";
import { Lockup } from "@/components/brand/Lockup";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { StarDivider } from "@/components/ui/StarDivider";
import { images } from "@/content/site";

// Temporary page for checking the brand foundation. Not linked, not indexed.
export const metadata: Metadata = {
  title: "Style guide",
  robots: { index: false, follow: false },
};

const palette = [
  ["night-walnut", "#1A120E", "bg-night-walnut", "text-candle-cream"],
  ["night-deep", "#241813", "bg-night-deep", "text-candle-cream"],
  ["candle-cream", "#EFE2D3", "bg-candle-cream", "text-night-walnut"],
  ["smoke", "#B8A493", "bg-smoke", "text-night-walnut"],
  ["copper", "#A8704F", "bg-copper", "text-night-walnut"],
  ["copper-glow", "#C99572", "bg-copper-glow", "text-night-walnut"],
  ["parchment", "#E8D8C4", "bg-parchment", "text-ink-espresso"],
  ["ink-terracotta", "#6E4532", "bg-ink-terracotta", "text-parchment"],
  ["ink-espresso", "#3A2A22", "bg-ink-espresso", "text-parchment"],
  ["velvet-red", "#8E2B28", "bg-velvet-red", "text-candle-cream"],
  ["velvet-navy", "#0B1A36", "bg-velvet-navy", "text-candle-cream"],
] as const;

const scale = [
  ["text-4xl", "4.209rem"],
  ["text-3xl", "3.157rem"],
  ["text-2xl", "2.369rem"],
  ["text-xl", "1.777rem"],
  ["text-lg", "1.333rem"],
  ["text-base", "1rem"],
  ["text-xs", "0.75rem"],
] as const;

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm text-(--fg-muted)">{children}</p>;
}

export default function StyleGuide() {
  return (
    <main>
      <Section innerClassName="space-y-20">
        <header className="text-center">
          <h1 className="text-3xl">Style guide</h1>
          <p className="mt-3 text-(--fg-muted)">Temporary page for checking the brand foundation.</p>
        </header>

        <div>
          <Label>Palette</Label>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {palette.map(([name, hex, bg, fg]) => (
              <li key={name} className={`${bg} ${fg} rounded-[2px] p-4 outline outline-1 outline-copper/30`}>
                <span className="block font-medium">{name}</span>
                <span className="text-sm">{hex}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Label>Type scale (Cormorant Garamond for display, Jost for body)</Label>
          <div className="space-y-3">
            {scale.map(([cls, size]) => (
              <p key={cls} className={`${cls} font-display leading-tight`}>
                Celebrate with us <span className="font-sans text-xs text-smoke">{cls} {size}</span>
              </p>
            ))}
            <p className="font-display text-xl italic">A space made for meaningful moments.</p>
            <p className="max-w-prose">
              Body text in Jost. Birthdays, anniversaries, ring ceremonies, family get-togethers and team dinners.
              We plan the menu, the seating and the small details with you, so you can be a guest at your own
              celebration.
            </p>
          </div>
        </div>

        <div id="lockups" className="space-y-12 text-center">
          <Label>Lockup: hero, large, small</Label>
          <Lockup size="hero" />
          <Lockup size="large" />
          <Lockup size="small" />
        </div>

        <div>
          <Label>Logo: stacked and horizontal, mark in copper, cream and ink</Label>
          <div className="flex flex-wrap items-center gap-12">
            <Logo variant="stacked" className="text-copper" />
            <Logo variant="horizontal" className="text-candle-cream" />
            <div className="flex items-end gap-6 text-copper">
              <Mark className="size-4" />
              <Mark className="size-8" />
              <Mark className="size-16" />
              <Mark className="size-40" />
            </div>
          </div>
        </div>

        <div>
          <Label>Buttons on night</Label>
          <div className="flex flex-wrap gap-4">
            <Button href="#">Plan an event</Button>
            <Button href="#" variant="secondary">
              Call to reserve
            </Button>
            <Button size="sm">Plan an event</Button>
          </div>
        </div>

        <div>
          <Label>Star divider</Label>
          <StarDivider />
        </div>

        <div>
          <Label>Arch frame</Label>
          <div className="grid gap-8 sm:grid-cols-3">
            <ArchFrame image={images.angelFountain} sizes="(min-width: 640px) 33vw, 100vw" />
            <ArchFrame image={images.rosePainting} sizes="(min-width: 640px) 33vw, 100vw" />
            <ArchFrame image={images.storefront} sizes="(min-width: 640px) 33vw, 100vw" />
          </div>
        </div>
      </Section>

      <Section theme="parchment">
        <h2 className="text-center text-3xl text-(--heading)">A page from the menu</h2>
        <p className="mx-auto mt-6 max-w-prose">
          Parchment sections alternate with night sections like pages of the printed menu. Headings in ink
          terracotta, body text in ink espresso, and a faint paper grain behind everything.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="#">Ask for the menu</Button>
          <Button href="#" variant="secondary">
            Get directions
          </Button>
        </div>
        <StarDivider className="mt-12" />
      </Section>

      <Section theme="navy">
        <p className="text-center font-display text-2xl italic">
          The hands behind the flavours. The mind behind the menu.
        </p>
      </Section>
    </main>
  );
}
