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

export type Dish = {
  name: string;
  description: string;
  image: SiteImage;
  shape: "circle" | "rect";
};

export type DishGroup = { title: string; dishes: Dish[] };

export type Review = { quote: string; name: string; source: string };

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
  instagramLine: "TMS Global Kitchen",
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
  headChef: "Chef Arpit",
  // TODO_OWNER: confirm the rating.
  rating: "Rated 4.5 by our guests",
  cuisines: ["Indian", "Asian", "Continental", "Vegetarian"],
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
  menuCover: {
    src: "/images/menu-cover-lockup.webp",
    width: 590,
    height: 606,
    alt: "The Masala Secrets menu cover, lit by a beam of light",
  },
  streetIllustration: {
    src: "/images/story-street-illustration.webp",
    width: 590,
    height: 328,
    alt: "A line drawing of an old town street with cobblestones, from our printed menu",
  },
  chefPortrait: {
    src: "/images/chef-arpit-portrait.webp",
    width: 590,
    height: 375,
    alt: "Chef Arpit in a black chef's coat and tall white hat, plating a dish",
  },
  chefAtWork: {
    src: "/images/chef-arpit-at-work.webp",
    width: 486,
    height: 623,
    alt: "Chef Arpit in a navy chef's coat with an Indian flag on the collar, cooking in the kitchen",
  },
  lucknowiBiryani: {
    src: "/images/dish-lucknowi-biryani.webp",
    width: 412,
    height: 413,
    alt: "Lucknowi biryani topped with fried onions, cashews and fresh mint, seen from above",
  },
  kashmiriKofta: {
    src: "/images/dish-kashmiri-kofta-curry.webp",
    width: 432,
    height: 432,
    alt: "Golden koftas in a creamy orange Kashmiri gravy, seen from above",
  },
  goanCashew: {
    src: "/images/dish-goan-cashew-curry.webp",
    width: 432,
    height: 432,
    alt: "Goan cashew curry with whole cashews and a flower garnish, seen from above",
  },
  crystalDumpling: {
    src: "/images/dish-crystal-dumpling-penang.webp",
    width: 590,
    height: 521,
    alt: "Translucent vegetable dumplings in red Penang curry on a terrazzo plate",
  },
  noodleDumplingSoup: {
    src: "/images/dish-noodle-dumpling-soup.webp",
    width: 590,
    height: 487,
    alt: "Noodle and dumpling soup in a white cup and saucer",
  },
  gochujangBowl: {
    src: "/images/dish-gochujang-bowl.webp",
    width: 506,
    height: 457,
    alt: "Paneer in a red gochujang glaze with noodles, greens and cabbage in a dark bowl",
  },
  springRollShots: {
    src: "/images/dish-spring-roll-shots.webp",
    width: 590,
    height: 552,
    alt: "Spring rolls standing in shot glasses of red dip on a wooden board",
  },
  bakedPasta: {
    src: "/images/dish-baked-pasta.webp",
    width: 501,
    height: 527,
    alt: "Golden baked pasta in an oval dish, topped with a cherry tomato and herbs",
  },
  dalKhichdi: {
    src: "/images/dish-dal-khichdi.webp",
    width: 590,
    height: 447,
    alt: "Dal khichdi in a silver bowl beside a chilled drink, with a red curtain behind",
  },
  paneerHandi: {
    src: "/images/dish-paneer-handi.webp",
    width: 590,
    height: 633,
    alt: "A paneer curry in a tin-lined handi",
  },
  tomatoNoodleSoup: {
    src: "/images/dish-tomato-noodle-soup.webp",
    width: 590,
    height: 551,
    alt: "Soup poured from a glass jug into a glass teacup",
  },
  feast: {
    src: "/images/feast-see-you-at-the-table.webp",
    width: 590,
    height: 462,
    alt: "A basket of naan and bowls of curry on a table beside a navy velvet booth",
  },
  berryMocktail: {
    src: "/images/drink-berry-mocktail.webp",
    width: 590,
    height: 542,
    alt: "A berry mocktail with citrus and mint in a cut-glass goblet",
  },
  chocolateCaramel: {
    src: "/images/dessert-chocolate-caramel.webp",
    width: 590,
    height: 470,
    alt: "A chocolate dessert being dipped into warm caramel sauce",
  },
  blueberryCheesecake: {
    src: "/images/dessert-blueberry-cheesecake.webp",
    width: 590,
    height: 475,
    alt: "A slice of blueberry cheesecake under a glossy blueberry compote",
  },
  mangoCheesecake: {
    src: "/images/dessert-mango-cheesecake.webp",
    width: 590,
    height: 480,
    alt: "A slice of mango cheesecake finished with pistachio and rose petals",
  },
} satisfies Record<string, SiteImage>;

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */

export const nav = {
  links: [
    { label: "Celebrations", href: "#celebrations" },
    { label: "Spaces", href: "#spaces" },
    { label: "Kitchen", href: "#kitchen" },
    { label: "Chef", href: "#chef" },
    { label: "Visit", href: "#visit" },
  ],
  cta: { label: "Plan an event", href: "#visit" },
  homeLabel: "The Masala Secrets, back to top",
  openMenu: "Open menu",
  closeMenu: "Close menu",
  menuTitle: "Menu",
};

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  lockupName: "The Masala Secrets",
  line1: "Global kitchen and banquet in Kudasan, Gandhinagar",
  line2: "A space made for meaningful moments.",
  primary: { label: "Plan an event", href: "#visit" },
  secondary: { label: "Call to reserve", href: business.phones[0].href },
  note: "Pure vegetarian. Jain preparations on request.",
};

/* ------------------------------------------------------------------ */
/* Story                                                              */
/* ------------------------------------------------------------------ */

export const story = {
  heading: "Our story",
  paragraphs: [
    "It began with a simple idea. A place where the heritage of Indian cooking could sit at the same table as the flavours of the world.",
    "So our kitchen cooks a Lucknowi biryani and a Penang curry with the same care, and every plate mixes the familiar with something unexpected.",
    "The food is only half of it. The Masala Secrets is a place for long dinners, family celebrations and conversations that run late, under cherub lamps and a ceiling of flowers.",
  ],
  facts: [
    "Pure vegetarian, with Jain preparations",
    business.rating, // TODO_OWNER: confirm the rating.
    "Ground floor, Siddhraj Z Square, Kudasan",
  ],
  illustration: images.streetIllustration,
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
  spacesHeading: "Our spaces",
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
  feastImages: [images.feast, images.springRollShots],
  feastLine: "Menus are planned with you for every celebration. Packages on request.",
  cta: { label: "Plan an event", href: "#visit" },
};

/* ------------------------------------------------------------------ */
/* How booking works                                                  */
/* ------------------------------------------------------------------ */

export const booking = {
  heading: "How booking works",
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
  heading: "Inside The Masala Secrets",
  intro: "Every corner of the room has a story. Here are a few.",
  label: "Photos of the room",
  previous: "Previous photo",
  next: "Next photo",
  items: [
    {
      image: images.angelFountain,
      caption: "A bronze angel stands over the fountain at the centre of the room.",
    },
    { image: images.cherubLamp, caption: "Cherubs carry the lamps above the tables." },
    {
      image: images.rosePainting,
      caption: "Oil paintings in carved frames hang on the brick walls.",
    },
    {
      image: images.chandelierCeiling,
      caption: "Wrought-iron chandeliers beneath a ceiling of white flowers.",
    },
    { image: images.windowDining, caption: "Window tables framed by red velvet curtains." },
  ],
};

/* ------------------------------------------------------------------ */
/* Kitchen                                                            */
/* ------------------------------------------------------------------ */

export const kitchen = {
  heading: "A global kitchen",
  intro:
    "Everything we cook is vegetarian, and Jain preparations are available on request. The menu moves between regional Indian classics, Asian favourites and continental comfort food.",
  groups: [
    {
      title: "From India's regions",
      dishes: [
        {
          name: "Lucknowi Biryani",
          description:
            "Fragrant rice layered with vegetables and whole spices, finished with fried onions, cashews and fresh mint.",
          image: images.lucknowiBiryani,
          shape: "circle",
        },
        {
          name: "Kashmiri Kofta Curry",
          description: "Golden koftas in a creamy, gently spiced Kashmiri gravy.",
          image: images.kashmiriKofta,
          shape: "circle",
        },
        {
          name: "Goan Cashew Curry",
          description: "Creamy and nutty, with the warm spices of the Goan coast.",
          image: images.goanCashew,
          shape: "circle",
        },
        {
          name: "Dal Khichdi",
          description: "Slow-cooked rice and lentils. Simple, warm and comforting.",
          image: images.dalKhichdi,
          shape: "rect",
        },
      ],
    },
    {
      title: "From across Asia",
      dishes: [
        {
          name: "Veggie Crystal Dumpling in Penang Curry",
          description: "Translucent vegetable dumplings in a rich Malaysian Penang curry.",
          image: images.crystalDumpling,
          shape: "rect",
        },
        {
          name: "Noodle Dumpling Soup",
          description: "A warm, spiced broth with noodles and soft dumplings.",
          image: images.noodleDumplingSoup,
          shape: "rect",
        },
        {
          // TODO_OWNER: confirm the exact menu name.
          name: "Gochujang Bowl",
          description:
            "Paneer in a sweet and spicy Korean chilli glaze, with noodles, greens and crunchy cabbage.",
          image: images.gochujangBowl,
          shape: "rect",
        },
      ],
    },
    {
      title: "Small plates and sips",
      dishes: [
        {
          // TODO_OWNER: confirm the exact menu name.
          name: "Spring Roll Shots",
          description: "Crisp spring rolls served standing in shot glasses of spicy dip.",
          image: images.springRollShots,
          shape: "rect",
        },
        {
          // TODO_OWNER: confirm the exact menu name.
          name: "Baked Pasta",
          description: "Creamy, cheesy and golden from the oven.",
          image: images.bakedPasta,
          shape: "rect",
        },
        {
          // TODO_OWNER: confirm the exact menu name.
          name: "Berry Mocktail",
          description: "Berries, citrus and fresh mint over ice.",
          image: images.berryMocktail,
          shape: "rect",
        },
      ],
    },
    {
      title: "Sweet endings",
      dishes: [
        {
          name: "Blueberry Cheesecake",
          description: "Smooth cheesecake under a glossy blueberry compote.",
          image: images.blueberryCheesecake,
          shape: "rect",
        },
        {
          name: "Mango Cheesecake",
          description: "Finished with pistachio and rose petals.",
          image: images.mangoCheesecake,
          shape: "rect",
        },
        {
          // TODO_OWNER: confirm the exact menu name.
          name: "Chocolate Caramel Dessert",
          description: "Layers of chocolate with a warm caramel sauce.",
          image: images.chocolateCaramel,
          shape: "rect",
        },
      ],
    },
  ] satisfies DishGroup[],
  closing: "Our menu changes with the seasons. Ask us for the current menu or a celebration menu.",
  cta: { label: "Ask for the menu" },
};

/* ------------------------------------------------------------------ */
/* Chef                                                               */
/* ------------------------------------------------------------------ */

export const chef = {
  name: "Chef Arpit",
  role: "Head chef",
  quote: "The hands behind the flavours. The mind behind the menu.",
  // TODO_OWNER: replace with Chef Arpit's real background.
  bio: "Chef Arpit leads the kitchen at The Masala Secrets. His menu moves from Lucknow and Kashmir to Goa and Penang, and every plate leaves the kitchen finished by hand.",
  portrait: images.chefPortrait,
  atWork: images.chefAtWork,
};

/* ------------------------------------------------------------------ */
/* Reviews                                                            */
/* ------------------------------------------------------------------ */

// The reviews section renders only when this array has items. Keep it empty
// until the owner shares real reviews. Expected shape:
// { quote: "The food and the room were perfect for our anniversary.", name: "Guest name", source: "Google" }
// TODO_OWNER: share two or three real guest reviews, with permission to use their names.
export const reviews: Review[] = [];

export const reviewsSection = {
  heading: "What our guests say",
  googleLine: "Read what our guests say on Google",
  // TODO_OWNER: Google reviews link. Until then this opens a Google Maps search for the restaurant.
  googleUrl: "https://www.google.com/maps/search/?api=1&query=The+Masala+Secrets+Kudasan+Gandhinagar",
};

/* ------------------------------------------------------------------ */
/* Instagram                                                          */
/* ------------------------------------------------------------------ */

export const instagram = {
  line: "Follow @the_masala_secrets for new dishes and evenings at TMS.",
  handle: business.instagram.handle,
  url: business.instagram.url,
  tileLabel: "Open The Masala Secrets on Instagram",
  tiles: [
    images.berryMocktail,
    images.tomatoNoodleSoup,
    images.paneerHandi,
    images.dalKhichdi,
    images.chocolateCaramel,
    images.cherubLamp,
  ],
};

/* ------------------------------------------------------------------ */
/* Visit and enquiry form                                             */
/* ------------------------------------------------------------------ */

export const visit = {
  heading: "Plan your visit",
  intro: "Tell us about your celebration, or call to reserve a table.",
  storefront: images.storefront,
  storefrontCaption: "Look for the copper sign on the ground floor of Siddhraj Z Square.",
  detailsHeading: "Find us",
  addressLabel: "Address",
  phoneLabel: "Phone",
  hoursLabel: "Hours",
  directions: { label: "Get directions" },
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
  extraOccasions: ["Table reservation", "Other"],
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
  menuRequest: "Hello The Masala Secrets, could you please share your current menu?",
  floating: "Hello The Masala Secrets, I have a question.",
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
  title: "The Masala Secrets | Global Kitchen and Banquet in Kudasan, Gandhinagar",
  description:
    "Pure vegetarian global kitchen and banquet in Kudasan, Gandhinagar. Plan birthdays, anniversaries, ring ceremonies and corporate dinners at The Masala Secrets.",
  ogPlace: "Kudasan, Gandhinagar",
  locale: "en_IN",
};
