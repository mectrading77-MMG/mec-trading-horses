import React, { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRouter } from "expo-router";

type Locale = "en" | "fr" | "ar" | "de" | "nl";
type Horse = { id: string; slug: string; breed?: string | null; sex?: string | null; heightCm?: number | null; status?: string | null; priceAmount?: number | null; priceCurrency?: string | null; priceOnRequest?: boolean; locationLabel?: string | null; translations?: { locale: string; name: string; positioning?: string | null; personality?: string | null }[]; media?: { url: string; alt?: string | null; isCover?: boolean }[] };
type Copy = { title: string; subtitle: string; search: string; all: string; available: string; reserved: string; sold: string; details: string; request: string; retry: string; empty: string; }
const API = "https://www.mechorses.com/api/public/horses";
const copy: Record<Locale, Copy> = {
  en: { title: "MEC HORSES", subtitle: "Sport horses selected for your ambitions", search: "Discover our horses", all: "All", available: "Available", reserved: "Reserved", sold: "Sold", details: "View horse", request: "Price on request", retry: "Try again", empty: "No horses to display right now." },
  fr: { title: "MEC HORSES", subtitle: "Des chevaux de sport sélectionnés pour vos ambitions", search: "Découvrez nos chevaux", all: "Tous", available: "Disponible", reserved: "Réservé", sold: "Vendu", details: "Voir le cheval", request: "Prix sur demande", retry: "Réessayer", empty: "Aucun cheval à afficher pour le moment." },
  ar: { title: "MEC HORSES", subtitle: "خيول رياضية مختارة لتحقيق طموحاتك", search: "اكتشف خيولنا", all: "الكل", available: "متاح", reserved: "محجوز", sold: "مباع", details: "عرض الحصان", request: "السعر عند الطلب", retry: "إعادة المحاولة", empty: "لا توجد خيول للعرض حاليًا." },
  de: { title: "MEC HORSES", subtitle: "Sportpferde für Ihre Ziele", search: "Unsere Pferde entdecken", all: "Alle", available: "Verfügbar", reserved: "Reserviert", sold: "Verkauft", details: "Pferd ansehen", request: "Preis auf Anfrage", retry: "Erneut versuchen", empty: "Zurzeit sind keine Pferde verfügbar." },
  nl: { title: "MEC HORSES", subtitle: "Sportpaarden geselecteerd voor uw ambities", search: "Ontdek onze paarden", all: "Alle", available: "Beschikbaar", reserved: "Gereserveerd", sold: "Verkocht", details: "Bekijk paard", request: "Prijs op aanvraag", retry: "Opnieuw proberen", empty: "Er zijn momenteel geen paarden om te tonen." },
};
const locales: Locale[] = ["en", "fr", "ar", "de", "nl"];
function horseName(horse: Horse, locale: Locale) { return horse.translations?.find((t) => t.locale === locale)?.name || horse.translations?.find((t) => t.locale === "en")?.name || horse.translations?.[0]?.name || "MEC HORSES"; }
function statusLabel(status: string | undefined, c: Copy) { const s = (status || "AVAILABLE").toUpperCase(); return s === "SOLD" ? c.sold : s === "RESERVED" ? c.reserved : c.available; }
export default function HomeScreen() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const c = copy[locale];
  const load = async () => { setLoading(true); setError(false); try { const response = await fetch(API); if (!response.ok) throw new Error("Catalogue request failed"); const data = await response.json(); setHorses(Array.isArray(data.horses) ? data.horses : []); } catch { setError(true); } finally { setLoading(false); } };
  useEffect(() => { void load(); }, []);
  const filtered = useMemo(() => filter === "ALL" ? horses : horses.filter((h) => (h.status || "AVAILABLE").toUpperCase() === filter), [horses, filter]);
  const money = (h: Horse) => h.priceOnRequest || h.priceAmount == null ? c.request : new Intl.NumberFormat(locale === "fr" ? "fr-FR" : locale === "de" ? "de-DE" : locale === "nl" ? "nl-NL" : locale === "ar" ? "ar-EG" : "en-GB", { style: "currency", currency: h.priceCurrency || "EUR", maximumFractionDigits: 0 }).format(h.priceAmount);
  const chip = (label: string, value: string) => <Pressable key={value} onPress={() => setFilter(value)} style={{ paddingVertical: 9, paddingHorizontal: 15, borderRadius: 20, backgroundColor: filter === value ? "#c8a96a" : "#25302a", marginRight: 8 }}><Text style={{ color: filter === value ? "#111711" : "#f4f0e7", fontWeight: "700" }}>{label}</Text></Pressable>;
  return <SafeAreaView style={{ flex: 1, backgroundColor: "#101714" }}>
    <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View><Text style={{ color: "#e5c887", fontSize: 25, fontWeight: "900", letterSpacing: 3 }}>{c.title}</Text><Text style={{ color: "#d7d9d3", fontSize: 12, marginTop: 5 }}>{c.subtitle}</Text></View>
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: "#e5c887", alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#101714", fontWeight: "900", fontSize: 17 }}>MH</Text></View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>{locales.map((l) => <Pressable key={l} onPress={() => setLocale(l)} style={{ paddingVertical: 7, paddingHorizontal: 11, borderRadius: 8, marginRight: 7, backgroundColor: locale === l ? "#e5c887" : "#25302a" }}><Text style={{ color: locale === l ? "#101714" : "#f4f0e7", fontWeight: "700" }}>{l.toUpperCase()}</Text></Pressable>)}</ScrollView>
      </View>
      <View style={{ paddingHorizontal: 20 }}><Text style={{ color: "#f4f0e7", fontSize: 24, fontWeight: "800", marginBottom: 14 }}>{c.search}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 18 }}>{[chip(c.all, "ALL"), chip(c.available, "AVAILABLE"), chip(c.reserved, "RESERVED"), chip(c.sold, "SOLD")]}</ScrollView>
        {loading ? <ActivityIndicator color="#e5c887" size="large" style={{ marginTop: 50 }} /> : error ? <View style={{ padding: 22, borderRadius: 16, backgroundColor: "#25302a" }}><Text style={{ color: "#f4f0e7", marginBottom: 14 }}>Catalogue temporarily unavailable. Check your internet connection and try again.</Text><Pressable onPress={() => void load()} style={{ backgroundColor: "#e5c887", padding: 12, borderRadius: 10, alignSelf: "flex-start" }}><Text style={{ color: "#101714", fontWeight: "800" }}>{c.retry}</Text></Pressable></View> : filtered.length === 0 ? <Text style={{ color: "#d7d9d3", paddingVertical: 30 }}>{c.empty}</Text> : <FlatList scrollEnabled={false} data={filtered} keyExtractor={(item) => item.id} renderItem={({ item }) => { const photo = item.media?.find((m) => m.isCover) || item.media?.[0]; const status = (item.status || "AVAILABLE").toUpperCase(); const color = status === "SOLD" ? "#e36b65" : status === "RESERVED" ? "#e5a64b" : "#86c98b"; return <Pressable onPress={() => router.push({ pathname: "/horse/[slug]", params: { slug: item.slug, locale } })} style={{ backgroundColor: "#1c2520", borderRadius: 18, overflow: "hidden", marginBottom: 18, borderWidth: 1, borderColor: "#303b34" }}>
          {photo?.url ? <Image source={{ uri: photo.url }} accessibilityLabel={photo.alt || horseName(item, locale)} style={{ width: "100%", height: 220, backgroundColor: "#25302a" }} resizeMode="cover" /> : <View style={{ height: 180, backgroundColor: "#25302a", alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#e5c887", fontSize: 22, fontWeight: "800" }}>MEC HORSES</Text></View>}
          <View style={{ padding: 16 }}><View style={{ alignSelf: "flex-start", backgroundColor: color, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, marginBottom: 10 }}><Text style={{ color: "#111711", fontWeight: "800", fontSize: 11 }}>{statusLabel(item.status, c)}</Text></View>
            <Text style={{ color: "#f4f0e7", fontSize: 20, fontWeight: "800" }}>{horseName(item, locale)}</Text><Text style={{ color: "#bdc6bd", marginTop: 7 }}>{[item.breed, item.sex, item.heightCm ? `${item.heightCm} cm` : null, item.locationLabel].filter(Boolean).join("  ·  ")}</Text>
            <Text style={{ color: "#e5c887", fontSize: 16, fontWeight: "800", marginTop: 12 }}>{money(item)}</Text><Text style={{ color: "#f4f0e7", fontWeight: "700", marginTop: 14 }}>{c.details}  →</Text>
          </View></Pressable>; }} />
      </View>
      <Text style={{ color: "#68776d", textAlign: "center", marginTop: 20, fontSize: 11 }}>MEC HORSES · www.mechorses.com</Text>
    </ScrollView>
  </SafeAreaView>;
}
