import { FormEvent } from 'react';
import { RecommendationResult } from '../types';
import { RecommendationResultCard } from './RecommendationResultCard';

type RecommendationsPageProps = {
  isMember: boolean;
  loading: boolean;
  prompt: string;
  result: RecommendationResult | null;
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
      <section className="utility-page compact-utility-page">
        <header className="utility-head">
          <p className="section-kicker">Espace membre</p>
          <h1>Connexion requise</h1>
          <p>L’aide au choix membre utilise le catalogue lié à ton compte et à tes réservations.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="utility-page recommendation-page">
      <header className="utility-head">
        <p className="section-kicker">Aide au choix membre</p>
        <h1>Préparer une réservation à partir d’une activité</h1>
        <p>
          Décris ce que tu veux organiser. SportLink compare la demande au catalogue et te donne
          une sélection à vérifier avant de réserver.
        </p>
      </header>

      <div className="recommendation-workbench">
        <form className="recommendation-form" onSubmit={onSubmit}>
          <div className="workbench-label">
            <span>DEMANDE</span>
            <strong>Contexte de la séance</strong>
          </div>
          <label className="field">
            <span>Activité</span>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Ex. : basket en gymnase, 10 joueurs, ateliers puis match."
              required
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Recherche...' : 'Chercher dans le stock'}
          </button>
        </form>

        <div className="recommendation-output">
          <div className="workbench-label">
            <span>RÉSULTAT</span>
            <strong>Matériel suggéré</strong>
          </div>
          <RecommendationResultCard result={result} />
        </div>
      </div>
    </section>
  );
}
