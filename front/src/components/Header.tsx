import { Page } from '../types';

type HeaderProps = {
  page: Page;
  isAdmin: boolean;
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
};

export function Header({ page, isAdmin, isLoggedIn, onNavigate }: HeaderProps) {
  return (
    <header className="header">
      <div>
        <h1 className="site-title">SportLink</h1>
      </div>

      <nav className="nav">
        <button
          type="button"
          className={page === 'accueil' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('accueil')}
        >
          Accueil
        </button>
        <button
          type="button"
          className={page === 'auth' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('auth')}
        >
          Connexion
        </button>
        <button
          type="button"
          className={page === 'catalogue' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('catalogue')}
          disabled={!isLoggedIn}
        >
          Catalogue
        </button>
        <button
          type="button"
          className={page === 'reservations' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('reservations')}
          disabled={!isLoggedIn}
        >
          Mes reservations
        </button>
        <button
          type="button"
          className={page === 'recommandations' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('recommandations')}
          disabled={!isLoggedIn}
        >
          IA
        </button>
        <button
          type="button"
          className={page === 'admin' ? 'nav-button active' : 'nav-button'}
          onClick={() => onNavigate('admin')}
          disabled={!isAdmin}
        >
          Admin
        </button>
      </nav>
    </header>
  );
}
