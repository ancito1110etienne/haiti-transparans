'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { MAP_CONFIG, HAITI_COLORS, GEO_PATHS } from '@/lib/constants';
import type { Locale } from '@/lib/constants';

interface LeafletMapProps {
  level: 'adm1' | 'adm3' | 'adm4';
  highlightSlug?: string;
  departmentSlug?: string;
  communeSlug?: string;
}

interface GeoFeature {
  type: string;
  properties: Record<string, string>;
  geometry: object;
}

export default function LeafletMap({ level, highlightSlug, departmentSlug, communeSlug }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? 'ht';
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix Leaflet default icons
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      const map = L.map(mapRef.current!, {
        center: MAP_CONFIG.center,
        zoom: MAP_CONFIG.zoom,
        minZoom: MAP_CONFIG.minZoom,
        maxZoom: MAP_CONFIG.maxZoom,
        maxBounds: MAP_CONFIG.maxBounds,
        scrollWheelZoom: true,
        touchZoom: true,
        zoomControl: false,
      });

      mapInstanceRef.current = map;

      // Tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map);

      // Custom zoom control
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Determine which GeoJSON to load
      const geoPath =
        level === 'adm1'
          ? GEO_PATHS.adm1
          : level === 'adm3'
          ? GEO_PATHS.adm3
          : GEO_PATHS.adm4;

      fetch(geoPath)
        .then((res) => {
          if (!res.ok) throw new Error(`Failed to load ${geoPath}`);
          return res.json();
        })
        .then((data) => {
          // Filter if needed
          let features = data.features as GeoFeature[];

          if (level === 'adm3' && departmentSlug) {
            features = features.filter((f) => {
              const deptName = (f.properties.ADM1_FR || f.properties.ADM1_EN || '').toLowerCase();
              return deptName.replace(/\s+/g, '-') === departmentSlug;
            });
          }

          if (level === 'adm4' && communeSlug) {
            features = features.filter((f) => {
              const communeName = (f.properties.ADM3_FR || f.properties.ADM3_EN || '').toLowerCase();
              return communeName.replace(/\s+/g, '-') === communeSlug;
            });
          }

          const filteredData = { ...data, features };

          const layer = L.geoJSON(filteredData as any, {
            style: (feature) => {
              const featureSlug = getSlug(feature?.properties || {});
              const isHighlighted = featureSlug === highlightSlug;

              return {
                fillColor: isHighlighted ? HAITI_COLORS.red : HAITI_COLORS.blue,
                fillOpacity: isHighlighted ? 0.5 : 0.3,
                color: HAITI_COLORS.red,
                weight: 2,
                opacity: 0.8,
              };
            },
            onEachFeature: (feature, featureLayer) => {
              const name = getFeatureName(feature.properties, locale);
              const slug = getSlug(feature.properties);

              featureLayer.on({
                mouseover: (e) => {
                  const l = e.target;
                  l.setStyle({
                    fillOpacity: 0.6,
                    weight: 3,
                  });
                  l.bringToFront();
                  const point = e.containerPoint;
                  setTooltip({ name, x: point.x, y: point.y });
                },
                mouseout: (e) => {
                  layer.resetStyle(e.target);
                  setTooltip(null);
                },
                click: () => {
                  if (level === 'adm1') {
                    router.push(`/${locale}/map/${slug}`);
                  } else if (level === 'adm3') {
                    router.push(`/${locale}/map/${departmentSlug}/${slug}`);
                  } else if (level === 'adm4') {
                    router.push(`/${locale}/map/${departmentSlug}/${communeSlug}/${slug}`);
                  }
                },
              });
            },
          }).addTo(map);

          // Fit bounds to filtered features
          if (features.length > 0 && features.length < data.features.length) {
            try {
              map.fitBounds(layer.getBounds(), { padding: [20, 20] });
            } catch {}
          }
        })
        .catch((err) => {
          console.warn('GeoJSON not yet available:', err.message);
          // Show placeholder when GeoJSON hasn't been downloaded yet
          L.rectangle(MAP_CONFIG.maxBounds, {
            color: HAITI_COLORS.blue,
            fillColor: HAITI_COLORS.blue,
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '8 4',
          }).addTo(map);
        });
    });

    return () => {
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, [level, highlightSlug, departmentSlug, communeSlug, locale, router]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />
      {tooltip && (
        <div
          className="absolute z-[1000] pointer-events-none bg-white text-gray-900 text-sm font-medium px-3 py-1.5 rounded-md shadow-lg border border-gray-200"
          style={{ left: tooltip.x + 12, top: tooltip.y - 10 }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
}

function getFeatureName(properties: Record<string, string>, _locale: Locale): string {
  return cleanDeptName(properties.shapeName || '');
}

function cleanDeptName(name: string): string {
  // Strip French administrative prefixes like "Département de l'Ouest" → "Ouest"
  return name
    .replace(/^Département (de l'|de la |du |des |de )/i, '')
    .replace(/\s+Department$/i, '')
    .trim();
}

function getSlug(properties: Record<string, string>): string {
  const name = cleanDeptName(properties.shapeName || '');
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
