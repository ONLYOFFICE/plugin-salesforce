import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Button, Label, Select, Paragraph,
} from '@components';
import { useAuthentication, openSalesforceAuth } from '@features/authentication';

import { useTranslation } from '@hooks';

import { openGuide } from '@utils';

import './login.css';

type Environment = 'production' | 'sandbox';

export function Login() {
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { authenticate } = useAuthentication();

  const [environment, setEnvironment] = useState<Environment>('production');

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'salesforce_auth' && event.data.params) {
        authenticate({ ...event.data.params });
        route('/');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleAuthorize = () => {
    openSalesforceAuth(environment);
  };

  if (!isReady) {
    return (
      <div className="login-page page-enter">
        <div className="login-page__content" />
      </div>
    );
  }

  return (
    <div className="login-page page-enter">
      <div className="login-page__content">
        <div className="login-page__spacing">
          <Paragraph>{t('auth.please_login')}</Paragraph>
        </div>

        <div className="login-page__label-spacing">
          <Label>
            {t('auth.environment')}
            :
          </Label>
        </div>
        <div className="login-page__spacing">
          <Select
            options={[
              { value: 'production', label: t('auth.production') },
              { value: 'sandbox', label: t('auth.sandbox') },
            ]}
            value={environment}
            onChange={(value) => setEnvironment(value as Environment)}
          />
        </div>

        <div className="login-page__spacing">
          <Paragraph>{t('auth.authorize_description')}</Paragraph>
        </div>

        <Button variant="primary" fullWidth onClick={handleAuthorize}>
          {t('auth.login')}
        </Button>
      </div>

      <div className="login-page__footer">
        <Button variant="link" onClick={openGuide}>
          {t('common.open_guide')}
        </Button>
      </div>
    </div>
  );
}
