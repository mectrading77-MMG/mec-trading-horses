import { whatsappLink } from "@/lib/whatsapp";

export default function WhatsAppButton({
  horseName,
  label,
  variant = "solid"
}: {
  horseName?: string;
  label: string;
  variant?: "solid" | "outline";
}) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-[11px] uppercase tracking-eyebrow transition-colors duration-400";
  const styles =
    variant === "solid"
      ? "bg-hunter text-ivory hover:bg-hunter-soft"
      : "border border-ivory text-ivory hover:border-gold hover:text-gold";

  return (
    <a href={whatsappLink(horseName)} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.4-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 3 4.7 4.1.7.3 1.2.4 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3Z" />
      </svg>
      {label}
    </a>
  );
}
