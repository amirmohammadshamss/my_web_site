'use client';

import { useEffect, useState } from 'react';

const INTERVAL = 3800;

export default function TextRotation({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (titles.length < 2) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % titles.length);
    }, INTERVAL);

    return () => window.clearInterval(timer);
  }, [titles.length]);

  /* All items share one grid cell, so the block keeps the height of the
     tallest instead of collapsing the way absolute positioning would. */
  return (
    <div className="grid">
      {titles.map((title, position) => (
        <div
          key={title}
          aria-hidden={position !== index}
          className={[
            '[grid-area:1/1] transition-[opacity,transform] duration-[450ms] ease-in-out motion-reduce:transition-none',
            position === index
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-125 opacity-0',
          ].join(' ')}
        >
          <div className="m-0 mt-[15px] text-[18px] text-white md:mt-0">{title}</div>
        </div>
      ))}
    </div>
  );
}
