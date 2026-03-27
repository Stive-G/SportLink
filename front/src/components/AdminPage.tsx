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
      <section className="content">
        <div className="card">
          <p className="card-title">Acces reserve a l admin</p>
          <p className="description small">
            Connecte-toi avec un compte ADMIN pour voir cette vue.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Espace admin</p>
        <h2>Vue back-office connectee au backend</h2>
        <p className="description">
          Utilisateurs charges depuis GET /users et reservations chargees depuis GET /reservations.
        </p>
      </div>

      <div className="grid">
        <article className="card">
          <p className="card-title">Utilisateurs</p>
          <ul className="simple-list">
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email} - {user.role}
              </li>
            ))}
          </ul>
        </article>

        <article className="card">
          <p className="card-title">Reservations en cours</p>
          <ul className="simple-list">
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                {reservation.equipmentName} - {reservation.userEmail ?? 'Utilisateur inconnu'} - {reservation.status}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <button type="button" className="secondary-button" onClick={onLogout}>
        Se deconnecter
      </button>
    </section>
  );
}
