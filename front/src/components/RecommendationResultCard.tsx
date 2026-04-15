import { RecommendationResult } from '../types';

type RecommendationResultCardProps = {
  result: RecommendationResult | null;
};

export function RecommendationResultCard({ result }: RecommendationResultCardProps) {
  if (!result) {
    return (
      <article className="card">
        <p className="card-title">Résultat de la recommandation</p>
        <p className="description small">
          Décris une activité sportive pour voir le matériel conseillé.
        </p>
      </article>
    );
  }

  return (
    <article className="card">
      <p className="card-title">Matériel recommandé</p>
      <p className="description small">{result.explanation}</p>

      <div className="stack">
        {result.recommendedEquipment.map((item) => (
          <div className="recommendation-item" key={`${item.name}-${item.reason}`}>
            <strong>{item.name}</strong>
            <span>
              {item.sport ? `${item.sport} · ` : ''}
              {item.category ?? 'matériel sportif'}
            </span>
            <p>{item.reason}</p>
          </div>
        ))}
      </div>

      <p className="card-title small-title">Conseils</p>
      <ul className="simple-list">
        {result.optionalTips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>
    </article>
  );
}
