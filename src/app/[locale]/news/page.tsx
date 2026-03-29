import { useTranslations } from 'next-intl';

export default function NewsPage() {
  const t = useTranslations('news');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button className="px-4 py-2 rounded-lg text-sm font-medium bg-haiti-blue text-white">
          {t('allSources')}
        </button>
        {['Le Nouvelliste', 'Haiti Libre', 'Loop Haiti', 'Juno7', 'AlterPresse'].map((source) => (
          <button
            key={source}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 hover:border-haiti-blue hover:text-haiti-blue transition-colors"
          >
            {source}
          </button>
        ))}
      </div>

      {/* Articles grid — placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            <div className="h-40 bg-gray-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        Agregasyon nouvèl RSS ap disponib nan Faz 5.
      </p>
    </div>
  );
}
