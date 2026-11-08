"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const locale = String(params?.locale ?? "en");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/account/${mode === "register" ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mode === "register" ? { name, email, phone, password } : { email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Something went wrong.");
      router.push(`/${locale}/account/dashboard`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[75vh] bg-charcoal px-5 py-16 text-ivory">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-gold">MEC HORSES · CLIENT AREA</p>
          <h1 className="mt-5 font-display text-5xl italic leading-tight md:text-6xl">Your journey<br/>starts here.</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory/65">Create your personal account to keep your enquiries and conversations with our team in one place.</p>
          <div className="mt-10 border-t border-ivory/15 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-ivory/45">MEC HORSES TEAM</p>
            <Link href={`/${locale}/admin/login`} className="mt-3 inline-flex border-b border-gold/60 pb-1 text-sm text-gold hover:text-ivory">Admin login →</Link>
          </div>
        </section>

        <section className="border border-ivory/15 bg-ivory/[.04] p-6 md:p-8">
          <div className="flex border-b border-ivory/15">
            <button type="button" onClick={() => { setMode("login"); setError(""); }} className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[.18em] ${mode === "login" ? "border-b border-gold text-gold" : "text-ivory/45"}`}>Sign in</button>
            <button type="button" onClick={() => { setMode("register"); setError(""); }} className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[.18em] ${mode === "register" ? "border-b border-gold text-gold" : "text-ivory/45"}`}>Create account</button>
          </div>
          <h2 className="mt-7 font-display text-2xl italic">{mode === "register" ? "Create your account" : "Welcome back"}</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && <>
              <input required minLength={2} maxLength={100} autoComplete="name" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
              <input maxLength={40} autoComplete="tel" placeholder="Phone (optional)" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
            </>}
            <input required type="email" maxLength={254} autoComplete="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
            <input required type="password" minLength={mode === "register" ? 8 : 1} maxLength={128} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="w-full bg-gold px-5 py-4 font-mono text-[10px] uppercase tracking-[.2em] text-charcoal transition-colors hover:bg-gold-bright disabled:opacity-60">{loading ? "Please wait…" : mode === "register" ? "Create account" : "Sign in"}</button>
          </form>
          {mode === "register" && <p className="mt-4 text-xs leading-5 text-ivory/40">By creating an account, you agree to use this service responsibly. Your password is securely hashed.</p>}
        </section>
      </div>
    </main>
  );
}
