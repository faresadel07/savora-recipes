/**
 * Build a proper 1200x630 social preview card from the zaytoun-logo image.
 * The card is centered on a warm cream background with the logo on the
 * left and "Zaytoun" + tagline on the right, all rendered as one JPEG
 * that WhatsApp, Telegram, X, and Facebook can read.
 *
 * Run with `node scripts/generate-og-image.mjs`.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

const W = 1200;
const H = 630;
const CREAM = { r: 0xFD, g: 0xFB, b: 0xF6 };

const logoBuf = readFileSync(resolve(PUBLIC, 'zaytoun-logo.jpg'));

// Round the logo into a circle 380x380
const LOGO = 380;
const logoCircle = await sharp(logoBuf)
  .resize(LOGO, LOGO, { fit: 'cover' })
  .composite([
    {
      input: Buffer.from(
        `<svg width="${LOGO}" height="${LOGO}"><circle cx="${LOGO / 2}" cy="${LOGO / 2}" r="${LOGO / 2}" fill="white"/></svg>`,
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .brand { font-family: Inter, -apple-system, "SF Pro Display", "Segoe UI", system-ui, sans-serif; }
    .title { font-size: 130px; font-weight: 800; fill: #1a1814; letter-spacing: -4px; }
    .tag1  { font-size: 38px; font-weight: 500; fill: #5a5145; letter-spacing: -0.5px; }
    .tag2  { font-size: 28px; font-weight: 500; fill: #8a7b66; letter-spacing: -0.3px; }
    .ar    { font-size: 56px; font-weight: 600; fill: #b8853a; letter-spacing: 0; font-family: "Noto Sans Arabic", "IBM Plex Sans Arabic", sans-serif; }
  </style>
  <text class="brand title" x="540" y="280">Zaytoun</text>
  <text class="brand ar"    x="540" y="345">زيتون</text>
  <text class="brand tag1"  x="540" y="430">A hand-picked corner of the internet</text>
  <text class="brand tag1"  x="540" y="480">for recipes worth cooking.</text>
  <text class="brand tag2"  x="540" y="540">Recipes. Films. Markets. Chefs. Skills.</text>
</svg>
`;

const out = await sharp({
  create: { width: W, height: H, channels: 3, background: CREAM },
})
  .composite([
    { input: logoCircle, top: Math.round((H - LOGO) / 2), left: 90 },
    { input: Buffer.from(textSvg), top: 0, left: 0 },
  ])
  .jpeg({ quality: 90 })
  .toBuffer();

const target = resolve(PUBLIC, 'og-image.jpg');
writeFileSync(target, out);
console.log(`Generated ${target} (${out.length} bytes)`);
