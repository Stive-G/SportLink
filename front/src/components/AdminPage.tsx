import { ActivityPlan, User } from '../types';

type AdminPageProps = {
  isAdmin: boolean;
  users: User[];
  plans: ActivityPlan[];
  onLogout: () => void;
};

export function AdminPage({ isAdmin, users, plans, onLogout }: AdminPageProps) {
  if (!isAdmin) {
    return (
      <section className="utility-page compact-utility-page">
        <header className="utility-head">
          <p className="section-kicker">Administration</p>
          <h1>Accès réservé</h1>
          <p>Cette vue est disponible uniquement pour les comptes administrateurs.</p>
        </header>
      </section>
    );
  }

  return (
    <section className="utility-page admin-page">
      <header className="utility-head admin-head">
        <div>
          <p className="section-kicker">Administration</p>
          <h1>Vue d’ensemble SportLink</h1>
          <p>Comptes membres et plans sauvegardés, sans gestion de stock ni réservation physique.</p>
        </div>
        <button type="button" className="secondary-button" onClick={onLogout}>
          Se déconnecter
        </button>
      </header>

      <dl className="admin-stats">
        <div><dt>Utilisateurs</dt><dd>{users.length}</dd></div>
        <div><dt>Plans sauvegardés</dt><dd>{plans.length}</dd></div>
        <div><dt>Sports préparés</dt><dd>{new Set(plans.map((plan) => plan.sport).filter(Boolean)).size}</dd></div>
      </dl>

      <div className="admin-columns">
        <section className="admin-ledger">
          <div className="workbench-label">
            <span>UTILISATEURS</span>
            <strong>{users.length} comptes</strong>
          </div>
          <div className="admin-list">
            {users.map((user) => (
              <article key={user.id}>
                <div><strong>{user.name}</strong><span>{user.email}</span></div>
                <b>{user.role}</b>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-ledger">
          <div className="workbench-label">
            <span>PLANS</span>
            <strong>{plans.length} sauvegardés</strong>
          </div>
          <div className="admin-list">
            {plans.map((plan) => (
              <article key={plan.id}>
                <div>
                  <strong>{plan.title}</strong>
                  <span>{plan.userEmail ?? plan.activity}</span>
                </div>
                <b>{plan.sport ?? 'SPORT'}</b>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
