"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale ?? "en";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Sign in failed. Please try again.");
        return;
      }
      router.push(`/${locale}/admin`);
      router.refresh();
    } catch {
      setError("Unable to reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-display text-3xl italic text-ivory">MEC</span>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-gold">Horses — Admin</p>
        </div>

        <form onSubmit={onSubmit} className="mt-10 space-y-4">
          <input
            required
            autoComplete="username"
            type="text"
            placeholder="Admin email or username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold"
          />
          <input
            required
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm text-ivory placeholder:text-ivory/40 focus:border-gold"
          />
          {error && <p role="alert" aria-live="polite" className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold px-4 py-3 font-mono text-[11px] uppercase tracking-eyebrow text-charcoal transition-colors duration-400 hover:bg-gold-bright disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
