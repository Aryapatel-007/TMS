import clsx from "clsx";
import Image from "next/image";
import type { SiteImage } from "@/content/site";

type ArchFrameProps = {
  image: SiteImage;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Override the frame shape, for example "3 / 4". Defaults to the photo's own ratio. */
  aspect?: string;
  /** Cap the frame at the photo's native width so it is never shown blown up. */
  capWidth?: boolean;
  loading?: "lazy" | "eager";
};

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
  return (
    <div
      className={clsx("arch relative w-full overflow-hidden bg-night-deep", className)}
      style={{
        aspectRatio: aspect ?? `${image.width} / ${image.height}`,
        maxWidth: capWidth ? image.width : undefined,
      }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        loading={loading}
        className={clsx("object-cover", imageClassName)}
      />
      <span
        aria-hidden="true"
        className="arch pointer-events-none absolute inset-2 border border-copper/80 sm:inset-2.5"
      />
    </div>
  );
}
