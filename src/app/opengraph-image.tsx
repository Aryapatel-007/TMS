import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  MARK_DOT_RADIUS,
  MARK_FLOWER,
  MARK_INNER_TRIANGLES,
  MARK_OUTER_TRIANGLE_STROKE,
  MARK_OUTER_TRIANGLES,
  MARK_VIEWBOX,
  MARK_ZIGZAG,
  MARK_ZIGZAG_STROKE,
} from "@/components/brand/mark-paths";
import { hero, meta } from "@/content/site";

export const alt = `${hero.lockupName}, ${meta.ogPlace}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Subset fonts with only the letters drawn below (assets/fonts).
const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));
const [cormorant, cormorantItalic, tiro, jost] = await Promise.all([
  font("cormorant-500.woff"),
  font("cormorant-italic-500.woff"),
  font("tiro-devanagari-400.woff"),
  font("jost-400.woff"),
]);

const WALNUT = "#1A120E";
const CREAM = "#EFE2D3";
const COPPER = "#C99572";
const SMOKE = "#B8A493";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: WALNUT,
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 50% 52%, rgba(201,149,114,0.18), rgba(26,18,14,0) 70%)",
          color: CREAM,
        }}
      >
        <svg width="132" height="132" viewBox={MARK_VIEWBOX} fill={COPPER}>
          <circle cx="150" cy="150" r={MARK_DOT_RADIUS} />
          <path fillRule="evenodd" d={MARK_FLOWER} />
          <path d={MARK_ZIGZAG} fill="none" stroke={COPPER} strokeWidth={MARK_ZIGZAG_STROKE} strokeMiterlimit={10} />
          <path d={MARK_INNER_TRIANGLES} />
          <path
            d={MARK_OUTER_TRIANGLES}
            fill="none"
            stroke={COPPER}
            strokeWidth={MARK_OUTER_TRIANGLE_STROKE}
            strokeLinejoin="round"
          />
        </svg>

        <div style={{ display: "flex", alignItems: "flex-end", marginTop: 44, lineHeight: 1 }}>
          <span style={{ fontFamily: "Cormorant", fontSize: 34, marginRight: 14, marginBottom: 76 }}>the</span>
          <span style={{ fontFamily: "Tiro", fontSize: 112, marginRight: 30 }}>मसाला</span>
          <div style={{ display: "flex", position: "relative", fontFamily: "Cormorant Italic", fontSize: 124 }}>
            <span>Secr</span>
            <span style={{ display: "flex", position: "relative" }}>
              e
              <svg
                width="30"
                height="15"
                viewBox="0 0 20 11"
                style={{ position: "absolute", left: 16, top: 26 }}
                fill="none"
                stroke={CREAM}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2.5 9 10 2.5 17.5 9" />
              </svg>
            </span>
            <span>ts</span>
          </div>
        </div>

        <div style={{ marginTop: 40, fontFamily: "Jost", fontSize: 34, color: SMOKE, letterSpacing: 0.5 }}>
          {meta.ogPlace}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: cormorant, style: "normal", weight: 500 },
        { name: "Cormorant Italic", data: cormorantItalic, style: "normal", weight: 500 },
        { name: "Tiro", data: tiro, style: "normal", weight: 400 },
        { name: "Jost", data: jost, style: "normal", weight: 400 },
      ],
    },
  );
}
