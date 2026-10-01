import Link from 'next/link';
import { t } from '@/i18n';

import {
  BTN_SECONDARY,
  COL,
  HEADER_PANEL,
  PAGE_CONTENT,
  PAGE_SECTION,
  ROW,
  SECTION_INNER,
} from './ui';

export const metadata = {
  title: t.notFound.metaTitle,
};

export default function NotFound() {
  return (
    <section className={PAGE_SECTION}>
      <div className={SECTION_INNER}>
        <div
          className={`${HEADER_PANEL} m-0 border-0 px-[30px] py-[15px] text-center md:px-[50px] md:py-[30px]`}
        >
          <h2 className="m-0 text-[33px] text-white md:text-[44px]">
            {t.notFound.heading}
          </h2>
        </div>
        <div className={`${PAGE_CONTENT} bg-white`}>
          <div className={ROW}>
            <div className={COL}>
              <p className="mb-[10px] text-[15px] font-normal">{t.notFound.body}</p>
              <div className="mt-[15px]">
                <Link href="/" className={BTN_SECONDARY}>
                  {t.notFound.backHome}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
