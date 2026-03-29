import { getTranslations } from 'next-intl/server';

export default async function AboutPage() {
  const tNav = await getTranslations('nav');

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">{tNav('about')} Haiti Transparans</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold text-gray-900">Misyon nou</h2>
          <p>
            Haiti Transparans se yon platfòm sivik ki bay sitwayen ayisyen aksè a enfòmasyon sou ofisyèl
            gouvènman yo — nan nivo nasyonal jiska nivo lokal. Nou swiv pwomès, ka legal, ak ajanda
            reyinyon nan kat lang: Kreyòl, Fransè, Anglè, ak Panyòl.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Metodoloji</h2>
          <p>
            Done nou yo soti nan sous piblik: sit entènèt ofisyèl gouvènman an, CEP, jounal ayisyen,
            ak baz done jeyografik CNIGS ak HDX. Nou verifye tout enfòmasyon anvan nou pibliye yo.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Sous done</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>HDX — Haiti Subnational Administrative Boundaries (CNIGS, jan. 2025)</li>
            <li>CEP — Konsèy Elektoral Pwovizwa — Rezilta eleksyon</li>
            <li>Le Nouvelliste, Haiti Libre, Loop Haiti, Juno7, AlterPresse — Nouvèl</li>
            <li>OpenStreetMap — Done jeyografik</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900">Kontakte nou</h2>
          <p className="text-sm">
            Pou rapòte yon erè oswa soumèt done, kontakte nou: contact@haititransparans.org
          </p>
        </section>
      </div>
    </div>
  );
}
