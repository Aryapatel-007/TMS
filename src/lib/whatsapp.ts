import { business, whatsappMessages as m } from "@/content/site";

export type Enquiry = {
  name: string;
  phone: string;
  occasion: string;
  /** ISO date from the date input, for example 2026-11-14 */
  date: string;
  guests: string | number;
  time: "Lunch" | "Dinner" | string;
  message?: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** 2026-11-14 becomes 14 Nov 2026. Parsed by hand so the time zone never shifts the day. */
export function formatEnquiryDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return iso;
  const [, year, month, day] = match;
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

export function whatsappLink(message: string, number: string = business.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildEnquiryMessage(e: Enquiry): string {
  const message = e.message?.trim() ? e.message.trim() : m.noMessage;
  return [
    m.enquiryGreeting,
    m.enquiryIntro,
    "",
    `Name: ${e.name.trim()}`,
    `Phone: ${e.phone.trim()}`,
    `Occasion: ${e.occasion}`,
    `Date: ${formatEnquiryDate(e.date)}`,
    `Guests: ${e.guests}`,
    `Time: ${e.time}`,
    `Message: ${message}`,
  ].join("\n");
}

export const enquiryLink = (e: Enquiry) => whatsappLink(buildEnquiryMessage(e));
export const menuRequestLink = () => whatsappLink(m.menuRequest);
export const greetingLink = () => whatsappLink(m.floating);
