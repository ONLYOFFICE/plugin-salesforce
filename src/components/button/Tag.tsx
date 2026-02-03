import { useState, useEffect } from 'preact/hooks';
import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks/useTranslation';

import removeIcon from '@resources/images/remove.svg';
import removeDarkIcon from '@resources/images/remove_dark.svg';

import './tag.css';

interface TagProps {
  children: ComponentChildren;
  onRemove: () => void;
}

export function Tag({ children, onRemove }: TagProps) {
  const { t } = useTranslation();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const { body } = document;
      setIsDarkTheme(
        body.classList.contains('theme-dark')
        || body.classList.contains('theme-contrast-dark')
        || body.classList.contains('theme-night')
        || body.classList.contains('theme-type-dark'),
      );
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="tag">
      <span className="tag__label">{children}</span>
      <button
        type="button"
        className="tag__remove"
        onClick={onRemove}
        title={t('common.remove')}
      >
        <img src={isDarkTheme ? removeDarkIcon : removeIcon} alt={t('common.remove')} className="tag__icon" />
      </button>
    </div>
  );
}
