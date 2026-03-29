import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { fetchFeed } from '@/lib/rss';

export async function GET(request: NextRequest) {
  // Protect with secret header for cron jobs
  const secret = request.headers.get('x-cron-secret');
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sources = await prisma.newsSource.findMany({ where: { active: true } });
  let totalInserted = 0;

  for (const source of sources) {
    const articles = await fetchFeed(source.feedUrl, source.id);

    for (const article of articles) {
      if (!article.url) continue;

      try {
        await prisma.newsArticle.upsert({
          where: { url: article.url },
          update: {
            title: article.title,
            summary: article.summary,
            imageUrl: article.imageUrl,
            publishedAt: article.publishedAt,
          },
          create: {
            title: article.title,
            url: article.url,
            summary: article.summary,
            imageUrl: article.imageUrl,
            publishedAt: article.publishedAt,
            sourceId: source.id,
          },
        });
        totalInserted++;
      } catch {
        // Skip duplicates silently
      }
    }
  }

  return NextResponse.json({
    ok: true,
    sourcesProcessed: sources.length,
    articlesUpserted: totalInserted,
  });
}
