import { blogArticles } from '../data/public-content';

type BlogPageProps = {
  onNavigate: (path: string) => void;
};

export function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Guides SportLink</p>
        <h2>Conseils pour réserver et préparer son matériel sportif</h2>
        <p className="description">
          Ces guides expliquent comment choisir le bon équipement, organiser une activité
          collective et utiliser la recommandation IA de SportLink de manière utile.
        </p>
      </div>

      <div className="grid">
        {blogArticles.map((article) => (
          <article className="card article-card" key={article.slug}>
            <p className="eyebrow">{article.category} · {article.readingTime}</p>
            <h3>{article.title}</h3>
            <p className="description small">{article.summary}</p>
            <button
              type="button"
              className="text-button"
              onClick={() => onNavigate(`/blog/${article.slug}`)}
            >
              Lire le guide
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
