import { useState } from 'preact/hooks';

import type { FilterCondition } from '@features/import/components/types';

export interface UseFiltersResult {
  filters: FilterCondition[];
  maxRows: number;
  addFilter: (filter: Omit<FilterCondition, 'id'>) => void;
  updateFilter: (id: string, key: keyof FilterCondition, value: string) => void;
  removeFilter: (id: string) => void;
  setMaxRows: (value: number) => void;
  reset: () => void;
}

export function useFilters(): UseFiltersResult {
  const [filters, setFilters] = useState<FilterCondition[]>([]);
  const [maxRows, setMaxRows] = useState(10000);

  const addFilter = (filter: Omit<FilterCondition, 'id'>) => {
    setFilters((prev) => [
      ...prev,
      { ...filter, id: Date.now().toString() },
    ]);
  };

  const updateFilter = (id: string, key: keyof FilterCondition, value: string) => {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const removeFilter = (id: string) => {
    setFilters((prev) => prev.filter((f) => f.id !== id));
  };

  const reset = () => {
    setFilters([]);
    setMaxRows(10000);
  };

  return {
    filters, addFilter, updateFilter, removeFilter, maxRows, setMaxRows, reset,
  };
}
