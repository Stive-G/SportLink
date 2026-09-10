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
          Des repères concrets sur le choix du matériel, les quantités, l’organisation d’une
          séance et le suivi des réservations. Le but est simple : arriver sur le terrain avec ce
          qu’il faut, pas avec tout le stock.
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
          <h2>Vérifier ce qui est vraiment disponible</h2>
          <p>
            Les guides expliquent quoi prévoir. Le catalogue indique ensuite le stock réel avant
            la connexion et la réservation.
          </p>
        </div>
        <a
          className="signal-button"
          href="/equipment"
          onClick={(event) => handleNavigation(event, '/equipment')}
        >
          Ouvrir le catalogue
        </a>
      </aside>
    </section>
  );
}
