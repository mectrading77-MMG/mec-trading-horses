export type EquestrianNewsItem = {
  title: string;
  url: string;
  date: string;
  source: string;
};

const FEEDS = [
  { url: "https://jumpernation.com/feed/", source: "Jumper Nation", host: "jumpernation.com" },
  { url: "https://www.fise.it/sport/salto-ostacoli/news-salto/archivio-news-salto.feed?type=rss", source: "FISE · Salto Ostacoli", host: "www.fise.it" }
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
  const match = block.match(new RegExp("<" + tag + "(?:\\s[^>]*)?>([\\s\\S]*?)</" + tag + ">", "i"));
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
      headers: { "user-agent": "MEC-Horses-News/1.0 (+https://www.mechorses.com)" },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000)
    });
    if (!response.ok) return [];
    const xml = await response.text();
    return [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)]
      .flatMap((match): EquestrianNewsItem[] => {
        const itemXml = match[1];
        const title = readTag(itemXml, "title");
        const rawLink = readTag(itemXml, "link") || itemXml.match(/<link[^>]*href=["']([^"']+)["']/i)?.[1] || "";
        const url = safeItemUrl(rawLink, feed.host);
        const rawDate = readTag(itemXml, "pubDate") || readTag(itemXml, "date");
        const timestamp = Date.parse(rawDate);

        if (!title || !url || !Number.isFinite(timestamp)) return [];

        return [{
          title,
          url,
          date: new Date(timestamp).toISOString(),
          source: feed.source
        }];
      });
  } catch {
    return [];
  }
}

/** Publisher headlines are cached and refreshed automatically every hour. */
export async function getEquestrianNews(limit = 9): Promise<EquestrianNewsItem[]> {
  const results = await Promise.all(FEEDS.map(readFeed));
  const unique = new Map<string, EquestrianNewsItem>();
  for (const item of results.flat()) {
    if (!unique.has(item.url)) unique.set(item.url, item);
  }
  return [...unique.values()]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, limit);
}
