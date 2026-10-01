/*
 * Class strings shared by more than one component, so the repeated patterns
 * from the old stylesheet stay in one place instead of being copy-pasted
 * across pages.
 */

/* .pt-page - the card's outer wrapper. Below 1033px the template inset it by
   15px and let it size to the viewport; above, it centres at 1032px. */
export const PAGE_SECTION =
  'relative mx-[15px] w-auto max-w-page bg-transparent pb-[50px] xl:mx-auto xl:w-full';

/* .section-inner - the white card itself. */
export const SECTION_INNER =
  'relative overflow-hidden rounded-[15px] bg-white shadow-card';

/* .page-content */
export const PAGE_CONTENT = 'px-[30px] pt-[30px] pb-[50px] lg:px-[50px]';

/* The Bootstrap grid rows, rebuilt with flex. The markup only ever used
   4/6/8/12 columns, all at the same breakpoint, so one boundary covers it. */
export const ROW = 'flex flex-wrap -mx-[15px]';
export const COL = 'w-full px-[15px]';
export const COL_THIRD = `${COL} md:w-1/3`;
export const COL_TWO_THIRDS = `${COL} md:w-2/3`;
export const COL_HALF = `${COL} md:w-1/2`;

/* .block-title h3 */
export const BLOCK_TITLE = 'mt-[5px] mb-[25px] text-[21px]';

/* .btn + .btn-secondary */
export const BTN_SECONDARY =
  'inline-block cursor-pointer rounded-[3px] border-0 bg-white px-[1.5em] text-center align-middle font-sans text-sm font-medium uppercase leading-[2.8] whitespace-nowrap text-heading shadow-btn transition-all duration-300 hover:text-heading hover:shadow-btn-hover';

/* .timeline and .timeline-item, including the dot and connector that were
   :before and :after. */
export const TIMELINE = 'border-l-2 border-rule py-[15px]';

export const TIMELINE_ITEM = [
  'relative mb-5 ml-5 border-l-2 border-brand bg-white px-5 pt-[15px] pb-[10px]',
  'shadow-item transition-shadow hover:shadow-item-hover last:mb-0',
  "before:absolute before:top-5 before:-left-[29px] before:z-[2] before:h-3 before:w-3 before:rounded-[10px] before:border-2 before:border-brand before:bg-white before:content-['']",
  "after:absolute after:top-[25px] after:-left-[29px] after:z-[1] after:h-0.5 after:w-[29px] after:rounded-[10px] after:bg-brand after:content-['']",
].join(' ');

export const ITEM_TITLE = 'm-0 block text-base leading-[1.2em]';
export const ITEM_PERIOD = 'mb-2 inline-block text-xs leading-[1.2em] text-brand';
export const ITEM_SMALL =
  'mb-2 ml-[5px] inline-block border-l border-rule pl-2 text-xs leading-[1.2em] text-muted';
export const ITEM_DESCRIPTION = 'mb-[10px] text-[15px] font-normal';

/* The two page headers: a green panel with the diagonal texture over it. */
export const HEADER_PANEL =
  'bg-brand bg-[url(/images/sp_main_bg.png)] bg-cover bg-center bg-no-repeat bg-scroll';
