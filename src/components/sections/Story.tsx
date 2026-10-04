import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { story } from "@/content/site";

export function Story() {
  return (
    <Section theme="parchment" id="story" labelledBy="story-title" className="pb-0! lg:pb-0!">
      <SectionHeading id="story-title">{story.heading}</SectionHeading>

      <div className="mx-auto mt-10 max-w-[60ch] space-y-5">
        {story.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? "text-lg leading-[1.55]" : undefined}>
            {p}
          </p>
        ))}
      </div>

      <ul className="mx-auto mt-14 flex max-w-4xl flex-col border-y border-copper/60 text-center sm:flex-row">
        {story.facts.map((fact) => (
          <li
            key={fact}
            className="flex-1 border-copper/60 px-5 py-4 font-display text-lg leading-snug text-ink-terracotta not-last:border-b sm:not-last:border-r sm:not-last:border-b-0"
          >
            {fact}
          </li>
        ))}
      </ul>

      {/* The street from the printed menu. Multiply melts its white paper into the parchment. */}
      <Image
        src={story.illustration.src}
        alt={story.illustration.alt}
        width={story.illustration.width}
        height={story.illustration.height}
        sizes="(min-width: 640px) 590px, 100vw"
        className="mx-auto mt-14 w-full max-w-[590px] mix-blend-multiply brightness-[1.12] contrast-[1.08] [mask-image:linear-gradient(to_bottom,transparent,black_30%)]"
      />
    </Section>
  );
}
