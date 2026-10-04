import { Section, SectionHeading } from "@/components/ui/Section";
import { FourPointStar } from "@/components/ui/StarDivider";
import { booking } from "@/content/site";

// A real sequence, so numbers are allowed here. Joined by a thin copper line
// with small four-point stars: across on desktop, down on mobile.
export function Booking() {
  return (
    <Section theme="parchment" id="booking" labelledBy="booking-title">
      <SectionHeading id="booking-title">{booking.heading}</SectionHeading>

      <ol className="mx-auto mt-14 grid max-w-5xl gap-10 lg:mt-20 lg:grid-cols-4 lg:gap-8">
        {booking.steps.map((step, i) => (
          <li
            key={step.title}
            className="relative pl-10 not-last:after:absolute not-last:after:top-7 not-last:after:-bottom-8 not-last:after:left-[7px] not-last:after:w-px not-last:after:bg-copper/70 lg:pt-12 lg:pl-0 lg:not-last:after:top-[7px] lg:not-last:after:right-[-1.6rem] lg:not-last:after:bottom-auto lg:not-last:after:left-7 lg:not-last:after:h-px lg:not-last:after:w-auto"
          >
            <FourPointStar className="absolute top-1.5 left-0 size-[15px] text-copper lg:top-0" />
            <p aria-hidden="true" className="font-display text-3xl leading-none text-ink-terracotta lining-nums">
              {i + 1}
            </p>
            <h3 className="mt-3 font-display text-xl text-ink-terracotta">
              <span className="sr-only">{booking.stepLabel(i + 1)}</span>
              {step.title}
            </h3>
            <p className="mt-2 max-w-[34ch]">{step.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
