import { FormEvent } from 'react';
import { RecommendationResult } from '../types';
import { RecommendationResultCard } from './RecommendationResultCard';

type RecommendationsDemoPageProps = {
  loading: boolean;
  prompt: string;
  result: RecommendationResult | null;
  isMember: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onNavigate: (path: string) => void;
  onSavePlan: () => void;
};

export function RecommendationsDemoPage({
  loading,
  prompt,
  result,
  isMember,
  onPromptChange,
  onSubmit,
  onNavigate,
  onSavePlan,
}: RecommendationsDemoPageProps) {
  return (
    <section className="utility-page recommendation-page">
      <header className="utility-head">
        <p className="section-kicker">Assistant SportLink</p>
        <h1>Prépare ta séance à partir de ton contexte</h1>
        <p>
          Décris le sport, le nombre de personnes, la durée, le niveau ou le lieu. L’assistant
          transforme ces informations en matériel conseillé et en repères d’organisation.
        </p>
      </header>

      <div className="recommendation-workbench">
        <form className="recommendation-form" onSubmit={onSubmit}>
          <div className="workbench-label">
            <span>CONTEXTE</span>
            <strong>Ta séance</strong>
          </div>

          <label className="field">
            <span>Décris l’activité</span>
            <textarea
              value={prompt}
              onChange={(event) => onPromptChange(event.target.value)}
              placeholder="Ex. : football dehors, 10 personnes, 1h30, niveau débutant."
              required
            />
          </label>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Préparation…' : 'Préparer la séance'}
          </button>
        </form>

        <div className="recommendation-output">
          <div className="workbench-label">
            <span>PLAN</span>
            <strong>Proposition SportLink</strong>
          </div>
          <RecommendationResultCard result={result} />

          {result ? (
            <div className="assistant-save-row">
              {isMember ? (
                <button type="button" className="primary-button" onClick={onSavePlan} disabled={loading}>
                  Sauvegarder dans Mes plans
                </button>
              ) : (
                <button type="button" className="secondary-button" onClick={() => onNavigate('/login')}>
                  Se connecter pour sauvegarder
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <aside className="method-note">
        <div>
          <p className="section-kicker">Comment l’utiliser</p>
          <h2>Un assistant de préparation, pas un service de location.</h2>
        </div>
        <p>
          SportLink ne possède pas le matériel et ne réserve aucun terrain. La proposition sert à
          préparer une séance et doit être adaptée aux règles du lieu, au niveau des participants
          et au matériel réellement à ta disposition.
        </p>
        <button type="button" className="text-button" onClick={() => onNavigate('/blog/ia-recommandation-sportive')}>
          Lire le guide
        </button>
      </aside>
    </section>
  );
}
