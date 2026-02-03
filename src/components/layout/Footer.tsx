import { Button } from '@components/button';

import { useTranslation } from '@hooks';

import { openGuide } from '@utils';

interface FooterProps {
  onConfigure: () => void;
}

export function Footer({ onConfigure }: FooterProps) {
  const { t } = useTranslation();

  return (
    <div className="layout__footer">
      <Button variant="link" onClick={onConfigure}>
        {t('common.configure')}
      </Button>
      <Button variant="link" onClick={openGuide}>
        {t('common.open_guide')}
      </Button>
    </div>
  );
}
