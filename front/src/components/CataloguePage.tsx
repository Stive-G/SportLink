import { useMemo, useState } from 'react';
import { getEquipmentContent } from '../data/public-content';
import { Equipment, User } from '../types';

type CataloguePageProps = {
  user: User | null;
  equipmentList: Equipment[];
  isMember: boolean;
  activeReservationId: string;
  onNavigate: (path: string) => void;
  onReserve: (equipmentId: string) => void;
};

export function CataloguePage({
  user,
  equipmentList,
  isMember,
  activeReservationId,
  onNavigate,
  onReserve,
}: CataloguePageProps) {
  const [sportFilter, setSportFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const enrichedEquipment = useMemo(() => equipmentList.map(getEquipmentContent), [equipmentList]);
  const sports = Array.from(new Set(enrichedEquipment.map((item) => item.sport))).sort();
  const categories = Array.from(new Set(enrichedEquipment.map((item) => item.category))).sort();
  const filteredEquipment = enrichedEquipment.filter((equipment) => {
    const sportMatches = sportFilter === 'all' || equipment.sport === sportFilter;
    const categoryMatches = categoryFilter === 'all' || equipment.category === categoryFilter;
    return sportMatches && categoryMatches;
  });

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Catalogue public SportLink</p>
        <h2>Matériel sportif disponible pour préparer une activité</h2>
        <p className="description">
          Le catalogue public présente les équipements par sport, catégorie et disponibilité.
          Les visiteurs peuvent comprendre l’usage du matériel avant de créer un compte.
        </p>
      </div>

      <div className="card filter-panel">
        <label className="field">
          <span>Sport</span>
          <select value={sportFilter} onChange={(event) => setSportFilter(event.target.value)}>
            <option value="all">Tous les sports</option>
            {sports.map((sport) => (
              <option value={sport} key={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Catégorie</span>
          <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
            <option value="all">Toutes les catégories</option>
            {categories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid">
        {filteredEquipment.map((equipment) => (
          <article className="card" key={equipment.id}>
            <div className="card-row">
              <p className="card-title">{equipment.name}</p>
              <span className={equipment.available ? 'status ok' : 'status off'}>
                {equipment.available ? 'Disponible' : 'Indisponible'}
              </span>
            </div>

            <ul className="simple-list">
              <li>Sport : {equipment.sport}</li>
              <li>Catégorie : {equipment.category}</li>
              <li>Quantité : {equipment.quantity}</li>
            </ul>
            <p className="description small">{equipment.description}</p>
            <p className="description small">{equipment.usageAdvice}</p>

            {isMember ? (
              <button
                type="button"
                className="primary-button"
                disabled={!equipment.available || equipment.quantity <= 0 || activeReservationId === equipment.id}
                onClick={() => onReserve(equipment.id)}
              >
                {activeReservationId === equipment.id ? 'Réservation...' : 'Réserver'}
              </button>
            ) : (
              <button type="button" className="secondary-button" onClick={() => onNavigate('/login')}>
                {user ? 'Réservation réservée aux membres' : 'Se connecter pour réserver'}
              </button>
            )}
            <button
              type="button"
              className="text-button"
              onClick={() => onNavigate(`/equipment/${equipment.id}`)}
            >
              Lire la fiche détaillée
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
