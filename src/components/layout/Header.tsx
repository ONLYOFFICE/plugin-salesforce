import { useEffect, useState } from 'preact/hooks';

import arrowIcon from '@resources/images/arrow.svg';
import arrowDarkIcon from '@resources/images/arrow_dark.svg';

interface HeaderProps {
  title: string;
  onBack: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const body = document.body;
      setIsDarkTheme(
        body.classList.contains('theme-dark') ||
        body.classList.contains('theme-contrast-dark') ||
        body.classList.contains('theme-night') ||
        body.classList.contains('theme-type-dark')
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
    <div className="layout__header">
      <button type="button" className="header__back" onClick={onBack}>
        <img src={isDarkTheme ? arrowDarkIcon : arrowIcon} alt="" className="header__back-icon" />
        <span>Back</span>
      </button>
      {title && <p className="header__title">{title}</p>}
    </div>
  );
}
