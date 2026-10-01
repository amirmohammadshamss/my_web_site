import type { MetadataRoute } from 'next';

import resume from '@/data/resume.json';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${resume.links.site}/sitemap.xml`,
  };
}
