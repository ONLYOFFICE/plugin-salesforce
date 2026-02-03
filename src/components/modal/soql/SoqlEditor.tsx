import { Button, ErrorBox } from '@components';

import { useState, useEffect } from 'preact/hooks';
import { useTranslation } from '@hooks';

import { registerModal } from '@store/modal';

import './soql.css';

const PLACEHOLDER = 'SELECT Id, Name FROM Account LIMIT 10';
const STORAGE_KEYS = {
  query: '__soql_editor_query__',
  execute: '__soql_editor_execute__',
  result: '__soql_editor_result__',
  cancel: '__soql_editor_cancel__',
} as const;

const closeModal = () => {
  localStorage.setItem(STORAGE_KEYS.cancel, 'true');
  if (window.Asc?.plugin?.button) window.Asc.plugin.button(1);
};

interface SoqlEditorProps {
  params: URLSearchParams;
}

export function SoqlEditor({ params }: SoqlEditorProps) {
  const { t } = useTranslation();
  
  const [query, setQuery] = useState(params.get('query') || '');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.query, query);
  }, [query]);

  useEffect(() => {
    if (!isLoading) return;

    const poll = setInterval(() => {
      const result = localStorage.getItem(STORAGE_KEYS.result);
      if (!result) return;

      localStorage.removeItem(STORAGE_KEYS.result);
      const { success, error } = JSON.parse(result);

      if (success) {
        closeModal();
      } else {
        setError(error || t('errors.generic'));
        setIsLoading(false);
      }
    }, 100);

    return () => clearInterval(poll);
  }, [isLoading]);

  const handleExecute = () => {
    setError(null);
    setIsLoading(true);
    localStorage.setItem(STORAGE_KEYS.execute, 'true');
  };

  return (
    <div className="soql">
      <div className="soql__content">
        <div className="soql__label">{t('import.enter_soql')}</div>
        <textarea
          className="soql__textarea"
          value={query}
          onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
          placeholder={PLACEHOLDER}
          disabled={isLoading}
        />
        {error && (
        <ErrorBox
          title={t('common.error')}
          message={t('errors.check_data_and_retry')}
        />
        )}
      </div>
      <hr className="soql__divider" />
      <div className="soql__buttons">
        <Button variant="primary" onClick={handleExecute} disabled={isLoading || !query.trim()}>
          {isLoading ? t('import.executing') : t('import.execute')}
        </Button>
        <Button variant="secondary" onClick={closeModal} disabled={isLoading}>
          {t('common.cancel')}
        </Button>
      </div>
    </div>
  );
}

registerModal('soql-editor', SoqlEditor);
