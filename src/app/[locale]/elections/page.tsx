import { useTranslations } from 'next-intl';

export default function ElectionsPage() {
  const t = useTranslations('elections');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>

      <div className="flex gap-3 mb-8">
        {(['upcoming', 'active', 'completed'] as const).map((status) => (
          <button
            key={status}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-haiti-blue hover:text-haiti-blue transition-colors"
          >
            {t(status)}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-12 text-center text-gray-400">
        <div className="text-4xl mb-3">🗳️</div>
        <p>{t('noElections')}</p>
        <p className="text-sm mt-2">Zouti konparezon kandida ap disponib pandan eleksyon aktif.</p>
      </div>
    </div>
  );
}
