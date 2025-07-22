import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const allowedRegions = [
  'tn', 'ka', 'mh', 'dl', 'ts', 'hr',
  'se', 'uaedxb', 'uaesh', 'uaead'
];

const intlMiddleware = createIntlMiddleware(routing);

const keywordRedirectMap: Record<string, string> = {
  'design': '/products/68789b738e88e69dea3a892f',
  'web-design': '/products/68789b738e88e69dea3a892f',
};

const knownPaths = new Set([
  '/',
  '/products',
  '/web-development',
  '/features'
]);

function isSkippable(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  );
}

function getRedirectFromKeyword(pathname: string): string | null {
  for (const keyword in keywordRedirectMap) {
    if (pathname.toLowerCase().includes(keyword.toLowerCase())) {
      return keywordRedirectMap[keyword];
    }
  }
  return null;
}

function stripLocale(pathname: string): string {
  const localePattern = /^\/(en|hi)(\/|$)/;
  return pathname.replace(localePattern, '/');
}

// ✅ NEW: Remove any region segment from the full path
function removeRegionFromPath(pathname: string): string | null {
  const parts = pathname.split('/').filter(Boolean);
  const filtered = parts.filter(part => !allowedRegions.includes(part));
  if (filtered.length !== parts.length) {
    return '/' + filtered.join('/');
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log('[middleware] Path:', pathname);

  const response = intlMiddleware(request);

  if (isSkippable(pathname)) {
    return response || NextResponse.next();
  }

  // ✅ Strip region from any part of the path
  const cleanedPath = removeRegionFromPath(pathname);
  if (cleanedPath !== null && cleanedPath !== pathname) {
    console.log(`[middleware] Region slug removed. Redirecting to: ${cleanedPath}`);
    const url = request.nextUrl.clone();
    url.pathname = cleanedPath || '/';
    return NextResponse.redirect(url);
  }

  const basePath = stripLocale(pathname);
  if (knownPaths.has(basePath) || pathname.startsWith('/products/')) {
    return response || NextResponse.next();
  }

  const redirectTo = getRedirectFromKeyword(pathname);
  if (redirectTo) {
    console.log(`[middleware] Keyword redirect → ${redirectTo}`);
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  console.log('[middleware] Unknown path. Redirecting to /');
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api|.*\\..*).*)',
  ],
};
