import type { Metadata } from 'next';

import resume from '@/data/resume.json';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Experience, education and technical skills of ${resume.name}, ${resume.jobTitle}.`,
  alternates: { canonical: '/resume/' },
};

export default function ResumePage() {
  return (
    <section className="pt-page pt-page-current" data-id="resume">
      <div className="section-inner custom-page-content">
        <div className="page-header color-1">
          <h2>Resume</h2>
        </div>

        <div className="page-content">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="block">
                <div className="block-title">
                  <h3>Education</h3>
                </div>

                <div className="timeline">
                  {resume.education.map((item) => (
                    <div className="timeline-item" key={item.title}>
                      <h4 className="item-title">{item.title}</h4>
                      <span className="item-period">{item.period}</span>
                      <span className="item-small">{item.institution}</span>
                      {item.description ? (
                        <p className="item-description">{item.description}</p>
                      ) : null}
                    </div>
                  ))}
                </div>

                <div className="block-title">
                  <h3>
                    Coding <span>Skills</span>
                  </h3>
                </div>

                <div className="timeline">
                  <div className="timeline-item">
                    {resume.skills.map((skill) => (
                      <p className="item-description" key={skill.label}>
                        <strong>{skill.label}:</strong> {skill.value}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="block">
                <div className="block-title">
                  <h3>Experience</h3>
                </div>

                <div className="timeline">
                  {resume.experience.map((job) => (
                    <div className="timeline-item" key={`${job.company}-${job.period}`}>
                      <h4 className="item-title">{job.title}</h4>
                      <span className="item-period">{job.period}</span>
                      <span className="item-small">
                        {[job.company, job.location].filter(Boolean).join(', ')}
                      </span>
                      {job.highlights.map((highlight) => (
                        <p className="item-description" key={highlight}>
                          {highlight}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="block">
                <div className="center download-resume">
                  <a href={resume.links.resume} className="btn btn-secondary">
                    Download Resume
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
