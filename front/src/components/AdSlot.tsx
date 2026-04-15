import { useEffect } from 'react';

type AdSlotProps = {
  page: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const enabled = import.meta.env.VITE_ADSENSE_ENABLED === 'true';
const client = import.meta.env.VITE_ADSENSE_CLIENT;
const slot = import.meta.env.VITE_ADSENSE_SLOT;

const allowedPaths = [
  '/',
  '/equipment',
  '/sports',
  '/blog',
  '/guides',
  '/about',
  '/privacy',
  '/terms',
  '/recommendations-demo',
];

export function isAdSenseEligiblePath(pathname: string) {
  return allowedPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}

export function AdSlot({ page }: AdSlotProps) {
  useEffect(() => {
    if (!enabled || !client || !slot || !isAdSenseEligiblePath(page)) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // AdSense peut échouer en local ou avec un bloqueur de publicité sans casser le site.
    }
  }, [page]);

  if (!enabled || !client || !slot || !isAdSenseEligiblePath(page)) {
    return null;
  }

  return (
    <aside className="ad-zone" aria-label="Publicite">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
