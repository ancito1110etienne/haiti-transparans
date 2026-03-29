import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

export default async function OfficialProfilePage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations('officials');
  const tNav = await getTranslations('nav');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { href: '/', label: 'Akèy' },
          { href: '/officials', label: tNav('officials') },
          { label: 'Pwofil Ofisyèl' },
        ]}
      />

      {/* Profile header */}
      <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-haiti-blue/10 flex items-center justify-center text-4xl flex-shrink-0">
            👤
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">Ofisyèl #{id}</h1>
            <p className="text-gray-500 mt-1">Majistra</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {t('status.ACTIVE')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6">
            {[
              { id: 'bio', label: t('tabs.bio') },
              { id: 'promises', label: t('tabs.promises') },
              { id: 'legal', label: t('tabs.legalCases') },
              { id: 'meetings', label: t('tabs.meetings') },
            ].map((tab) => (
              <button
                key={tab.id}
                className="py-3 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bio tab content */}
        <div className="py-6">
          <div className="bg-gray-50 rounded-lg p-6 text-sm text-gray-500 text-center">
            Pwofil konplè ap disponib apre faz 2 — base de données en cours de construction.
          </div>
        </div>
      </div>
    </div>
  );
}
