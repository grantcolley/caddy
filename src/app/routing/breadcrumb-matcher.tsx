import { type BreadcrumbItem } from './types';

export function getBreadcrumbTrail(
  pathname: string,
  breadcrumbByPattern: Map<string, BreadcrumbItem[]>
):
  | { pattern: string; trail: BreadcrumbItem[]; params: Record<string, string> }
  | undefined {
  const path = normalizePathname(pathname);

  let best:
    | {
        pattern: string;
        trail: BreadcrumbItem[];
        params: Record<string, string>;
        score: number;
      }
    | undefined;

  for (const [pattern, trail] of breadcrumbByPattern.entries()) {
    const m = match(pattern, path);
    if (!m.matched) continue;

    // Prefer more specific routes:
    // static segments > params > splats
    const score = m.staticCount * 1000 - m.paramCount * 10 - m.splatCount * 100;

    if (!best || score > best.score)
      best = { pattern, trail, params: m.params, score };
  }

  if (!best) return undefined;
  return { pattern: best.pattern, trail: best.trail, params: best.params };
}

function match(
  pattern: string,
  pathname: string
): {
  matched: boolean;
  params: Record<string, string>;
  staticCount: number;
  paramCount: number;
  splatCount: number;
} {
  const pat = split(pattern);
  const url = split(pathname);

  const params: Record<string, string> = {};
  let staticCount = 0;
  let paramCount = 0;
  let splatCount = 0;

  let i = 0;
  let j = 0;

  while (i < pat.length && j < url.length) {
    const p = pat[i]!;
    const u = url[j]!;

    if (p === '*') {
      params['*'] = url.slice(j).join('/');
      splatCount++;
      i++;
      j = url.length;
      break;
    }

    if (p.startsWith(':')) {
      params[p.slice(1)] = decodeURIComponent(u);
      paramCount++;
      i++;
      j++;
      continue;
    }

    if (decodeURIComponent(p) !== decodeURIComponent(u)) {
      return {
        matched: false,
        params: {},
        staticCount: 0,
        paramCount: 0,
        splatCount: 0,
      };
    }

    staticCount++;
    i++;
    j++;
  }

  // Allow trailing splat
  if (i < pat.length && pat[i] === '*') {
    params['*'] = url.slice(j).join('/');
    splatCount++;
    i++;
    j = url.length;
  }

  const matched = i === pat.length && j === url.length;
  return {
    matched,
    params: matched ? params : {},
    staticCount,
    paramCount,
    splatCount,
  };
}

function split(p: string): string[] {
  const n = normalizePathname(p);
  if (n === '/') return [];
  return n.slice(1).split('/');
}

function normalizePathname(p: string): string {
  const s = p.trim() || '/';
  const withSlash = s.startsWith('/') ? s : `/${s}`;
  return withSlash !== '/' ? withSlash.replace(/\/+$/, '') : '/';
}
