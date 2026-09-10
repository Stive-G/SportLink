import { FormEvent } from 'react';
import { AuthMode, Credentials } from '../types';
import { AuthForm } from './AuthForm';

type AuthPageProps = {
  mode: AuthMode;
  credentials: Credentials;
  loading: boolean;
  message: string;
  error: string;
  onModeChange: (mode: AuthMode) => void;
  onFieldChange: (field: keyof Credentials, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthPage({
  mode,
  credentials,
  loading,
  message,
  error,
  onModeChange,
  onFieldChange,
  onSubmit,
}: AuthPageProps) {
  return (
    <section className="auth-page utility-page">
      <header className="utility-head">
        <p className="section-kicker">Espace membre</p>
        <h1>Accéder aux réservations</h1>
        <p>
          Connecte-toi pour réserver du matériel et suivre les emprunts en cours. Si tu n’as pas
          encore de compte, l’inscription se fait au même endroit.
        </p>
      </header>

      <div className="auth-shell">
        <div className="auth-panel">
          <div className="tabs" role="tablist" aria-label="Choix du mode d'authentification">
            <button
              className={mode === 'login' ? 'tab active' : 'tab'}
              type="button"
              onClick={() => onModeChange('login')}
            >
              Connexion
            </button>
            <button
              className={mode === 'register' ? 'tab active' : 'tab'}
              type="button"
              onClick={() => onModeChange('register')}
            >
              Créer un compte
            </button>
          </div>

          <AuthForm
            mode={mode}
            values={credentials}
            loading={loading}
            onChange={onFieldChange}
            onSubmit={onSubmit}
          />

          {message ? <p className="feedback success">{message}</p> : null}
          {error ? <p className="feedback error">{error}</p> : null}
        </div>

        <aside className="desk-note">
          <span>MEMBRE / ACCÈS</span>
          <strong>Réserver</strong>
          <strong>Suivre</strong>
          <strong>Retourner</strong>
          <p>Le catalogue et les guides restent accessibles sans compte.</p>
        </aside>
      </div>
    </section>
  );
}
