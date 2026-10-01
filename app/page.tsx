import resume from '@/data/resume.json';
import { Icon } from './components/Icon';
import TextRotation from './components/TextRotation';

export default function HomePage() {
  const { links } = resume;

  return (
    <section className="pt-page pt-page-current" data-id="home">
      <div className="section-inner start-page-content">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={resume.photo}
                  width={640}
                  height={640}
                  alt={`Portrait of ${resume.name}`}
                />
              </div>
            </div>

            <div className="col-sm-8 col-md-8 col-lg-8">
              <div className="title-block">
                <h1>{resume.name}</h1>
                <TextRotation titles={resume.titles} />
              </div>

              <div className="social-links">
                <a href={links.twitter} aria-label="Twitter" rel="me noopener" target="_blank">
                  <Icon name="twitter" />
                </a>
                <a href={links.github} aria-label="GitHub" rel="me noopener" target="_blank">
                  <Icon name="github" />
                </a>
                <a href={links.linkedin} aria-label="LinkedIn" rel="me noopener" target="_blank">
                  <Icon name="linkedin" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="page-content">
          <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6">
              <div className="about-me">
                <div className="block-title">
                  <h3>
                    About <span>Me</span>
                  </h3>
                </div>
                <p>{resume.summary}</p>
              </div>

              <div className="download-resume">
                <a href={links.resume} className="btn btn-secondary">
                  Download Resume
                </a>
              </div>

              <div className="download-resume">
                <a href={links.portfolio} className="btn btn-secondary">
                  Download Portfolio
                </a>
              </div>
            </div>

            <div className="col-sm-6 col-md-6 col-lg-6">
              <ul className="info-list">
                {resume.facts.map((fact) => (
                  <li key={fact.label}>
                    <span className="title">{fact.label}</span>
                    <span className="value">{fact.value}</span>
                  </li>
                ))}
                <li>
                  <span className="title">e-mail</span>
                  <span className="value">
                    <a href={`mailto:${links.email}`}>{links.email}</a>
                  </span>
                </li>
                <li>
                  <span className="title">Phone</span>
                  <span className="value">
                    <a href={`tel:${links.phoneHref}`}>{links.phone}</a>
                  </span>
                </li>
                <li>
                  <span className="title">LinkedIn</span>
                  <span className="value">
                    <a href={links.linkedin}>{links.linkedinLabel}</a>
                  </span>
                </li>
                <li>
                  <span className="title">GitHub</span>
                  <span className="value">
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
