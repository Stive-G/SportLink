type RecommendationsPageProps = {
  isLoggedIn: boolean;
};

export function RecommendationsPage({ isLoggedIn }: RecommendationsPageProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Assistant IA</p>
        <h2>Recommandation de materiel</h2>
        <p className="description">
          POST /recommendations
        </p>
      </div>

      <div className="grid">
        <article className="card">
          <p className="card-title">Demande utilisateur</p>
          <p className="description small">
            Je veux organiser un match de foot en salle avec 8 amis samedi soir.
          </p>
        </article>

        <article className="card">
          <p className="card-title">Suggestion IA</p>
          <ul className="simple-list">
            <li>2 ballons de football</li>
            <li>10 chasubles</li>
            <li>8 coupelles d entrainement</li>
            <li>1 pompe pour ballon</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
