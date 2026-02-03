import { useState, useEffect } from 'preact/hooks';

export function usePluginReady(maxAttempts = 20, initialDelay = 50): {
  ready: boolean;
  error: string | null;
} {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let attempts = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const checkPlugin = () => {
      if (window.Asc?.plugin?.callCommand) {
        setReady(true);
        return;
      }

      attempts++;
      if (attempts >= maxAttempts) {
        setError('Plugin API not available. Please reload the plugin.');
        return;
      }

      const delay = Math.min(initialDelay * 1.5 ** attempts, 1000);
      timeoutId = setTimeout(checkPlugin, delay);
    };

    checkPlugin();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [maxAttempts, initialDelay]);

  return { ready, error };
}

export function isPluginAvailable(): boolean {
  return !!window.Asc?.plugin?.callCommand;
}
