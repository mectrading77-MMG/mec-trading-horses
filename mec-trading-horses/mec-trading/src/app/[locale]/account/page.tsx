"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const copy = {
  en: {
    clientArea: "CLIENT AREA", headline: <>Your journey<br/>starts here.</>,
    intro: "Create your personal account to keep your enquiries and conversations with our team in one place.",
    team: "MEC HORSES TEAM", adminLogin: "Admin login", signIn: "Sign in",
    createTab: "Create account", createTitle: "Create your account", welcome: "Welcome back",
    fullName: "Full name", phone: "Phone (optional)", email: "Email address", password: "Password",
    hide: "Hide", show: "Show", wait: "Please wait…", create: "Create account",
    agree: "By creating an account, you agree to use this service responsibly. Your password is securely hashed.",
    genericError: "Something went wrong."
  },
  fr: {
    clientArea: "ESPACE CLIENT", headline: <>Votre parcours<br/>commence ici.</>,
    intro: "Créez votre compte personnel pour retrouver vos demandes et échanges avec notre équipe au même endroit.",
    team: "ÉQUIPE MEC HORSES", adminLogin: "Connexion administrateur", signIn: "Se connecter",
    createTab: "Créer un compte", createTitle: "Créer votre compte", welcome: "Ravi de vous revoir",
    fullName: "Nom complet", phone: "Téléphone (facultatif)", email: "Adresse e-mail", password: "Mot de passe",
    hide: "Masquer", show: "Afficher", wait: "Veuillez patienter…", create: "Créer un compte",
    agree: "En créant un compte, vous acceptez d’utiliser ce service de manière responsable. Votre mot de passe est stocké sous forme chiffrée.",
    genericError: "Une erreur s’est produite."
  },
  ar: {
    clientArea: "حساب العميل", headline: <>رحلتك<br/>تبدأ من هنا.</>,
    intro: "أنشئ حسابك الشخصي لمتابعة استفساراتك ومحادثاتك مع فريقنا من مكان واحد.",
    team: "فريق MEC HORSES", adminLogin: "دخول المسؤول", signIn: "تسجيل الدخول",
    createTab: "إنشاء حساب", createTitle: "أنشئ حسابك", welcome: "مرحبًا بعودتك",
    fullName: "الاسم بالكامل", phone: "رقم الهاتف (اختياري)", email: "البريد الإلكتروني", password: "كلمة المرور",
    hide: "إخفاء", show: "إظهار", wait: "يرجى الانتظار…", create: "إنشاء حساب",
    agree: "بإنشاء الحساب، فإنك توافق على استخدام الخدمة بشكل مسؤول. يتم حفظ كلمة المرور بصورة آمنة.",
    genericError: "حدث خطأ ما."
  }
} as const;

export default function AccountPage() {
  const params = useParams();
  const router = useRouter();
  const locale = String(params?.locale ?? "en") as keyof typeof copy;
  const t = copy[locale] ?? copy.en;
  const [mode, setMode] = useState<"login" | "register">("login");
  useEffect(() => {
    const requestedMode = new URLSearchParams(window.location.search).get("mode");
    if (requestedMode === "login" || requestedMode === "register") setMode(requestedMode);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      if (!response.ok) throw new Error(result.error || t.genericError);
      router.push(`/${locale}/account/dashboard`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.genericError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-[75vh] bg-charcoal px-5 py-16 text-ivory">
      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[1.1fr_.9fr] md:items-center">
        <section>
          <p className="font-mono text-[10px] uppercase tracking-[.25em] text-gold">MEC HORSES · {t.clientArea}</p>
          <h1 className="mt-5 font-display text-5xl italic leading-tight md:text-6xl">{t.headline}</h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-ivory/65">{t.intro}</p>
          <div className="mt-10 border-t border-ivory/15 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-ivory/45">{t.team}</p>
            <Link href={`/${locale}/admin/login`} className="mt-3 inline-flex border-b border-gold/60 pb-1 text-sm text-gold hover:text-ivory">{t.adminLogin} →</Link>
          </div>
        </section>

        <section className="border border-ivory/15 bg-ivory/[.04] p-6 md:p-8">
          <div className="flex border-b border-ivory/15">
            <button type="button" onClick={() => { setMode("login"); setError(""); }} className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[.18em] ${mode === "login" ? "border-b border-gold text-gold" : "text-ivory/45"}`}>{t.signIn}</button>
            <button type="button" onClick={() => { setMode("register"); setError(""); }} className={`flex-1 pb-4 font-mono text-[10px] uppercase tracking-[.18em] ${mode === "register" ? "border-b border-gold text-gold" : "text-ivory/45"}`}>{t.createTab}</button>
          </div>
          <h2 className="mt-7 font-display text-2xl italic">{mode === "register" ? t.createTitle : t.welcome}</h2>
          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "register" && <>
              <input required minLength={2} maxLength={100} autoComplete="name" placeholder={t.fullName} value={name} onChange={e => setName(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
              <input maxLength={40} autoComplete="tel" placeholder={t.phone} value={phone} onChange={e => setPhone(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
            </>}
            <input required type="email" maxLength={254} autoComplete="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
            <div className="relative">
              <input required type={showPassword ? "text" : "password"} minLength={mode === "register" ? 8 : 1} maxLength={128} autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-ivory/20 bg-transparent px-4 py-3 pr-20 text-sm outline-none placeholder:text-ivory/35 focus:border-gold"/>
              <button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? t.hide : t.show} aria-pressed={showPassword} className="absolute inset-y-0 right-3 font-mono text-[10px] uppercase tracking-eyebrow text-gold hover:text-ivory">{showPassword ? t.hide : t.show}</button>
            </div>
            {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="w-full bg-gold px-5 py-4 font-mono text-[10px] uppercase tracking-[.2em] text-charcoal transition-colors hover:bg-gold-bright disabled:opacity-60">{loading ? t.wait : mode === "register" ? t.create : t.signIn}</button>
          </form>
          {mode === "register" && <p className="mt-4 text-xs leading-5 text-ivory/40">{t.agree}</p>}
        </section>
      </div>
    </main>
  );
}
