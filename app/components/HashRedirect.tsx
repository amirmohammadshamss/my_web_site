'use client';

import { useEffect } from 'react';

/*
 * The old site was a single page with #home / #resume / #portfolio hashes.
 * Those links are already shared, so forward them to the real routes once.
 */
const ROUTES = new Set(['home', 'resume', 'portfolio']);

export default function HashRedirect() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '').split('/')[0];
    if (!ROUTES.has(hash)) {
      return;
    }
    window.location.replace(hash === 'home' ? '/' : `/${hash}/`);
  }, []);

  return null;
}
