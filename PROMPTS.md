# TMS website: build plan and Claude Code prompts

## How to set up the folder (do this once)

1. Create an empty folder called `tms-website`.
2. Put `CLAUDE.md` and `PROMPTS.md` in the root of that folder.
3. Create a folder `scripts/` and put `crop_assets.py` inside it.
4. Create a folder `assets/raw/` and copy all 31 screenshots into it. Do not rename them.
5. Open the folder in VS Code and start Claude Code in the terminal.
6. Claude Code reads `CLAUDE.md` automatically. It holds the brand, colours, fonts, copy and photo map, so the prompts below can stay short.

The folder should look like this before Prompt 1:

```
tms-website/
  CLAUDE.md
  PROMPTS.md
  scripts/crop_assets.py
  assets/raw/1000133636.jpg ... (31 files)
```

## How to run the phases

- Paste one prompt at a time, in order.
- Wait until Claude Code finishes and tells you what to check.
- Check it in the browser with `npm run dev` (open http://localhost:3000).
- If something is wrong, use the "Fix something" prompt at the bottom before moving on.
- If a session gets long, type `/clear` before the next phase. CLAUDE.md keeps every new session on track.

## Phase overview

| Phase | What gets built | What you check |
|---|---|---|
| 1 | Next.js project, clean cropped photos | `assets/review/contact-sheet.jpg` has no Instagram buttons or text left |
| 2 | Logo, colours, fonts, buttons, all copy in one file, a style guide page | `/styleguide`: does the logo and the name lockup look right |
| 3 | Header, hero light beam, story section, footer | The opening animation on phone and laptop |
| 4 | Banquet section, booking steps, spaces gallery | The banquet section reads clearly, gallery swipes smoothly |
| 5 | Signature dishes, chef, reviews hook, Instagram strip | Dish names and photos match |
| 6 | Visit section, enquiry form, WhatsApp, map | Fill the form on your phone, WhatsApp opens with the message |
| 7 | Responsive fixes, accessibility, speed, SEO, owner checklist | Lighthouse scores, `OWNER_CHECKLIST.md` |
| 8 | GitHub and Vercel deployment | The live link works on your phone |

---

## Prompt 1: setup and photos

```
Read CLAUDE.md fully before doing anything.

Phase 1: project setup and photo processing.

1. Initialise git in this folder if it is not already a repo.
2. Scaffold a Next.js app in this folder with the latest create-next-app: TypeScript, App Router, src directory, Tailwind CSS, ESLint, npm, import alias @/*. The folder already has CLAUDE.md, PROMPTS.md, scripts/ and assets/. If create-next-app refuses a non-empty folder, scaffold into a temporary folder, then move everything into the root without touching my existing files.
3. Install motion and clsx. Install Playwright as a dev dependency and download Chromium only.
4. Make sure Python 3 and Pillow are available (pip install pillow if needed). Run: python scripts/crop_assets.py
5. Open every image in public/images/ and assets/refs/ and look at it. For each one, confirm it matches its description in the Asset map in CLAUDE.md, and that no phone or Instagram interface is left: status bar, header, buttons, captions, like counts, video timers, toolbars, stickers or preview thumbnails. If a crop is wrong, change only that entry's box in scripts/crop_assets.py and run the script again.
6. Open assets/review/contact-sheet.jpg and check the whole set together.
7. Remove the default starter content from src/app/page.tsx and globals.css so the page is blank, and delete the unused starter files in public/.
8. Add assets/review/screens/ to .gitignore.
9. Run npm run build and make sure it passes. Commit as "phase 1: setup and processed photos".

Then stop. Tell me which crops you changed and why, and ask me to open assets/review/contact-sheet.jpg and confirm the photos look clean before we continue.
```

---

## Prompt 2: brand foundation

```
Phase 2: brand foundation. Re-read sections 5, 6, 7 and 9 of CLAUDE.md first.

1. Logo mark: recreate the TMS mandala as a clean SVG at public/brand/tms-mark.svg and as a React component src/components/brand/Mark.tsx that uses currentColor. Follow the geometry in CLAUDE.md section 7, using assets/refs/ref-logo-copper-on-black.png and assets/refs/ref-logo-storefront.png as references. Render your SVG to a PNG with Playwright, view it next to the references, and refine it up to three times until the proportions, spike count and petal shapes match closely.
2. Logo.tsx: the mark above a lowercase "tms" wordmark in Cormorant Garamond 500 (stacked variant), plus a horizontal variant for the header.
3. Lockup.tsx: "the मसाला Secrêts" as live text, matching assets/refs/ref-menu-cover-lockup.png. "the" small and raised before मसाला, मसाला in Tiro Devanagari Hindi, Secrêts in Cormorant Garamond italic 500. Size variants: hero, large, small. Give it an accessible name of "The Masala Secrets". Check the Devanagari and Latin parts sit on a pleasing shared baseline at every size.
4. Icons: app/icon.svg (copper mark on night-walnut) and app/apple-icon.png (180x180).
5. Design tokens: every palette colour from CLAUDE.md as CSS variables and Tailwind theme colours, the type scale, the section spacing, and the focus ring style.
6. Fonts with next/font/google: Cormorant Garamond (400, 500, 600, normal and italic), Jost (300, 400, 500), Tiro Devanagari Hindi (400, devanagari subset). Expose them as CSS variables and Tailwind font families.
7. Base components in src/components/ui/:
   - Button: primary (copper-glow fill, night-walnut text) and secondary (transparent, copper hairline border, cream text). Clear hover, active and focus states. Works as a link or a button. No arrows in labels.
   - StarDivider: thin copper line, small four-point star, thin copper line.
   - ArchFrame: wraps next/image in an arch-topped frame with a thin copper inner line, keeps the image's aspect ratio.
   - Section: takes theme "night", "parchment" or "navy", handles background, text colours, vertical spacing and max width.
8. Parchment texture: a very subtle paper grain (tiny inline SVG noise, or a tiled PNG under 20 KB) applied only to parchment sections at low opacity.
9. Content: create src/content/site.ts with every item from the copy deck and business facts in CLAUDE.md, as typed exports. Add a TODO_OWNER comment on every unconfirmed item. Create src/lib/whatsapp.ts with functions that build the three WhatsApp messages and return wa.me links, and src/lib/track.ts with an empty track(event, data) function.
10. Build a temporary page at /styleguide with noindex: palette swatches with hex values and token names, the type scale, the lockup at every size, both logo variants, both buttons, the star divider, an ArchFrame with a real photo, and a parchment block.
11. Screenshot /styleguide at 390 and 1440 widths into assets/review/screens/phase-2/, look at the screenshots, fix what looks off, build, lint, commit "phase 2: brand foundation".

Then stop and ask me to check /styleguide, especially the logo mark and the lockup.
```

---

## Prompt 3: header, hero, story, footer

```
Phase 3: header, hero, story and footer. All copy comes from src/content/site.ts.

Header (src/components/sections/Header.tsx):
- Slim and sticky. Left: horizontal logo linking to the top. Right on desktop: nav links (Celebrations, Spaces, Kitchen, Chef, Visit) and a primary "Plan an event" button linking to #visit.
- Transparent over the hero. After 80px of scroll it gets a night-walnut background and a copper hairline bottom border.
- Mobile: logo and a menu button. The menu opens a full-screen night-deep panel with large Cormorant links, the phone number and the Instagram link. Animate the open and close, lock page scroll while open, close on Escape and on link click, and keep keyboard focus inside the panel.

Hero (the one memorable moment of the site):
- Height 100svh. Background public/images/hero-angel-hall.webp with object-cover, under a dark overlay (night-walnut around 72% at the bottom fading to 45% at the top) and a soft vignette so text always reads.
- Centred content: the Lockup at hero size, then line 1 in Jost, then line 2 in italic Cormorant, then "Plan an event" (primary, #visit) and "Call to reserve" (secondary, tel link to phone 1). The small "Pure vegetarian. Jain preparations on request." line sits near the bottom of the hero.
- Opening sequence, about 2.4 seconds, plays once per browser session (sessionStorage):
  a. The hero starts in darkness.
  b. A warm diagonal beam of light (a soft, blurred band of copper-glow and candle-cream at low opacity, like the light across the menu cover in public/images/menu-cover-lockup.webp) sweeps across and settles over the lockup, revealing it as it passes.
  c. The background photo fades up from darkness to its final overlay level.
  d. Line 1, line 2 and the buttons appear together.
  Use motion. With prefers-reduced-motion, or when the sequence already played this session, show the final state immediately.
- The hero image must not hurt loading speed: render it with priority from the first paint under an opacity layer, never load it late.

Story section (parchment, id="story"):
- Centred heading "Our story". Body paragraphs left-aligned, max 60ch, ink-terracotta heading and ink-espresso text.
- The three facts as a quiet row of plain sentences (no big numbers, no icons in circles).
- At the bottom, public/images/story-street-illustration.webp across the content width, with mix-blend-mode multiply so its white paper melts into the parchment.

Footer (night):
- Stacked logo, the small lockup, address, both phones, hours, Instagram link and the nav links.
- One oversized, very faint mandala watermark (copper at about 4% opacity) cropped by the edge of the footer.
- Bottom line: copyright with the current year, and "Website by Arya Patel" when showCredit is true.

Assemble src/app/page.tsx with these sections, StarDivider where two night sections meet, and empty anchors for celebrations, spaces, kitchen, chef and visit so the nav links already work.

Screenshot at 390x844 and 1440x900 into assets/review/screens/phase-3/, including one frame mid-animation and one of the final hero state. Look at them, fix issues, build, lint, commit "phase 3: header, hero, story, footer". Tell me what to check.
```

---

## Prompt 4: banquet, booking steps, spaces gallery

```
Phase 4: celebrations (banquet), how booking works, and the spaces gallery. All copy from site.ts.

Celebrations (night, id="celebrations"):
- Centred heading "Celebrate with us" and the intro paragraph.
- Occasions as a typeset list, not cards: two columns on desktop, one on mobile. Each occasion name in Cormorant around 1.5rem with its one-line description in Jost underneath, separated by thin copper hairlines.
- The two spaces as alternating rows: image in an ArchFrame on one side, text on the other, reversed on the second row. Stack on mobile with the image first.
  1. space-brick-arch-long-tables.webp with The Brick Hall text and capacity line.
  2. space-private-curtain-table.webp with The Curtain Room text and capacity line.
- Feast strip: feast-see-you-at-the-table.webp and dish-spring-roll-shots.webp side by side (stacked on mobile), the feast line underneath, and a primary "Plan an event" button to #visit.

How booking works (parchment, id="booking"):
- These steps are a real sequence, so numbers are allowed here. Four steps from site.ts: a numeral in Cormorant, a short title, one sentence. Horizontal on desktop joined by a thin copper line with small four-point stars, vertical on mobile.

Spaces gallery (night, id="spaces"):
- Centred heading "Inside The Masala Secrets" and the one-line intro.
- Horizontal gallery of ArchFrame images, all the same height, each with its italic Cormorant caption underneath: space-angel-fountain, space-cherub-lamp, space-rose-painting, space-chandelier-ceiling, space-window-dining. Show space-window-dining no larger than its native size.
- Scroll snap. Swipe on mobile, mouse drag on desktop, plus previous and next buttons that work with the keyboard. A thin copper progress line shows how far along the gallery you are.
- Gallery image hover: scale up to 1.03 at most, and only on devices that support hover.

Screenshot both sizes into assets/review/screens/phase-4/, review, fix, build, lint, commit "phase 4: celebrations, booking, spaces". Tell me what to check.
```

---

## Prompt 5: kitchen, chef, reviews, Instagram

```
Phase 5: the kitchen, the chef, reviews and Instagram. All copy from site.ts.

Kitchen (parchment, id="kitchen"):
- Centred heading "A global kitchen" and the intro paragraph.
- Lay it out like a printed menu, not a card grid. Four groups, each with its group title in Cormorant: From India's regions, From across Asia, Small plates and sips, Sweet endings.
- In each group, the first dish gets a large photo and the rest get smaller photos. Alternate which side the large photo sits on from group to group. On mobile, one column with the large photo first.
- Each dish: name in Cormorant around 1.375rem in ink-terracotta, one-line description in Jost in ink-espresso. No prices.
- Biryani, kofta curry and Goan cashew curry photos are circles. All other dish photos are rectangles with a 2px radius.
- Image for each dish: Lucknowi Biryani dish-lucknowi-biryani, Kashmiri Kofta Curry dish-kashmiri-kofta-curry, Goan Cashew Curry dish-goan-cashew-curry, Dal Khichdi dish-dal-khichdi, Veggie Crystal Dumpling in Penang Curry dish-crystal-dumpling-penang, Noodle Dumpling Soup dish-noodle-dumpling-soup, Gochujang Bowl dish-gochujang-bowl, Spring Roll Shots dish-spring-roll-shots, Baked Pasta dish-baked-pasta, Berry Mocktail drink-berry-mocktail, Blueberry Cheesecake dessert-blueberry-cheesecake, Mango Cheesecake dessert-mango-cheesecake, Chocolate Caramel Dessert dessert-chocolate-caramel.
- End with the closing line and a secondary "Ask for the menu" button that opens the WhatsApp menu request message in a new tab and calls track("menu_request").

Chef (velvet-navy, id="chef"):
- Desktop: two columns, the photo left and text right. Mobile: photo first.
- chef-arpit-portrait in a tall rectangular frame with a copper hairline. On desktop only, chef-arpit-at-work as a smaller image overlapping the lower corner of the first.
- Text: "Chef Arpit" large in Cormorant, "Head chef" in Jost underneath, the quote in italic Cormorant, then the bio.

Reviews (night):
- Renders only when site.reviews has items: italic Cormorant quote, guest name, source. Keep the array empty, with a TODO_OWNER comment showing the expected shape.
- Always show one quiet line linking to Google reviews (link from site.ts).

Instagram (night):
- The Instagram line linking to the profile.
- Six square tiles (object-fit cover): drink-berry-mocktail, dish-tomato-noodle-soup, dish-paneer-handi, dish-dal-khichdi, dessert-chocolate-caramel, space-cherub-lamp. Three columns on mobile, six on desktop. Each opens the Instagram profile in a new tab with rel="noopener noreferrer".

Screenshot both sizes into assets/review/screens/phase-5/, review, fix, build, lint, commit "phase 5: kitchen, chef, reviews, instagram". Tell me what to check.
```

---

## Prompt 6: visit section and enquiry form

```
Phase 6: visit us and the enquiry form. This form is the most important part of the site.

Visit (night, id="visit"):
- Centred heading "Plan your visit" and the intro line.
- Desktop: form on the left, details in the middle, storefront and map on the right (or form left and details plus map right if three columns feel cramped). Mobile order: form, details, storefront and map.

Enquiry form:
- Fields: name (required), phone (required, 10-digit Indian mobile, optional +91 or 0 prefix), occasion (select: the occasions from site.ts plus "Table reservation" and "Other"), date (no past dates), guests (number, minimum 1; TODO_OWNER maximum), time (Lunch or Dinner), message (optional).
- Labels always visible above fields. Never rely on placeholder text as a label.
- Validate on submit and on blur. Errors in plain language next to the field, for example "Enter a 10 digit mobile number.", announced with aria-live. Use velvet-red for error and focus accents, still meeting contrast.
- Submit button: "Send enquiry on WhatsApp". On submit: build the enquiry message with src/lib/whatsapp.ts, open the wa.me link in a new tab, call track("enquiry_submit"), and replace the form with the confirmation text plus a link to open WhatsApp again and a "Send another enquiry" button.
- Below the button: "Prefer to talk? Call +91 90993 22446" as a tel link that calls track("call_click").

Details column:
- Address with the landmark, both phones as tel links, hours, facilities in one plain sentence, the Instagram link, and a secondary "Get directions" button opening the directions link in a new tab (track("directions_click")).

Storefront and map:
- exterior-storefront.webp in an ArchFrame with its caption.
- Google Maps embed iframe for the coordinates: loading="lazy", a descriptive title, copper hairline border, and a gentle CSS filter so it does not glare against the dark page.

Floating WhatsApp button (mobile only):
- Bottom right, copper-glow circle with an inline WhatsApp icon SVG and aria-label "Chat on WhatsApp".
- Appears once the hero has scrolled out of view, hides while the Visit section is on screen. Opens the short greeting message (track("whatsapp_float_click")).
- Respect the safe area on iPhones and never cover form fields.

Screenshot both sizes into assets/review/screens/phase-6/, including the form with errors and the confirmation state. Review, fix, build, lint, commit "phase 6: visit and enquiry". Tell me how to test the form on my phone.
```

---

## Prompt 7: quality, SEO and self-review

```
Phase 7: quality pass.

1. Responsive: take full-page screenshots at 360, 390, 768, 1024, 1440 and 1920 widths into assets/review/screens/phase-7/. Look at every one. Fix horizontal overflow, awkward line breaks (especially the lockup and headings), spacing jumps, and any image shown larger than its native width.
2. Accessibility: one h1 (the hero lockup, accessible name "The Masala Secrets"), logical heading order, alt text on every image, visible focus on every interactive element, keyboard-test the mobile menu, the gallery and the form, check contrast against the pairs in CLAUDE.md, and confirm reduced motion works everywhere.
3. Performance: run a production build and a Lighthouse mobile audit (npx lighthouse against npm run start). Targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100. Fix the biggest issues first: image sizes and sizes attributes, font loading, unused JavaScript, layout shift.
4. SEO:
   - Metadata in app/layout.tsx using the title and description from CLAUDE.md, canonical URL from the domain in site.ts, Open Graph and Twitter card tags, lang="en-IN".
   - app/opengraph-image.tsx with next/og, 1200x630: night-walnut background, copper mandala mark, the lockup, and "Kudasan, Gandhinagar".
   - JSON-LD for schema.org Restaurant: name, image, url, telephone, address, geo, openingHoursSpecification, servesCuisine (Indian, Asian, Continental, Vegetarian), priceRange "₹₹₹", acceptsReservations true, sameAs Instagram.
   - app/sitemap.ts and app/robots.ts. Ask me whether to delete /styleguide now; if it stays, keep it noindex and out of the sitemap.
5. Design self-review: look at the desktop and mobile full-page screenshots as a strict design lead and check them against CLAUDE.md section 6. Look for anything that reads like a generic template: identical cards, all-caps labels, fade-up on every section, arrows in buttons, stray gradients, too many decorations. The hero beam should be the single memorable moment. Remove at least one decorative element that does not earn its place, and list what you changed and why.
6. Copy check: search the whole codebase for em dashes, en dashes, "Masala Stories", "lorem", and the banned words in CLAUDE.md section 5, and fix every hit in user-facing text.
7. Create OWNER_CHECKLIST.md in the root: every TODO_OWNER item grouped under Contact, Hours, Banquet spaces, Menu names, Chef, Reviews, Domain and Credit, each written as a simple question I can send to the owner on WhatsApp.

Build, lint, commit "phase 7: quality, seo, review", and give me a summary with the Lighthouse scores.
```

---

## Prompt 8: deploy

```
Phase 8: deploy to Vercel.

1. Check .gitignore excludes node_modules, .next, assets/review/screens and any .env files.
2. Help me create a private GitHub repository called tms-website and push this repo. If you cannot do it yourself, give me the exact commands to run, one per line.
3. Deploy to Vercel. If the Vercel CLI is available and I am logged in, use npx vercel with default Next.js settings. Otherwise give me simple steps to import the GitHub repo on vercel.com.
4. After the deploy, open the production URL with Playwright, take mobile and desktop screenshots, and check: all images and fonts load, the hero animation plays, the enquiry form builds the correct wa.me link, the map loads, and the browser console has no errors.
5. Give me the live URL, and short steps for connecting a custom domain later (Vercel project settings, Domains, add the domain, then the DNS records to add at the domain registrar).
```

---

## Extra prompts

### Fix something

```
Read CLAUDE.md first. Something needs fixing.

Section: [name of the section]
Screen size: [mobile / desktop / both]
What is wrong: [describe it, and attach a screenshot if you can]
What I want instead: [describe it]

Fix only this. Take before and after screenshots into assets/review/screens/fixes/, compare them, build, lint, and commit "fix: [short description]".
```

### Owner sent the missing details

```
The owner answered OWNER_CHECKLIST.md. Here are the answers:

[paste the answers]

Update src/content/site.ts and CLAUDE.md with these, remove the matching TODO_OWNER comments, and update OWNER_CHECKLIST.md to show only what is still open. Screenshot the sections that changed, build, lint, commit "content: owner details".
```

### Owner sent the original logo or new photos

```
The owner sent new files. I put them in assets/owner/.

[describe what each file is, for example: logo.svg is the official logo, banquet-hall-1.jpg is the main banquet hall]

For a logo: replace public/brand/tms-mark.svg and Mark.tsx with the official version, keeping currentColor support, and regenerate the icons and Open Graph image.
For photos: optimise them to webp in public/images/ with clear names, add them to the Asset map in CLAUDE.md, and use them where they are stronger than the current screenshot crops. Tell me which images you replaced.

Screenshot, build, lint, commit "assets: owner files".
```
