// Every piece of copy and business data on the site lives in this file.
// Components never hardcode text. Anything the owner has not confirmed
// carries a TODO_OWNER comment. See OWNER_CHECKLIST.md for the questions.

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Phone = { display: string; href: string; e164: string };

export type Occasion = { name: string; description: string };

export type Space = {
  name: string;
  description: string;
  suitedTo: string;
  /** null until the owner confirms. The capacity line is hidden while null. */
  capacity: number | null;
  image: SiteImage;
};

/* ------------------------------------------------------------------ */
/* Settings                                                           */
/* ------------------------------------------------------------------ */

// TODO_OWNER: confirm the owner is happy with the "Website by Arya Patel" credit in the footer.
export const showCredit = true;

// TODO_OWNER: confirm the domain. This placeholder is used for canonical URLs, the sitemap and Open Graph.
export const siteUrl = "https://themasalasecrets.in";

/* ------------------------------------------------------------------ */
/* Business facts                                                     */
/* ------------------------------------------------------------------ */

export const business = {
  name: "The Masala Secrets",
  shortName: "TMS",
  address: {
    street: "Ground Floor, West Wing, Siddhraj Z Square",
    road: "Podar International School Road",
    locality: "Kudasan",
    city: "Gandhinagar",
    region: "Gujarat",
    postalCode: "382421",
    country: "IN",
    lines: [
      "Ground Floor, West Wing, Siddhraj Z Square",
      "Podar International School Road, Kudasan",
      "Gandhinagar, Gujarat 382421",
    ],
  },
  landmark: "Near City Square Mart",
  phones: [
    { display: "+91 90993 22446", href: "tel:+919099322446", e164: "+919099322446" },
    { display: "+91 90993 22445", href: "tel:+919099322445", e164: "+919099322445" },
  ] satisfies Phone[],
  // TODO_OWNER: confirm this number is on WhatsApp.
  whatsappNumber: "919099322446",
  // TODO_OWNER: confirm the opening hours.
  hours: {
    summary: "Open daily. Lunch 11:30 AM to 2:45 PM. Dinner 7:00 PM to 10:45 PM.",
    lines: ["Open daily", "Lunch 11:30 AM to 2:45 PM", "Dinner 7:00 PM to 10:45 PM"],
    schema: [
      { opens: "11:30", closes: "14:45" },
      { opens: "19:00", closes: "22:45" },
    ],
  },
  food: "Pure vegetarian. Jain preparations on request.",
  drinks: "No alcohol, mocktails only.",
  facilities: "Parking, step-free entry and Wi-Fi. Kid friendly, with seating for large groups.",
  instagram: {
    handle: "@the_masala_secrets",
    url: "https://www.instagram.com/the_masala_secrets/",
  },
  map: {
    lat: 23.1756896,
    lng: 72.6294501,
    embed: "https://www.google.com/maps?q=23.1756896,72.6294501&output=embed",
    directions: "https://www.google.com/maps/dir/?api=1&destination=23.1756896,72.6294501",
    title: "Map showing The Masala Secrets at Siddhraj Z Square, Kudasan, Gandhinagar",
  },
} as const;

/* ------------------------------------------------------------------ */
/* Images (processed by scripts/crop_assets.py)                        */
/* ------------------------------------------------------------------ */

export const images = {
  heroAngelHall: {
    src: "/images/hero-angel-hall.webp",
    width: 584,
    height: 775,
    alt: "The dining room at night, with flying cherub lamps, a ceiling of white flowers, a bronze angel fountain and floral upholstered chairs",
  },
  brickArchLongTables: {
    src: "/images/space-brick-arch-long-tables.webp",
    width: 590,
    height: 1034,
    alt: "Long tables beneath brick arches and brass chandeliers, with mustard velvet banquettes along the wall",
  },
  privateCurtainTable: {
    src: "/images/space-private-curtain-table.webp",
    width: 590,
    height: 1034,
    alt: "A round table for eight set before red velvet curtains, under a cherub lamp",
  },
  angelFountain: {
    src: "/images/space-angel-fountain.webp",
    width: 590,
    height: 880,
    alt: "A bronze angel statue standing over the fountain, with red velvet curtains behind",
  },
  cherubLamp: {
    src: "/images/space-cherub-lamp.webp",
    width: 590,
    height: 469,
    alt: "A carved cherub holding a lamp above the tables",
  },
  rosePainting: {
    src: "/images/space-rose-painting.webp",
    width: 590,
    height: 880,
    alt: "An oil painting of roses in a carved frame on a brick wall, above mustard velvet banquettes",
  },
  chandelierCeiling: {
    src: "/images/space-chandelier-ceiling.webp",
    width: 590,
    height: 290,
    alt: "Wrought-iron chandeliers hanging beneath a ceiling of white flowers",
  },
  windowDining: {
    src: "/images/space-window-dining.webp",
    width: 226,
    height: 370,
    alt: "Window tables framed by red velvet curtains, lit by a cherub lamp",
  },
  storefront: {
    src: "/images/exterior-storefront.webp",
    width: 590,
    height: 924,
    alt: "The copper TMS sign above the glass doors of the restaurant at Siddhraj Z Square",
  },
  feast: {
    src: "/images/feast-see-you-at-the-table.webp",
    width: 590,
    height: 462,
    alt: "A basket of naan and bowls of curry on a table beside a navy velvet booth",
  },
} satisfies Record<string, SiteImage>;

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

export const nav = {
  links: [
    { label: "Celebrations", href: "#celebrations" },
    { label: "How it works", href: "#booking" },
    { label: "The venue", href: "#spaces" },
    { label: "Enquire", href: "#visit" },
  ],
  cta: { label: "Plan an event", href: "#visit" },
  homeLabel: "TMS, The Masala Secrets, back to top",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
};

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  lockupName: "The Masala Secrets",
  line1: "Banquet and private celebrations in Kudasan, Gandhinagar",
  line2: "A space made for meaningful moments.",
  primary: { label: "Plan an event", href: "#visit" },
  secondary: { label: "Call us", href: business.phones[0].href },
  note: "Pure vegetarian. Jain preparations on request.",
};

/* ------------------------------------------------------------------ */
/* Celebrations (banquet)                                             */
/* ------------------------------------------------------------------ */

export const celebrations = {
  heading: "Celebrate with us",
  intro:
    "Birthdays, anniversaries, ring ceremonies, family get-togethers and team dinners. We plan the menu, the seating and the small details with you, so you can be a guest at your own celebration.",
  occasionsHeading: "Occasions we host",
  occasions: [
    {
      name: "Birthdays",
      description: "From first birthdays to milestone ones, with a menu the whole table will enjoy.",
    },
    {
      name: "Anniversaries",
      description: "A quiet table for two or a dinner for the whole family.",
    },
    {
      name: "Engagement and ring ceremonies",
      description: "An elegant room for two families to come together.",
    },
    {
      name: "Family get-togethers",
      description: "Long tables, shared plates and room for every generation.",
    },
    {
      name: "Kitty parties",
      description: "A long lunch with your group in a room everyone will want to photograph.",
    },
    {
      name: "Corporate lunches and dinners",
      description: "Team dinners and client lunches with a set menu planned in advance.",
    },
  ] satisfies Occasion[],
  spaces: [
    {
      // TODO_OWNER: confirm the name of this space.
      name: "The Brick Hall",
      description:
        "Long tables beneath brick arches and brass chandeliers, with mustard velvet banquettes along the wall.",
      suitedTo: "Suited to large family and corporate groups.",
      // TODO_OWNER: how many guests can this space seat?
      capacity: null,
      image: images.brickArchLongTables,
    },
    {
      // TODO_OWNER: confirm the name of this space.
      name: "The Curtain Room",
      description: "A round table set before red velvet curtains, lit by a cherub lamp.",
      suitedTo: "Suited to smaller, more private celebrations.",
      // TODO_OWNER: how many guests can this space seat?
      capacity: null,
      image: images.privateCurtainTable,
    },
  ] satisfies Space[],
  capacityLine: (n: number) => `Seats up to ${n} guests`,
  feastImage: images.feast,
  feastLine: "Vegetarian banquet menus, with Jain preparations, planned with you for every celebration. Packages on request.",
  cta: { label: "Plan an event", href: "#visit" },
};

/* ------------------------------------------------------------------ */
/* How booking works                                                  */
/* ------------------------------------------------------------------ */

export const booking = {
  heading: "How booking works",
  stepLabel: (n: number) => `Step ${n}: `,
  steps: [
    {
      title: "Send an enquiry",
      text: "Tell us the date, the number of guests and the occasion. The form below sends it to us on WhatsApp.",
    },
    {
      title: "Visit us",
      text: "See the space and talk through the menu and seating with our team.",
    },
    {
      title: "Finalise the details",
      text: "Confirm the menu, the setup and the timings.",
    },
    {
      title: "Celebrate",
      text: "Arrive, sit down and enjoy it. We take care of the rest.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Spaces gallery                                                     */
/* ------------------------------------------------------------------ */

export const gallery = {
  heading: "Inside the venue",
  intro: "Every corner of the room has a story. Here are a few.",
  label: "Photos of the room",
  previous: "Previous photo",
  next: "Next photo",
  items: [
    {
      image: images.angelFountain,
      caption: "A bronze angel stands over the fountain at the centre of the room.",
    },
    { image: images.cherubLamp, caption: "Cherubs carry the lamps above every table." },
    {
      image: images.rosePainting,
      caption: "Oil paintings in carved frames hang on the brick walls.",
    },
    {
      image: images.chandelierCeiling,
      caption: "Wrought-iron chandeliers beneath a ceiling of white flowers.",
    },
    { image: images.windowDining, caption: "Quieter corners framed by red velvet curtains." },
  ],
};

/* ------------------------------------------------------------------ */
/* Visit and enquiry form                                             */
/* ------------------------------------------------------------------ */

export const visit = {
  heading: "Plan your celebration",
  intro: "Tell us about your event, or call us and we will plan it with you.",
  storefront: images.storefront,
  storefrontCaption: "Look for the copper sign on the ground floor of Siddhraj Z Square.",
  detailsHeading: "Find us",
  addressLabel: "Address",
  phoneLabel: "Phone",
  hoursLabel: "Visiting hours",
  directions: { label: "Get directions" },
  instagramSuffix: "on Instagram",
  callLine: { lead: "Prefer to talk?", label: "Call +91 90993 22446", href: business.phones[0].href },
};

export const enquiryForm = {
  heading: "Send an enquiry",
  intro: "Tell us a little about your plans and we will get back to you on WhatsApp.",
  requiredNote: "Fields marked with a star are required.",
  fields: {
    name: { label: "Your name", autoComplete: "name" },
    phone: { label: "Mobile number", hint: "10 digit Indian mobile number", autoComplete: "tel" },
    occasion: { label: "Occasion", placeholder: "Choose an occasion" },
    date: { label: "Date" },
    guests: { label: "Number of guests" },
    time: { label: "Time", options: ["Lunch", "Dinner"] },
    message: { label: "Anything else we should know?", optional: "Optional" },
  },
  extraOccasions: ["Other"],
  // TODO_OWNER: what is the largest group you can host? Used as the form maximum.
  maxGuests: 200,
  errors: {
    name: "Enter your name.",
    phone: "Enter a 10 digit mobile number.",
    occasion: "Choose an occasion.",
    date: "Choose a date.",
    datePast: "Choose today or a later date.",
    guests: "Enter the number of guests.",
    guestsMin: "Enter at least 1 guest.",
    guestsMax: (max: number) => `For more than ${max} guests, call us and we will plan it with you.`,
    time: "Choose lunch or dinner.",
    summary: (n: number) =>
      n === 1 ? "Please fix 1 field to send your enquiry." : `Please fix ${n} fields to send your enquiry.`,
  },
  submit: "Send enquiry on WhatsApp",
  confirmation: "WhatsApp opened with your enquiry. Press send in WhatsApp to reach us.",
  confirmationHeading: "Almost there",
  reopen: "Open WhatsApp again",
  again: "Send another enquiry",
};

/* ------------------------------------------------------------------ */
/* WhatsApp messages (built in src/lib/whatsapp.ts)                    */
/* ------------------------------------------------------------------ */

export const whatsappMessages = {
  enquiryGreeting: "Hello The Masala Secrets,",
  enquiryIntro: "I would like to enquire about an event.",
  floating: "Hello The Masala Secrets, I have a question about hosting an event.",
  floatingLabel: "Chat on WhatsApp",
  noMessage: "None",
};

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

export const footer = {
  food: business.food,
  copyright: (year: number) => `© ${year} The Masala Secrets. All rights reserved.`,
  credit: { label: "Website by Arya Patel" },
  navLabel: "Footer",
  instagramLabel: "on Instagram",
};

/* ------------------------------------------------------------------ */
/* Metadata                                                           */
/* ------------------------------------------------------------------ */

export const meta = {
  title: "The Masala Secrets | Banquet and Private Celebrations in Kudasan, Gandhinagar",
  description:
    "A pure vegetarian banquet venue in Kudasan, Gandhinagar. Host birthdays, anniversaries, ring ceremonies, kitty parties and corporate dinners at The Masala Secrets.",
  ogPlace: "Kudasan, Gandhinagar",
  locale: "en_IN",
};
