import { API_MODE, API_URL } from '../api';
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
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
    <section className="content auth-page">
      <div className="card">
        <p className="card-title">Authentification</p>

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
            Inscription
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
    </section>
  );
}
