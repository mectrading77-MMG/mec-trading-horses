import Image from "next/image";

/** Uses the original uploaded MEC HORSES logo asset. */
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
  return (
    <Image
      src="/brand/mec-horses.png.png"
      alt="MEC HORSES"
      width={variant === "compact" ? 520 : 700}
      height={variant === "compact" ? 341 : 459}
      priority={priority}
      className={`h-auto w-auto select-none object-contain ${onDark ? "" : ""} ${className}`}
    />
  );
}
