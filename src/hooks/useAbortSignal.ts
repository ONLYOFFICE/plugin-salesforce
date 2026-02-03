import { useMemo, useEffect } from 'preact/hooks';

export function useAbortSignal(deps: unknown[] = []): AbortSignal {
  const controller = useMemo(() => new AbortController(), deps);

  useEffect(() => () => controller.abort(), [controller]);

  return controller.signal;
}
