'use client';

import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="flex flex-col items-center gap-3 text-gray-500">
        <div className="w-8 h-8 border-4 border-haiti-blue border-t-transparent rounded-full animate-spin" />
        <span className="text-sm">Ap chaje kat la...</span>
      </div>
    </div>
  ),
});

interface HaitiMapProps {
  level?: 'adm1' | 'adm3' | 'adm4';
  highlightSlug?: string;
  departmentSlug?: string;
  communeSlug?: string;
  height?: string;
}

export default function HaitiMap({
  level = 'adm1',
  highlightSlug,
  departmentSlug,
  communeSlug,
  height = '500px',
}: HaitiMapProps) {
  return (
    <div style={{ height }} className="w-full rounded-lg overflow-hidden shadow-md">
      <LeafletMap
        level={level}
        highlightSlug={highlightSlug}
        departmentSlug={departmentSlug}
        communeSlug={communeSlug}
      />
    </div>
  );
}
