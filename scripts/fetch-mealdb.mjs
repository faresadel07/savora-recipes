/**
 * One-shot script: download every recipe from TheMealDB into a single JSON file
 * that the app can ship offline. Run with `node scripts/fetch-mealdb.mjs`.
 *
 * Total cost: about 320 calls (1 categories + 14 filter-by-category + ~300
 * full lookups). TheMealDB is generous with the free tier; we still throttle
 * to 8 parallel requests to be polite.
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://www.themealdb.com/api/json/v1/1';
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = resolve(__dirname, '..', 'src', 'data', 'mealdb-cache.json');

const CONCURRENCY = 4;
const BATCH_DELAY_MS = 400;
const MAX_RETRIES = 5;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchJson(url, attempt = 0) {
  const res = await fetch(url);
  if (res.status === 429 || res.status === 503) {
    if (attempt >= MAX_RETRIES) throw new Error(`HTTP ${res.status} after ${attempt} retries: ${url}`);
    const wait = Math.min(60_000, 2_000 * Math.pow(2, attempt));
    await sleep(wait);
    return fetchJson(url, attempt + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

async function runInBatches(items, fn, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    const slice = items.slice(i, i + size);
    const results = await Promise.all(slice.map(fn));
    out.push(...results);
    process.stdout.write(`\r  fetched ${Math.min(i + size, items.length)} / ${items.length}`);
    if (i + size < items.length) await sleep(BATCH_DELAY_MS);
  }
  process.stdout.write('\n');
  return out;
}

async function main() {
  console.log('Fetching categories ...');
  const { categories } = await fetchJson(`${BASE}/categories.php`);
  const categoryNames = categories.map((c) => c.strCategory);
  console.log(`  ${categoryNames.length} categories.`);

  console.log('Fetching recipe lists per category ...');
  const idSet = new Set();
  for (const name of categoryNames) {
    const { meals } = await fetchJson(`${BASE}/filter.php?c=${encodeURIComponent(name)}`);
    if (Array.isArray(meals)) {
      for (const m of meals) idSet.add(m.idMeal);
    }
  }
  const ids = [...idSet];
  console.log(`  ${ids.length} unique recipe ids.`);

  console.log('Looking up full recipe details ...');
  const lookups = await runInBatches(
    ids,
    async (id) => {
      const data = await fetchJson(`${BASE}/lookup.php?i=${id}`);
      return data.meals?.[0] ?? null;
    },
    CONCURRENCY,
  );

  const meals = lookups.filter(Boolean);
  console.log(`  ${meals.length} full recipes fetched.`);

  await mkdir(dirname(OUT_PATH), { recursive: true });
  await writeFile(OUT_PATH, JSON.stringify({ meals, fetchedAt: new Date().toISOString() }, null, 0));
  const bytes = JSON.stringify({ meals }).length;
  console.log(`Wrote ${OUT_PATH} (${(bytes / 1024).toFixed(1)} KB)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
