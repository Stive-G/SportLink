import { FormEvent, useEffect, useState } from 'react';
import {
  Session,
  createReservation,
  getAllReservations,
  getEquipment,
  getMyReservations,
  getPublicRecommendations,
  getRecommendations,
  getUsers,
  login,
  register,
  returnReservation,
} from './api';
import { AdSlot } from './components/AdSlot';
import { AdminPage } from './components/AdminPage';
import { ArticlePage } from './components/ArticlePage';
import { AuthPage } from './components/AuthPage';
import { BlogPage } from './components/BlogPage';
import { CataloguePage } from './components/CataloguePage';
import { ContactPage, AboutPage, PrivacyPage, TermsPage } from './components/StaticPages';
import { EquipmentDetailPage } from './components/EquipmentDetailPage';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { RecommendationsDemoPage } from './components/RecommendationsDemoPage';
import { RecommendationsPage } from './components/RecommendationsPage';
import { ReservationsPage } from './components/ReservationsPage';
import { SportPage } from './components/SportPage';
import {
  blogArticles,
  buildLocalRecommendation,
  fallbackEquipment,
  sportGuides,
} from './data/public-content';
import { Credentials, Equipment, RecommendationResult, Reservation, User } from './types';

const initialCredentials: Credentials = {
  name: '',
  email: '',
  password: '',
};

const storageKey = 'sportlink-session';
const siteUrl = 'https://sportlink-app.site';

const staticPaths = new Set([
  '/',
  '/equipment',
  '/blog',
  '/guides',
  '/recommendations-demo',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/login',
  '/reservations',
  '/recommendations',
  '/admin',
]);

function getCurrentPath() {
  return window.location.pathname === '' ? '/' : window.location.pathname.replace(/\/$/, '') || '/';
}

function getSegments(pathname: string) {
  return pathname.split('/').filter(Boolean);
}

function isRecognizedPath(pathname: string) {
  if (staticPaths.has(pathname)) {
    return true;
  }

  const segments = getSegments(pathname);
  return (
    segments.length === 2 &&
    (segments[0] === 'equipment' || segments[0] === 'sports' || segments[0] === 'blog')
  );
}

function isIndexablePath(pathname: string) {
  if (!isRecognizedPath(pathname)) {
    return false;
  }

  if (['/login', '/reservations', '/recommendations', '/admin'].includes(pathname)) {
    return false;
  }

  const segments = getSegments(pathname);
  if (segments[0] === 'blog' && segments[1]) {
    return blogArticles.some((article) => article.slug === segments[1]);
  }

  if (segments[0] === 'sports' && segments[1]) {
    return sportGuides.some((guide) => guide.slug === segments[1]);
  }

  return true;
}

function getPageTitle(pathname: string) {
  const segments = getSegments(pathname);

  if (segments[0] === 'blog' && segments[1]) {
    const article = blogArticles.find((item) => item.slug === segments[1]);
    if (article) return `${article.title} - SportLink`;
  }

  if (segments[0] === 'sports' && segments[1]) {
    const guide = sportGuides.find((item) => item.slug === segments[1]);
    if (guide) return `${guide.title} - SportLink`;
  }

  if (pathname === '/') return 'SportLink - Réservation et guides de matériel sportif';
  if (pathname.startsWith('/equipment')) return 'Catalogue de matériel sportif - SportLink';
  if (pathname === '/blog' || pathname === '/guides') return 'Guides de matériel sportif - SportLink';
  if (pathname === '/recommendations-demo') return 'Recommandation de matériel sportif - SportLink';
  if (pathname === '/about') return 'À propos de SportLink';
  if (pathname === '/contact') return 'Contact - SportLink';
  if (pathname === '/privacy') return 'Politique de confidentialité - SportLink';
  if (pathname === '/terms') return 'Conditions d’utilisation - SportLink';
  if (pathname === '/login') return 'Connexion - SportLink';
  if (pathname === '/reservations') return 'Mes réservations - SportLink';
  if (pathname === '/recommendations') return 'Recommandations membre - SportLink';
  if (pathname === '/admin') return 'Administration - SportLink';
  return 'Page introuvable - SportLink';
}

function getPageDescription(pathname: string) {
  const segments = getSegments(pathname);

  if (segments[0] === 'blog' && segments[1]) {
    const article = blogArticles.find((item) => item.slug === segments[1]);
    if (article) return article.summary;
  }

  if (segments[0] === 'sports' && segments[1]) {
    const guide = sportGuides.find((item) => item.slug === segments[1]);
    if (guide) return guide.intro;
  }

  if (pathname === '/') {
    return 'SportLink aide à choisir, réserver et gérer du matériel sportif grâce à un catalogue public, des fiches détaillées et des guides pratiques.';
  }
  if (pathname.startsWith('/equipment')) {
    return 'Consulte le catalogue SportLink, la disponibilité du matériel sportif et les conseils d’usage avant de réserver.';
  }
  if (pathname === '/blog' || pathname === '/guides') {
    return 'Guides pratiques SportLink pour choisir le bon matériel, préparer une séance et organiser une réservation sportive.';
  }
  if (pathname === '/about') {
    return 'Découvre la mission de SportLink et la façon dont le service relie catalogue, disponibilité, réservation et conseils sportifs.';
  }
  if (pathname === '/privacy') {
    return 'Politique de confidentialité de SportLink : comptes, réservations, recommandations, publicité et cookies.';
  }
  if (pathname === '/terms') {
    return 'Conditions d’utilisation de SportLink pour la consultation, la réservation et le retour de matériel sportif.';
  }
  return 'SportLink, catalogue et réservation de matériel sportif.';
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
}

function updateCanonical(pathname: string) {
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = `${siteUrl}${pathname === '/' ? '/' : pathname}`;
}

function App() {
  const [pathname, setPathname] = useState(getCurrentPath);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [credentials, setCredentials] = useState<Credentials>(initialCredentials);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState('');
  const [equipmentList, setEquipmentList] = useState<Equipment[]>(fallbackEquipment);
  const [myReservations, setMyReservations] = useState<Reservation[]>([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [recommendationPrompt, setRecommendationPrompt] = useState(
    'Je veux organiser un match de foot en salle avec 8 amis samedi soir.',
  );
  const [recommendationResult, setRecommendationResult] = useState<RecommendationResult | null>(null);
  const [publicRecommendationPrompt, setPublicRecommendationPrompt] = useState(
    'Je veux faire du foot en salle avec 8 amis.',
  );
  const [publicRecommendationResult, setPublicRecommendationResult] =
    useState<RecommendationResult | null>(null);
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
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    function handlePopState() {
      setPathname(getCurrentPath());
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = getPageTitle(pathname);
    updateMetaTag('description', getPageDescription(pathname));
    updateMetaTag('robots', isIndexablePath(pathname) ? 'index,follow' : 'noindex,nofollow');
    updateCanonical(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!token || !user) {
      return;
    }

    void loadProtectedData(token, user);
  }, [token, user]);

  function navigate(path: string) {
    window.history.pushState(null, '', path);
    setPathname(path);
    setError('');
    setMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function loadEquipmentData() {
    try {
      const data = await getEquipment();
      setEquipmentList(data.length > 0 ? data : fallbackEquipment);
    } catch {
      setEquipmentList(fallbackEquipment);
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
          : 'Impossible de charger les données protégées.',
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
    window.localStorage.setItem(storageKey, JSON.stringify(session));
    navigate(session.user.role === 'ADMIN' ? '/admin' : '/equipment');
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
      setMessage(mode === 'register' ? 'Compte créé avec succès.' : 'Connexion réussie.');
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
      navigate('/login');
      return;
    }

    setActionId(equipmentId);
    setError('');
    setMessage('');

    try {
      await createReservation(token, equipmentId);
      await Promise.all([loadEquipmentData(), loadProtectedData(token, user)]);
      navigate('/reservations');
      setMessage('Réservation créée avec succès.');
    } catch (reservationError) {
      setError(
        reservationError instanceof Error
          ? reservationError.message
          : 'Impossible de créer la réservation.',
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
      setMessage('Matériel retourné avec succès.');
    } catch (reservationError) {
      setError(
        reservationError instanceof Error
          ? reservationError.message
          : 'Impossible de retourner le matériel.',
      );
    } finally {
      setActionId('');
    }
  }

  async function handleRecommendationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token || user?.role !== 'MEMBER') {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await getRecommendations(token, recommendationPrompt);
      setRecommendationResult(response);
      setMessage('Recommandation IA récupérée.');
    } catch (recommendationError) {
      setError(
        recommendationError instanceof Error
          ? recommendationError.message
          : 'Impossible de récupérer la recommandation.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePublicRecommendationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await getPublicRecommendations(publicRecommendationPrompt);
      setPublicRecommendationResult(response);
    } catch {
      setPublicRecommendationResult(
        buildLocalRecommendation(publicRecommendationPrompt, equipmentList),
      );
      setMessage('Mode démo local : recommandation générée à partir du catalogue public.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setUser(null);
    setToken('');
    setMessage('');
    setError('');
    setMyReservations([]);
    setAllReservations([]);
    setUsers([]);
    setRecommendationResult(null);
    window.localStorage.removeItem(storageKey);
    navigate('/');
  }

  const isAdmin = user?.role === 'ADMIN';
  const isLoggedIn = Boolean(user);
  const isMember = user?.role === 'MEMBER';
  const segments = getSegments(pathname);
  const recognizedPath = isRecognizedPath(pathname);

  return (
    <div className="app">
      <Header
        pathname={pathname}
        isAdmin={isAdmin}
        isLoggedIn={isLoggedIn}
        onNavigate={navigate}
      />

      <main className="main-content">
        {message ? <p className="feedback success">{message}</p> : null}
        {error ? <p className="feedback error">{error}</p> : null}

        {pathname === '/' ? (
          <HomePage
            equipmentCount={equipmentList.length}
            availableCount={equipmentList.filter((item) => item.available).length}
            userRole={user?.role ?? 'Invite'}
            onNavigate={navigate}
          />
        ) : null}

        {pathname === '/equipment' ? (
          <CataloguePage
            user={user}
            equipmentList={equipmentList}
            isMember={isMember}
            activeReservationId={actionId}
            onNavigate={navigate}
            onReserve={handleReserve}
          />
        ) : null}

        {segments[0] === 'equipment' && segments[1] ? (
          <EquipmentDetailPage
            equipmentId={segments[1]}
            equipmentList={equipmentList}
            user={user}
            isMember={isMember}
            activeReservationId={actionId}
            onNavigate={navigate}
            onReserve={handleReserve}
          />
        ) : null}

        {segments[0] === 'sports' && segments[1] ? (
          <SportPage sportSlug={segments[1]} equipmentList={equipmentList} onNavigate={navigate} />
        ) : null}

        {pathname === '/blog' || pathname === '/guides' ? <BlogPage onNavigate={navigate} /> : null}

        {segments[0] === 'blog' && segments[1] ? (
          <ArticlePage slug={segments[1]} onNavigate={navigate} />
        ) : null}

        {pathname === '/recommendations-demo' ? (
          <RecommendationsDemoPage
            loading={loading}
            prompt={publicRecommendationPrompt}
            result={publicRecommendationResult}
            onPromptChange={setPublicRecommendationPrompt}
            onSubmit={handlePublicRecommendationSubmit}
            onNavigate={navigate}
          />
        ) : null}

        {pathname === '/about' ? <AboutPage onNavigate={navigate} /> : null}
        {pathname === '/contact' ? <ContactPage /> : null}
        {pathname === '/privacy' ? <PrivacyPage /> : null}
        {pathname === '/terms' ? <TermsPage /> : null}

        {pathname === '/login' ? (
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

        {pathname === '/reservations' ? (
          <ReservationsPage
            reservations={myReservations}
            isLoggedIn={isLoggedIn}
            activeReservationId={actionId}
            onReturn={handleReturnReservation}
          />
        ) : null}

        {pathname === '/recommendations' ? (
          <RecommendationsPage
            isMember={isMember}
            loading={loading}
            prompt={recommendationPrompt}
            result={recommendationResult}
            onPromptChange={setRecommendationPrompt}
            onSubmit={handleRecommendationSubmit}
          />
        ) : null}

        {pathname === '/admin' ? (
          <AdminPage
            isAdmin={isAdmin}
            users={users}
            reservations={allReservations}
            onLogout={handleLogout}
          />
        ) : null}

        {!recognizedPath ? (
          <section className="content">
            <div className="card empty-state">
              <p className="eyebrow">Erreur 404</p>
              <h2>Cette page n’existe pas</h2>
              <p className="description">
                Le lien demandé ne correspond à aucune page publiée sur SportLink. Utilise la
                navigation principale ou retourne au catalogue pour poursuivre ta visite.
              </p>
              <button type="button" className="primary-button" onClick={() => navigate('/')}>
                Retour à l’accueil
              </button>
            </div>
          </section>
        ) : null}

        <AdSlot page={pathname} />
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <strong>SportLink</strong>
          <p>
            Catalogue, réservation et guides pratiques pour mieux préparer les activités sportives.
          </p>
        </div>
        <div className="footer-links" aria-label="Liens du site">
          <a href="/equipment" onClick={(event) => { event.preventDefault(); navigate('/equipment'); }}>Catalogue</a>
          <a href="/blog" onClick={(event) => { event.preventDefault(); navigate('/blog'); }}>Guides</a>
          <a href="/about" onClick={(event) => { event.preventDefault(); navigate('/about'); }}>À propos</a>
          <a href="/contact" onClick={(event) => { event.preventDefault(); navigate('/contact'); }}>Contact</a>
          <a href="/privacy" onClick={(event) => { event.preventDefault(); navigate('/privacy'); }}>Confidentialité</a>
          <a href="/terms" onClick={(event) => { event.preventDefault(); navigate('/terms'); }}>Conditions</a>
        </div>
        {isLoggedIn ? (
          <button type="button" className="footer-logout" onClick={handleLogout}>
            Se déconnecter
          </button>
        ) : null}
        <p className="footer-copy">© 2026 SportLink. Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default App;
