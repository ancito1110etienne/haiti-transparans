import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ht', 'fr', 'en', 'es'],
  defaultLocale: 'ht',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
