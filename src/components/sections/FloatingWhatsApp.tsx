"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { whatsappMessages } from "@/content/site";
import { track } from "@/lib/track";
import { greetingLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./EnquiryForm";

// Mobile only. Appears once the hero has scrolled away and hides while the
// Visit section (with the enquiry form) is on screen, so it never covers a field.
export function FloatingWhatsApp() {
  const [pastHero, setPastHero] = useState(false);
  const [atVisit, setAtVisit] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const visit = document.getElementById("visit");
    const footer = document.querySelector("footer");
    if (!hero || !visit) return;

    const heroObserver = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting));
    heroObserver.observe(hero);

    // Visit counts as on screen once it reaches the lower fifth of the viewport,
    // which is still above where its form fields begin.
    const seen = new Map<Element, boolean>();
    const visitObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target, entry.isIntersecting);
        setAtVisit([...seen.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    visitObserver.observe(visit);
    if (footer) visitObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      visitObserver.disconnect();
    };
  }, []);

  const show = pastHero && !atVisit;

  return (
    <AnimatePresence>
      {show ? (
        <motion.a
          key="whatsapp"
          href={greetingLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsappMessages.floatingLabel}
          onClick={() => track("whatsapp_float_click")}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
          className="fixed right-4 bottom-[max(1rem,calc(env(safe-area-inset-bottom)+0.75rem))] z-40 inline-flex size-14 items-center justify-center rounded-full bg-copper-glow text-night-walnut shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] lg:hidden"
        >
          <WhatsAppIcon className="size-7" />
        </motion.a>
      ) : null}
    </AnimatePresence>
  );
}
