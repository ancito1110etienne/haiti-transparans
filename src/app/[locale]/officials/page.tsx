import { getTranslations } from 'next-intl/server';

interface Props {
  searchParams: Promise<{ search?: string; role?: string; department?: string }>;
}

export default async function OfficialsPage({ searchParams }: Props) {
  const { search, role } = await searchParams;
  const t = await getTranslations('officials');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>

      {/* Search & filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          placeholder={t('searchPlaceholder')}
          defaultValue={search}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-haiti-blue text-sm"
        />
        <select
          defaultValue={role || ''}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-haiti-blue text-sm bg-white"
        >
          <option value="">Tout Wòl</option>
          <option value="MAYOR">{t('roles.MAYOR')}</option>
          <option value="CASEC_PRESIDENT">{t('roles.CASEC_PRESIDENT')}</option>
          <option value="SENATOR">{t('roles.SENATOR')}</option>
          <option value="DEPUTY">{t('roles.DEPUTY')}</option>
        </select>
      </div>

      {/* Officials grid — placeholder until DB is seeded */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-gray-200 mx-auto mb-3" />
            <div className="h-4 bg-gray-200 rounded mx-auto w-3/4 mb-2" />
            <div className="h-3 bg-gray-100 rounded mx-auto w-1/2" />
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        Base de données en cours de construction — Phase 2
      </p>
    </div>
  );
}
