import { useTranslation } from '@hooks';

import './loading.css';

interface LoadingIndicatorProps {
  message?: string;
}

export function LoadingIndicator({ message }: LoadingIndicatorProps) {
  const { t, isReady } = useTranslation();

  return (
    <div className="loading-state">
      <p className="loading-state__message">
        {isReady ? t('common.loading_warning') : 'Please do not close the plugin panel.'}
      </p>
      <div className="loading-state__indicator">
        <span className="loading-state__spinner" />
        <span className="loading-state__text">{message || (isReady ? t('common.loading') : 'Loading...')}</span>
      </div>
    </div>
  );
}
