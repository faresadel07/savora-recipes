/**
 * One-shot script: generate PWA icons (192, 512, maskable) from an inline SVG
 * so we don't depend on a designer. Run with `node scripts/generate-icons.mjs`.
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

// Tight, Apple-style logo: dark plate with a single S and a terracotta dot.
function svg({ size, safeArea }) {
  const padding = safeArea ? size * 0.18 : 0;
  const fontSize = (size - padding * 2) * 0.62;
  const dotR = (size - padding * 2) * 0.06;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#13110F"/>
  <text x="50%" y="50%"
        dy="0.04em"
        text-anchor="middle"
        dominant-baseline="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', system-ui, sans-serif"
        font-weight="600"
        font-size="${fontSize}"
        fill="#FFFFFF"
        letter-spacing="-0.04em">S</text>
  <circle cx="${size * 0.74}" cy="${size * 0.58}" r="${dotR}" fill="#B83D2E"/>
</svg>`;
}

async function write(name, size, safe) {
  const buf = await sharp(Buffer.from(svg({ size, safeArea: safe })))
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(resolve(PUBLIC, name), buf);
  console.log(`  wrote ${name} (${buf.length} bytes)`);
}

async function main() {
  console.log('Generating PWA icons ...');
  await write('icon-192.png', 192, false);
  await write('icon-512.png', 512, false);
  await write('icon-maskable.png', 512, true);
  // Apple touch icon (180x180 PNG, rounded handled by iOS)
  await write('apple-touch-icon.png', 180, false);
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
