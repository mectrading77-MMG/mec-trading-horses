export default function SectionHeading({
  eyebrow,
  title,
  align = "left",
  onDark = false
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  onDark?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={`mt-3 font-display text-3xl italic leading-tight sm:text-4xl ${onDark ? "text-ivory" : "text-charcoal"}`}>{title}</h2>
    </div>
  );
}
