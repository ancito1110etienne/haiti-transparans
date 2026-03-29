export const HAITI_COLORS = {
  blue: '#003F87',
  blueLight: '#1A5FAF',
  red: '#D21034',
  redLight: '#E84363',
} as const;

export const MAP_CONFIG = {
  center: [18.97, -72.29] as [number, number],
  zoom: 8,
  minZoom: 7,
  maxZoom: 15,
  maxBounds: [
    [17.9, -75.0],
    [20.2, -71.5],
  ] as [[number, number], [number, number]],
};

export const GEO_PATHS = {
  adm0: '/geo/hti-adm0.geojson',
  adm1: '/geo/hti-adm1.geojson',
  adm2: '/geo/hti-adm2.geojson',
  adm3: '/geo/hti-adm3.geojson',
  adm4: '/geo/hti-adm4.geojson',
};

export const LOCALES = ['ht', 'fr', 'en', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

export const LOCALE_NAMES: Record<Locale, string> = {
  ht: 'Kreyòl',
  fr: 'Français',
  en: 'English',
  es: 'Español',
};
