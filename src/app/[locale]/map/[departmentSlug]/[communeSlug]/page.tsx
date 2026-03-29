import { getTranslations } from 'next-intl/server';
import HaitiMap from '@/components/map/HaitiMap';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Link } from '@/i18n/navigation';

interface Props {
  params: Promise<{ locale: string; departmentSlug: string; communeSlug: string }>;
}

export default async function CommunePage({ params }: Props) {
  const { departmentSlug, communeSlug } = await params;
  const t = await getTranslations('map');
  const tNav = await getTranslations('nav');

  const communeName = communeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const departmentName = departmentSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { href: '/', label: 'Akèy' },
          { href: '/map', label: tNav('map') },
          { href: `/map/${departmentSlug}`, label: departmentName },
          { label: communeName },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
        Komin {communeName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map of section communales */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">{t('sections')}</h2>
          <HaitiMap
            level="adm4"
            departmentSlug={departmentSlug}
            communeSlug={communeSlug}
            height="380px"
          />
        </div>

        {/* Mayor + officials */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Majistra</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-haiti-blue/10 flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Données en cours</div>
                  <div className="text-sm text-gray-500">Majistra, Komin {communeName}</div>
                  <Link
                    href="/officials"
                    className="text-xs text-haiti-blue hover:underline mt-1 inline-block"
                  >
                    Wè pwofil →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-3">CASEC / ASEC</h2>
            <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
              Klike sou yon seksyon kominan nan kat la pou wè CASEC ak ASEC yo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
