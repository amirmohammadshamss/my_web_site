import type { MetadataRoute } from 'next';

import resume from '@/data/resume.json';

export const dynamic = 'force-static';

const ROUTES = ['/', '/resume/', '/portfolio/'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${resume.links.site}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '/' ? 1 : 0.8,
  }));
}
