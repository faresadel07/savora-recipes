/**
 * Generate all PWA / favicon variants from the master image at
 * `public/zaytoun-logo.jpg`. Run with `node scripts/generate-icons.mjs`
 * any time the master is replaced.
 *
 * Outputs:
 *   public/favicon.png         (32x32 transparent crop, for browser tab)
 *   public/icon-192.png        (PWA)
 *   public/icon-512.png        (PWA)
 *   public/icon-maskable.png   (PWA, inner safe area)
 *   public/apple-touch-icon.png (iOS home screen)
 */

import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');
const SOURCE = resolve(PUBLIC, 'zaytoun-logo.jpg');

async function renderStandard(size, outName) {
  // Standard square — fit the image so nothing gets cropped.
  const buf = await sharp(SOURCE)
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(resolve(PUBLIC, outName), buf);
  console.log(`  wrote ${outName} (${buf.length} bytes)`);
}

async function renderMaskable(size, outName) {
  // Maskable icons need a "safe area" inside the inner 80% so the OS can
  // crop into a circle/squircle without clipping the artwork.
  const inner = Math.round(size * 0.78);
  const padding = Math.round((size - inner) / 2);
  const innerBuf = await sharp(SOURCE)
    .resize(inner, inner, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .toBuffer();

  const buf = await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    },
  })
    .composite([{ input: innerBuf, top: padding, left: padding }])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(resolve(PUBLIC, outName), buf);
  console.log(`  wrote ${outName} (${buf.length} bytes)`);
}

async function main() {
  console.log(`Generating icons from ${SOURCE} ...`);
  await renderStandard(32, 'favicon-32.png');
  await renderStandard(192, 'icon-192.png');
  await renderStandard(512, 'icon-512.png');
  await renderStandard(180, 'apple-touch-icon.png');
  await renderMaskable(512, 'icon-maskable.png');
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
