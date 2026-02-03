import { useTranslation } from '@hooks';

import { registerModal } from '@store/modal';

import './confirmation.css';

interface ConfirmationProps {
  params: URLSearchParams;
}

export function Confirmation({ params }: ConfirmationProps) {
  const { t } = useTranslation();

  const message = params.get('message') || t('common.are_you_sure');

  return (
    <div className="confirmation">
      <p className="confirmation__message">{message}</p>
    </div>
  );
}

registerModal('confirmation', Confirmation);
