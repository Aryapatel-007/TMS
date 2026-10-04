export type TrackEvent =
  | "enquiry_submit"
  | "menu_request"
  | "call_click"
  | "directions_click"
  | "whatsapp_float_click";

/**
 * Analytics hook. Empty on purpose: connect an analytics tool here later
 * (for example Vercel Analytics or Google Analytics) without touching the components.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function track(event: TrackEvent, data?: Record<string, unknown>): void {}
