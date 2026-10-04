import { Section, SectionHeading } from "@/components/ui/Section";
import { reviews, reviewsSection } from "@/content/site";

// Renders guest reviews only when site.reviews has items.
// The quiet line to Google reviews always shows.
export function Reviews() {
  const link = (
    <a
      href={reviewsSection.googleUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-[2px] text-copper-glow underline decoration-copper/60 underline-offset-4 hover:text-copper-glow-bright hover:decoration-copper-glow"
    >
      {reviewsSection.googleLine}
    </a>
  );

  if (reviews.length === 0) {
    return (
      <div className="theme-night bg-night-walnut px-5 pt-20 text-center lg:pt-28">
        <p>{link}</p>
      </div>
    );
  }

  return (
    <Section id="reviews" labelledBy="reviews-title">
      <SectionHeading id="reviews-title">{reviewsSection.heading}</SectionHeading>
      <ul className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.name + r.quote.slice(0, 12)}>
            <figure>
              <blockquote>
                <p className="font-display text-xl leading-snug text-candle-cream italic">{r.quote}</p>
              </blockquote>
              <figcaption className="mt-4 text-sm text-smoke">
                {r.name}, {r.source}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <p className="mt-14 text-center">{link}</p>
    </Section>
  );
}
