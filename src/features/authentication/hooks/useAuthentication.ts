import { useContext } from 'preact/hooks';

import { AuthenticationContext } from '@features/authentication/store';
import type { AuthenticationStore } from '@features/authentication/types';

export function useAuthentication(): AuthenticationStore {
  const context = useContext(AuthenticationContext);
  if (!context) throw new Error('useAuthentication must be used within an AuthenticationProvider');
  return context;
}
