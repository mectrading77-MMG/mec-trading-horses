"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/types/horse";

export default function SignOutButton({ label, locale }: { label: string; locale: Locale }) {
  const router = useRouter();

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  }

  return (
    <button
      onClick={signOut}
      className="font-mono text-[11px] uppercase tracking-eyebrow text-ivory/50 hover:text-gold"
    >
      {label}
    </button>
  );
}
