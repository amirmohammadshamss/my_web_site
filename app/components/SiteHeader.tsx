'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Icon } from './Icon';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/resume/', label: 'Resume' },
  { href: '/portfolio/', label: 'Portfolio' },
];

type SiteHeaderProps = {
  name: string;
  firstName: string;
  lastName: string;
};

/* Takes the few strings it needs as props. Importing the resume data here
   would pull the whole file into the client bundle. */
export default function SiteHeader({ name, firstName, lastName }: SiteHeaderProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticked, setSticked] = useState(false);

  /* Sticky header, as the old scroll handler did at 20px. */
  useEffect(() => {
    const onScroll = () => setSticked(window.scrollY >= 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Collapse the mobile menu when the viewport grows past the breakpoint. */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        id="site_header"
        className={[
          'header',
          menuOpen ? '' : 'mobile-menu-hide',
          sticked ? 'sticked' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <div className="header-content">
          <div className="site-title-block mobile-hidden">
            <div className="site-title">
              {firstName} <span>{lastName}</span>
            </div>
          </div>

          <div className="site-nav">
            <ul id="nav" className="site-main-menu">
              {NAV.map((item) => (
                <li key={item.href} className={isActive(item.href) ? 'active' : undefined}>
                  <Link href={item.href} onClick={closeMenu}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="mobile-header mobile-visible">
        <div className="mobile-logo-container">
          <div className="mobile-site-title">{name}</div>
        </div>

        <button
          type="button"
          className="menu-toggle mobile-visible"
          aria-label="Toggle navigation menu"
          aria-controls="site_header"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="bars" />
        </button>
      </div>
    </>
  );
}
