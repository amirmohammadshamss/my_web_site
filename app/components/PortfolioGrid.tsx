'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from './Icon';
import { format, t } from '@/i18n';

export type PortfolioItem = {
  project: string;
  tag: string;
  thumb: string;
  full: string;
  shot: number;
};

const LIGHTBOX_BUTTON =
  'absolute flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/10 p-0 text-white transition-colors duration-200 hover:bg-brand focus-visible:bg-brand focus-visible:outline-none [&>svg]:h-[22px] [&>svg]:w-[22px]';

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const altFor = (item: PortfolioItem) =>
    format(t.a11y.screenshot, {
      shot: item.shot,
      project: item.project,
      tag: item.tag,
    });

  const open = (position: number) => {
    setIndex(position);
    dialogRef.current?.showModal();
  };

  const step = useCallback(
    (delta: number) => {
      setIndex((current) => (current + delta + items.length) % items.length);
    },
    [items.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      }
    };

    dialog.addEventListener('keydown', onKeyDown);
    return () => dialog.removeEventListener('keydown', onKeyDown);
  }, [step]);

  const current = items[index];

  return (
    <>
      <div className="-mx-[0.5em] flex flex-wrap">
        {items.map((item, position) => (
          <figure
            className="relative m-0 w-full p-[3px] sm:w-1/2 md:w-1/3"
            key={item.thumb}
          >
            {/* A real link to the full image, so it still works without JS. */}
            <a
              href={item.full}
              title={item.project}
              className="group relative block overflow-hidden"
              onClick={(event) => {
                event.preventDefault();
                open(position);
              }}
            >
              {}
              <img
                src={item.thumb}
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
                alt={altFor(item)}
                className="relative block w-full"
              />
              <div
                className={[
                  'absolute top-0 -left-full h-full w-full px-5 py-[5px] text-white',
                  'transition-all duration-300 group-hover:left-0',
                  "before:absolute before:inset-0 before:z-0 before:opacity-80 before:content-['']",
                  /* The template alternated these with :nth-child(even). */
                  position % 2 === 1 ? 'before:bg-brand-alt' : 'before:bg-brand',
                ].join(' ')}
              >
                <h5 className="relative z-[2] my-[10px] block text-base text-white">
                  {item.project}
                </h5>
                <small className="absolute bottom-[10px] left-5 text-[85%] text-white">
                  {item.tag}
                </small>
                <Icon
                  name="image"
                  className="absolute right-5 bottom-[14px] m-0 h-[18px] w-[18px] text-white"
                />
              </div>
            </a>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={t.a11y.lightbox}
        className="m-0 h-full max-h-full w-full max-w-full overflow-hidden border-0 bg-transparent p-0 backdrop:bg-[#212121]/[0.88]"
      >
        <div className="flex h-full w-full items-center justify-center px-5 py-[60px]">
          {current ? (
            <figure className="relative m-0 max-w-page text-center">
              <img
                className="mx-auto block max-h-[calc(100vh-140px)] max-w-full rounded-lg shadow-image"
                src={current.full}
                alt={altFor(current)}
              />
              <figcaption className="mt-[14px] font-display text-sm tracking-[0.04em] text-white uppercase">
                {current.project}
              </figcaption>
            </figure>
          ) : null}
        </div>

        <button
          type="button"
          className={`${LIGHTBOX_BUTTON} top-[14px] right-[14px]`}
          aria-label={t.a11y.close}
          onClick={() => dialogRef.current?.close()}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <button
          type="button"
          className={`${LIGHTBOX_BUTTON} top-1/2 left-[14px] -translate-y-1/2`}
          aria-label={t.a11y.previousImage}
          onClick={() => step(-1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          className={`${LIGHTBOX_BUTTON} top-1/2 right-[14px] -translate-y-1/2`}
          aria-label={t.a11y.nextImage}
          onClick={() => step(1)}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
