export default async (request: Request) => {
  const url = new URL(request.url);
  const targetPath = url.pathname.replace(/^\/aceppap/, ''); // keep leading slash
  const targetUrl = `https://aceppap5.netlify.app${targetPath}${url.search}`;

  return fetch(targetUrl, {
    headers: request.headers,
    method: request.method,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });
};

export const config = {
  path: '/aceppap/*',
};
