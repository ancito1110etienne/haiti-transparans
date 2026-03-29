import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Footer() {
  const t = useTranslations('nav');
  const tc = useTranslations('common');

  return (
    <footer className="bg-haiti-blue text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="font-bold text-lg mb-2">Haiti Transparans</h2>
            <p className="text-white/70 text-sm">{tc('tagline')}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/map', label: t('map') },
                { href: '/officials', label: t('officials') },
                { href: '/elections', label: t('elections') },
                { href: '/news', label: t('news') },
                { href: '/about', label: t('about') },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Data sources */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-3">
              Data Sources
            </h3>
            <ul className="space-y-1 text-sm text-white/70">
              <li>HDX — Haiti Admin Boundaries</li>
              <li>CNIGS — Géo-données Haiti</li>
              <li>CEP — Résultats électoraux</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Haiti Transparans. Données ouvertes pour tous.
        </div>
      </div>
    </footer>
  );
}
