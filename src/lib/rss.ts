import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'HaitiTransparans/1.0' },
});

export interface RssArticle {
  title: string;
  url: string;
  summary: string;
  imageUrl?: string;
  publishedAt?: Date;
  sourceId: string;
}

export async function fetchFeed(feedUrl: string, sourceId: string): Promise<RssArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl);
    return (feed.items ?? []).slice(0, 20).map((item) => ({
      title: item.title ?? '',
      url: item.link ?? item.guid ?? '',
      summary: item.contentSnippet ?? item.summary ?? '',
      imageUrl: extractImageUrl(item),
      publishedAt: item.pubDate ? new Date(item.pubDate) : undefined,
      sourceId,
    }));
  } catch (err) {
    console.error(`Failed to fetch RSS feed ${feedUrl}:`, err);
    return [];
  }
}

function extractImageUrl(item: Parser.Item & { enclosure?: { url?: string }; 'media:content'?: { $?: { url?: string } } }): string | undefined {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item['media:content']?.['$']?.url) return item['media:content']['$'].url;
  const match = (item.content ?? '').match(/<img[^>]+src="([^"]+)"/);
  return match?.[1];
}
