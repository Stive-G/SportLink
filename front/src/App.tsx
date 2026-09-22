import { FormEvent, useEffect, useState } from 'react';
import {
  Session,
  createPlan,
  deletePlan,
  getAllPlans,
  getMyPlans,
  getPublicRecommendations,
  getUsers,
  login,
  register,
} from './api';
import { AdSlot } from './components/AdSlot';
import { AdminPage } from './components/AdminPage';
import { ArticlePage } from './components/ArticlePage';
import { AuthPage } from './components/AuthPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage, AboutPage, PrivacyPage, TermsPage } from './components/StaticPages';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { PlacesPage } from './components/PlacesPage';
import { RecommendationsDemoPage } from './components/RecommendationsDemoPage';
import { PlansPage } from './components/PlansPage';
import { SportPage } from './components/SportPage';
import {
  blogArticles,
  buildLocalRecommendation,
  sportGuides,
} from './data/public-content';
import { ActivityPlan, Credentials, RecommendationResult, User } from './types';

const initialCredentials: Credentials = {
  name: '',
  email: '',
  password: '',
};

const storageKey = 'sportlink-session';
const siteUrl = 'https://sportlink-app.site';

const staticPaths = new Set([
  '/',
  '/places',
  '/blog',
  '/guides',
  '/assistant',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/login',
  '/plans',
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
    (segments[0] === 'sports' || segments[0] === 'blog')
  );
}

function isIndexablePath(pathname: string) {
  if (!isRecognizedPath(pathname)) {
    return false;
  }

  if (['/login', '/plans', '/admin'].includes(pathname)) {
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

  if (pathname === '/') return 'SportLink - Préparer une activité sportive';
  if (pathname === '/places') return 'Trouver un lieu de pratique sportive - SportLink';
  if (pathname === '/blog' || pathname === '/guides') return 'Guides de matériel sportif - SportLink';
  if (pathname === '/assistant') return 'Assistant de préparation sportive - SportLink';
  if (pathname === '/about') return 'À propos de SportLink';
  if (pathname === '/contact') return 'Contact - SportLink';
  if (pathname === '/privacy') return 'Politique de confidentialité - SportLink';
  if (pathname === '/terms') return 'Conditions d’utilisation - SportLink';
  if (pathname === '/login') return 'Connexion - SportLink';
  if (pathname === '/plans') return 'Mes plans sportifs - SportLink';
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
    return 'SportLink aide à trouver un lieu, choisir le matériel utile et préparer une séance sportive avec des guides et un assistant.';
  }
  if (pathname === '/places') {
    return 'Recherche en direct des équipements sportifs Data ES par ville, code postal et sport, sans stockage des résultats dans SportLink.';
  }
  if (pathname === '/blog' || pathname === '/guides') {
    return 'Guides pratiques SportLink pour choisir le bon matériel et organiser une séance sportive.';
  }
  if (pathname === '/about') {
    return 'Découvre la mission de SportLink : relier lieux de pratique, matériel, guides et préparation de séance.';
  }
  if (pathname === '/privacy') {
    return 'Politique de confidentialité de SportLink : comptes, plans, assistant, publicité et cookies.';
  }
  if (pathname === '/terms') {
    return 'Conditions d’utilisation de SportLink pour les guides, les plans et l’assistant sportif.';
  }
  return 'SportLink, préparation et organisation d’activités sportives.';
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
  const [myPlans, setMyPlans] = useState<ActivityPlan[]>([]);
  const [allPlans, setAllPlans] = useState<ActivityPlan[]>([]);
  const [users, setUsers] = useState<User[]>([]);
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

  async function loadProtectedData(currentToken: string, currentUser: User) {
    try {
      if (currentUser.role === 'ADMIN') {
        const [adminUsers, adminPlans] = await Promise.all([
          getUsers(currentToken),
          getAllPlans(currentToken),
        ]);

        setUsers(adminUsers);
        setAllPlans(adminPlans);
        setMyPlans([]);
        return;
      }

      const plans = await getMyPlans(currentToken);
      setMyPlans(plans);
      setAllPlans([]);
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
    navigate(session.user.role === 'ADMIN' ? '/admin' : '/plans');
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

  async function handlePublicRecommendationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await getPublicRecommendations(publicRecommendationPrompt);
      setPublicRecommendationResult(response);
    } catch {
      setPublicRecommendationResult(buildLocalRecommendation(publicRecommendationPrompt));
      setMessage('Mode local : préparation générée sans appel au fournisseur IA.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSavePlan() {
    if (!token || user?.role !== 'MEMBER' || !publicRecommendationResult) {
      navigate('/login');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await createPlan(token, {
        title: 'Plan SportLink',
        activity: publicRecommendationResult.activity,
        materials: publicRecommendationResult.recommendedItems.map((item) => ({
          name: item.name,
          reason: item.reason,
        })),
        tips: publicRecommendationResult.optionalTips,
      });
      await loadProtectedData(token, user);
      setMessage('Plan sauvegardé dans ton compte.');
      navigate('/plans');
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Impossible de sauvegarder le plan.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDeletePlan(planId: string) {
    if (!token || user?.role !== 'MEMBER') return;
    setActionId(planId);
    setError('');
    try {
      await deletePlan(token, planId);
      await loadProtectedData(token, user);
      setMessage('Plan supprimé.');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Impossible de supprimer le plan.');
    } finally {
      setActionId('');
    }
  }

  function handleLogout() {
    setUser(null);
    setToken('');
    setMessage('');
    setError('');
    setMyPlans([]);
    setAllPlans([]);
    setUsers([]);
    setPublicRecommendationResult(null);
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
            userRole={user?.role ?? 'Invite'}
            onNavigate={navigate}
          />
        ) : null}

        {pathname === '/places' ? (
          <PlacesPage onNavigate={navigate} />
        ) : null}

        {segments[0] === 'sports' && segments[1] ? (
          <SportPage sportSlug={segments[1]} onNavigate={navigate} />
        ) : null}

        {pathname === '/blog' || pathname === '/guides' ? <BlogPage onNavigate={navigate} /> : null}

        {segments[0] === 'blog' && segments[1] ? (
          <ArticlePage slug={segments[1]} onNavigate={navigate} />
        ) : null}

        {pathname === '/assistant' ? (
          <RecommendationsDemoPage
            loading={loading}
            prompt={publicRecommendationPrompt}
            result={publicRecommendationResult}
            onPromptChange={setPublicRecommendationPrompt}
            onSubmit={handlePublicRecommendationSubmit}
            onNavigate={navigate}
            isMember={isMember}
            onSavePlan={handleSavePlan}
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

        {pathname === '/plans' ? (
          <PlansPage
            plans={myPlans}
            isLoggedIn={isLoggedIn}
            activePlanId={actionId}
            onDelete={handleDeletePlan}
            onNavigate={navigate}
          />
        ) : null}

        {pathname === '/admin' ? (
          <AdminPage
            isAdmin={isAdmin}
            users={users}
            plans={allPlans}
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
                navigation principale ou retourne à l’accueil pour poursuivre ta visite.
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
          <div className="footer-brand-title">
            <img src="/sportlink-mark.svg" alt="" aria-hidden="true" />
            <strong>SportLink</strong>
          </div>
          <p>
            Lieux, guides, assistant et plans pour mieux préparer les activités sportives.
          </p>
        </div>
        <div className="footer-links" aria-label="Liens du site">
          <a href="/places" onClick={(event) => { event.preventDefault(); navigate('/places'); }}>Où pratiquer</a>
          <a href="/blog" onClick={(event) => { event.preventDefault(); navigate('/blog'); }}>Guides</a>
          <a href="/assistant" onClick={(event) => { event.preventDefault(); navigate('/assistant'); }}>Assistant</a>
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
