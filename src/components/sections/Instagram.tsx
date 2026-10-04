import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { instagram } from "@/content/site";

export function Instagram({ compactTop = false }: { compactTop?: boolean }) {
  const [before, after] = instagram.line.split(instagram.handle);
  return (
    <Section id="instagram" labelledBy="instagram-title" className={compactTop ? "pt-12! lg:pt-16!" : undefined}>
      <h2 id="instagram-title" className="mx-auto max-w-[30ch] text-center text-xl text-candle-cream lg:text-2xl">
        {before}
        <a
          href={instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[2px] underline decoration-copper decoration-1 underline-offset-[0.18em] transition-colors hover:text-copper-glow hover:decoration-copper-glow"
        >
          {instagram.handle}
        </a>
        {after}
      </h2>

      <ul className="mt-10 grid grid-cols-3 gap-1.5 sm:gap-2 lg:mt-14 lg:grid-cols-6">
        {instagram.tiles.map((tile) => (
          <li key={tile.src}>
            <a
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${tile.alt}. ${instagram.tileLabel}`}
              className="group relative block aspect-square overflow-hidden rounded-[2px] bg-night-deep"
            >
              <Image
                src={tile.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 200px, 33vw"
                className="object-cover transition-[filter] duration-300 group-hover:brightness-110"
              />
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}
