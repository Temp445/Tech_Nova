export default async (request: Request) => {
  const url = new URL(request.url);

  const targetPath = url.pathname.replace(/^\/aceppap/, ''); 
  const targetUrl = `https://project2-site.netlify.app${targetPath}${url.search}`;

  return fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
  });
};

export const config = {
  path: ['/aceppap', '/aceppap/*'],
};
