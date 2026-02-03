import { useState, useCallback, useMemo } from 'preact/hooks';

import type { ExportOperation, FieldMapping } from '@features/export/types';

export function useFieldMappings() {
  const [mappings, setMappings] = useState<FieldMapping[]>([]);
  const [operation, setOperation] = useState<ExportOperation>('create');
  const [idColumn, setIdColumn] = useState('');

  const initialize = useCallback((headers: string[]) => {
    setMappings(headers.map((header) => ({ sourceColumn: header, targetField: '' })));
  }, []);

  const update = useCallback((sourceColumn: string, targetField: string) => {
    setMappings((prev) => prev.map((m) => (m.sourceColumn === sourceColumn ? { ...m, targetField } : m)));
  }, []);

  const clear = useCallback(() => {
    setMappings([]);
    setOperation('create');
    setIdColumn('');
  }, []);

  const validMappings = useMemo(
    () => mappings.filter((m) => m.targetField),
    [mappings],
  );

  const hasValidMappings = validMappings.length > 0;

  return {
    mappings,
    operation,
    idColumn,
    validMappings,
    hasValidMappings,
    initialize,
    update,
    setOperation,
    setIdColumn,
    clear,
  };
}
