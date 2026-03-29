#!/usr/bin/env bash
# Downloads Haiti administrative boundary GeoJSON files from HDX
# Requires: curl, unzip
# Optional: mapshaper (npm i -g mapshaper) for file size optimization

set -e

GEO_DIR="$(dirname "$0")/../public/geo"
mkdir -p "$GEO_DIR"

echo "📥 Downloading Haiti admin boundaries from HDX..."

# geoBoundaries dataset for Haiti (public domain)
BASE_URL="https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ"

# ADM1 — 10 departments
echo "  Downloading ADM1 (departments)..."
curl -sL "https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ/geoBoundaries-HTI-ADM1.geojson" \
  -o "$GEO_DIR/hti-adm1-raw.geojson" || \
  echo "  ⚠️  ADM1 download failed — place hti-adm1.geojson in public/geo/ manually"

# ADM2 — 42 arrondissements
echo "  Downloading ADM2 (arrondissements)..."
curl -sL "https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ/geoBoundaries-HTI-ADM2.geojson" \
  -o "$GEO_DIR/hti-adm2-raw.geojson" || \
  echo "  ⚠️  ADM2 download failed"

# ADM3 — 145 communes
echo "  Downloading ADM3 (communes)..."
curl -sL "https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/CGAZ/geoBoundaries-HTI-ADM3.geojson" \
  -o "$GEO_DIR/hti-adm3-raw.geojson" || \
  echo "  ⚠️  ADM3 download failed"

# Simplify with mapshaper if available (reduces file size ~70%)
if command -v mapshaper &> /dev/null; then
  echo "🗺️  Simplifying with mapshaper..."
  for level in adm1 adm2 adm3; do
    if [ -f "$GEO_DIR/hti-$level-raw.geojson" ]; then
      mapshaper "$GEO_DIR/hti-$level-raw.geojson" \
        -simplify dp 15% keep-shapes \
        -o format=geojson "$GEO_DIR/hti-$level.geojson"
      echo "  ✅ $level simplified"
    fi
  done
else
  echo "ℹ️  mapshaper not found — copying raw files (install with: npm i -g mapshaper)"
  for level in adm1 adm2 adm3; do
    if [ -f "$GEO_DIR/hti-$level-raw.geojson" ]; then
      cp "$GEO_DIR/hti-$level-raw.geojson" "$GEO_DIR/hti-$level.geojson"
    fi
  done
fi

echo "✅ GeoJSON files ready in public/geo/"
ls -lh "$GEO_DIR/"*.geojson 2>/dev/null || echo "No .geojson files found"
