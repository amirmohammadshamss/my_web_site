import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import {
  BLOCK_TITLE,
  BTN_SECONDARY,
  COL,
  COL_HALF,
  HEADER_PANEL,
  ITEM_DESCRIPTION,
  ITEM_PERIOD,
  ITEM_SMALL,
  ITEM_TITLE,
  PAGE_CONTENT,
  PAGE_SECTION,
  ROW,
  SECTION_INNER,
  TIMELINE,
  TIMELINE_ITEM,
} from '../ui';

export const metadata: Metadata = {
  title: t.resume.metaTitle,
  description: format(t.resume.metaDescription, {
    name: resume.name,
    jobTitle: resume.jobTitle,
  }),
  alternates: { canonical: '/resume/' },
};

export default function ResumePage() {
  return (
    <section className={PAGE_SECTION}>
      <div className={SECTION_INNER}>
        <div
          className={`${HEADER_PANEL} m-0 border-0 px-[30px] py-[15px] text-center md:px-[50px] md:py-[30px]`}
        >
          <h2 className="m-0 text-[33px] text-white md:text-[44px]">{t.resume.heading}</h2>
        </div>

        <div className={`${PAGE_CONTENT} bg-white`}>
          <div className={ROW}>
            <div className={COL_HALF}>
              <div className="mb-[30px]">
                <h3 className={BLOCK_TITLE}>{t.resume.education}</h3>

                <div className={TIMELINE}>
                  {resume.education.map((item) => (
                    <div className={TIMELINE_ITEM} key={item.title}>
                      <h4 className={ITEM_TITLE}>{item.title}</h4>
                      <span className={ITEM_PERIOD}>{item.period}</span>
                      {item.institution ? (
                        <span className={ITEM_SMALL}>{item.institution}</span>
                      ) : null}
                      {item.description ? (
                        <p className={ITEM_DESCRIPTION}>{item.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                <h3 className={`${BLOCK_TITLE} mt-[25px]`}>
                  {t.resume.skillsTitle}{' '}
                  <span className="text-brand">{t.resume.skillsTitleAccent}</span>
                </h3>

                <div className={TIMELINE}>
                  <div className={TIMELINE_ITEM}>
                    {resume.skills.map((skill) => (
                      <p className={ITEM_DESCRIPTION} key={skill.label}>
                        <strong className="font-bold">{skill.label}:</strong> {skill.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={COL_HALF}>
              <div className="mb-[30px]">
                <h3 className={BLOCK_TITLE}>{t.resume.experience}</h3>

                <div className={TIMELINE}>
                  {resume.experience.map((job) => (
                    <div className={TIMELINE_ITEM} key={`${job.company}-${job.period}`}>
                      <h4 className={ITEM_TITLE}>{job.title}</h4>
                      <span className={ITEM_PERIOD}>{job.period}</span>
                      <span className={ITEM_SMALL}>
                        {[job.company, job.location].filter(Boolean).join(', ')}
                      </span>
                      {job.highlights.map((highlight) => (
                        <p className={ITEM_DESCRIPTION} key={highlight}>
                          {highlight}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={ROW}>
            <div className={COL}>
              <div className="mb-[30px] text-center">
                <a href={resume.links.resume} className={BTN_SECONDARY}>
                  {t.resume.downloadResume}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
