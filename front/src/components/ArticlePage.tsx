import { MouseEvent, useEffect } from 'react';
import { blogArticles } from '../data/public-content';

type ArticlePageProps = {
  slug: string;
  onNavigate: (path: string) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value + 'T12:00:00'));
}

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const article = blogArticles.find((item) => item.slug === slug);

  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  useEffect(() => {
    if (!article) return;

    const id = 'sportlink-article-schema';
    document.getElementById(id)?.remove();

    const schema = document.createElement('script');
    schema.id = id;
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.summary,
      datePublished: article.publishedAt,
      dateModified: article.updatedAt,
      author: {
        '@type': 'Organization',
        name: article.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'SportLink',
        url: 'https://sportlink-app.site',
      },
      mainEntityOfPage: `https://sportlink-app.site/blog/${article.slug}`,
    });

    document.head.appendChild(schema);
    return () => schema.remove();
  }, [article]);

  if (!article) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="eyebrow">Guide introuvable</p>
          <h2>Ce contenu n’est pas disponible</h2>
          <p className="description small">
            Le lien consulté ne correspond à aucun guide publié sur SportLink.
          </p>
          <a
            className="primary-button link-button"
            href="/blog"
            onClick={(event) => handleNavigation(event, '/blog')}
          >
            Voir tous les guides
          </a>
        </div>
      </section>
    );
  }

  const related = blogArticles
    .filter((item) => item.slug !== article.slug)
    .filter((item) => item.category === article.category || item.relatedSport === article.relatedSport)
    .slice(0, 3);

  return (
    <article className="content article-page">
      <header className="article-hero">
        <p className="eyebrow">{article.category} · {article.readingTime}</p>
        <h1>{article.title}</h1>
        <p className="hero-description">{article.summary}</p>

        <div className="article-meta">
          <span>{article.author}</span>
          <span>Publié le {formatDate(article.publishedAt)}</span>
          <span>Mis à jour le {formatDate(article.updatedAt)}</span>
        </div>

        {article.relatedSport ? (
          <a
            className="secondary-button link-button article-sport-link"
            href={`/sports/${article.relatedSport}`}
            onClick={(event) => handleNavigation(event, `/sports/${article.relatedSport}`)}
          >
            Voir aussi le guide {article.relatedSport}
          </a>
        ) : null}
      </header>

      <section className="article-summary-grid" aria-label="Résumé du guide">
        <div className="article-toc card">
          <p className="card-title">Dans ce guide</p>
          <ol className="simple-list ordered">
            {article.sections.map((section) => (
              <li key={section.heading}>{section.heading}</li>
            ))}
          </ol>
        </div>

        <div className="article-key-points card">
          <p className="card-title">À retenir</p>
          <ul className="simple-list spacious-list">
            {article.keyTakeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div className="article-body">
        {article.sections.map((section, index) => (
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

      {article.sources?.length ? (
        <section className="article-sources">
          <p className="section-kicker">Sources et références</p>
          <p className="description small">
            Les conseils de SportLink sont rédigés et structurés par SportLink. Lorsque le guide
            s’appuie sur une source publique externe, elle est indiquée ci-dessous.
          </p>
          <ul className="simple-list">
            {article.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noreferrer">{source.label}</a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <aside className="article-method-note">
        <div>
          <p className="section-kicker">Méthode SportLink</p>
          <h2>Un guide aide à préparer, il ne remplace pas les règles du lieu.</h2>
        </div>
        <p>
          Les informations pratiques doivent toujours être adaptées au niveau du groupe, à l’état
          réel du terrain et aux consignes du gestionnaire. SportLink ne réserve ni terrain ni
          matériel et ne garantit pas l’ouverture d’une installation.
        </p>
      </aside>

      <section className="article-next">
        <div>
          <p className="eyebrow">Passer à l’action</p>
          <h2>Préparer maintenant une séance</h2>
          <p className="description small">
            Cherche d’abord un lieu ou décris directement ton groupe à l’Assistant SportLink.
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

      {related.length > 0 ? (
        <section className="related-guides">
          <p className="section-kicker">À lire ensuite</p>
          <div className="related-guide-grid">
            {related.map((item) => (
              <a
                href={`/blog/${item.slug}`}
                className="related-guide-card"
                onClick={(event) => handleNavigation(event, `/blog/${item.slug}`)}
                key={item.slug}
              >
                <span>{item.category} · {item.readingTime}</span>
                <strong>{item.title}</strong>
                <p>{item.summary}</p>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
