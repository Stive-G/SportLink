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
        <div className="card">
          <p className="card-title">Matériel introuvable</p>
          <p className="description small">
            Le matériel demandé n’est pas disponible dans le catalogue public.
          </p>
          <button type="button" className="primary-button" onClick={() => onNavigate('/equipment')}>
            Retour au catalogue
          </button>
        </div>
      </section>
    );
  }

  const content = getEquipmentContent(equipment);

  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">{content.sport} · {content.category}</p>
        <h2>{content.name}</h2>
        <p className="description">{content.description}</p>
        <span className={content.available ? 'status ok' : 'status off'}>
          {content.available ? `${content.quantity} disponible(s)` : 'Indisponible'}
        </span>
      </div>

      <div className="grid two-columns">
        <article className="card">
          <p className="card-title">Quand l’utiliser ?</p>
          <p className="description small">{content.usageAdvice}</p>
          <p className="card-title small-title">Contextes adaptés</p>
          <ul className="simple-list">
            {content.contexts?.map((context) => (
              <li key={context}>{context}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <p className="card-title">Conseils pratiques</p>
          <ul className="simple-list">
            {content.practicalTips?.map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
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
        </article>
      </div>
    </section>
  );
}
