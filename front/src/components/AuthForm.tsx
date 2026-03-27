import { FormEvent } from 'react';
import { Credentials } from '../types';

type AuthFormProps = {
  mode: 'login' | 'register';
  values: Credentials;
  loading: boolean;
  onChange: (field: keyof Credentials, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function AuthForm({ mode, values, loading, onChange, onSubmit }: AuthFormProps) {
  const isRegister = mode === 'register';

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      {isRegister ? (
        <label className="field">
          <span>Nom</span>
          <input
            type="text"
            value={values.name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="Votre nom"
            minLength={2}
            required
          />
        </label>
      ) : null}

      <label className="field">
        <span>Email</span>
        <input
          type="email"
          value={values.email}
          onChange={(event) => onChange('email', event.target.value)}
          placeholder="email@exemple.com"
          autoComplete="email"
          required
        />
      </label>

      <label className="field">
        <span>Mot de passe</span>
        <input
          type="password"
          value={values.password}
          onChange={(event) => onChange('password', event.target.value)}
          placeholder={isRegister ? '6 caracteres minimum' : 'Votre mot de passe'}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
          minLength={6}
          required
        />
      </label>

      <button className="submit-button" type="submit" disabled={loading}>
        {loading ? 'Chargement...' : isRegister ? 'Creer un compte' : 'Se connecter'}
      </button>
    </form>
  );
}
