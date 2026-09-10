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
    <section className="utility-page recommendation-page">
      <header className="utility-head">
        <p className="section-kicker">Aide au choix</p>
        <h1>Décris la séance, puis vérifie le stock proposé</h1>
        <p>
          Donne le sport, le nombre de personnes et le contexte. SportLink rapproche la demande du
          catalogue pour sortir une première sélection de matériel.
        </p>
      </header>

      <div className="recommendation-workbench">
        <form className="recommendation-form" onSubmit={onSubmit}>
          <div className="workbench-label">
            <span>FICHE / 01</span>
            <strong>Besoin terrain</strong>
          </div>

          <label className="field">
            <span>Décris l’activité</span>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Ex. : foot en salle, 8 personnes, match d’une heure."
              required
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Recherche...' : 'Chercher dans le catalogue'}
          </button>
        </form>

        <div className="recommendation-output">
          <div className="workbench-label">
            <span>FICHE / 02</span>
            <strong>Sélection proposée</strong>
          </div>
          <RecommendationResultCard result={result} />
        </div>
      </div>

      <aside className="method-note">
        <div>
          <p className="section-kicker">À garder en tête</p>
          <h2>La suggestion ne remplace pas la disponibilité réelle.</h2>
        </div>
        <p>
          Le lieu, le nombre de joueurs et l’état du stock peuvent changer le choix final. Le guide
          dédié explique comment faire cette vérification avant de réserver.
        </p>
        <button type="button" className="text-button" onClick={() => onNavigate('/blog/ia-recommandation-sportive')}>
          Lire le guide
        </button>
      </aside>
    </section>
  );
}
