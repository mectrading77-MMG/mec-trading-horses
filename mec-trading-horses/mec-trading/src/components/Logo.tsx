import Image from "next/image";

/**
 * Brand lockup. `compact` drops the "Sport Horses" line (for the header);
 * `onDark` switches to the ivory/gold artwork for charcoal backgrounds.
 * Source files live in public/brand/ (transparent PNGs cut from the master logo).
 */
export default function Logo({
  variant = "full",
  onDark = false,
  className = "",
  priority = false
}: {
  variant?: "full" | "compact";
  onDark?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const src = `/brand/logo-${variant}${onDark ? "-light" : ""}.png`;
  const dims = variant === "compact" ? { width: 807, height: 647 } : { width: 807, height: 711 };
  return (
    <Image
      src={src}
      alt="MEC Trading — Sport Horses"
      width={dims.width}
      height={dims.height}
      priority={priority}
      className={`h-auto w-auto select-none ${className}`}
    />
  );
}
