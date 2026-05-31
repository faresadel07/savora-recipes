/**
 * Generate PWA icons (192, 512, maskable) from an inline olive SVG.
 * Run with `node scripts/generate-icons.mjs` whenever the favicon design
 * changes.
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

function svg({ size, safeArea }) {
  // For maskable icons, shrink the olive into the inner 76% so the OS can
  // crop it into a round/squircle without losing the leaves.
  const scale = safeArea ? 0.78 : 1;
  const offset = (size * (1 - scale)) / 2;
  const inner = size * scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#FFFFFF"/>
  <g transform="translate(${offset} ${offset}) scale(${inner / 100})">
    <defs>
      <radialGradient id="olive" cx="38%" cy="38%" r="68%">
        <stop offset="0%" stop-color="#A8C18C"/>
        <stop offset="55%" stop-color="#7A9362"/>
        <stop offset="100%" stop-color="#3F5530"/>
      </radialGradient>
      <linearGradient id="leaf" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7A9362"/>
        <stop offset="100%" stop-color="#3F5530"/>
      </linearGradient>
    </defs>
    <path d="M52 28 C66 14 86 16 90 28 C84 36 66 36 52 30 Z" fill="url(#leaf)"/>
    <path d="M48 28 C34 14 14 16 10 28 C16 36 34 36 48 30 Z" fill="url(#leaf)"/>
    <rect x="48.5" y="26" width="3" height="10" rx="1" fill="#3F5530"/>
    <ellipse cx="50" cy="62" rx="28" ry="30" fill="url(#olive)"/>
    <ellipse cx="40" cy="52" rx="5.5" ry="11" fill="#FFFFFF" opacity="0.32"/>
    <ellipse cx="40" cy="51" rx="2.5" ry="6" fill="#FFFFFF" opacity="0.55"/>
    <circle cx="62" cy="68" r="6.5" fill="#0F0F0E"/>
    <circle cx="63" cy="68.5" r="4.5" fill="#B83D2E"/>
    <circle cx="62" cy="67.5" r="1.4" fill="#E8A28E" opacity="0.65"/>
  </g>
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
  console.log('Generating Zaytoun icons ...');
  await write('icon-192.png', 192, false);
  await write('icon-512.png', 512, false);
  await write('icon-maskable.png', 512, true);
  await write('apple-touch-icon.png', 180, false);
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
