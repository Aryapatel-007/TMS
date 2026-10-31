import clsx from "clsx";
import Image from "next/image";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { celebrations } from "@/content/site";

export function Celebrations() {
  return (
    <Section id="celebrations" labelledBy="celebrations-title">
      <SectionHeading id="celebrations-title" intro={celebrations.intro}>
        {celebrations.heading}
      </SectionHeading>

      {/* Occasions as a typeset list, not cards */}
      <dl aria-label={celebrations.occasionsHeading} className="mx-auto mt-14 grid max-w-4xl gap-x-16 md:grid-cols-2">
        {celebrations.occasions.map((o) => (
          <div key={o.name} className="border-t border-copper/45 py-6">
            <dt className="font-display text-[1.5rem] leading-tight text-candle-cream">{o.name}</dt>
            <dd className="mt-1.5 text-smoke">{o.description}</dd>
          </div>
        ))}
      </dl>

      {/* The two spaces, alternating sides */}
      <div className="mt-24 space-y-20 lg:mt-32 lg:space-y-28">
        {celebrations.spaces.map((space, i) => (
          <article
            key={space.name}
            className={clsx(
              "grid items-center gap-10 md:grid-cols-2 lg:gap-20",
              i % 2 === 1 && "md:[&>*:first-child]:order-2",
            )}
          >
            <ArchFrame
              image={space.image}
              aspect="4 / 5"
              sizes="(min-width: 768px) 440px, 90vw"
              className={clsx("mx-auto md:max-w-[440px]!", i % 2 === 0 ? "md:mr-0" : "md:ml-0")}
            />
            <div className="max-w-md md:mx-0">
              <h3 className="font-display text-2xl text-candle-cream lg:text-3xl">{space.name}</h3>
              <p className="mt-5 text-candle-cream">{space.description}</p>
              <p className="mt-3 text-smoke">{space.suitedTo}</p>
              {space.capacity ? (
                <p className="mt-6 font-display text-lg italic text-copper-glow">
                  {celebrations.capacityLine(space.capacity)}
                </p>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {/* Banquet menu */}
      <div className="mt-24 lg:mt-32">
        <div className="relative mx-auto aspect-[590/462] w-full max-w-[590px] overflow-hidden rounded-[2px] bg-night-deep">
          <Image
            src={celebrations.feastImage.src}
            alt={celebrations.feastImage.alt}
            fill
            sizes="(min-width: 640px) 590px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="mt-10 flex flex-col items-center gap-7 text-center">
          <p className="max-w-[40ch] font-display text-xl italic text-candle-cream">{celebrations.feastLine}</p>
          <Button href={celebrations.cta.href}>{celebrations.cta.label}</Button>
        </div>
      </div>
    </Section>
  );
}

