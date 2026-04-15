import { FormEvent } from 'react';
import { RecommendationResult } from '../types';
import { RecommendationResultCard } from './RecommendationResultCard';

type RecommendationsDemoPageProps = {
  loading: boolean;
  prompt: string;
  result: RecommendationResult | null;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onNavigate: (path: string) => void;
};

export function RecommendationsDemoPage({
  loading,
  prompt,
  result,
  onPromptChange,
  onSubmit,
  onNavigate,
}: RecommendationsDemoPageProps) {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Démo publique IA</p>
        <h2>Décris ton activité, SportLink propose le matériel</h2>
        <p className="description">
          Cette démo montre comment SportLink transforme une demande en langage naturel
          en recommandation de matériel basée sur le catalogue sportif.
        </p>
      </div>

      <div className="grid recommendations-grid">
        <form className="card auth-form" onSubmit={onSubmit}>
          <label className="field">
            <span>Activité à préparer</span>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Je veux faire du foot en salle avec 8 amis."
              required
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Analyse...' : 'Obtenir une recommandation'}
          </button>
        </form>

        <RecommendationResultCard result={result} />
      </div>

      <div className="card">
        <p className="card-title">Pourquoi cette démo est utile ?</p>
        <p className="description small">
          La recommandation IA n’est pas un gadget : elle aide un visiteur à passer
          d’une idée d’activité à une liste d’équipements concrets, réservables ensuite
          avec un compte membre.
        </p>
        <button type="button" className="secondary-button" onClick={() => onNavigate('/blog/ia-recommandation-sportive')}>
          Lire le guide IA
        </button>
      </div>
    </section>
  );
}
