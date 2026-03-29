'use client';

import { useParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LOCALE_NAMES, LOCALES, type Locale } from '@/lib/constants';

export default function LanguageSwitcher() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = (params?.locale as Locale) ?? 'ht';

  const handleChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="relative">
      <select
        value={currentLocale}
        onChange={(e) => handleChange(e.target.value as Locale)}
        className="appearance-none bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-md px-3 py-1.5 pr-7 border border-white/20 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Select language"
      >
        {LOCALES.map((locale) => (
          <option key={locale} value={locale} className="text-gray-900 bg-white">
            {LOCALE_NAMES[locale]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
        <svg className="w-3 h-3 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
