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
    <section className="content catalogue-page">
      <header className="page-intro catalogue-intro">
        <p className="section-kicker">Inventaire public</p>
        <h1>Matériel sportif</h1>
        <p>
          Consulte le stock, filtre par sport ou catégorie et ouvre une fiche pour vérifier
          l’usage conseillé avant de réserver.
        </p>
      </header>

      <div className="inventory-toolbar">
        <div className="inventory-filters">
          <label className="field compact-field">
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

          <label className="field compact-field">
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

        <p className="inventory-count">
          <strong>{filteredEquipment.length}</strong>
          <span>référence{filteredEquipment.length > 1 ? 's' : ''} affichée{filteredEquipment.length > 1 ? 's' : ''}</span>
        </p>
      </div>

      <div className="equipment-grid">
        {filteredEquipment.map((equipment, index) => (
          <article className="equipment-card" data-sport={equipment.sport.toLowerCase()} key={equipment.id}>
            <header className="equipment-card-head">
              <div>
                <span className="stock-code">SL-{String(index + 1).padStart(2, '0')}</span>
                <h2>{equipment.name}</h2>
              </div>
              <span className={equipment.available ? 'status ok' : 'status off'}>
                {equipment.available ? 'Disponible' : 'Indisponible'}
              </span>
            </header>

            <dl className="equipment-specs">
              <div>
                <dt>Sport</dt>
                <dd>{equipment.sport}</dd>
              </div>
              <div>
                <dt>Catégorie</dt>
                <dd>{equipment.category}</dd>
              </div>
              <div>
                <dt>Stock</dt>
                <dd className="stock-value">{equipment.quantity}</dd>
              </div>
            </dl>

            <p className="equipment-description">{equipment.description}</p>
            <p className="equipment-advice">{equipment.usageAdvice}</p>

            <div className="equipment-actions">
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
                  {user ? 'Réservé aux membres' : 'Se connecter pour réserver'}
                </button>
              )}
              <button
                type="button"
                className="text-button"
                onClick={() => onNavigate(`/equipment/${equipment.id}`)}
              >
                Fiche détaillée
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
