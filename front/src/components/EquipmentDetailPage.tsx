import { getEquipmentContent } from '../data/public-content';
import { Equipment, User } from '../types';

type EquipmentDetailPageProps = {
  equipmentId: string;
  equipmentList: Equipment[];
  user: User | null;
  isMember: boolean;
  activeReservationId: string;
  onNavigate: (path: string) => void;
  onReserve: (equipmentId: string) => void;
};

export function EquipmentDetailPage({
  equipmentId,
  equipmentList,
  user,
  isMember,
  activeReservationId,
  onNavigate,
  onReserve,
}: EquipmentDetailPageProps) {
  const equipment = equipmentList.find((item) => item.id === equipmentId);

  if (!equipment) {
    return (
      <section className="content">
        <div className="card empty-state">
          <p className="section-kicker">Inventaire</p>
          <h2>Matériel introuvable</h2>
          <p className="description small">
            Cette référence n’est pas disponible dans le catalogue public.
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
          <p className="section-kicker">Fiche matériel / {content.sport}</p>
          <h1>{content.name}</h1>
          <p className="lead-copy">{content.description}</p>
        </div>
        <div className="detail-stock-block">
          <span className={content.available ? 'status ok' : 'status off'}>
            {content.available ? 'Disponible' : 'Indisponible'}
          </span>
          <strong>{content.quantity}</strong>
          <small>unité{content.quantity > 1 ? 's' : ''} en stock</small>
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
            {content.contexts?.map((context) => (
              <li key={context}>{context}</li>
            ))}
          </ul>
        </section>

        <section className="detail-copy-block reserve-block">
          <p className="section-kicker">Préparation</p>
          <h2>Avant de partir</h2>
          <ul className="simple-list spacious-list">
            {content.practicalTips?.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>

          <div className="reserve-action">
            {isMember ? (
              <button
                type="button"
                className="primary-button"
                disabled={!content.available || content.quantity <= 0 || activeReservationId === content.id}
                onClick={() => onReserve(content.id)}
              >
                {activeReservationId === content.id ? 'Réservation...' : 'Réserver ce matériel'}
              </button>
            ) : (
              <button type="button" className="secondary-button" onClick={() => onNavigate('/login')}>
                {user ? 'Réservation réservée aux membres' : 'Se connecter pour réserver'}
              </button>
            )}
            <button type="button" className="text-button" onClick={() => onNavigate('/equipment')}>
              Retour au catalogue
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
