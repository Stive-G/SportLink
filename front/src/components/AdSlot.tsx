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
  if (pathname === '/' || pathname === '/blog') {
    return true;
  }

  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 2 && segments[0] === 'blog') {
    return blogArticles.some((article) => article.slug === segments[1]);
  }

  if (segments.length === 2 && segments[0] === 'sports') {
    return sportGuides.some((guide) => guide.slug === segments[1]);
  }

  return false;
}

export function AdSlot({ page }: AdSlotProps) {
  const isEligible = isAdSenseEligiblePath(page);

  useEffect(() => {
    if (!enabled || !client || !slot || !isEligible) {
      return;
    }

    const pushAd = () => {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      } catch {
        // Un bloqueur de publicité ou un environnement local ne doit pas casser l'application.
      }
    };

    let script = document.querySelector<HTMLScriptElement>('script[data-sportlink-adsense]');
    if (script) {
      if (window.adsbygoogle) {
        pushAd();
      } else {
        script.addEventListener('load', pushAd, { once: true });
      }
      return () => script?.removeEventListener('load', pushAd);
    }

    script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.sportlinkAdsense = 'true';
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
      encodeURIComponent(client);
    script.addEventListener('load', pushAd, { once: true });
    document.head.appendChild(script);

    return () => script?.removeEventListener('load', pushAd);
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
