import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import HaitiMap from '@/components/map/HaitiMap';

export default function HomePage() {
  const t = useTranslations('home');
  const tNav = useTranslations('nav');
  const tMap = useTranslations('map');

  const stats = [
    { label: t('stats.departments'), value: '10' },
    { label: t('stats.communes'), value: '145' },
    { label: t('stats.sections'), value: '571' },
    { label: t('stats.officials'), value: '1,000+' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-haiti-blue to-haiti-blue-light text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/map"
              className="inline-flex items-center justify-center gap-2 bg-haiti-red text-white font-semibold px-6 py-3 rounded-lg hover:bg-haiti-red-light transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              {t('hero.exploreMap')}
            </Link>
            <Link
              href="/officials"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors border border-white/20"
            >
              {t('hero.viewOfficials')}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-haiti-blue">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('mapTitle')}</h2>
          <HaitiMap level="adm1" height="480px" />
          <p className="text-center text-sm text-gray-500 mt-3">
            {tMap('clickDepartment')}
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                href: '/officials',
                title: tNav('officials'),
                desc: 'Pwomès, ka legal, ak reyinyon',
                icon: '👤',
              },
              {
                href: '/elections',
                title: tNav('elections'),
                desc: 'Konpare kandida ak platfòm yo',
                icon: '🗳️',
              },
              {
                href: '/news',
                title: tNav('news'),
                desc: 'Nouvèl aktyèl sou gouvènman an',
                icon: '📰',
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group p-6 rounded-xl border border-gray-200 hover:border-haiti-blue hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="font-bold text-gray-900 group-hover:text-haiti-blue transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
