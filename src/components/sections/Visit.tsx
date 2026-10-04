import { ArchFrame } from "@/components/ui/ArchFrame";
import { Section, SectionHeading } from "@/components/ui/Section";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { business, visit } from "@/content/site";
import { EnquiryForm } from "./EnquiryForm";

export function Visit() {
  return (
    <Section id="visit" labelledBy="visit-title">
      <SectionHeading id="visit-title" intro={visit.intro}>
        {visit.heading}
      </SectionHeading>

      <div className="mt-14 grid gap-14 lg:mt-20 xl:grid-cols-[1.15fr_1fr] xl:gap-16">
        <EnquiryForm />

        <div className="space-y-14">
          <Details />

          <div className="grid items-start gap-6 sm:grid-cols-2">
            <figure>
              <ArchFrame
                image={visit.storefront}
                aspect="3 / 4"
                sizes="(min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
                className="mx-auto sm:mx-0"
              />
              <figcaption className="mt-3 text-sm text-smoke">{visit.storefrontCaption}</figcaption>
            </figure>
            <div className="aspect-[4/3] overflow-hidden rounded-[2px] border border-copper/70 sm:aspect-[3/4]">
              <iframe
                src={business.map.embed}
                title={business.map.title}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="block h-full w-full border-0 [filter:grayscale(0.35)_sepia(0.2)_brightness(0.85)_contrast(0.95)]"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Details() {
  return (
    <div className="space-y-8">
      <h3 className="font-display text-2xl text-candle-cream">{visit.detailsHeading}</h3>

      <dl className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="font-display text-lg text-copper-glow">{visit.addressLabel}</dt>
          <dd className="mt-1.5">
            <address className="text-candle-cream not-italic">
              {business.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-1.5 text-smoke">{business.landmark}</p>
          </dd>
        </div>

        <div>
          <dt className="font-display text-lg text-copper-glow">{visit.phoneLabel}</dt>
          <dd className="mt-1.5 space-y-1">
            {business.phones.map((phone) => (
              <TrackedLink
                key={phone.href}
                href={phone.href}
                event="call_click"
                className="block w-fit rounded-[2px] text-candle-cream underline decoration-copper/60 underline-offset-4 hover:text-copper-glow hover:decoration-copper-glow"
              >
                {phone.display}
              </TrackedLink>
            ))}
          </dd>
        </div>
        <div>
          <dt className="font-display text-lg text-copper-glow">{visit.hoursLabel}</dt>
          <dd className="mt-1.5 text-candle-cream">
            {business.hours.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <p className="text-smoke">
        {business.food} {business.drinks} {business.facilities}
      </p>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <TrackedLink
          href={business.map.directions}
          target="_blank"
          rel="noopener noreferrer"
          event="directions_click"
          button={{ variant: "secondary" }}
        >
          {visit.directions.label}
        </TrackedLink>
        <a
          href={business.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-[2px] text-copper-glow hover:text-copper-glow-bright"
        >
          {business.instagram.handle}
          <span className="sr-only"> {visit.instagramSuffix}</span>
        </a>
      </div>
    </div>
  );
}
