import { MouseEvent } from 'react';
import { blogArticles } from '../data/public-content';

type BlogPageProps = {
  onNavigate: (path: string) => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value + 'T12:00:00'));
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  return (
    <section className="content blog-page">
      <header className="page-intro guide-intro">
        <p className="section-kicker">Guides SportLink</p>
        <h1>Préparer une activité sportive avec des repères concrets</h1>
        <p>
          Les guides SportLink sont rédigés pour répondre à des situations simples : choisir un
          lieu, organiser un groupe, construire des rotations, préparer une séance en extérieur ou
          utiliser l’assistant de manière raisonnable. Ils complètent les outils du site avec du
          contenu éditorial original et régulièrement mis à jour.
        </p>
      </header>

      <section className="editorial-promise">
        <div>
          <span className="section-kicker">Notre ligne éditoriale</span>
          <h2>Des guides écrits pour être utilisés sur le terrain</h2>
        </div>
        <p>
          SportLink ne republie pas les fiches Data ES comme des articles. Les données publiques
          servent à trouver des lieux ; les guides apportent une méthode, des exemples, des points
          de contrôle et des décisions pratiques. Lorsqu’une source externe est utile, elle est
          indiquée dans l’article concerné.
        </p>
      </section>

      <div className="guide-note">
        <strong>{blogArticles.length} guides publiés</strong>
        <span>Rédaction SportLink · lecture libre · mises à jour visibles</span>
      </div>

      <div className="guide-index" aria-label="Tous les guides SportLink">
        {blogArticles.map((article, index) => (
          <article className="guide-index-row" key={article.slug}>
            <span className="guide-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="guide-copy">
              <p className="guide-meta">
                {article.category} / {article.readingTime} / mis à jour {formatDate(article.updatedAt)}
              </p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
              <div className="guide-takeaway-preview">
                {article.keyTakeaways.slice(0, 2).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
            <a
              className="guide-open"
              href={`/blog/${article.slug}`}
              onClick={(event) => handleNavigation(event, `/blog/${article.slug}`)}
              aria-label={`Lire : ${article.title}`}
            >
              Lire
            </a>
          </article>
        ))}
      </div>

      <aside className="catalogue-callout">
        <div>
          <span className="section-kicker">Après la lecture</span>
          <h2>Passer du conseil à une séance concrète</h2>
          <p>
            Cherche un lieu avec Data ES ou décris directement ton groupe dans l’Assistant
            SportLink. Un compte est utile uniquement si tu veux sauvegarder le plan obtenu.
          </p>
        </div>
        <div className="button-row">
          <a
            className="signal-button"
            href="/places"
            onClick={(event) => handleNavigation(event, '/places')}
          >
            Trouver un lieu
          </a>
          <a
            className="signal-button"
            href="/assistant"
            onClick={(event) => handleNavigation(event, '/assistant')}
          >
            Ouvrir l’assistant
          </a>
        </div>
      </aside>
    </section>
  );
}
