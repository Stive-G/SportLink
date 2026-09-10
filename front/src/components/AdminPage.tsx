import { Reservation, User } from '../types';

type AdminPageProps = {
  isAdmin: boolean;
  users: User[];
  reservations: Reservation[];
  onLogout: () => void;
};

export function AdminPage({ isAdmin, users, reservations, onLogout }: AdminPageProps) {
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

  const activeReservations = reservations.filter((reservation) => reservation.status !== 'RETURNED');

  return (
    <section className="utility-page admin-page">
      <header className="utility-head admin-head">
        <div>
          <p className="section-kicker">Table de gestion</p>
          <h1>Vue d’ensemble du stock</h1>
          <p>Utilisateurs, mouvements de matériel et réservations en cours au même endroit.</p>
        </div>
        <button type="button" className="secondary-button" onClick={onLogout}>
          Se déconnecter
        </button>
      </header>

      <dl className="admin-stats">
        <div>
          <dt>Utilisateurs</dt>
          <dd>{users.length}</dd>
        </div>
        <div>
          <dt>Réservations</dt>
          <dd>{reservations.length}</dd>
        </div>
        <div>
          <dt>En circulation</dt>
          <dd>{activeReservations.length}</dd>
        </div>
      </dl>

      <div className="admin-columns">
        <section className="admin-ledger">
          <div className="workbench-label">
            <span>REGISTRE / UTILISATEURS</span>
            <strong>{users.length} comptes</strong>
          </div>
          <div className="admin-list">
            {users.map((user) => (
              <article key={user.id}>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <b>{user.role}</b>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-ledger">
          <div className="workbench-label">
            <span>REGISTRE / RÉSERVATIONS</span>
            <strong>{activeReservations.length} actives</strong>
          </div>
          <div className="admin-list">
            {reservations.map((reservation) => (
              <article key={reservation.id}>
                <div>
                  <strong>{reservation.equipmentName}</strong>
                  <span>{reservation.userEmail ?? 'Utilisateur inconnu'}</span>
                </div>
                <b>{reservation.status}</b>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
