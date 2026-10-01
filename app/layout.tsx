import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import resume from '@/data/resume.json';
import HashRedirect from './components/HashRedirect';
import SiteHeader from './components/SiteHeader';
import './styles/app.css';

const SITE = resume.links.site;
const TITLE = `${resume.name} — ${resume.jobTitle}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: `${resume.name} Resume`,
    template: `%s — ${resume.name}`,
  },
  description: resume.metaDescription,
  authors: [{ name: resume.name, url: SITE }],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'profile',
    siteName: resume.name,
    url: SITE,
    title: TITLE,
    description: resume.metaDescription,
    locale: 'en_US',
    firstName: resume.firstName,
    lastName: resume.lastName,
    images: [
      {
        url: resume.photo,
        width: 640,
        height: 640,
        alt: `Portrait of ${resume.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary',
    site: resume.links.twitterHandle,
    creator: resume.links.twitterHandle,
    title: TITLE,
    description: resume.metaDescription,
    images: [{ url: resume.photo, alt: `Portrait of ${resume.name}` }],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2eca7f',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: resume.name,
  url: `${SITE}/`,
  image: `${SITE}${resume.photo}`,
  jobTitle: resume.jobTitle,
  description: resume.metaDescription,
  email: `mailto:${resume.links.email}`,
  telephone: resume.links.phoneHref,
  address: {
    '@type': 'PostalAddress',
    addressLocality: resume.location.city,
    addressCountry: resume.location.countryCode,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: resume.education[0].institution,
  },
  knowsLanguage: resume.languages,
  knowsAbout: resume.knowsAbout,
  sameAs: [resume.links.linkedin, resume.links.github, resume.links.twitter],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Roboto:ital,wght@0,100;0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        <HashRedirect />
        <div className="relative h-auto w-full">
          <SiteHeader
            name={resume.name}
            firstName={resume.firstName}
            lastName={resume.lastName}
          />
          {/*
            The mobile header is fixed at 50px tall, so the main column is
            padded past it. The template positioned this absolutely against a
            zero-height parent, which worked only by accident.
          */}
          <main className="relative h-auto w-full pt-[50px] lg:pt-0">
            <div className="relative z-[1] w-full">
              <div className="relative mx-auto h-auto w-full overflow-hidden pt-[15px] [perspective:1500px] lg:pt-[100px]">
                {children}
              </div>
            </div>
          </main>
        </div>
        <footer className="fixed inset-x-0 bottom-0">
          <div className="mb-3 block text-center text-xs text-muted">
            &copy; 2026 {resume.name} &middot;{' '}
            <a href={`mailto:${resume.links.email}`}>Email</a> &middot;{' '}
            <a href={resume.links.github} rel="noopener" target="_blank">
              GitHub
            </a>{' '}
            &middot;{' '}
            <a href={resume.links.linkedin} rel="noopener" target="_blank">
              LinkedIn
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
