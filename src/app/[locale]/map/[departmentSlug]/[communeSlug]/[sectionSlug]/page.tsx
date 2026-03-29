import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Props {
  params: Promise<{
    locale: string;
    departmentSlug: string;
    communeSlug: string;
    sectionSlug: string;
  }>;
}

export default async function SectionPage({ params }: Props) {
  const { departmentSlug, communeSlug, sectionSlug } = await params;
  const tNav = await getTranslations('nav');

  const toName = (slug: string) =>
    slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { href: '/', label: 'Akèy' },
          { href: '/map', label: tNav('map') },
          { href: `/map/${departmentSlug}`, label: toName(departmentSlug) },
          { href: `/map/${departmentSlug}/${communeSlug}`, label: toName(communeSlug) },
          { label: toName(sectionSlug) },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">
        Seksyon {toName(sectionSlug)}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">CASEC</h2>
          <div className="bg-white rounded-lg border border-gray-200 divide-y">
            {['Prezidan', 'Manm 1', 'Manm 2'].map((role) => (
              <div key={role} className="flex items-center gap-3 p-4">
                <div className="w-10 h-10 rounded-full bg-haiti-blue/10 flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <div className="font-medium text-gray-900">Données en cours</div>
                  <div className="text-xs text-gray-500">{role} CASEC</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">ASEC</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-4 text-sm text-gray-500">
            Manm ASEC yo ap ajoute talè.
          </div>
        </div>
      </div>
    </div>
  );
}
