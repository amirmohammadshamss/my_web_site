import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import PortfolioGrid from '../components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: `Selected web and mobile work by ${resume.name}.`,
  alternates: { canonical: '/portfolio/' },
};

export default function PortfolioPage() {
  return (
    <section className="pt-page pt-page-current" data-id="portfolio">
      <div className="section-inner custom-page-content">
        <div className="page-header color-1">
          <h2>Portfolio</h2>
        </div>

        <div className="page-content">
          <div className="portfolio-content">
            <PortfolioGrid items={resume.portfolio} />
          </div>
        </div>
      </div>
    </section>
  );
}
