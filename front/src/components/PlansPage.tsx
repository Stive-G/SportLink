import { ActivityPlan } from '../types';

type PlansPageProps = {
  plans: ActivityPlan[];
  isLoggedIn: boolean;
  activePlanId: string;
  onDelete: (planId: string) => void;
  onNavigate: (path: string) => void;
};

export function PlansPage({
  plans,
  isLoggedIn,
  activePlanId,
  onDelete,
  onNavigate,
}: PlansPageProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="utility-page plans-page">
      <header className="utility-head">
        <p className="section-kicker">Mes plans</p>
        <h1>Mes séances sauvegardées</h1>
        <p>
          Garde ici les préparations qui te servent vraiment : activité, matériel conseillé et
          points d’organisation. Les lieux Data ES ne sont jamais importés automatiquement.
        </p>
      </header>

      {plans.length === 0 ? (
        <div className="empty-ledger">
          <span>AUCUN PLAN</span>
          <p>Utilise l’Assistant SportLink pour préparer une séance puis sauvegarde le résultat.</p>
          <button type="button" className="primary-button" onClick={() => onNavigate('/assistant')}>
            Ouvrir l’assistant
          </button>
        </div>
      ) : (
        <div className="plan-grid">
          {plans.map((plan) => (
            <article className="plan-card" key={plan.id}>
              <div className="plan-card-head">
                <div>
                  <p className="section-kicker">{plan.sport || 'activité sportive'}</p>
                  <h2>{plan.title}</h2>
                </div>
                {plan.createdAt ? (
                  <time>{new Date(plan.createdAt).toLocaleDateString('fr-FR')}</time>
                ) : null}
              </div>

              <p className="plan-activity">{plan.activity}</p>

              {plan.placeName ? (
                <p className="plan-place">
                  <strong>Lieu :</strong> {plan.placeName}
                </p>
              ) : null}

              {plan.equipment.length > 0 ? (
                <div className="plan-kit">
                  <p className="card-title">Kit conseillé</p>
                  <ul className="simple-list">
                    {plan.equipment.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        {item.reason ? <span> — {item.reason}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {plan.tips.length > 0 ? (
                <div>
                  <p className="card-title">Repères</p>
                  <ul className="simple-list">
                    {plan.tips.slice(0, 4).map((tip) => <li key={tip}>{tip}</li>)}
                  </ul>
                </div>
              ) : null}

              <button
                type="button"
                className="text-button danger-text-button"
                disabled={activePlanId === plan.id}
                onClick={() => onDelete(plan.id)}
              >
                {activePlanId === plan.id ? 'Suppression…' : 'Supprimer ce plan'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
