import clsx from "clsx";
import Image from "next/image";
import type { CSSProperties } from "react";
import type { SiteImage } from "@/content/site";

type ArchFrameProps = {
  image: SiteImage;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Override the frame shape, for example "4 / 5". Defaults to the photo's own ratio. */
  aspect?: string;
  /** Cap the frame at the photo's native width so it is never shown blown up. */
  capWidth?: boolean;
  loading?: "lazy" | "eager";
};

// A round arch on wide frames would swallow the whole frame, so wide photos get
// a lower, elliptical arch instead, like the flatter brick arches in the room.
function archRadius(ratio: number): CSSProperties["borderRadius"] {
  return ratio > 1.4 ? "50% 50% 0 0 / 70% 70% 0 0" : undefined;
}

function parseAspect(aspect: string | undefined, image: SiteImage) {
  if (!aspect) return image.width / image.height;
  const [w, h] = aspect.split("/").map((n) => Number(n.trim()));
  return w / (h || 1);
}

// Interior photos sit in arch-topped frames with a thin copper inner line,
// echoing the brick arches of the room. Food photos never use this frame.
export function ArchFrame({
  image,
  sizes,
  className,
  imageClassName,
  aspect,
  capWidth = true,
  loading,
}: ArchFrameProps) {
  const radius = archRadius(parseAspect(aspect, image));
  return (
    <div
      className={clsx("relative w-full overflow-hidden bg-night-deep", !radius && "arch", className)}
      style={{
        aspectRatio: aspect ?? `${image.width} / ${image.height}`,
        maxWidth: capWidth ? image.width : undefined,
        borderRadius: radius,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={loading}
        draggable={false}
        className={clsx("object-cover", imageClassName)}
      />
      <span
        aria-hidden="true"
        className={clsx(
          "pointer-events-none absolute inset-2 border border-copper/80 sm:inset-2.5",
          !radius && "arch",
        )}
        style={{ borderRadius: radius }}
      />
    </div>
  );
}
