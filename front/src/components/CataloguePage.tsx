import { Equipment, User } from '../types';

type CataloguePageProps = {
  user: User | null;
  equipmentList: Equipment[];
  isMember: boolean;
  activeReservationId: string;
  onGoToAuth: () => void;
  onReserve: (equipmentId: string) => void;
};

export function CataloguePage({
  user,
  equipmentList,
  isMember,
  activeReservationId,
  onGoToAuth,
  onReserve,
}: CataloguePageProps) {
  if (!user) {
    return (
      <section className="content">
        <div className="card">
          <p className="card-title">Connexion requise</p>
          <p className="description small">
            Connecte-toi d&apos;abord pour afficher le catalogue.
          </p>
          <button type="button" className="primary-button" onClick={onGoToAuth}>
            Aller a la connexion
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Catalogue SportLink</p>
        <h2>Bienvenue {user.email}</h2>
        <p className="description">Catalogue branche sur GET /equipment.</p>
      </div>

      <div className="grid">
        {equipmentList.map((equipment) => (
          <article className="card" key={equipment.id}>
            <div className="card-row">
              <p className="card-title">{equipment.name}</p>
              <span className={equipment.available ? 'status ok' : 'status off'}>
                {equipment.available ? 'Disponible' : 'Indisponible'}
              </span>
            </div>

            <ul className="simple-list">
              <li>Sport : {equipment.sport}</li>
              <li>Categorie : {equipment.category}</li>
              <li>Quantite : {equipment.quantity}</li>
            </ul>
            <p className="description small">{equipment.description}</p>

            {isMember ? (
              <button
                type="button"
                className="primary-button"
                disabled={!equipment.available || equipment.quantity <= 0 || activeReservationId === equipment.id}
                onClick={() => onReserve(equipment.id)}
              >
                {activeReservationId === equipment.id ? 'Reservation...' : 'Reserver'}
              </button>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
