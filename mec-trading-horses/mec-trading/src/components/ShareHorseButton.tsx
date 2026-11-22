"use client";

import { useState } from "react";

type Props = {
  title: string;
  label?: string;
  copiedLabel?: string;
  errorLabel?: string;
};

export default function ShareHorseButton({
  title,
  label = "Share",
  copiedLabel = "Link copied",
  errorLabel = "Unable to share"
}: Props) {
  const [status, setStatus] = useState("");

  async function handleShare() {
    const url = window.location.href;
    const shareData = { title, text: title, url };

    try {
      if (typeof navigator.share === "function") {
        await navigator.share(shareData);
        setStatus("");
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setStatus(copiedLabel);
        window.setTimeout(() => setStatus(""), 2500);
        return;
      }

      const input = document.createElement("textarea");
      input.value = url;
      input.setAttribute("readonly", "");
      input.style.position = "absolute";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(input);
      setStatus(copied ? copiedLabel : errorLabel);
      window.setTimeout(() => setStatus(""), 2500);
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setStatus(errorLabel);
      window.setTimeout(() => setStatus(""), 2500);
    }
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 border border-charcoal-line px-4 py-2.5 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal/70 transition-colors duration-300 hover:border-gold hover:text-gold"
        aria-label={label}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="m8.7 10.7 6.6-4.4M8.7 13.3l6.6 4.4" />
        </svg>
        {label}
      </button>
      {status && <span role="status" className="text-xs text-charcoal/55">{status}</span>}
    </div>
  );
}
