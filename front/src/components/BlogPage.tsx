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
      <header className="article-hero blog-hero">
        <p className="eyebrow">Guides SportLink</p>
        <h2>Conseils pour choisir, réserver et organiser son matériel sportif</h2>
        <p className="hero-description">
          La bibliothèque SportLink rassemble des guides pratiques consacrés à la préparation
          d’une activité sportive. Chaque contenu part d’une situation concrète : choisir le bon
          équipement, organiser un groupe, anticiper les quantités ou utiliser une recommandation
          IA sans oublier la disponibilité réelle du stock.
        </p>
        <div className="article-meta">
          <span>{blogArticles.length} guides publiés</span>
          <span>Lecture libre</span>
        </div>
      </header>

      <div className="grid two-columns blog-intro-grid">
        <article className="card prose-card">
          <p className="card-title">Comment utiliser ces guides ?</p>
          <p className="description small">
            Commence par le type d’activité que tu veux préparer, puis vérifie le nombre de
            participants, le lieu et la durée. Les guides donnent une méthode de réflexion ; le
            catalogue confirme ensuite les équipements et quantités réellement disponibles.
          </p>
        </article>
        <article className="card prose-card">
          <p className="card-title">Ce que les guides ne remplacent pas</p>
          <p className="description small">
            Les contenus restent des conseils généraux. Les consignes d’un club, les règles du lieu
            de pratique et les vérifications de sécurité doivent toujours être prises en compte au
            moment d’utiliser le matériel.
          </p>
        </article>
      </div>

      <section className="section-block" aria-labelledby="guide-library-title">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Bibliothèque</p>
            <h2 id="guide-library-title">Tous les guides</h2>
          </div>
        </div>

        <div className="grid guide-card-grid">
          {blogArticles.map((article) => (
            <article className="card article-card" key={article.slug}>
              <div>
                <p className="eyebrow">{article.category} · {article.readingTime}</p>
                <h3>{article.title}</h3>
                <p className="description small">{article.summary}</p>
              </div>
              <a
                className="text-link"
                href={`/blog/${article.slug}`}
                onClick={(event) => handleNavigation(event, `/blog/${article.slug}`)}
              >
                Lire le guide complet
              </a>
            </article>
          ))}
        </div>
      </section>

      <aside className="guide-highlight">
        <div>
          <p className="eyebrow">Après la lecture</p>
          <h3>Passer des conseils au matériel réel</h3>
          <p className="description small">
            Le catalogue public permet de comparer les équipements et leur disponibilité avant de
            se connecter pour effectuer une réservation.
          </p>
        </div>
        <a className="primary-button link-button" href="/equipment" onClick={(event) => handleNavigation(event, '/equipment')}>
          Explorer le catalogue
        </a>
      </aside>
    </section>
  );
}
