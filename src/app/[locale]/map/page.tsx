import { getTranslations } from 'next-intl/server';
import HaitiMap from '@/components/map/HaitiMap';
import Breadcrumb from '@/components/layout/Breadcrumb';

export default async function MapPage() {
  const t = await getTranslations('map');
  const tNav = await getTranslations('nav');

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Breadcrumb items={[{ href: '/', label: 'Akèy' }, { label: tNav('map') }]} />
          <p className="text-sm text-gray-500 hidden sm:block">{t('clickDepartment')}</p>
        </div>
      </div>
      {/* Full-screen map */}
      <div className="flex-1">
        <HaitiMap level="adm1" height="100%" />
      </div>
    </div>
  );
}
