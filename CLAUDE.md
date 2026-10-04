# CLAUDE.md: The Masala Secrets website

This file is the single source of truth for this project.
Read it fully before every phase.
Work through the phases in PROMPTS.md one at a time, and do only the phase you are asked to do.

---

## 1. What we are building

A one-page marketing website for **The Masala Secrets (TMS)**, a pure vegetarian fine-dine restaurant and banquet venue in Kudasan, Gandhinagar, Gujarat, India.

- **Primary job:** get banquet and private event enquiries (birthdays, anniversaries, engagement and ring ceremonies, family get-togethers, kitty parties, corporate lunches and dinners).
- **Secondary job:** get table reservations by phone, and show the food, the chef and the room.
- **Audience:** families and professionals in Gandhinagar and Ahmedabad planning a celebration. Most arrive on a phone, often from Instagram.
- **Client:** the restaurant owner. **Developer:** Arya, building with Claude Code.

---

## 2. Business facts (use exactly as written)

| Item | Value |
|---|---|
| Name | The Masala Secrets |
| Short name | TMS |
| Line they use on Instagram | TMS Global Kitchen |
| Full name lockup | `the मसाला Secrêts` (lowercase "the", Devanagari "मसाला", "Secrêts" with a circumflex on the first e) |
| Old name | "The Masala Stories". Never use it anywhere. |
| Address | Ground Floor, West Wing, Siddhraj Z Square, Podar International School Road, Kudasan, Gandhinagar, Gujarat 382421 |
| Landmark | Near City Square Mart |
| Phone 1 | +91 90993 22446 (`tel:+919099322446`) |
| Phone 2 | +91 90993 22445 (`tel:+919099322445`) |
| WhatsApp | 919099322446 (TODO_OWNER: confirm this number is on WhatsApp) |
| Hours | Open daily. Lunch 11:30 AM to 2:45 PM. Dinner 7:00 PM to 10:45 PM. (TODO_OWNER: confirm) |
| Food | Pure vegetarian. Jain preparations on request. No alcohol, mocktails only. |
| Facilities | Parking, step-free entry, Wi-Fi, kid friendly, large group seating |
| Instagram | https://www.instagram.com/the_masala_secrets/ |
| Map coordinates | 23.1756896, 72.6294501 |
| Map embed | `https://www.google.com/maps?q=23.1756896,72.6294501&output=embed` |
| Directions link | `https://www.google.com/maps/dir/?api=1&destination=23.1756896,72.6294501` |
| Head chef | Chef Arpit |
| Rating line | "Rated 4.5 by our guests" (TODO_OWNER: confirm) |
| Domain | TODO_OWNER (use `https://themasalasecrets.in` as a placeholder in config) |

---

## 3. Tech stack

- Next.js, latest stable, App Router, TypeScript, `src/` directory, import alias `@/*`.
- Tailwind CSS (whatever version create-next-app installs; v4 uses `@theme` in `globals.css`).
- `motion` package for animation (`import { motion } from "motion/react"`).
- `next/font/google` for fonts, `next/image` for every image.
- `clsx` for class names.
- Playwright (dev only) for review screenshots.
- No backend, no database, no CMS. The enquiry form opens WhatsApp with a prefilled message.
- Deploy target: Vercel.
- Package manager: npm.
- Ask Arya before adding any dependency not listed here.

---

## 4. Folder structure

```
assets/raw/            original screenshots from Arya. Never edit, never serve.
assets/refs/           reference crops for the logo and typography. Not served.
assets/review/         contact sheet and review screenshots (screens/ is gitignored).
scripts/crop_assets.py turns raw screenshots into clean photos.
public/images/         processed .webp photos used on the site.
public/brand/          logo mark SVG.
src/app/               layout.tsx, page.tsx, icon, opengraph-image, sitemap, robots.
src/components/brand/  Mark.tsx, Logo.tsx, Lockup.tsx
src/components/ui/     Button, StarDivider, ArchFrame, Section, etc.
src/components/sections/ one file per page section.
src/content/site.ts    ALL copy, business data, dishes and placeholders.
src/lib/               whatsapp.ts (message builders), track.ts (empty analytics hook).
```

---

## 5. Content rules

- Every piece of text and data lives in `src/content/site.ts`. Components never hardcode copy.
- Anything not confirmed by the owner gets a `// TODO_OWNER: <what to confirm>` comment next to it.
- Never invent prices, capacities, awards, years in business, reviews, chef background facts, or dish names that are not in this file.
- The reviews section renders only when the `reviews` array has items. Keep it empty.
- Spelling: British and Indian English (flavour, colour, centre, favourite).
- Voice: warm, simple and specific. Plain verbs. Sentence case for headings and buttons.
- No em dashes or en dashes anywhere in the copy. Use full stops and commas.
- Do not use these words: tapestry, symphony, culinary journey, embark, elevate, curated, unforgettable, exquisite, nestled, delve, realm, unparalleled, gastronomic.
- Lines from their own Instagram that we may reuse: "A space made for meaningful moments.", "Awaiting your presence.", "See you at the table.", "The hands behind the flavours. The mind behind the menu."

---

## 6. Design direction

### Concept: a night in an old European courtyard

The restaurant interior is designed like a candlelit European street after dark.
It has exposed brick arches, limestone pillars, deep red velvet curtains, navy velvet booths, mustard velvet banquettes, floral upholstered chairs, flying cherubs holding lamps, a bronze angel fountain, a ceiling of white flowers, wrought-iron chandeliers and street lamps, gold leaf placemats and smoky cut-glass goblets.
Their printed menu shows a line drawing of an old town street with cobblestones.
The website should feel like walking into that room in the evening: dark, warm, lamp-lit, theatrical but calm.

### Palette (sampled from their photos)

| Token | Hex | Source | Use |
|---|---|---|---|
| `night-walnut` | `#1A120E` | dark wood tables and ceiling | default page background |
| `night-deep` | `#241813` | shadowed wood | raised surfaces, mobile menu panel |
| `candle-cream` | `#EFE2D3` | cream logo on the storefront sign | main text on dark |
| `smoke` | `#B8A493` | limestone in low light | secondary text on dark |
| `copper` | `#A8704F` | the logo and the rust sign panel | hairlines, logo, large display accents only |
| `copper-glow` | `#C99572` | lamp-lit copper | links and copper text on dark, primary button fill |
| `parchment` | `#E8D8C4` | menu cover paper | light sections ("pages from the menu") |
| `ink-terracotta` | `#6E4532` | menu line drawing, darkened | headings on parchment |
| `ink-espresso` | `#3A2A22` | dark wood | body text on parchment |
| `velvet-red` | `#8E2B28` | the curtains | rare accent: form focus, active states |
| `velvet-navy` | `#0B1A36` | the booths | the chef section background only |

Checked contrast pairs (WCAG):
- candle-cream on night-walnut 14.5:1
- smoke on night-walnut 7.7:1
- copper-glow on night-walnut 7.1:1 (night-walnut text on copper-glow button is also 7.1:1)
- copper on night-walnut 4.5:1 (only for text 24px and larger)
- ink-espresso on parchment 9.8:1
- ink-terracotta on parchment 5.9:1
- candle-cream on velvet-navy 13.6:1

Colour rules:
- Night-walnut is the default. Parchment sections alternate with night sections like pages of the menu.
- No decorative gradients. The only gradients allowed are the hero light beam, the dark photo overlays, and a soft copper candle glow behind the hero lockup.
- Never use pure black `#000` or pure white `#FFF` as surfaces.

### Typography

| Role | Typeface | Notes |
|---|---|---|
| Display and headings | Cormorant Garamond 400, 500, 600 and italic | Matches the italic serif on their posts. Italic is used for whole lines, never to accent a single word. |
| Body and interface | Jost 300, 400, 500 | Geometric, 1920s European poster feel. Body 17px on mobile, 18px on desktop, line height 1.65. |
| Devanagari | Tiro Devanagari Hindi 400 | Only for "मसाला" in the lockup. |

Type scale, ratio 1.333 from a 17px base on mobile and 18px on desktop: 0.75, 1, 1.333, 1.777, 2.369, 3.157, 4.209rem, plus a hero lockup size around clamp(3.5rem, 11vw, 9rem).
Headings in Cormorant, tight leading (1.05 to 1.15). Body text max width 65ch.

Do not use:
- ALL CAPS labels or letter-spaced "eyebrow" labels above headings.
- Strings joined with middle dots ("A · B · C").
- Arrows appended to button or link text.
- Monospace fonts.
- One accented word inside a headline.

### Signature elements (use these, and nothing else decorative)

1. **Hero light beam.** The one big motion moment. Their Instagram reel opens with a beam of light falling across the menu cover (`public/images/menu-cover-lockup.webp`). The site opens the same way: darkness, a warm beam sweeps across and reveals the lockup, then the room fades up.
2. **Arch frames.** Interior photos sit in arch-topped frames (rounded top, square bottom) with a thin copper inner line, echoing the brick arches. Food photos are never arched: bowl shots are circles, everything else is a rectangle with a 2px radius.
3. **Star divider.** From their "Freshly Baked" post: a thin copper line, a small four-point star in the middle, a thin copper line. Use only between major sections.
4. **Mandala mark.** As the logo, and once as a very faint, oversized watermark in the footer.
5. **Street illustration.** The line drawing from their menu, at the bottom of the Story section.

### Motion rules

- One orchestrated moment: the hero sequence. Everything else moves only when the visitor does something (opening the menu, dragging the gallery, submitting the form).
- No fade-up-on-scroll on every section.
- Image hover in the gallery: scale up to 1.03 at most.
- `prefers-reduced-motion: reduce` shows every final state instantly.

### Layout

- Mobile first. Design at 375 to 390px wide, then scale up.
- Max content width 1200px. Text columns max 65ch.
- Section titles and the hero are centre-aligned, like their signage and posts. Body copy is left-aligned.
- Avoid identical card grids. Vary sizes and rhythm.
- Generous vertical spacing between sections (96px mobile, 160px desktop).

### Page wireframe

```
[ header (sticky): logo ........ Celebrations  Spaces  Kitchen  Chef  Visit  (Plan an event) ]

[ HERO, night, full screen photo, beam reveal
                 the मसाला Secrêts
     Global kitchen and banquet in Kudasan, Gandhinagar
          A space made for meaningful moments.
          (Plan an event)   (Call to reserve)
        Pure vegetarian. Jain preparations on request.              ]

[ STORY, parchment: "Our story", text, three plain facts, street illustration ]
[ CELEBRATIONS, night: heading, intro, occasions list, two space rows, feast strip + button ]
[ HOW BOOKING WORKS, parchment: 1  2  3  4 ]
[ SPACES, night: heading, horizontal gallery of arch frames with captions ]
[ KITCHEN, parchment: editorial menu in four groups ]
[ CHEF, velvet-navy: portrait | name, quote, bio ]
[ REVIEWS, night (only when data exists) + Google reviews link ]
[ INSTAGRAM, night: one line + six square photos ]
[ VISIT, night: enquiry form | details | storefront photo + map ]
[ FOOTER, night: logo, details, faint mandala watermark ]
```

---

## 7. Logo

The mark is a circular mandala. Recreate it as an SVG using `assets/refs/ref-logo-copper-on-black.png` and `assets/refs/ref-logo-storefront.png`.

Geometry, from the centre outwards:
- A small solid circle in the centre.
- Four large lens-shaped petals on the vertical and horizontal axes. Each is split lengthwise by a thin gap and has a small lens-shaped cut-out in its middle.
- Four narrower leaf-shaped petals on the diagonals, each split lengthwise down the middle.
- An open ring of space around the flower.
- A zigzag band made of one continuous line forming outward-pointing spikes all the way around (count the spikes on the reference, roughly 24).
- Small solid triangles sitting in the valleys on both sides of the zigzag.

Wordmark: lowercase "tms" in a high-contrast serif with a swash tail on the "s". Use live text in Cormorant Garamond 500 for the wordmark, not an SVG.
The mark component uses `currentColor` so it can be copper, cream or ink.
If the owner later supplies the original logo file, it replaces `public/brand/tms-mark.svg` and `Mark.tsx` without other changes.

---

## 8. Asset map

Run `python scripts/crop_assets.py` to create these. Never put raw screenshots on the site.

| Raw file | Output | What it shows | Where it is used |
|---|---|---|---|
| 1000133658.jpg | `hero-angel-hall.webp` | Wide interior: flying cherub lamps, white flower ceiling, angel fountain, brick walls, floral chairs | Hero background |
| 1000133701.jpg | `space-brick-arch-long-tables.webp` | Long tables, mustard velvet banquettes, brick arches, brass chandeliers | Celebrations: space 1 |
| 1000133705.jpg | `space-private-curtain-table.webp` | Round table for eight before red velvet curtains, cherub lamp | Celebrations: space 2 |
| 1000133703.jpg | `space-angel-fountain.webp` | Bronze angel statue over the fountain, red curtains behind | Spaces gallery |
| 1000133654.jpg | `space-cherub-lamp.webp` | Close-up of a cherub holding a lamp | Spaces gallery, Instagram strip |
| 1000133707.jpg | `space-rose-painting.webp` | Oil painting of roses in a carved frame on brick, mustard banquettes | Spaces gallery |
| 1000133656.jpg | `space-chandelier-ceiling.webp` | Wrought-iron chandeliers under the flower ceiling (wide, short) | Spaces gallery |
| 1000133660.jpg | `space-window-dining.webp` | Window tables with red curtains and a cherub lamp (small, low resolution) | Spaces gallery, small size only |
| 1000133697.jpg | `exterior-storefront.webp` | Copper sign with cream logo above glass doors with iron patterns | Visit section |
| 1000133699.jpg | `menu-cover-lockup.webp` | Menu cover "the मसाला Secrêts" lit by a beam of light | Reference for the hero beam; optional small use |
| 1000133638.jpg | `story-street-illustration.webp` | Line drawing of an old town street, terracotta on white paper | Story section |
| 1000133689.jpg | `chef-arpit-portrait.webp` | Chef Arpit in a black coat and tall white hat, plating | Chef section main image |
| 1000133715.jpg | `chef-arpit-at-work.webp` | Chef Arpit in a navy coat with an Indian flag patch, cooking | Chef section second image |
| 1000133691.jpg | `dish-lucknowi-biryani.webp` | Biryani with cashews and mint, top view (square) | Kitchen, circle |
| 1000133693.jpg | `dish-kashmiri-kofta-curry.webp` | Koftas in creamy orange gravy, top view (square) | Kitchen, circle |
| 1000133696.jpg | `dish-goan-cashew-curry.webp` | Cashew curry with a flower garnish, top view (square) | Kitchen, circle |
| 1000133719.jpg | `dish-crystal-dumpling-penang.webp` | Crystal dumplings in red Penang curry on a terrazzo plate | Kitchen |
| 1000133717.jpg | `dish-noodle-dumpling-soup.webp` | Noodle and dumpling soup in a white cup | Kitchen |
| 1000133646.jpg | `dish-gochujang-bowl.webp` | Paneer in red gochujang glaze with noodles and greens | Kitchen |
| 1000133723.jpg | `dish-spring-roll-shots.webp` | Spring rolls standing in shot glasses of dip on a wooden board | Kitchen, Celebrations feast strip |
| 1000133640.jpg | `dish-baked-pasta.webp` | Baked pasta in an oval dish | Kitchen |
| 1000133644.jpg | `dish-dal-khichdi.webp` | Dal khichdi in a silver bowl with a chilled drink, red curtain behind | Kitchen, Instagram strip |
| 1000133642.jpg | `dish-paneer-handi.webp` | Paneer curry in a tin-lined handi (dish name unknown) | Instagram strip only |
| 1000133650.jpg | `dish-tomato-noodle-soup.webp` | Soup poured from a glass jug into a glass teacup (name unknown) | Instagram strip only |
| 1000133721.jpg | `feast-see-you-at-the-table.webp` | Naan basket and curries on a table against the navy booth | Celebrations feast strip |
| 1000133648.jpg | `drink-berry-mocktail.webp` | Berry mocktail in a cut-glass goblet | Kitchen, Instagram strip |
| 1000133709.jpg | `dessert-chocolate-caramel.webp` | Chocolate dessert dipped in caramel sauce, held by hand | Kitchen, Instagram strip |
| 1000133711.jpg | `dessert-blueberry-cheesecake.webp` | Blueberry cheesecake with compote | Kitchen |
| 1000133713.jpg | `dessert-mango-cheesecake.webp` | Mango cheesecake with pistachio and rose petals | Kitchen |
| 1000133636.jpg | `assets/refs/ref-logo-copper-on-black.png` | Logo, copper on black | Logo reference only |
| 1000133697.jpg | `assets/refs/ref-logo-storefront.png` | Logo, cream on the copper sign | Logo reference only |
| 1000133638.jpg | `assets/refs/ref-menu-story-page.png` | Full "Our Story" menu page | Typography and texture reference only |
| 1000133699.jpg | `assets/refs/ref-menu-cover-lockup.png` | Lockup on the menu cover | Lockup reference only |

Image rules:
- These photos come from phone screenshots, roughly 1000 to 1440px wide. Never display any image wider than its native width.
- The hero is the only full-bleed photo. It sits under a dark overlay and vignette, which also hides softness.
- Every image gets real alt text that describes the dish or the room.
- Use `next/image` with a correct `sizes` attribute. The hero image gets `priority`.

---

## 9. Copy deck

Put all of this in `src/content/site.ts`.

**Navigation:** Celebrations, Spaces, Kitchen, Chef, Visit. Header button: "Plan an event".

**Hero**
- Lockup: the मसाला Secrêts (accessible name: "The Masala Secrets")
- Line 1: Global kitchen and banquet in Kudasan, Gandhinagar
- Line 2 (italic): A space made for meaningful moments.
- Buttons: "Plan an event" (to #visit), "Call to reserve" (tel: phone 1)
- Small line: Pure vegetarian. Jain preparations on request.

**Story** (heading "Our story")
> It began with a simple idea. A place where the heritage of Indian cooking could sit at the same table as the flavours of the world.
>
> So our kitchen cooks a Lucknowi biryani and a Penang curry with the same care, and every plate mixes the familiar with something unexpected.
>
> The food is only half of it. The Masala Secrets is a place for long dinners, family celebrations and conversations that run late, under cherub lamps and a ceiling of flowers.

Three facts: "Pure vegetarian, with Jain preparations", "Rated 4.5 by our guests" (TODO_OWNER), "Ground floor, Siddhraj Z Square, Kudasan".

**Celebrations** (heading "Celebrate with us")
> Birthdays, anniversaries, ring ceremonies, family get-togethers and team dinners. We plan the menu, the seating and the small details with you, so you can be a guest at your own celebration.

Occasions:
- Birthdays: From first birthdays to milestone ones, with a menu the whole table will enjoy.
- Anniversaries: A quiet table for two or a dinner for the whole family.
- Engagement and ring ceremonies: An elegant room for two families to come together.
- Family get-togethers: Long tables, shared plates and room for every generation.
- Kitty parties: A long lunch with your group in a room everyone will want to photograph.
- Corporate lunches and dinners: Team dinners and client lunches with a set menu planned in advance.

Spaces (names and capacities are TODO_OWNER):
- "The Brick Hall": Long tables beneath brick arches and brass chandeliers, with mustard velvet banquettes along the wall. Suited to large family and corporate groups. "Seats up to XX guests".
- "The Curtain Room": A round table set before red velvet curtains, lit by a cherub lamp. Suited to smaller, more private celebrations. "Seats up to XX guests".

Feast line: Menus are planned with you for every celebration. Packages on request.

**How booking works** (heading "How booking works")
1. Send an enquiry. Tell us the date, the number of guests and the occasion. The form below sends it to us on WhatsApp.
2. Visit us. See the space and talk through the menu and seating with our team.
3. Finalise the details. Confirm the menu, the setup and the timings.
4. Celebrate. Arrive, sit down and enjoy it. We take care of the rest.

**Spaces gallery** (heading "Inside The Masala Secrets", intro "Every corner of the room has a story. Here are a few.")
- space-angel-fountain: A bronze angel stands over the fountain at the centre of the room.
- space-cherub-lamp: Cherubs carry the lamps above the tables.
- space-rose-painting: Oil paintings in carved frames hang on the brick walls.
- space-chandelier-ceiling: Wrought-iron chandeliers beneath a ceiling of white flowers.
- space-window-dining: Window tables framed by red velvet curtains.

**Kitchen** (heading "A global kitchen")
> Everything we cook is vegetarian, and Jain preparations are available on request. The menu moves between regional Indian classics, Asian favourites and continental comfort food.

Groups and dishes (names marked * are TODO_OWNER: confirm exact menu name):
- From India's regions: Lucknowi Biryani (Fragrant rice layered with vegetables and whole spices, finished with fried onions, cashews and fresh mint.) / Kashmiri Kofta Curry (Golden koftas in a creamy, gently spiced Kashmiri gravy.) / Goan Cashew Curry (Creamy and nutty, with the warm spices of the Goan coast.) / Dal Khichdi (Slow-cooked rice and lentils. Simple, warm and comforting.)
- From across Asia: Veggie Crystal Dumpling in Penang Curry (Translucent vegetable dumplings in a rich Malaysian Penang curry.) / Noodle Dumpling Soup (A warm, spiced broth with noodles and soft dumplings.) / Gochujang Bowl* (Paneer in a sweet and spicy Korean chilli glaze, with noodles, greens and crunchy cabbage.)
- Small plates and sips: Spring Roll Shots* (Crisp spring rolls served standing in shot glasses of spicy dip.) / Baked Pasta* (Creamy, cheesy and golden from the oven.) / Berry Mocktail* (Berries, citrus and fresh mint over ice.)
- Sweet endings: Blueberry Cheesecake (Smooth cheesecake under a glossy blueberry compote.) / Mango Cheesecake (Finished with pistachio and rose petals.) / Chocolate Caramel Dessert* (Layers of chocolate with a warm caramel sauce.)

Closing line: Our menu changes with the seasons. Ask us for the current menu or a celebration menu. Button: "Ask for the menu".

**Chef**
- Name: Chef Arpit. Role line: Head chef.
- Quote: The hands behind the flavours. The mind behind the menu.
- Bio (TODO_OWNER: replace with his real background): Chef Arpit leads the kitchen at The Masala Secrets. His menu moves from Lucknow and Kashmir to Goa and Penang, and every plate leaves the kitchen finished by hand.

**Reviews:** empty array. Link line: "Read what our guests say on Google" (TODO_OWNER: Google reviews link).

**Instagram:** Follow @the_masala_secrets for new dishes and evenings at TMS.

**Visit** (heading "Plan your visit", intro "Tell us about your celebration, or call to reserve a table.")
- Storefront caption: Look for the copper sign on the ground floor of Siddhraj Z Square.
- Form button: "Send enquiry on WhatsApp". Confirmation: "WhatsApp opened with your enquiry. Press send in WhatsApp to reach us."
- Call line: Prefer to talk? Call +91 90993 22446

**WhatsApp messages** (build in `src/lib/whatsapp.ts`):
```
Hello The Masala Secrets,
I would like to enquire about an event.

Name: {name}
Phone: {phone}
Occasion: {occasion}
Date: {date, formatted like 14 Nov 2026}
Guests: {guests}
Time: {Lunch or Dinner}
Message: {message, or "None"}
```
- Menu request: "Hello The Masala Secrets, could you please share your current menu?"
- Floating button: "Hello The Masala Secrets, I have a question."

**Footer:** Pure vegetarian. Jain preparations on request. Copyright line with the current year. Optional credit "Website by Arya Patel" behind a `showCredit` flag in site.ts (default true, TODO_OWNER: confirm the owner is happy with it).

**Meta**
- Title: The Masala Secrets | Global Kitchen and Banquet in Kudasan, Gandhinagar
- Description: Pure vegetarian global kitchen and banquet in Kudasan, Gandhinagar. Plan birthdays, anniversaries, ring ceremonies and corporate dinners at The Masala Secrets.

---

## 10. Working rules for every phase

1. Do only the current phase from PROMPTS.md.
2. When a decision is visual, open the relevant image in `public/images/` or `assets/refs/` and look at it before deciding.
3. At the end of every phase:
   - `npm run build` must pass with no type errors, and `npm run lint` must be clean.
   - Take Playwright screenshots at 390x844 (mobile) and 1440x900 (desktop) of the sections you changed, saved to `assets/review/screens/phase-N/`.
   - Look at your own screenshots, fix anything that looks broken or off-brand, and screenshot again.
   - Commit with the message `phase N: <short summary>`.
   - Reply to Arya with: what you built, anything you were unsure about, and a short list of what he should check in the browser.
4. Accessibility floor on everything: one h1 (the hero lockup), logical heading order, alt text, visible keyboard focus (2px copper-glow outline with offset), keyboard-usable menu, gallery and form, WCAG AA contrast using the pairs above, reduced motion respected.
5. Keep components small and readable. One section per file in `src/components/sections/`.

---

## 11. Implementation notes (decisions made while building)

- **Photos are half size.** The 31 screenshots arrived through WhatsApp at 590 x 1280 instead of 1189 x 2576. The crop boxes are proportional, so the originals can be dropped into `assets/raw/` with the same names and `python scripts/crop_assets.py` re-run. `1000133652.jpg` (a red curtain dining room with the word "Inside") is not in the asset map and is unused.
- **Hero sequence runs in CSS**, not motion. An inline script in `<head>` (`src/lib/intro.ts`) sets `html[data-intro="play"]` before first paint, and keyframes in `globals.css` do the rest. It starts on first paint instead of waiting for JavaScript. motion is used for the mobile menu and the floating WhatsApp button, through `LazyMotion` to keep the bundle small.
- **Mark geometry:** the reference has 20 spikes, not 24. The paths live in `src/components/brand/mark-paths.ts`, shared by `Mark.tsx` and the Open Graph image. `node scripts/make-icons.mjs` rebuilds the app icons from `public/brand/tms-mark.svg`.
- **Lockup circumflex:** Cormorant's own ê has a tall, sharp accent, so `Lockup.tsx` draws a small soft one over a plain "e".
- **Chef photos swapped:** the hat portrait only exists as a landscape crop (the original post has lettering across his chest), so `chef-arpit-at-work` fills the tall frame and the portrait overlaps it on desktop.
- **Gallery height** is 290px, the native height of the chandelier photo, so no photo is shown larger than its source. Raise it when the originals arrive.
- **Space capacities** stay hidden until `capacity` is set in `site.ts`, so "XX guests" never shows on the live site.
- **The enquiry form sits on a parchment panel** so velvet red errors and focus rings meet contrast (velvet red on night-walnut is only 2.2:1).
- **Devanagari font** is a 4 KB subset with only the letters of मसाला (`assets/fonts/tiro-devanagari-400.woff`). If the lockup text changes, download a new subset (see the comment in `layout.tsx`).
- **Review screenshots:** `node scripts/shoot.mjs <folder> <path> [options]` against a running server (`npx next start -p 3100`). In Git Bash, set `MSYS_NO_PATHCONV=1` so `/` paths are not rewritten.

---

## 12. Next.js version notes

@AGENTS.md
