'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { Icon } from './Icon';

export type PortfolioItem = {
  project: string;
  tag: string;
  thumb: string;
  full: string;
  shot: number;
};

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  const altFor = (item: PortfolioItem) =>
    `Screenshot ${item.shot} of the ${item.project} ${item.tag} app`;

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
      <div id="portfolio_grid" className="portfolio-grid">
        {items.map((item, position) => (
          <figure className="item" key={item.thumb}>
            {/* A real link to the full image, so it still works without JS. */}
            <a
              href={item.full}
              className="lightbox"
              title={item.project}
              onClick={(event) => {
                event.preventDefault();
                open(position);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumb}
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
                alt={altFor(item)}
              />
              <div>
                <h5 className="name">{item.project}</h5>
                <small>{item.tag}</small>
                <Icon name="image" />
              </div>
            </a>
          </figure>
        ))}
      </div>

      <dialog ref={dialogRef} className="lightbox-dialog" aria-label="Portfolio image viewer">
        <div className="lightbox-inner">
          <figure className="lightbox-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="lightbox-image" src={current.full} alt={altFor(current)} />
            <figcaption className="lightbox-caption">{current.project}</figcaption>
          </figure>
        </div>

        <button
          type="button"
          className="lightbox-button lightbox-close"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <button
          type="button"
          className="lightbox-button lightbox-prev"
          aria-label="Previous image"
          onClick={() => step(-1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          className="lightbox-button lightbox-next"
          aria-label="Next image"
          onClick={() => step(1)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
