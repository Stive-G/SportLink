import { FormEvent, useEffect, useState } from 'react';
import {
  API_URL,
  Session,
  createReservation,
  getAllReservations,
  getEquipment,
  getMyReservations,
  getRecommendations,
  getUsers,
  login,
  register,
  returnReservation,
} from './api';
import { AdminPage } from './components/AdminPage';
import { AuthPage } from './components/AuthPage';
import { CataloguePage } from './components/CataloguePage';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { RecommendationsPage } from './components/RecommendationsPage';
import { ReservationsPage } from './components/ReservationsPage';
import { Credentials, Equipment, Page, Reservation, User } from './types';

const initialCredentials: Credentials = {
  name: '',
  email: '',
  password: '',
};

const storageKey = 'sportlink-session';

function App() {
  const [page, setPage] = useState<Page>('accueil');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');
  const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [recommendationPrompt, setRecommendationPrompt] = useState(
    'Je veux organiser un match de foot en salle avec 8 amis samedi soir.',
  );
  const [recommendationResult, setRecommendationResult] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionId, setActionId] = useState('');

  useEffect(() => {
    void loadEquipmentData();

    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      const session = JSON.parse(saved) as Session;
      setToken(session.access_token);
      setUser(session.user);
      setPage(session.user.role === 'ADMIN' ? 'admin' : 'catalogue');
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    void loadProtectedData(token, user);
  }, [token, user]);

  async function loadEquipmentData() {
    try {
      const data = await getEquipment();
      setEquipmentList(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger le catalogue.',
      );
    }
  }

  async function loadProtectedData(currentToken: string, currentUser: User) {
    try {
      if (currentUser.role === 'ADMIN') {
        const [adminUsers, adminReservations] = await Promise.all([
          getUsers(currentToken),
          getAllReservations(currentToken),
        ]);

        setUsers(adminUsers);
        setAllReservations(adminReservations);
        setMyReservations([]);
        return;
      }

      const reservations = await getMyReservations(currentToken);
      setMyReservations(reservations);
      setAllReservations([]);
      setUsers([]);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Impossible de charger les donnees protegees.',
      );
    }
  }

  function handleFieldChange(field: keyof Credentials, value: string) {
    setCredentials((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function applySession(session: Session) {
    setToken(session.access_token);
    setUser(session.user);
    setPage(session.user.role === 'ADMIN' ? 'admin' : 'catalogue');
    window.localStorage.setItem(storageKey, JSON.stringify(session));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const action = mode === 'register' ? register : login;
      const session = await action(credentials);
      applySession(session);
      setCredentials(initialCredentials);
      setMessage(mode === 'register' ? 'Compte cree avec succes.' : 'Connexion reussie.');
    } catch (submissionError) {
      setToken('');
      setUser(null);
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Une erreur est survenue.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleReserve(equipmentId: string) {
    if (!token || user?.role !== 'MEMBER') {
      setPage('auth');
      return;
    }

    setActionId(equipmentId);
    setError('');
    setMessage('');

    try {
      await createReservation(token, equipmentId);
      await Promise.all([loadEquipmentData(), loadProtectedData(token, user)]);
      setPage('reservations');
      setMessage('Reservation creee avec succes.');
    } catch (reservationError) {
      setError(
        reservationError instanceof Error
          ? reservationError.message
          : 'Impossible de creer la reservation.',
      );
    } finally {
      setActionId('');
    }
  }

  async function handleReturnReservation(reservationId: string) {
    if (!token || user?.role !== 'MEMBER') {
      return;
    }

    setActionId(reservationId);
    setError('');
    setMessage('');

    try {
      await returnReservation(token, reservationId);
      await Promise.all([loadEquipmentData(), loadProtectedData(token, user)]);
      setMessage('Materiel retourne avec succes.');
    } catch (reservationError) {
      setError(
        reservationError instanceof Error
          ? reservationError.message
          : 'Impossible de retourner le materiel.',
      );
    } finally {
      setActionId('');
    }
  }

  async function handleRecommendationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || user?.role !== 'MEMBER') {
      setPage('auth');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await getRecommendations(token, recommendationPrompt);
      setRecommendationResult(response);
      setMessage('Recommandation IA recuperee.');
    } catch (recommendationError) {
      setError(
        recommendationError instanceof Error
          ? recommendationError.message
          : 'Impossible de recuperer la recommandation.',
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setToken('');
    setMessage('');
    setError('');
    setPage('accueil');
    setMyReservations([]);
    setAllReservations([]);
    setUsers([]);
    setRecommendationResult('');
    window.localStorage.removeItem(storageKey);
  }

  const isAdmin = user?.role === 'ADMIN';
  const isLoggedIn = Boolean(user);
  const isMember = user?.role === 'MEMBER';

  return (
    <main className="app">
      <Header
        page={page}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onNavigate={setPage}
      />

      {message ? <p className="feedback success">{message}</p> : null}
      {error ? <p className="feedback error">{error}</p> : null}

      {page === 'accueil' ? (
        <HomePage
          apiUrl={API_URL}
          equipmentCount={equipmentList.length}
          availableCount={equipmentList.filter((item) => item.available).length}
          userRole={user?.role ?? 'Invite'}
        />
      ) : null}

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
          isMember={isMember}
          activeReservationId={actionId}
          onGoToAuth={() => setPage('auth')}
          onReserve={handleReserve}
        />
      ) : null}

      {page === 'reservations' ? (
        <ReservationsPage
          reservations={myReservations}
          isLoggedIn={isLoggedIn}
          activeReservationId={actionId}
          onReturn={handleReturnReservation}
        />
      ) : null}

      {page === 'recommandations' ? (
        <RecommendationsPage
          isMember={isMember}
          loading={loading}
          prompt={recommendationPrompt}
          result={recommendationResult}
          onPromptChange={setRecommendationPrompt}
          onSubmit={handleRecommendationSubmit}
        />
      ) : null}

      {page === 'admin' ? (
        <AdminPage
          isAdmin={isAdmin}
          users={users}
          reservations={allReservations}
          onLogout={handleLogout}
        />
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
