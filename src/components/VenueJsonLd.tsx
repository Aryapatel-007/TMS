import { business, images, siteUrl } from "@/content/site";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// schema.org data for search engines, describing the banquet venue.
export function VenueJsonLd() {
  const a = business.address;
  const data = {
    "@context": "https://schema.org",
    "@type": ["EventVenue", "LocalBusiness"],
    name: business.name,
    url: siteUrl,
    image: [`${siteUrl}${images.heroAngelHall.src}`, `${siteUrl}${images.storefront.src}`],
    logo: `${siteUrl}/brand/tms-mark.svg`,
    telephone: business.phones[0].e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.street}, ${a.road}, ${a.locality}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.map.lat, longitude: business.map.lng },
    hasMap: business.map.directions,
    openingHoursSpecification: business.hours.schema.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAYS,
      opens: slot.opens,
      closes: slot.closes,
    })),
    sameAs: [business.instagram.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\u003c") }}
    />
  );
}
