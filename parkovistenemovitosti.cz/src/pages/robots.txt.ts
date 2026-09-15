import type { APIRoute } from 'astro';

const IS_PREVIEW = import.meta.env.PUBLIC_PREVIEW === 'true';

export const GET: APIRoute = ({ site }) => {
  const body = IS_PREVIEW
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('sitemap.xml', site).href}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
