type HeaderProps = {
  pathname: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  onNavigate: (path: string) => void;
};

const publicLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/equipment', label: 'Catalogue' },
  { path: '/blog', label: 'Guides' },
  { path: '/recommendations-demo', label: 'Démo IA' },
  { path: '/about', label: 'À propos' },
];

function isActive(current: string, target: string) {
  if (target === '/') {
    return current === '/';
  }

  return current === target || current.startsWith(`${target}/`);
}

export function Header({ pathname, isAdmin, isLoggedIn, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1 className="site-title">SportLink</h1>
        <p className="site-subtitle">Catalogue, réservations et recommandations sportives</p>
      </div>

      <nav className="nav">
        {publicLinks.map((link) => (
          <button
            type="button"
            className={isActive(pathname, link.path) ? 'nav-button active' : 'nav-button'}
            onClick={() => onNavigate(link.path)}
            key={link.path}
          >
            {link.label}
          </button>
        ))}
        <button
          type="button"
          className={pathname === '/login' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('/login')}
        >
          {isLoggedIn ? 'Compte' : 'Connexion'}
        </button>
        <button
          type="button"
          className={pathname === '/reservations' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('/reservations')}
          disabled={!isLoggedIn}
        >
          Mes réservations
        </button>
        <button
          type="button"
          className={pathname === '/recommendations' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('/recommendations')}
          disabled={!isLoggedIn}
        >
          IA membre
        </button>
        <button
          type="button"
          className={pathname === '/admin' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('/admin')}
          disabled={!isAdmin}
        >
          Admin
        </button>
      </nav>
    </header>
  );
}
