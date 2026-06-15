export function stripHtml(html?: string): string {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}

export function minutesToText(min?: number): string {
  if (!min || min <= 0) return '·';
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

export function fmtNumber(n?: number, digits = 0): string {
  if (n == null) return '·';
  const lang = typeof document !== 'undefined' && document.documentElement.lang === 'ar' ? 'ar-EG' : undefined;
  return n.toLocaleString(lang, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
