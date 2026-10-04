import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import localFont from "next/font/local";
import { business, meta, siteUrl } from "@/content/site";
import { introScript } from "@/lib/intro";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

// Tiro Devanagari Hindi, subset to the letters of मसाला (the only Devanagari on the site).
// 4 KB instead of about 64 KB. If the lockup text ever changes, download a new subset:
// https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi&text=<letters>
const tiro = localFont({
  src: "../../assets/fonts/tiro-devanagari-400.woff",
  weight: "400",
  variable: "--font-tiro",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: meta.title,
  description: meta.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title: meta.title,
    description: meta.description,
    locale: meta.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
  // phone numbers are already links; stop iOS from restyling them
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1a120e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${cormorant.variable} ${jost.variable} ${tiro.variable}`}
      // the intro script sets data-intro before hydration
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
