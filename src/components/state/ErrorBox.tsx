import { useTranslation } from '@hooks';

import alertIcon from '@resources/images/alert.svg';

import './error.css';

interface ErrorBoxProps {
  title?: string;
  message?: string;
}

export function ErrorBox({
  title,
  message,
}: ErrorBoxProps) {
  const { t } = useTranslation();
  
  const displayTitle = title || t('common.error');
  const displayMessage = message || t('errors.check_data_and_retry');

  return (
    <div className="error-box">
      <div className="error-box__header">
        <img
          src={alertIcon}
          alt=""
          className="error-box__icon"
        />
        <div className="error-box__title">{displayTitle}</div>
      </div>
      <div className="error-box__message">{displayMessage}</div>
    </div>
  );
}
