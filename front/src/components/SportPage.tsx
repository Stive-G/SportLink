import { MouseEvent } from 'react';
import { blogArticles, sportGuides } from '../data/public-content';

type SportPageProps = {
  sportSlug: string;
  onNavigate: (path: string) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value + 'T12:00:00'));
}

export function SportPage({ sportSlug, onNavigate }: SportPageProps) {
  const guide = sportGuides.find((item) => item.slug === sportSlug);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  if (!guide) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="eyebrow">Sport introuvable</p>
          <h2>Aucun guide n’est publié pour ce sport</h2>
          <p className="description small">
            Consulte les guides SportLink ou utilise l’assistant pour préparer une autre activité.
          </p>
          <a
            className="primary-button link-button"
            href="/blog"
            onClick={(event) => handleNavigation(event, '/blog')}
          >
            Voir les guides
          </a>
        </div>
      </section>
    );
  }

  const relatedArticles = blogArticles
    .filter((article) => article.relatedSport === guide.slug)
    .slice(0, 3);

  return (
    <article className="content sport-page">
      <header className="article-hero sport-hero">
        <p className="eyebrow">Guide sport · {guide.sport}</p>
        <h1>{guide.title}</h1>
        <p className="hero-description">{guide.intro}</p>
        <div className="article-meta">
          <span>Rédaction SportLink</span>
          <span>Mis à jour le {formatDate(guide.updatedAt)}</span>
          <span>Lecture libre</span>
        </div>
      </header>

      <section className="sport-checklist">
        <p className="section-kicker">Avant de commencer</p>
        <h2>Checklist de préparation</h2>
        <ul className="simple-list spacious-list">
          {guide.practicalAdvice.map((advice) => (
            <li key={advice}>{advice}</li>
          ))}
        </ul>
      </section>

      <div className="article-body sport-guide-body">
        {guide.sections.map((section, index) => (
          <section className="article-editorial-section" key={section.heading}>
            <span className="article-section-number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <aside className="article-method-note">
        <div>
          <p className="section-kicker">À garder en tête</p>
          <h2>Le terrain réel reste prioritaire sur le plan.</h2>
        </div>
        <p>
          Vérifie toujours l’état du lieu, les règles d’accès et les contraintes du groupe avant de
          démarrer. Les guides SportLink donnent une méthode de préparation, pas une consigne
          universelle applicable à tous les terrains.
        </p>
      </aside>

      <section className="article-next">
        <div>
          <p className="eyebrow">Préparer la séance</p>
          <h2>Trouve un lieu ou demande un plan adapté à ton groupe</h2>
          <p className="description small">
            Utilise Data ES pour repérer une installation puis précise le nombre de personnes et la
            durée dans l’Assistant SportLink.
          </p>
        </div>
        <div className="button-row">
          <a
            className="primary-button link-button"
            href="/places"
            onClick={(event) => handleNavigation(event, '/places')}
          >
            Trouver un lieu
          </a>
          <a
            className="secondary-button link-button"
            href="/assistant"
            onClick={(event) => handleNavigation(event, '/assistant')}
          >
            Ouvrir l’assistant
          </a>
        </div>
      </section>

      {relatedArticles.length > 0 ? (
        <section className="related-guides">
          <p className="section-kicker">Guides liés à {guide.sport}</p>
          <div className="related-guide-grid">
            {relatedArticles.map((article) => (
              <a
                href={`/blog/${article.slug}`}
                className="related-guide-card"
                onClick={(event) => handleNavigation(event, `/blog/${article.slug}`)}
                key={article.slug}
              >
                <span>{article.category} · {article.readingTime}</span>
                <strong>{article.title}</strong>
                <p>{article.summary}</p>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
