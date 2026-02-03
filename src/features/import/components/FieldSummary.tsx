import { useState, useEffect } from 'preact/hooks';

import { Label } from '@components';

import { useTranslation } from '@hooks';
import type { SalesforceObject } from '@api/salesforce';

import pencilIcon from '@resources/images/pencil.svg';
import pencilDarkIcon from '@resources/images/pencil_dark.svg';

import './fields.css';

interface FieldSummaryProps {
  objects: SalesforceObject[];
  selectedObjects: string[];
  onEdit: () => void;
}

export function FieldSummary({
  objects,
  selectedObjects,
  onEdit,
}: FieldSummaryProps) {
  const { t } = useTranslation();
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
  
  const getObjectLabel = (name: string) => {
    const obj = objects.find((o) => o.name === name);
    return obj?.label || name;
  };

  return (
    <div className="form-group">
      <div className="section-header">
        <Label>{t('import.selected_objects')}</Label>
        <button type="button" className="edit-button" onClick={onEdit} title={t('import.edit_objects')}>
          <img src={isDarkTheme ? pencilDarkIcon : pencilIcon} alt={t('common.edit')} className="edit-button__icon" />
        </button>
      </div>
      <div className="selected-fields-list">
        {selectedObjects.map((name) => (
          <div key={name} className="selected-field-item">
            {getObjectLabel(name)}
          </div>
        ))}
      </div>
    </div>
  );
}
