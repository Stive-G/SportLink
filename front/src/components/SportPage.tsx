import { getEquipmentContent, sportGuides } from '../data/public-content';
import { Equipment } from '../types';

type SportPageProps = {
  sportSlug: string;
  equipmentList: Equipment[];
  onNavigate: (path: string) => void;
};

export function SportPage({ sportSlug, equipmentList, onNavigate }: SportPageProps) {
  const guide = sportGuides.find((item) => item.slug === sportSlug);
  const sportEquipment = equipmentList
    .filter((item) => item.sport.toLowerCase() === sportSlug.toLowerCase())
    .map(getEquipmentContent);

  if (!guide && sportEquipment.length === 0) {
    return (
      <section className="content">
        <div className="card">
          <p className="card-title">Sport introuvable</p>
          <p className="description small">
            Aucun contenu public n’est encore disponible pour ce sport.
          </p>
          <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
            Voir tous les équipements
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Guide sport</p>
        <h2>{guide?.title ?? `Matériel pour ${sportSlug}`}</h2>
        <p className="description">
          {guide?.intro ??
            `Retrouve les équipements SportLink disponibles pour organiser une activité ${sportSlug}.`}
        </p>
      </div>

      {guide ? (
        <div className="grid two-columns">
          <article className="card">
            <p className="card-title">Catégories utiles</p>
            <ul className="simple-list">
              {guide.recommendedCategories.map((category) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          </article>
          <article className="card">
            <p className="card-title">Conseils de préparation</p>
            <ul className="simple-list">
              {guide.practicalAdvice.map((advice) => (
                <li key={advice}>{advice}</li>
              ))}
            </ul>
          </article>
        </div>
      ) : null}

      <div className="grid">
        {sportEquipment.map((equipment) => (
          <article className="card" key={equipment.id}>
            <p className="card-title">{equipment.name}</p>
            <p className="description small">{equipment.usageAdvice}</p>
            <button
              type="button"
              className="text-button"
              onClick={() => onNavigate(`/equipment/${equipment.id}`)}
            >
              Voir la fiche matériel
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
