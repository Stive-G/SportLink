import { getEquipmentContent } from '../data/public-content';
import { Equipment } from '../types';

type EquipmentDetailPageProps = {
  equipmentId: string;
  equipmentList: Equipment[];
  onNavigate: (path: string) => void;
};

export function EquipmentDetailPage({
  equipmentId,
  equipmentList,
  onNavigate,
}: EquipmentDetailPageProps) {
  const equipment = equipmentList.find((item) => item.id === equipmentId);

  if (!equipment) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="section-kicker">Bibliothèque</p>
          <h2>Matériel introuvable</h2>
          <p className="description small">
            Cette référence n’est pas disponible dans la bibliothèque SportLink.
          </p>
          <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
            Retour au matériel
          </button>
        </div>
      </section>
    );
  }

  const content = getEquipmentContent(equipment);

  return (
    <article className="content equipment-detail-page">
      <header className="equipment-detail-head">
        <div>
          <p className="section-kicker">Fiche pratique / {content.sport}</p>
          <h1>{content.name}</h1>
          <p className="lead-copy">{content.description}</p>
        </div>
        <div className="detail-stock-block library-mark">
          <span className="status">Guide</span>
          <strong>{content.category}</strong>
          <small>référence SportLink</small>
        </div>
      </header>

      <dl className="detail-spec-strip">
        <div><dt>Sport</dt><dd>{content.sport}</dd></div>
        <div><dt>Catégorie</dt><dd>{content.category}</dd></div>
        <div><dt>Référence</dt><dd>{content.id}</dd></div>
      </dl>

      <div className="detail-columns">
        <section className="detail-copy-block">
          <p className="section-kicker">Utilisation</p>
          <h2>Quand l’utiliser ?</h2>
          <p>{content.usageAdvice}</p>

          <h3>Contextes adaptés</h3>
          <ul className="simple-list spacious-list">
            {content.contexts?.map((context) => <li key={context}>{context}</li>)}
          </ul>
        </section>

        <section className="detail-copy-block reserve-block">
          <p className="section-kicker">Préparation</p>
          <h2>À prévoir</h2>
          <ul className="simple-list spacious-list">
            {content.practicalTips?.map((tip) => <li key={tip}>{tip}</li>)}
          </ul>

          <div className="reserve-action">
            <button type="button" className="primary-button" onClick={() => onNavigate('/assistant')}>
              Préparer une séance avec l’assistant
            </button>
            <button type="button" className="text-button" onClick={() => onNavigate('/equipment')}>
              Retour à la bibliothèque
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
