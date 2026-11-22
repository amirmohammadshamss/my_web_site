import type { ReactNode } from 'react';

import { HEADER_PANEL, PAGE_CONTENT, PAGE_SECTION, SECTION_INNER } from '../ui';

export default function ShowcasePage({
  heading,
  intro,
  children,
}: {
  heading: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <section className={PAGE_SECTION}>
      <div className={SECTION_INNER}>
        <header
          className={`${HEADER_PANEL} px-[30px] py-8 text-center text-white md:px-[50px]`}
        >
          <h1 className="m-0 text-3xl leading-tight text-inherit md:text-[44px]">
            {heading}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed">{intro}</p>
        </header>
        <div className={`${PAGE_CONTENT} bg-white`}>{children}</div>
      </div>
    </section>
  );
}
