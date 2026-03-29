import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

// Haitian Creole names for departments (manual mapping)
const DEPT_HT_NAMES: Record<string, string> = {
  'Artibonite': 'Latibonit',
  'Centre': 'Sant',
  'Grand\'Anse': 'Grandans',
  'Nippes': 'Nip',
  'Nord': 'Nò',
  'Nord-Est': 'Nòdès',
  'Nord-Ouest': 'Nòdwès',
  'Ouest': 'Lwès',
  'Sud': 'Sid',
  'Sud-Est': 'Sidès',
};

const DEPT_EN_NAMES: Record<string, string> = {
  'Artibonite': 'Artibonite',
  'Centre': 'Center',
  'Grand\'Anse': 'Grand\'Anse',
  'Nippes': 'Nippes',
  'Nord': 'North',
  'Nord-Est': 'Northeast',
  'Nord-Ouest': 'Northwest',
  'Ouest': 'West',
  'Sud': 'South',
  'Sud-Est': 'Southeast',
};

const DEPT_ES_NAMES: Record<string, string> = {
  'Artibonite': 'Artibonita',
  'Centre': 'Centro',
  'Grand\'Anse': 'Grand\'Anse',
  'Nippes': 'Nippes',
  'Nord': 'Norte',
  'Nord-Est': 'Noreste',
  'Nord-Ouest': 'Noroeste',
  'Ouest': 'Oeste',
  'Sud': 'Sur',
  'Sud-Est': 'Sureste',
};

const DEPT_CAPITALS: Record<string, string> = {
  'Artibonite': 'Gonaïves',
  'Centre': 'Hinche',
  'Grand\'Anse': 'Jérémie',
  'Nippes': 'Miragoâne',
  'Nord': 'Cap-Haïtien',
  'Nord-Est': 'Fort-Liberté',
  'Nord-Ouest': 'Port-de-Paix',
  'Ouest': 'Port-au-Prince',
  'Sud': 'Les Cayes',
  'Sud-Est': 'Jacmel',
};

interface GeoFeature {
  type: string;
  properties: Record<string, string>;
}

async function seedDepartments() {
  const geoPath = path.join(process.cwd(), 'public/geo/hti-adm1.geojson');

  if (!fs.existsSync(geoPath)) {
    console.log('⚠️  GeoJSON not found. Seeding hardcoded departments...');
    return await seedHardcodedDepartments();
  }

  const geoData = JSON.parse(fs.readFileSync(geoPath, 'utf-8'));
  const features: GeoFeature[] = geoData.features;

  console.log(`Seeding ${features.length} departments from GeoJSON...`);

  for (const feature of features) {
    const nameFr =
      feature.properties.ADM1_FR ||
      feature.properties.shapeName ||
      feature.properties.ADM1_EN ||
      '';
    const slug = toSlug(nameFr);

    await prisma.department.upsert({
      where: { slug },
      update: {},
      create: {
        nameHt: DEPT_HT_NAMES[nameFr] ?? nameFr,
        nameFr,
        nameEn: DEPT_EN_NAMES[nameFr] ?? feature.properties.ADM1_EN ?? nameFr,
        nameEs: DEPT_ES_NAMES[nameFr] ?? nameFr,
        slug,
        code: feature.properties.ADM1_PCODE || feature.properties.shapeISO || slug.toUpperCase(),
        capital: DEPT_CAPITALS[nameFr],
        geoJsonFeatureId: feature.properties.shapeID || feature.properties.ADM1_PCODE,
      },
    });
  }

  console.log('✅ Departments seeded');
}

async function seedHardcodedDepartments() {
  const departments = [
    { nameFr: 'Artibonite', code: 'HT-AR' },
    { nameFr: 'Centre', code: 'HT-CE' },
    { nameFr: "Grand'Anse", code: 'HT-GA' },
    { nameFr: 'Nippes', code: 'HT-NI' },
    { nameFr: 'Nord', code: 'HT-ND' },
    { nameFr: 'Nord-Est', code: 'HT-NE' },
    { nameFr: 'Nord-Ouest', code: 'HT-NO' },
    { nameFr: 'Ouest', code: 'HT-OU' },
    { nameFr: 'Sud', code: 'HT-SD' },
    { nameFr: 'Sud-Est', code: 'HT-SE' },
  ];

  for (const dept of departments) {
    const slug = toSlug(dept.nameFr);
    await prisma.department.upsert({
      where: { slug },
      update: {},
      create: {
        nameHt: DEPT_HT_NAMES[dept.nameFr] ?? dept.nameFr,
        nameFr: dept.nameFr,
        nameEn: DEPT_EN_NAMES[dept.nameFr] ?? dept.nameFr,
        nameEs: DEPT_ES_NAMES[dept.nameFr] ?? dept.nameFr,
        slug,
        code: dept.code,
        capital: DEPT_CAPITALS[dept.nameFr],
      },
    });
  }

  console.log('✅ Hardcoded departments seeded');
}

async function seedNewsSources() {
  const sources = [
    { name: 'Le Nouvelliste', url: 'https://lenouvelliste.com', feedUrl: 'https://lenouvelliste.com/rss', language: 'fr' },
    { name: 'Haiti Libre', url: 'https://www.haitilibre.com', feedUrl: 'https://www.haitilibre.com/rss.xml', language: 'fr' },
    { name: 'Loop Haiti', url: 'https://loophaiti.com', feedUrl: 'https://loophaiti.com/feed/rss', language: 'fr' },
    { name: 'Juno7', url: 'https://www.juno7.ht', feedUrl: 'https://www.juno7.ht/feed', language: 'ht' },
    { name: 'AlterPresse', url: 'https://www.alterpresse.org', feedUrl: 'https://www.alterpresse.org/rss.xml', language: 'fr' },
    { name: 'Radio Metropole', url: 'https://metropolehaiti.com', feedUrl: 'https://metropolehaiti.com/feed', language: 'fr' },
  ];

  for (const source of sources) {
    await prisma.newsSource.upsert({
      where: { url: source.url },
      update: {},
      create: source,
    });
  }

  console.log('✅ News sources seeded');
}

async function main() {
  console.log('🌱 Starting seed...');
  await seedDepartments();
  await seedNewsSources();
  console.log('🎉 Seed complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
