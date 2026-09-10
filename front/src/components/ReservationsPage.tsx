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
    <section className="utility-page reservations-page">
      <header className="utility-head">
        <p className="section-kicker">Mes réservations</p>
        <h1>Matériel sorti et historique</h1>
        <p>
          Retrouve ici les équipements réservés et signale leur retour dès qu’ils reviennent au
          local matériel.
        </p>
      </header>

      {reservations.length === 0 ? (
        <div className="empty-ledger">
          <span>AUCUN MOUVEMENT</span>
          <p>Tu n’as pas encore de réservation enregistrée.</p>
        </div>
      ) : (
        <div className="reservation-ledger">
          <div className="ledger-head" aria-hidden="true">
            <span>Matériel</span>
            <span>Départ</span>
            <span>Retour prévu</span>
            <span>Statut</span>
            <span>Action</span>
          </div>

          {reservations.map((reservation) => (
            <article className="ledger-row" key={reservation.id}>
              <strong>{reservation.equipmentName}</strong>
              <span>{new Date(reservation.startDate).toLocaleDateString('fr-FR')}</span>
              <span>{new Date(reservation.endDate).toLocaleDateString('fr-FR')}</span>
              <span className={`ledger-status ledger-status-${reservation.status.toLowerCase()}`}>
                {reservation.status}
              </span>
              <button
                type="button"
                className="text-button"
                disabled={reservation.status === 'RETURNED' || activeReservationId === reservation.id}
                onClick={() => onReturn(reservation.id)}
              >
                {activeReservationId === reservation.id ? 'Mise à jour...' : 'Déclarer le retour'}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
