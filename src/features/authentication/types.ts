import type { ReadonlySignal } from '@preact/signals';

export const AUTHENTICATION_STORAGE_KEY = 'salesforce_authentication';

export interface Authentication {
  id: string;
  access_token: string;
  instance_url: string;
  issued_at: number;
  expires_at: number;
  scope: string;
  signature: string;
  token_type: string;
}

export interface AuthenticationStore {
  state: ReadonlySignal<Authentication>;
  isAuthenticated: ReadonlySignal<boolean>;
  authenticate: (authentication: Omit<Authentication, 'expires_at'>) => void;
  clear: () => void;
}

export const emptyAuthentication: Authentication = {
  id: '',
  access_token: '',
  instance_url: '',
  issued_at: 0,
  expires_at: 0,
  scope: '',
  signature: '',
  token_type: '',
};
