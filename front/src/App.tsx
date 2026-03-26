import { FormEvent, useEffect, useState } from 'react';
import { AuthResult, User, login, register } from './api';
import { AdminPage } from './components/AdminPage';
import { AuthPage } from './components/AuthPage';
import { CataloguePage } from './components/CataloguePage';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { RecommendationsPage } from './components/RecommendationsPage';
import { ReservationsPage } from './components/ReservationsPage';
import { allReservations, equipmentList, myReservations } from './mock-data';
import { AuthMode, Credentials, Page } from './types';

const initialCredentials: Credentials = {
  email: '',
  password: '',
};

const storageKey = 'front-demo-session';

function App() {
  const [page, setPage] = useState<Page>('accueil');
  const [mode, setMode] = useState<AuthMode>('login');
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      const session = JSON.parse(saved) as AuthResult;
      setToken(session.access_token);
      setUser(session.user);
      setPage('catalogue');
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  const handleFieldChange = (field: keyof Credentials, value: string) => {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const action = mode === 'register' ? register : login;
      const response = await action(credentials);

      setToken(response.access_token);
      setUser({ ...response.user, role: response.user.role as "MEMBER" | "ADMIN", plan: response.user.plan as "Starter" | "Pro" });
      setPage('catalogue');
      window.localStorage.setItem(storageKey, JSON.stringify(response));
      setMessage(mode === 'register' ? 'Compte cree avec succes.' : 'Connexion reussie.');
    } catch (submissionError) {
      setToken('');
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Une erreur est survenue.',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    setMessage('');
    setError('');
    setPage('accueil');
    window.localStorage.removeItem(storageKey);
  };

  const isAdmin = user?.role === 'ADMIN';
  const isLoggedIn = Boolean(user);

  return (
    <main className="app">
      <Header
        page={page}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onNavigate={setPage}
      />

      {page === 'accueil' ? <HomePage /> : null}

      {page === 'auth' ? (
        <AuthPage
          mode={mode}
          credentials={credentials}
          loading={loading}
          message={message}
          error={error}
          onModeChange={setMode}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      ) : null}

      {page === 'catalogue' ? (
        <CataloguePage
          user={user}
          equipmentList={equipmentList}
          onGoToAuth={() => setPage('auth')}
        />
      ) : null}

      {page === 'reservations' ? (
        <ReservationsPage
          reservations={myReservations}
          isLoggedIn={isLoggedIn}
          onNavigate={setPage}
        />
      ) : null}

      {page === 'recommandations' ? <RecommendationsPage isLoggedIn={isLoggedIn} /> : null}

      {page === 'admin' ? (
        <AdminPage isAdmin={isAdmin} reservations={allReservations} onLogout={handleLogout} />
      ) : null}

      {isLoggedIn && page !== 'admin' ? (
        <div className="content">
          <button type="button" className="secondary-button" onClick={handleLogout}>
            Se deconnecter
          </button>
        </div>
      ) : null}
    </main>
  );
}

export default App;
