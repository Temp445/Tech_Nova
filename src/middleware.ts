import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Step 1: Setup intl middleware separately
const intlMiddleware = createIntlMiddleware(routing);

// Define keyword → redirect path mapping
const keywordRedirectMap: Record<string, string> = {
    'design': '/products/68789b738e88e69dea3a892f',
    'web-design': '/products/68789b738e88e69dea3a892f',
};

// Step 3: Known paths that should never be redirected
const knownPaths = new Set([
  '/',
  '/products'
]);

// Helper: should skip based on static file or API
function isSkippable(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // static assets
  );
}

// Helper: matches keyword
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

//  Final unified middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[middleware] Path:', pathname);

  const response = intlMiddleware(request);

  // Skip internal or static files
  if (isSkippable(pathname)) {
    console.log('[middleware] Skipping static/API:', pathname);
    return response || NextResponse.next();
  }

   const basePath = stripLocale(pathname);
  if (knownPaths.has(basePath) || pathname.startsWith('/products/')) {
    console.log('[middleware] Known path allowed:', basePath);
    return response || NextResponse.next();
  }

  // Keyword redirect 
  const redirectTo = getRedirectFromKeyword(pathname);
  if (redirectTo) {
    console.log(`[middleware] Redirect keyword found → ${redirectTo}`);
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

    // return Home page
     console.log('[middleware] Invalid route. Redirecting to /');
  return NextResponse.redirect(new URL('/', request.url));
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api|.*\\..*).*)',
  ],
};