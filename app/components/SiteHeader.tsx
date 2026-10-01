'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Icon } from './Icon';
import { t } from '@/i18n';

const NAV = [
  { href: '/', label: t.nav.home },
  { href: '/resume/', label: t.nav.resume },
  { href: '/portfolio/', label: t.nav.portfolio },
];

/*
 * Below 992px the header is a green panel that slides in from the right; above
 * it is a transparent bar across the top that turns white and shrinks once the
 * page scrolls. The template wrote that with max-width queries, so everything
 * here reads mobile-first with lg: for the desktop bar.
 */
/*
 * These groups must stay mutually exclusive. Two utilities for the same
 * property at the same breakpoint (`lg:h-[100px]` and `lg:h-[60px]`) are
 * decided by the order Tailwind emits them, not by the order they appear in
 * the class string - so the winner is whichever Tailwind happened to sort
 * last. Only ever emit one of each pair.
 */
const HEADER_BASE = [
  'fixed top-[50px] right-0 z-[1001] h-[calc(100%-50px)] max-w-[320px]',
  'bg-brand transition-all duration-[440ms]',
  '[&_*]:transition-all [&_*]:duration-[440ms]',
  'lg:top-0 lg:z-[2] lg:mr-0 lg:w-full lg:max-w-none lg:overflow-visible',
  'lg:duration-200 lg:[&_*]:duration-200 lg:[&_*]:visible lg:[&_*]:opacity-100',
].join(' ');

/* The off-canvas panel, open vs collapsed (.mobile-menu-hide). */
const HEADER_OPEN = 'w-full overflow-auto shadow-panel';
const HEADER_CLOSED =
  'w-0 -mr-[100%] overflow-hidden shadow-none [&_*]:invisible [&_*]:opacity-0';

/* The desktop bar, at rest vs scrolled (.header.sticked). */
const HEADER_TOP = 'lg:h-[100px] lg:bg-transparent lg:shadow-none';
const HEADER_STICKED = 'lg:h-[60px] lg:bg-white lg:shadow-soft';

const NAV_LINK = [
  'relative m-0 block px-[10px] py-[15px] text-center text-[15px] font-normal leading-none',
  'text-white no-underline',
  "after:absolute after:inset-x-0 after:bottom-2 after:mx-auto after:block after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-150 after:content-['']",
  'lg:mx-5 lg:px-0 lg:py-2 lg:text-nav lg:hover:text-nav',
  'lg:after:bottom-0 lg:after:bg-brand',
].join(' ');

export default function SiteHeader({
  name,
  firstName,
  lastName,
}: {
  name: string;
  firstName: string;
  lastName: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticked, setSticked] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticked(window.scrollY >= 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 992) {
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
          HEADER_BASE,
          menuOpen ? HEADER_OPEN : HEADER_CLOSED,
          sticked ? HEADER_STICKED : HEADER_TOP,
        ].join(' ')}
      >
        <div className="mx-[15px] max-w-page xl:mx-auto">
          <div className="relative z-[1] hidden text-center lg:float-left lg:block">
            <div
              className={[
                'mt-[38px] font-display text-2xl leading-none font-medium text-nav lg:text-xl',
                sticked ? 'lg:mt-[18px]' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {firstName} <span className="text-brand">{lastName}</span>
            </div>
          </div>

          <div className="lg:float-right">
            <ul className="m-0 block p-0">
              {NAV.map((item, index) => (
                <li
                  key={item.href}
                  className={[
                    'm-0 block w-full p-0 lg:relative lg:float-left lg:inline-block lg:w-auto lg:text-center',
                    index === 0 ? 'mt-[25px]' : '',
                    sticked ? 'lg:mt-[13px]' : 'lg:mt-[33px]',
                    index === NAV.length - 1 ? 'lg:[&>a]:mr-0' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className={[
                      NAV_LINK,
                      isActive(item.href)
                        ? 'opacity-100 after:w-[25px]'
                        : 'opacity-60 hover:opacity-100 hover:after:w-[25px]',
                    ].join(' ')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="fixed inset-x-0 z-[1000] inline-block h-[50px] w-full max-w-full bg-brand shadow-soft lg:hidden">
        <div className="mx-5 text-left">
          <div className="float-left m-0 inline-block font-display text-[18px] leading-[50px] font-normal text-white">
            {name}
          </div>
        </div>

        <button
          type="button"
          className="float-right mx-1 block h-[50px] w-[50px] cursor-pointer overflow-hidden border-0 bg-none p-0 text-center"
          aria-label={t.a11y.toggleMenu}
          aria-controls="site_header"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon
            name="bars"
            className="mx-auto my-[14px] block h-[21px] w-[21px] text-white"
          />
        </button>
      </div>
    </>
  );
}
