import { FormEvent, useEffect, useMemo, useState } from 'react';
import { getSportsPlaces } from '../api';
import { SportsPlacesResponse } from '../types';

type PlacesPageProps = {
  onNavigate: (path: string) => void;
};

const sports = [
  ['all', 'Tous les sports'],
  ['football', 'Football'],
  ['basket', 'Basket'],
  ['badminton', 'Badminton'],
  ['handball', 'Handball'],
  ['volley', 'Volley'],
  ['tennis', 'Tennis'],
];

function readQuery() {
  const params = new URLSearchParams(window.location.search);
  return {
    location: params.get('location') ?? '',
    sport: params.get('sport') ?? 'all',
  };
}

function booleanLabel(value: boolean | null) {
  if (value === null) return 'Non renseigné';
  return value ? 'Oui' : 'Non';
}

function normalizeWebsiteUrl(value: string | null) {
  const clean = value?.trim();
  if (!clean) return null;

  const candidate = /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;

  try {
    const url = new URL(candidate);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export function PlacesPage({ onNavigate }: PlacesPageProps) {
  const initial = useMemo(readQuery, []);
  const [location, setLocation] = useState(initial.location);
  const [sport, setSport] = useState(initial.sport);
  const [data, setData] = useState<SportsPlacesResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function runSearch(nextLocation = location, nextSport = sport) {
    const cleanLocation = nextLocation.trim();
    if (cleanLocation.length < 2) {
      setError('Indique une ville ou un code postal.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await getSportsPlaces(cleanLocation, nextSport);
      setData(result);

      const params = new URLSearchParams();
      params.set('location', cleanLocation);
      if (nextSport !== 'all') params.set('sport', nextSport);
      window.history.replaceState(null, '', '/places?' + params.toString());
    } catch (searchError) {
      setData(null);
      setError(searchError instanceof Error ? searchError.message : 'Recherche indisponible.');
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch();
  }

  useEffect(() => {
    if (initial.location.trim().length >= 2) {
      void runSearch(initial.location, initial.sport);
    }
  }, []);

  return (
    <section className="content places-page">
      <header className="places-hero">
        <div>
          <p className="section-kicker">Données publiques · recherche en direct</p>
          <h1>Trouver un lieu où pratiquer</h1>
          <p className="lead-copy">
            Cherche les équipements sportifs recensés en France avec Data ES. SportLink affiche
            les informations reçues à la demande sans les importer dans sa base de données.
          </p>
        </div>
        <div className="places-source-stamp">
          <span>Source officielle</span>
          <strong>DATA ES</strong>
          <small>Ministère chargé des Sports</small>
          <small>Lecture en direct · aucun import</small>
        </div>
      </header>

      <form className="places-search" onSubmit={submit}>
        <label className="field places-location-field">
          <span>Ville ou code postal</span>
          <input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Ex. Melun ou 77000"
          />
        </label>
        <label className="field">
          <span>Sport</span>
          <select value={sport} onChange={(event) => setSport(event.target.value)}>
            {sports.map(([value, label]) => (
              <option value={value} key={value}>{label}</option>
            ))}
          </select>
        </label>
        <button className="primary-button places-submit" type="submit" disabled={loading}>
          {loading ? 'Recherche…' : 'Rechercher'}
        </button>
      </form>

      <div className="places-help-row">
        <span>Sans compte</span>
        <span>Aucune recherche sauvegardée</span>
        <span>Données Data ES interrogées à la demande</span>
      </div>

      {error ? <p className="feedback error">{error}</p> : null}

      {!data && !loading && !error ? (
        <div className="places-empty-intro">
          <div>
            <span className="section-index">01</span>
            <h2>Chercher</h2>
            <p>Ville, code postal et sport suffisent pour interroger le recensement national.</p>
          </div>
          <div>
            <span className="section-index">02</span>
            <h2>Comparer</h2>
            <p>Type, surface, accès libre, accessibilité et activités sont affichés quand ils sont renseignés.</p>
          </div>
          <div>
            <span className="section-index">03</span>
            <h2>Préparer</h2>
            <p>Une fois le lieu choisi, ouvre l’Assistant SportLink pour construire ta séance.</p>
          </div>
        </div>
      ) : null}

      {data ? (
        <>
          <div className="places-results-head">
            <div>
              <p className="section-kicker">Résultats en direct</p>
              <h2>{data.results.length} résultat{data.results.length > 1 ? 's' : ''}</h2>
              <p>{data.query.location}{data.query.sport ? ' · ' + data.query.sport : ''}</p>
            </div>
            <div className="places-live-badge"><span />Data ES</div>
          </div>

          {data.results.length === 0 ? (
            <div className="places-no-results">
              <h3>Aucun lieu trouvé</h3>
              <p>Essaie seulement la ville, un code postal ou un autre sport.</p>
            </div>
          ) : (
            <div className="places-list">
              {data.results.map((place) => {
                const fullAddress = [place.address, place.postalCode, place.city]
                  .filter(Boolean)
                  .join(', ');
                const mapUrl = place.address && fullAddress
                  ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(fullAddress)
                  : null;
                const websiteUrl = normalizeWebsiteUrl(place.website);

                return (
                  <article className="place-card" key={place.id}>
                    <div className="place-card-main">
                      <div className="place-card-topline">
                        <span className="stock-code">{place.id}</span>
                        <span>{[place.postalCode, place.city].filter(Boolean).join(' ')}</span>
                      </div>
                      <h2>{place.name}</h2>
                      {place.facilityName && place.facilityName !== place.name ? (
                        <p className="place-facility">{place.facilityName}</p>
                      ) : null}

                      <dl className="place-specs">
                        <div><dt>Type</dt><dd>{place.type ?? 'Non renseigné'}</dd></div>
                        <div><dt>Nature</dt><dd>{place.nature ?? 'Non renseignée'}</dd></div>
                        <div><dt>Surface</dt><dd>{place.surface ?? 'Non renseignée'}</dd></div>
                        <div><dt>Accès libre</dt><dd>{booleanLabel(place.freeAccess)}</dd></div>
                      </dl>

                      {place.activities.length > 0 ? (
                        <div className="place-activities">
                          {place.activities.slice(0, 5).map((activity) => (
                            <span key={activity}>{activity}</span>
                          ))}
                        </div>
                      ) : null}

                      <div className="place-address-block">
                        <span>Adresse</span>
                        {place.address ? (
                          <address>
                            <strong>{place.address}</strong>
                            <small>{[place.postalCode, place.city].filter(Boolean).join(' ')}</small>
                          </address>
                        ) : (
                          <p>Adresse précise non renseignée dans Data ES.</p>
                        )}
                      </div>

                      <div className="place-links">
                        {mapUrl ? (
                          <a href={mapUrl} target="_blank" rel="noreferrer">
                            Ouvrir l’adresse dans Google Maps
                          </a>
                        ) : null}
                        {websiteUrl ? (
                          <a href={websiteUrl} target="_blank" rel="noreferrer">
                            Site du lieu
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <aside className="place-plan-panel">
                      <p className="section-kicker">Étape suivante</p>
                      <h3>Préparer une séance ici</h3>
                      <p>
                        Indique le sport, le nombre de participants et la durée dans l’assistant
                        pour obtenir une checklist adaptée.
                      </p>
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => onNavigate('/assistant')}
                      >
                        Ouvrir l’assistant
                      </button>
                    </aside>
                  </article>
                );
              })}
            </div>
          )}

          <footer className="places-attribution">
            <p>
              Données : <strong>{data.source.publisher}</strong> — {data.source.name}. Résultats
              reçus en direct et non enregistrés.
            </p>
            <a href={data.source.url} target="_blank" rel="noreferrer">Source officielle</a>
          </footer>
        </>
      ) : null}
    </section>
  );
}
