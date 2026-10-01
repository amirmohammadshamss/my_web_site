import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import PortfolioGrid from '../components/PortfolioGrid';
import { HEADER_PANEL, PAGE_CONTENT, PAGE_SECTION, SECTION_INNER } from '../ui';

export const metadata: Metadata = {
  title: t.portfolio.metaTitle,
  description: format(t.portfolio.metaDescription, { name: resume.name }),
  alternates: { canonical: '/portfolio/' },
};

export default function PortfolioPage() {
  return (
    <section className={PAGE_SECTION}>
      <div className={SECTION_INNER}>
        <div
          className={`${HEADER_PANEL} m-0 border-0 px-[30px] py-[15px] text-center md:px-[50px] md:py-[30px]`}
        >
          <h2 className="m-0 text-[33px] text-white md:text-[44px]">
            {t.portfolio.heading}
          </h2>
        </div>

        <div className={`${PAGE_CONTENT} bg-white`}>
          <PortfolioGrid items={resume.portfolio} />
        </div>
      </div>
    </section>
  );
}
