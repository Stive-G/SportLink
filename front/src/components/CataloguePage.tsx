import { User } from '../api';
import { Equipment } from '../types';

type CataloguePageProps = {
  user: User | null;
  equipmentList: Equipment[];
  onGoToAuth: () => void;
};

export function CataloguePage({ user, equipmentList, onGoToAuth }: CataloguePageProps) {
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
        <p className="description">
          GET /equipment
        </p>
      </div>

      <div className="grid">
        {equipmentList.map((equipment) => (
          <article className="card" key={equipment.id}>
            <p className="card-title">{equipment.name}</p>
            <ul className="simple-list">
              <li>Sport : {equipment.sport}</li>
              <li>Categorie : {equipment.category}</li>
              <li>Quantite : {equipment.quantity}</li>
              <li>Disponible : {equipment.available ? 'Oui' : 'Non'}</li>
            </ul>
            <p className="description small">{equipment.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
