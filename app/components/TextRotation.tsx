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

  return (
    <div className="text-rotation">
      {titles.map((title, position) => (
        <div
          key={title}
          className={`item${position === index ? ' is-active' : ''}`}
          aria-hidden={position !== index}
        >
          <div className="sp-subtitle">{title}</div>
        </div>
      ))}
    </div>
  );
}
