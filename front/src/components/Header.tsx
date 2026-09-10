import { MouseEvent } from 'react';

type HeaderProps = {
  pathname: string;
  isAdmin: boolean;
  isLoggedIn: boolean;
  onNavigate: (path: string) => void;
};

const publicLinks = [
  { path: '/', label: 'Accueil' },
  { path: '/equipment', label: 'Matériel' },
  { path: '/blog', label: 'Guides' },
  { path: '/recommendations-demo', label: 'Aide au choix' },
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
        <strong>SPORTLINK</strong>
        <span>matériel sportif</span>
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
              Réservations
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
