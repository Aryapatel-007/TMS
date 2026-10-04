import { Lockup } from "@/components/brand/Lockup";
import { Logo } from "@/components/brand/Logo";
import { Mark } from "@/components/brand/Mark";
import { business, footer, nav, showCredit, visit } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="theme-night relative isolate overflow-hidden bg-night-walnut pt-24 pb-10 text-candle-cream lg:pt-32">
      {/* One oversized, very faint mandala, cropped by the edge of the footer */}
      <Mark className="pointer-events-none absolute -right-[22rem] -bottom-[18rem] -z-10 size-[44rem] text-copper opacity-[0.04] sm:-right-[14rem] lg:-right-[10rem] lg:-bottom-[20rem] lg:size-[52rem]" />

      <div className="mx-auto w-full max-w-content px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.35fr_1fr_0.85fr] lg:gap-10">
          <div className="flex flex-col items-start gap-5">
            <Logo variant="stacked" className="text-[2.4rem] text-candle-cream [&_svg]:text-copper-glow" />
            <Lockup size="small" className="text-left" />
            <p className="text-sm text-smoke">{footer.food}</p>
          </div>

          <div>
            <h2 className="font-display text-lg text-candle-cream">{visit.addressLabel}</h2>
            <address className="mt-3 text-sm not-italic text-smoke">
              {business.address.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="mt-2 block">{business.landmark}</span>
            </address>
          </div>

          <div>
            <h2 className="font-display text-lg text-candle-cream">{visit.phoneLabel}</h2>
            <ul className="mt-3 space-y-1 text-sm">
              {business.phones.map((phone) => (
                <li key={phone.href}>
                  <a href={phone.href} className="rounded-[2px] text-copper-glow hover:text-copper-glow-bright">
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="mt-7 font-display text-lg text-candle-cream">{visit.hoursLabel}</h2>
            <ul className="mt-3 space-y-0.5 text-sm text-smoke">
              {business.hours.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <nav aria-label={footer.navLabel}>
            <ul className="space-y-1.5 text-sm">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="rounded-[2px] text-candle-cream hover:text-copper-glow">
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={business.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[2px] text-copper-glow hover:text-copper-glow-bright"
                >
                  {business.instagram.handle}
                  <span className="sr-only"> {footer.instagramLabel}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-copper/40 pt-6 text-xs text-smoke sm:flex-row sm:justify-between">
          <p>{footer.copyright(year)}</p>
          {showCredit ? <p>{footer.credit.label}</p> : null}
        </div>
      </div>
    </footer>
  );
}
