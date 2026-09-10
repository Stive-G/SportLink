import { useEffect } from 'react';
import { blogArticles, sportGuides } from '../data/public-content';

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

export function isAdSenseEligiblePath(pathname: string) {
  if (pathname === '/' || pathname === '/blog' || pathname === '/guides') {
    return true;
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.split('/').filter(Boolean)[1];
    return blogArticles.some((article) => article.slug === slug);
  }

  if (pathname.startsWith('/sports/')) {
    const slug = pathname.split('/').filter(Boolean)[1];
    return sportGuides.some((guide) => guide.slug === slug);
  }

  return false;
}

export function AdSlot({ page }: AdSlotProps) {
  const isEligible = isAdSenseEligiblePath(page);

  useEffect(() => {
    if (!enabled || !client || !slot || !isEligible) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Un bloqueur de publicité ou un environnement local ne doit pas casser l'application.
    }
  }, [page, isEligible]);

  if (!enabled || !client || !slot || !isEligible) {
    return null;
  }

  return (
    <aside className="ad-zone" aria-label="Publicité">
      <span className="ad-label">Publicité</span>
      <ins
        key={page}
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
