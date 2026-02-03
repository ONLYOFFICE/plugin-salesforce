import { useLocation } from 'preact-iso';
import { useSignalEffect } from '@preact/signals';

import { useAuthentication } from '@features/authentication';

interface AuthGuardProps {
  children: preact.ComponentChildren;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuthentication();
  const { path, route } = useLocation();

  useSignalEffect(() => {
    if (!isAuthenticated.value && path !== '/login') route('/login');
  });

  return <>{children}</>;
}
