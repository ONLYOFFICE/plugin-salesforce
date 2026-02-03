import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso';

import {
  Button, Label, Select, Paragraph,
} from '@components';
import { useAuthentication } from '@features/authentication';

import { useModals } from '@store/modal';

import { useTranslation } from '@hooks';

import { openGuide } from '@utils';

import './settings.css';

type Environment = 'production' | 'sandbox';

export function Settings() {
  const { confirm } = useModals();
  const { route } = useLocation();
  const { t, isReady } = useTranslation();
  const { state, clear } = useAuthentication();

  const [userName, setUserName] = useState<string>('');
  const [environment, setEnvironment] = useState<Environment>('production');

  useEffect(() => {
    const { access_token, instance_url } = state.value;
    if (!access_token) return;

    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`${instance_url}/services/data/v59.0/chatter/users/me`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!response.ok) throw new Error(`Failed to fetch user info: ${response.status}`);

        const user = await response.json();
        setUserName(user.displayName || user.name);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, [state.value]);

  const handleLogout = () => {
    confirm({
      title: t('common.confirm'),
      message: t('auth.logout_confirm'),
      confirmText: t('auth.logout'),
    }, () => {
      clear();
      route('/login');
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  if (!isReady) {
    return (
      <div className="settings-page page-enter">
        <div className="settings-page__content">
        </div>
      </div>
    );
  }

  return (
    <div className="settings-page page-enter">
      <div className="settings-page__content">
        <div className="settings-page__spacing">
          <Paragraph>
            {t('settings.logged_in_as')} {userName || t('settings.user_name')}
          </Paragraph>
        </div>

        <div className="settings-page__label-spacing">
          <Label>{t('auth.environment')}:</Label>
        </div>
        <div className="settings-page__spacing">
          <Select
            options={[
              { value: 'production', label: t('auth.production') },
              { value: 'sandbox', label: t('auth.sandbox') },
            ]}
            value={environment}
            onChange={(value) => setEnvironment(value as Environment)}
            disabled
          />
        </div>

        <div className="settings-page__buttons">
          <Button variant="secondary" fullWidth onClick={handleLogout}>
            {t('auth.logout')}
          </Button>
          <Button variant="secondary" fullWidth onClick={handleBack}>
            {t('common.back')}
          </Button>
        </div>
      </div>

      <div className="settings-page__footer">
        <Button variant="link" onClick={openGuide}>
          {t('common.open_guide')}
        </Button>
      </div>
    </div>
  );
}
