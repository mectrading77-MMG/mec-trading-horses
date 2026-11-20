import { unstable_cache } from "next/cache";

export type EquestrianNewsItem = {
  title: string;
  url: string;
  date: string | null;
  source: string;
};

const FEEDS = [
  { url: "https://grandprix.info/fr/feed/", source: "GrandPrix", host: "grandprix.info" },
  { url: "https://www.fise.it/sport/salto-ostacoli/news-salto/archivio-news-salto.feed?type=rss", source: "FISE · Salto Ostacoli", host: "fise.it" },
  { url: "https://www.franceinfo.fr/sports/equitation.rss", source: "Franceinfo · Équitation", host: "franceinfo.fr" }
] as const;

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/<[^>]+>/g, "")
    .trim();
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp("<(?:[\\w.-]+:)?" + tag + "(?:\\s[^>]*)?>([\\s\\S]*?)</(?:[\\w.-]+:)?" + tag + ">", "i"));
  return match ? decodeXml(match[1]) : "";
}

function safeItemUrl(raw: string, expectedHost: string) {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && (url.hostname === expectedHost || url.hostname.endsWith("." + expectedHost))
      ? url.toString()
      : null;
  } catch {
    return null;
  }
}

async function readFeed(feed: (typeof FEEDS)[number]): Promise<EquestrianNewsItem[]> {
  try {
    const response = await fetch(feed.url, {
      headers: {
        accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "user-agent": "Mozilla/5.0 (compatible; MEC-Horses-News/1.0; +https://www.mechorses.com)"
      },
      next: { revalidate: 3600, tags: ["equestrian-news"] },
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      console.warn("[equestrian-news] Feed request failed", { source: feed.source, status: response.status });
      return [];
    }

    const xml = await response.text();
    const blocks = [
      ...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)
    ];

    const items = blocks.flatMap((match): EquestrianNewsItem[] => {
      const itemXml = match[2];
      const title = readTag(itemXml, "title");
      const atomLink = itemXml.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] ?? "";
      const rawLink = readTag(itemXml, "link") || atomLink;
      const url = safeItemUrl(rawLink, feed.host);
      const rawDate =
        readTag(itemXml, "pubDate") ||
        readTag(itemXml, "published") ||
        readTag(itemXml, "updated") ||
        readTag(itemXml, "date");
      const timestamp = rawDate ? Date.parse(rawDate) : Number.NaN;

      if (!title || !url) return [];

      return [{
        title,
        url,
        date: Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null,
        source: feed.source
      }];
    });

    if (items.length === 0) {
      console.warn("[equestrian-news] Feed returned no parseable items", {
        source: feed.source,
        contentType: response.headers.get("content-type"),
        bytes: xml.length
      });
    }

    return items;
  } catch (error) {
    console.error("[equestrian-news] Feed could not be read", {
      source: feed.source,
      error: error instanceof Error ? error.message : String(error)
    });
    return [];
  }
}

/** Cache the complete feed result for one hour, including on force-dynamic pages. */
const getCachedEquestrianNews = unstable_cache(
  async (limit: number): Promise<EquestrianNewsItem[]> => {
    const results = await Promise.all(FEEDS.map(readFeed));
    const unique = new Map<string, EquestrianNewsItem>();

    for (const item of results.flat()) {
      if (!unique.has(item.url)) unique.set(item.url, item);
    }

    return [...unique.values()]
      .sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        return Date.parse(b.date) - Date.parse(a.date);
      })
      .slice(0, limit);
  },
  ["equestrian-news"],
  { revalidate: 3600, tags: ["equestrian-news"] }
);

export async function getEquestrianNews(limit = 9): Promise<EquestrianNewsItem[]> {
  return getCachedEquestrianNews(limit);
}
