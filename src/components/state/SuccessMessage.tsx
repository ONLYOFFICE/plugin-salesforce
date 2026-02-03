import { Button } from '@components';

import { useTranslation } from '@hooks';

import './success.css';

interface SuccessAction {
  label: string;
  onClick: () => void;
}

interface SuccessMessageProps {
  message?: string;
  actions: SuccessAction[];
}

export function SuccessMessage({
  message,
  actions,
}: SuccessMessageProps) {
  const { t } = useTranslation();

  const displayMessage = message || t('common.success');

  return (
    <div className="success-state">
      <p className="success-state__title">{displayMessage}</p>
      <div className="success-state__actions">
        {actions?.map((action, index) => (
          <Button
            key={index}
            variant="secondary"
            fullWidth
            onClick={action.onClick}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
