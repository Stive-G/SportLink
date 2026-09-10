import { MouseEvent } from 'react';

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
  function handleNavigation(event: MouseEvent<HTMLAnchorElement>, path: string) {
    event.preventDefault();
    onNavigate(path);
  }

  return (
    <header className="header">
      <a className="brand-link" href="/" onClick={(event) => handleNavigation(event, '/')}>
        <span className="brand-mark" aria-hidden="true">SL</span>
        <span>
          <span className="site-title">SportLink</span>
          <span className="site-subtitle">Matériel sportif, réservation et guides pratiques</span>
        </span>
      </a>

      <nav className="nav" aria-label="Navigation principale">
        {publicLinks.map((link) => (
          <a
            href={link.path}
            className={isActive(pathname, link.path) ? 'nav-link active' : 'nav-link'}
            onClick={(event) => handleNavigation(event, link.path)}
            key={link.path}
          >
            {link.label}
          </a>
        ))}

        {!isLoggedIn ? (
          <a
            href="/login"
            className={pathname === '/login' ? 'nav-link account-link active' : 'nav-link account-link'}
            onClick={(event) => handleNavigation(event, '/login')}
          >
            Connexion
          </a>
        ) : (
          <>
            <a
              href="/reservations"
              className={pathname === '/reservations' ? 'nav-link active' : 'nav-link'}
              onClick={(event) => handleNavigation(event, '/reservations')}
            >
              Mes réservations
            </a>
            <a
              href="/recommendations"
              className={pathname === '/recommendations' ? 'nav-link active' : 'nav-link'}
              onClick={(event) => handleNavigation(event, '/recommendations')}
            >
              IA membre
            </a>
            {isAdmin ? (
              <a
                href="/admin"
                className={pathname === '/admin' ? 'nav-link active' : 'nav-link'}
                onClick={(event) => handleNavigation(event, '/admin')}
              >
                Admin
              </a>
            ) : null}
          </>
        )}
      </nav>
    </header>
  );
}
