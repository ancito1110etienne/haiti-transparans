import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ officials: [], communes: [] });
  }

  try {
    const [officials, communes] = await Promise.all([
      prisma.official.findMany({
        where: {
          OR: [
            { firstName: { contains: q, mode: 'insensitive' } },
            { lastName: { contains: q, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
          status: true,
          photoUrl: true,
          commune: { select: { nameFr: true, slug: true } },
          department: { select: { nameFr: true, slug: true } },
        },
        take: 10,
      }),
      prisma.commune.findMany({
        where: {
          OR: [
            { nameFr: { contains: q, mode: 'insensitive' } },
            { nameEn: { contains: q, mode: 'insensitive' } },
            { nameHt: { contains: q, mode: 'insensitive' } },
          ],
        },
        select: {
          id: true,
          nameHt: true,
          nameFr: true,
          slug: true,
          arrondissement: {
            select: {
              department: { select: { slug: true, nameFr: true } },
            },
          },
        },
        take: 10,
      }),
    ]);

    return NextResponse.json({ officials, communes });
  } catch {
    return NextResponse.json({ officials: [], communes: [] });
  }
}
