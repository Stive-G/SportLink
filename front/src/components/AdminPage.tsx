import { Reservation } from '../types';

type AdminPageProps = {
  isAdmin: boolean;
  reservations: Reservation[];
  onLogout: () => void;
};

export function AdminPage({ isAdmin, reservations, onLogout }: AdminPageProps) {
  if (!isAdmin) {
    return (
      <section className="content">
        <div className="card">
          <p className="card-title">Acces reserve a l admin</p>
          <p className="description small">
            Connecte-toi avec un email contenant `admin` pour tester cette vue.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Espace admin</p>
        <h2>Gestion du catalogue et des adherents</h2>
        <p className="description">
          CRUD equipment, la liste des utilisateurs et la vue de toutes les reservations.
        </p>
      </div>

      <div className="grid">
        <article className="card">
          <p className="card-title">Actions materiel</p>
          <ul className="simple-list">
            <li>GET /equipment</li>
            <li>POST /equipment</li>
            <li>PATCH /equipment/:id</li>
            <li>DELETE /equipment/:id</li>
          </ul>
        </article>

        <article className="card">
          <p className="card-title">Utilisateurs</p>
          <ul className="simple-list">
            <li>GET /users</li>
            <li>ADMIN et MEMBER separes</li>
          </ul>
        </article>

        <article className="card">
          <p className="card-title">Reservations en cours</p>
          <ul className="simple-list">
            {reservations.map((reservation) => (
              <li key={reservation.id}>
                {reservation.equipment} - {reservation.status}
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
