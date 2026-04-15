import { blogArticles } from '../data/public-content';

type ArticlePageProps = {
  slug: string;
  onNavigate: (path: string) => void;
};

export function ArticlePage({ slug, onNavigate }: ArticlePageProps) {
  const article = blogArticles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="content">
        <div className="card">
          <p className="card-title">Guide introuvable</p>
          <p className="description small">
            Ce contenu n’existe pas encore. Tu peux revenir à la liste des guides.
          </p>
          <button type="button" className="primary-button" onClick={() => onNavigate('/blog')}>
            Voir les guides
          </button>
        </div>
      </section>
    );
  }

  return (
    <article className="content article-page">
      <div className="card hero-card">
        <p className="eyebrow">{article.category} · {article.readingTime}</p>
        <h2>{article.title}</h2>
        <p className="description">{article.summary}</p>
        {article.relatedSport ? (
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate(`/sports/${article.relatedSport}`)}
          >
            Voir le guide {article.relatedSport}
          </button>
        ) : null}
      </div>

      {article.sections.map((section) => (
        <section className="card editorial-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p className="description">{section.body}</p>
        </section>
      ))}

      <div className="card">
        <p className="card-title">Aller plus loin</p>
        <p className="description small">
          Tu peux consulter le catalogue public ou tester la recommandation IA pour relier
          ces conseils au matériel disponible.
        </p>
        <div className="button-row">
          <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
            Voir le catalogue
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => onNavigate('/recommendations-demo')}
          >
            Tester l’IA
          </button>
        </div>
      </div>
    </article>
  );
}
