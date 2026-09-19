export default function SectionHeading({
  eyebrow,
  title,
  align = "left"
}: {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl leading-tight text-charcoal sm:text-4xl">{title}</h2>
    </div>
  );
}
