import { Reservation } from '../types';

type ReservationsPageProps = {
  reservations: Reservation[];
  isLoggedIn: boolean;
  activeReservationId: string;
  onReturn: (reservationId: string) => void;
};

export function ReservationsPage({
  reservations,
  isLoggedIn,
  activeReservationId,
  onReturn,
}: ReservationsPageProps) {
  if (!isLoggedIn) {
    return null;
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Mes reservations</p>
        <h2>Historique de location</h2>
        <p className="description">Donnees chargees depuis GET /reservations/me.</p>
      </div>

      <div className="grid">
        {reservations.map((reservation) => (
          <article className="card" key={reservation.id}>
            <p className="card-title">{reservation.equipmentName}</p>
            <ul className="simple-list">
              <li>Debut : {new Date(reservation.startDate).toLocaleDateString('fr-FR')}</li>
              <li>Fin : {new Date(reservation.endDate).toLocaleDateString('fr-FR')}</li>
              <li>Statut : {reservation.status}</li>
            </ul>
            <button
              type="button"
              className="secondary-button"
              disabled={reservation.status === 'RETURNED' || activeReservationId === reservation.id}
              onClick={() => onReturn(reservation.id)}
            >
              {activeReservationId === reservation.id ? 'Retour...' : 'Retourner le materiel'}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
