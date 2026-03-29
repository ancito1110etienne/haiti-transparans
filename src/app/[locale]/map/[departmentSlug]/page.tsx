import { getTranslations } from 'next-intl/server';
import HaitiMap from '@/components/map/HaitiMap';
import Breadcrumb from '@/components/layout/Breadcrumb';
import { Link } from '@/i18n/navigation';

interface Props {
  params: Promise<{ locale: string; departmentSlug: string }>;
}

export default async function DepartmentPage({ params }: Props) {
  const { departmentSlug } = await params;
  const t = await getTranslations('map');
  const tNav = await getTranslations('nav');

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
          { label: departmentName },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
        Depatman {departmentName}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Map showing communes in this department */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">{t('communes')}</h2>
          <HaitiMap
            level="adm3"
            departmentSlug={departmentSlug}
            height="400px"
          />
          <p className="text-sm text-gray-500 mt-2">{t('clickCommune')}</p>
        </div>

        {/* Department info */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Ofisyèl Depatman</h2>
          <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-500">
            Données en cours de collecte...
          </div>

          <div className="mt-4">
            <Link
              href={`/officials?department=${departmentSlug}`}
              className="inline-flex items-center gap-2 text-haiti-blue hover:text-haiti-blue-light font-medium text-sm"
            >
              Wè tout ofisyèl depatman an →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
