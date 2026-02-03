import { useState, useEffect } from 'preact/hooks';

import { t as translate, getCurrentLanguage, initI18n } from '@utils/i18n';

interface UseTranslationResult {
  t: (key: string, interpolations?: Record<string, string | number>) => string;
  language: string;
  isReady: boolean;
}

let isInitialized = false;
let isInitializing = false;
let initPromise: Promise<void> | null = null;

export function useTranslation(): UseTranslationResult {
  const [isReady, setIsReady] = useState(isInitialized);
  const [language, setLanguage] = useState('en-US');

  useEffect(() => {
    const init = async () => {
      if (isInitialized) {
        setLanguage(getCurrentLanguage());
        setIsReady(true);
        return;
      }

      if (isInitializing) {
        await initPromise;
        setLanguage(getCurrentLanguage());
        setIsReady(true);
        return;
      }

      isInitializing = true;
      initPromise = initI18n();
      try {
        await initPromise;
        isInitialized = true;
        setLanguage(getCurrentLanguage());
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize i18n:', error);
        setIsReady(true);
      } finally {
        isInitializing = false;
        initPromise = null;
      }
    };

    init();
  }, []);

  return {
    t: translate,
    language,
    isReady,
  };
}
