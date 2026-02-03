import { Select, TextButton } from '@components';

import { useTranslation } from '@hooks';

import type { FilterCondition } from '@features/import/components/types';

import './filter.css';

interface FilterRowProps {
  filter: FilterCondition;
  fields: string[];
  onUpdate: (id: string, key: keyof FilterCondition, value: string) => void;
  onRemove: (id: string) => void;
  showAndOr?: boolean;
  operators?: { value: string; label: string }[];
}

const DEFAULT_OPERATORS = [
  { value: '=', label: '=' },
  { value: '!=', label: '!=' },
  { value: '>', label: '>' },
  { value: '<', label: '<' },
  { value: 'LIKE', label: 'LIKE' },
  { value: 'IN', label: 'IN' },
  { value: 'NOT IN', label: 'NOT IN' },
  { value: 'IS NULL', label: 'IS NULL' },
  { value: 'IS NOT NULL', label: 'IS NOT NULL' },
];

export function FilterRow({
  filter,
  fields,
  showAndOr = false,
  onUpdate,
  onRemove,
  operators = DEFAULT_OPERATORS,
}: FilterRowProps) {
  const { t } = useTranslation();
  
  const fieldOptions = fields.map((f) => ({ value: f, label: f }));

  return (
    <div className="filter-row">
      {showAndOr && <span className="filter-row__connector">AND</span>}
      <Select
        value={filter.field}
        onChange={(value) => onUpdate(filter.id, 'field', value)}
        options={fieldOptions}
        placeholder={t('import.field')}
      />
      <Select
        value={filter.operator}
        onChange={(value) => onUpdate(filter.id, 'operator', value)}
        options={operators}
      />
      <input
        className="filter-row__input"
        value={filter.value}
        onInput={(e) => onUpdate(filter.id, 'value', (e.target as HTMLInputElement).value)}
        placeholder={t('import.value')}
      />
      <TextButton onClick={() => onRemove(filter.id)}>×</TextButton>
    </div>
  );
}
