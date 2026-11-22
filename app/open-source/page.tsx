import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import ShowcasePage from '../components/ShowcasePage';

export const metadata: Metadata = {
  title: t.openSource.heading,
  description: format(t.openSource.metaDescription, { name: resume.name }),
  alternates: { canonical: '/open-source/' },
};

export default function OpenSourcePage() {
  return (
    <ShowcasePage heading={t.openSource.heading} intro={t.openSource.intro}>
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-xl">{t.openSource.projectsHeading}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {resume.repositories.map(
              ({ name, slug, description, technologies, license }) => (
                <li
                  key={slug}
                  className="flex flex-col rounded-lg border border-rule p-5"
                >
                  <h3 className="text-lg">
                    <a
                      className="text-emerald-800 underline-offset-4 hover:text-emerald-950 hover:underline"
                      href={`${resume.links.github}/${slug}`}
                    >
                      {name}
                    </a>
                  </h3>
                  <p className="mt-2 mb-4 flex-1 text-base leading-relaxed">
                    {description}
                  </p>
                  <p className="text-sm leading-relaxed text-nav">
                    {[...technologies, ...(license ? [license] : [])].join(' · ')}
                  </p>
                </li>
              ),
            )}
          </ul>
        </section>
        <a
          className="inline-block text-base font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
          href={`${resume.links.github}?tab=repositories`}
        >
          {t.openSource.githubLink}
        </a>
      </div>
    </ShowcasePage>
  );
}
