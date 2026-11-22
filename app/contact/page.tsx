import type { Metadata } from 'next';

import resume from '@/data/resume.json';
import { format, t } from '@/i18n';
import ShowcasePage from '../components/ShowcasePage';

export const metadata: Metadata = {
  title: t.contact.heading,
  description: format(t.contact.metaDescription, { name: resume.name }),
  alternates: { canonical: '/contact/' },
};

const FIELD_CLASS =
  'w-full rounded-md border border-rule bg-white px-3 py-2.5 text-base leading-normal text-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700';

export default function ContactPage() {
  const { email, linkedin, linkedinLabel } = resume.links;

  return (
    <ShowcasePage heading={t.contact.heading} intro={t.contact.intro}>
      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="rounded-lg border border-rule p-5">
          <h2 className="mb-4 text-xl">{t.contact.formHeading}</h2>
          <form
            action="https://formsubmit.co/f205b2406e3550a6ee56a2a7fde658b1"
            method="post"
            className="space-y-4"
            aria-describedby="contact-form-service"
          >
            <input type="hidden" name="_subject" value={t.contact.emailSubject} />
            <div className="grid gap-1.5">
              <label htmlFor="contact-name" className="text-base font-medium">
                {t.contact.nameLabel}
              </label>
              <input
                id="contact-name"
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                className={FIELD_CLASS}
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-email" className="text-base font-medium">
                {t.contact.emailLabel}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className={FIELD_CLASS}
              />
            </div>
            <div className="grid gap-1.5">
              <label htmlFor="contact-message" className="text-base font-medium">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={6}
                required
                maxLength={5000}
                className={`${FIELD_CLASS} resize-y`}
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-md bg-emerald-800 px-5 py-2.5 text-base font-medium text-white hover:bg-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 sm:w-auto"
            >
              {t.contact.submit}
            </button>
            <p id="contact-form-service" className="text-sm leading-relaxed text-nav">
              {t.contact.formService}
            </p>
          </form>
        </section>
        <section className="min-w-0 rounded-lg border border-rule p-5">
          <h2 className="mb-4 text-xl">{t.contact.directHeading}</h2>
          <dl className="space-y-4 text-base">
            <div>
              <dt className="font-medium">{t.footer.email}</dt>
              <dd>
                <a
                  href={`mailto:${email}`}
                  className="wrap-anywhere text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
                >
                  {email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium">{t.footer.linkedin}</dt>
              <dd>
                <a
                  href={linkedin}
                  className="wrap-anywhere text-emerald-800 underline underline-offset-4 hover:text-emerald-950"
                >
                  {linkedinLabel}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </ShowcasePage>
  );
}
