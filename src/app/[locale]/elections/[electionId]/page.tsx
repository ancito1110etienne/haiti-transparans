import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface Props {
  params: Promise<{ locale: string; electionId: string }>;
}

export default async function ElectionDetailPage({ params }: Props) {
  const { electionId } = await params;
  const t = await getTranslations('elections');
  const tNav = await getTranslations('nav');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { href: '/', label: 'Akèy' },
          { href: '/elections', label: tNav('elections') },
          { label: `Eleksyon #${electionId}` },
        ]}
      />

      <h1 className="text-2xl font-bold text-gray-900 mt-4 mb-6">{t('compare')}</h1>

      <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-400">
        <div className="text-4xl mb-3">📊</div>
        <p>{t('selectCandidates')}</p>
      </div>
    </div>
  );
}
