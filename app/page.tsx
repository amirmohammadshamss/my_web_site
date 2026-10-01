import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import { Icon } from './components/Icon';
import TextRotation from './components/TextRotation';
import {
  BLOCK_TITLE,
  BTN_SECONDARY,
  COL_HALF,
  COL_THIRD,
  COL_TWO_THIRDS,
  HEADER_PANEL,
  PAGE_SECTION,
  ROW,
  SECTION_INNER,
} from './ui';

const SOCIAL_LINK =
  'mx-px inline-block h-9 w-9 rounded-3xl bg-white text-center text-muted shadow-soft hover:text-muted hover:shadow-lift';

export default function HomePage() {
  const { links } = resume;

  return (
    <section className={PAGE_SECTION}>
      <div className={SECTION_INNER}>
        <div className={`${HEADER_PANEL} relative m-0 px-[30px] py-[50px] md:mb-[25px] md:p-[50px]`}>
          <div className={ROW}>
            <div className={COL_THIRD}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resume.photo}
                width={640}
                height={640}
                alt={format(t.a11y.portrait, { name: resume.name })}
                className="mx-auto max-w-[200px] border-[3px] border-white bg-white shadow-soft transition-all duration-300 hover:-translate-y-[9px] hover:shadow-photo md:mx-0 md:mb-[-75px] md:max-w-[280px]"
              />
            </div>

            <div className={COL_TWO_THIRDS}>
              <div className="text-center">
                <h1 className="mt-[25px] mb-0 text-[44px] font-bold leading-[1.2em] text-white md:mt-[30px] md:text-[54px] md:leading-[1.5em]">
                  {resume.name}
                </h1>
                <TextRotation titles={resume.titles} />
              </div>

              <div className="relative mx-auto mt-5 text-center">
                <a href={links.twitter} aria-label={t.a11y.twitter} rel="me noopener" target="_blank" className={SOCIAL_LINK}>
                  <Icon name="twitter" className="mx-auto my-[10px] block h-4 w-4 fill-current" />
                </a>
                <a href={links.github} aria-label={t.a11y.github} rel="me noopener" target="_blank" className={SOCIAL_LINK}>
                  <Icon name="github" className="mx-auto my-[10px] block h-4 w-4 fill-current" />
                </a>
                <a href={links.linkedin} aria-label={t.a11y.linkedin} rel="me noopener" target="_blank" className={SOCIAL_LINK}>
                  <Icon name="linkedin" className="mx-auto my-[10px] block h-4 w-4 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="px-[30px] pt-5 pb-[50px] lg:px-[50px]">
          <div className={ROW}>
            <div className={COL_HALF}>
              <h3 className={`${BLOCK_TITLE} mb-[10px]`}>
                {t.home.aboutTitle}{' '}
                <span className="text-brand">{t.home.aboutTitleAccent}</span>
              </h3>
              <p className="mb-[10px] text-[15px] font-normal">{resume.summary}</p>

              <div className="mt-[15px] mr-5">
                <a href={links.resume} className={BTN_SECONDARY}>
                  {t.home.downloadResume}
                </a>
              </div>

              <div className="mt-[15px] mr-5">
                <a href={links.portfolio} className={BTN_SECONDARY}>
                  {t.home.downloadPortfolio}
                </a>
              </div>
            </div>

            <div className={COL_HALF}>
              <ul className="m-0 mt-5 inline-block list-none p-0 md:mt-0">
                {resume.facts.map((fact) => (
                  <li key={fact.label} className="my-[6px] text-left">
                    <span className="inline-block min-w-[120px]">{fact.label}</span>
                    <span className="inline-block text-muted">{fact.value}</span>
                  </li>
                ))}
                <li className="my-[6px] text-left">
                  <span className="inline-block min-w-[120px]">{t.home.factEmail}</span>
                  <span className="inline-block text-muted">
                    <a href={`mailto:${links.email}`}>{links.email}</a>
                  </span>
                </li>
                <li className="my-[6px] text-left">
                  <span className="inline-block min-w-[120px]">{t.home.factPhone}</span>
                  <span className="inline-block text-muted">
                    <a href={`tel:${links.phoneHref}`}>{links.phone}</a>
                  </span>
                </li>
                <li className="my-[6px] text-left">
                  <span className="inline-block min-w-[120px]">{t.home.factLinkedin}</span>
                  <span className="inline-block text-muted">
                    <a href={links.linkedin}>{links.linkedinLabel}</a>
                  </span>
                </li>
                <li className="my-[6px] text-left">
                  <span className="inline-block min-w-[120px]">{t.home.factGithub}</span>
                  <span className="inline-block text-muted">
                    <a href={links.github}>{links.githubLabel}</a>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
