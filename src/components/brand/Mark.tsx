import {
  MARK_DOT_RADIUS,
  MARK_FLOWER,
  MARK_INNER_TRIANGLES,
  MARK_OUTER_TRIANGLE_STROKE,
  MARK_OUTER_TRIANGLES,
  MARK_VIEWBOX,
  MARK_ZIGZAG,
  MARK_ZIGZAG_STROKE,
} from "./mark-paths";

// The TMS mandala mark. Uses currentColor, so set the colour with a text colour class.
// If the owner supplies the original logo, replace mark-paths.ts and public/brand/tms-mark.svg.

type MarkProps = {
  className?: string;
  /** Accessible name. Leave empty when the mark is decorative. */
  title?: string;
};

export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      fill="currentColor"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <circle cx="150" cy="150" r={MARK_DOT_RADIUS} />
      <path fillRule="evenodd" d={MARK_FLOWER} />
      <path
        d={MARK_ZIGZAG}
        fill="none"
        stroke="currentColor"
        strokeWidth={MARK_ZIGZAG_STROKE}
        strokeMiterlimit={10}
      />
      <path d={MARK_INNER_TRIANGLES} />
      <path
        d={MARK_OUTER_TRIANGLES}
        fill="none"
        stroke="currentColor"
        strokeWidth={MARK_OUTER_TRIANGLE_STROKE}
        strokeLinejoin="round"
      />
    </svg>
  );
}
