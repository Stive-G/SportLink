import { Reservation, Page } from '../types';

type ReservationsPageProps = {
  reservations: Reservation[];
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
};

export function ReservationsPage({
  reservations,
  isLoggedIn,
  onNavigate,
}: ReservationsPageProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Mes reservations</p>
        <h2>Historique de location</h2>
        <p className="description">
          GET /reservations/me.
        </p>
      </div>

      <div className="grid">
        {reservations.map((reservation) => (
          <article className="card" key={reservation.id}>
            <p className="card-title">{reservation.equipment}</p>
            <ul className="simple-list">
              <li>Debut : {reservation.startDate}</li>
              <li>Fin : {reservation.endDate}</li>
              <li>Statut : {reservation.status}</li>
            </ul>
            <button type="button" className="secondary-button" onClick={() => onNavigate('catalogue')}>
              Retourner le materiel
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
