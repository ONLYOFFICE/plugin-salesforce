import { useState, useCallback } from 'preact/hooks';

import { useTranslation } from '@hooks';

import { readSheetData, type SheetData } from '@api/spreadsheet';

export function useSheetData() {
  const { t } = useTranslation();
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await readSheetData();
      setSheetData(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : t('export.failed_to_read_data');
      setError(message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [t]);

  const clear = useCallback(() => {
    setSheetData(null);
    setError(null);
  }, []);

  return {
    sheetData,
    loading,
    error,
    load,
    clear,
  };
}
