import { FormEvent } from 'react';

type RecommendationsPageProps = {
  isMember: boolean;
  loading: boolean;
  prompt: string;
  result: string;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function RecommendationsPage({
  isMember,
  loading,
  prompt,
  result,
  onPromptChange,
  onSubmit,
}: RecommendationsPageProps) {
  if (!isMember) {
    return (
      <section className="content">
        <div className="card">
          <p className="card-title">Espace membre requis</p>
          <p className="description small">
            Connecte-toi avec un compte MEMBER pour utiliser l&apos;assistant IA.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Assistant IA</p>
        <h2>Recommandation de materiel</h2>
        <p className="description">Front branche sur POST /recommendations.</p>
      </div>

      <div className="grid recommendations-grid">
        <form className="card auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Demande utilisateur</span>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Je veux faire du foot en salle avec 8 amis."
              required
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Analyse...' : 'Demander une recommandation'}
          </button>
        </form>

        <article className="card">
          <p className="card-title">Suggestion IA</p>
          <p className="description result-block">
            {result || 'Aucune reponse pour le moment.'}
          </p>
        </article>
      </div>
    </section>
  );
}
