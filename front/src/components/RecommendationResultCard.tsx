import { RecommendationResult } from '../types';

type RecommendationResultCardProps = {
  result: RecommendationResult | null;
};

export function RecommendationResultCard({ result }: RecommendationResultCardProps) {
  if (!result) {
    return (
      <article className="card">
        <p className="card-title">Plan de séance</p>
        <p className="description small">
          Décris une activité sportive pour obtenir une checklist et des conseils d’organisation.
        </p>
      </article>
    );
  }

  return (
    <article className="card">
      <p className="card-title">Checklist conseillée</p>
      <p className="description small">{result.explanation}</p>

      <div className="stack">
        {result.recommendedItems.map((item) => (
          <div className="recommendation-item" key={item.name + item.reason}>
            <strong>{item.name}</strong>
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
