import { MouseEvent } from 'react';
import { blogArticles } from '../data/public-content';

type BlogPageProps = {
  onNavigate: (path: string) => void;
};

export function BlogPage({ onNavigate }: BlogPageProps) {
  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  return (
    <section className="content blog-page">
      <header className="page-intro guide-intro">
        <p className="section-kicker">Bibliothèque SportLink</p>
        <h1>Guides pour préparer une activité sportive</h1>
        <p>
          Des repères concrets sur le choix du matériel, l’organisation d’une séance et
          l’utilisation de l’assistant SportLink. Le but est simple : arriver sur le terrain avec
          un plan clair et adapté au contexte.
        </p>
      </header>

      <div className="guide-note">
        <strong>{blogArticles.length} guides publiés</strong>
        <span>Contenu public · lecture libre</span>
      </div>

      <div className="guide-index" aria-label="Tous les guides SportLink">
        {blogArticles.map((article, index) => (
          <article className="guide-index-row" key={article.slug}>
            <span className="guide-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="guide-copy">
              <p className="guide-meta">{article.category} / {article.readingTime}</p>
              <h2>{article.title}</h2>
              <p>{article.summary}</p>
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
          <h2>Passer du guide à un plan concret</h2>
          <p>
            Les guides expliquent quoi prévoir. La bibliothèque matériel et l’assistant permettent
            ensuite de transformer ces repères en plan de séance.
          </p>
        </div>
        <a
          className="signal-button"
          href="/assistant"
          onClick={(event) => handleNavigation(event, '/assistant')}
        >
          Ouvrir l’assistant
        </a>
      </aside>
    </section>
  );
}
