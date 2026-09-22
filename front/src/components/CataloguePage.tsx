import { useMemo, useState } from 'react';
import { getEquipmentContent } from '../data/public-content';
import { Equipment } from '../types';

type CataloguePageProps = {
  equipmentList: Equipment[];
  onNavigate: (path: string) => void;
};

export function CataloguePage({ equipmentList, onNavigate }: CataloguePageProps) {
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
        <p className="section-kicker">Bibliothèque pratique</p>
        <h1>Matériel sportif</h1>
        <p>
          Découvre à quoi sert chaque équipement, dans quels contextes l’utiliser et ce qu’il faut
          prévoir pour préparer une séance. SportLink ne vend ni ne loue ce matériel.
        </p>
      </header>

      <div className="inventory-toolbar">
        <div className="inventory-filters">
          <label className="field compact-field">
            <span>Sport</span>
            <select value={sportFilter} onChange={(event) => setSportFilter(event.target.value)}>
              <option value="all">Tous les sports</option>
              {sports.map((sport) => <option value={sport} key={sport}>{sport}</option>)}
            </select>
          </label>

          <label className="field compact-field">
            <span>Catégorie</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">Toutes les catégories</option>
              {categories.map((category) => <option value={category} key={category}>{category}</option>)}
            </select>
          </label>
        </div>

        <p className="inventory-count">
          <strong>{filteredEquipment.length}</strong>
          <span>fiche{filteredEquipment.length > 1 ? 's' : ''} pratique{filteredEquipment.length > 1 ? 's' : ''}</span>
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
              <span className="status">{equipment.sport}</span>
            </header>

            <dl className="equipment-specs equipment-specs-library">
              <div><dt>Sport</dt><dd>{equipment.sport}</dd></div>
              <div><dt>Catégorie</dt><dd>{equipment.category}</dd></div>
              <div><dt>Usage</dt><dd>{equipment.contexts?.[0] ?? 'séance sportive'}</dd></div>
            </dl>

            <p className="equipment-description">{equipment.description}</p>
            <p className="equipment-advice">{equipment.usageAdvice}</p>

            <div className="equipment-actions">
              <button type="button" className="primary-button" onClick={() => onNavigate('/assistant')}>
                Préparer une séance
              </button>
              <button type="button" className="text-button" onClick={() => onNavigate('/equipment/' + equipment.id)}>
                Fiche détaillée
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
