import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks';

import './layout.css';

interface LayoutProps {
  header: ComponentChildren;
  footer: ComponentChildren;
  children: ComponentChildren;
  error?: string | null;
}

export function Layout({
  header, footer, children, error,
}: LayoutProps) {
  const { t } = useTranslation();
  
  return (
    <div className="layout">
      {header}
      <div className="layout__main">
        {error && (
        <div className="layout__error">
          {t('common.error')}:
          {error}
        </div>
        )}
        {children}
      </div>
      {footer}
    </div>
  );
}
