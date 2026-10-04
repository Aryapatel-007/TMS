import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// One page. /styleguide is a working page and stays out of the sitemap.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
