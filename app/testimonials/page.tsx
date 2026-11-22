import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import ShowcasePage from '../components/ShowcasePage';

export const metadata: Metadata = {
  title: t.testimonials.heading,
  description: format(t.testimonials.metaDescription, { name: resume.name }),
  alternates: { canonical: '/testimonials/' },
};

const recommendationsUrl = `${resume.links.linkedin}#recommendations`;

export default function TestimonialsPage() {
  return (
    <ShowcasePage heading={t.testimonials.heading} intro={t.testimonials.intro}>
      <div className="grid gap-4 md:grid-cols-2">
        {resume.recommendations.map(({ name, excerpt, summary }) => (
          <figure
            key={name}
            className="flex flex-col rounded-lg border border-l-4 border-rule border-l-brand p-5"
          >
            <blockquote
              cite={recommendationsUrl}
              className="text-lg leading-relaxed text-heading"
            >
              <p>“{excerpt}”</p>
            </blockquote>
            <figcaption className="mt-5 flex-1">
              <p className="font-display text-base font-semibold text-heading">{name}</p>
              <p className="mt-1 text-base leading-relaxed text-nav">{summary}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <a
        className="mt-8 inline-block text-base font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
        href={recommendationsUrl}
      >
        {t.testimonials.linkedinLink}
      </a>
    </ShowcasePage>
  );
}
