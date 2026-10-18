import Image from "next/image";

/** MEC HORSES master mark, used consistently across light and dark surfaces. */
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
      src="/brand/mec-horses.svg"
      alt="MEC HORSES"
      width={variant === "compact" ? 260 : 320}
      height={variant === "compact" ? 165 : 203}
      priority={priority}
      className={`h-auto w-auto select-none ${onDark ? "brightness-110" : ""} ${className}`}
    />
  );
}
