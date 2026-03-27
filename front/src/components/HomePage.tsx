type HomePageProps = {
  apiUrl: string;
  equipmentCount: number;
  availableCount: number;
  userRole: string;
};

export function HomePage({
  apiUrl,
  equipmentCount,
  availableCount,
  userRole,
}: HomePageProps) {
  return (
    <section className="content">
      <div className="card hero-card">
        <p className="eyebrow">Application sportive</p>
        <h2>SportLink connecte au backend Railway</h2>
        <p className="description">
          Ce front est prevu pour Cloudflare et consomme l&apos;API definie dans
          <code> VITE_API_URL</code>.
        </p>
        <p className="description small">API cible : {apiUrl}</p>
      </div>

      <div className="grid">
        <article className="card">
          <p className="card-title">Catalogue</p>
          <p className="description small">{equipmentCount} materiels charges depuis le backend.</p>
        </article>

        <article className="card">
          <p className="card-title">Disponibilite</p>
          <p className="description small">{availableCount} materiels sont actuellement disponibles.</p>
        </article>

        <article className="card">
          <p className="card-title">Session</p>
          <p className="description small">Role courant : {userRole}</p>
        </article>
      </div>
    </section>
  );
}
