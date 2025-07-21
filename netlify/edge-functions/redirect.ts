export default async (request: Request) => {
  const url = new URL(request.url);

  // Strip base path `/web-development`
  let targetPath = url.pathname.replace(/^\/web-development/, '');

  // Extract locale from URL path (e.g. /en, /hi)
  const localeMatch = targetPath.match(/^\/([a-z]{2})(\/|$)/);
  const locale = localeMatch?.[1];
  if (locale) {
    targetPath = targetPath.replace(`/${locale}`, '');
  }

  // Construct final proxy URL
  const targetUrl = `https://project2-site.netlify.app/web-development${locale ? `/${locale}` : ''}${targetPath}${url.search}`;

  // Copy safe headers only (some headers like Host, Content-Length will be stripped)
  const filteredHeaders = new Headers();
  request.headers.forEach((value, key) => {
    if (!['host', 'content-length'].includes(key.toLowerCase())) {
      filteredHeaders.set(key, value);
    }
  });

  const proxyResponse = await fetch(targetUrl, {
    method: request.method,
    headers: filteredHeaders,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });

  // Return the proxied response
  return proxyResponse;
};

export const config = {
  path: ['/web-development', '/web-development/*'],
};
