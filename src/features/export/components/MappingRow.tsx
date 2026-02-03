import { Select } from '@components';

import { useTranslation } from '@hooks';

import './mapping.css';

interface SelectOption {
  value: string;
  label: string;
}

interface MappingRowProps {
  sourceColumn: string;
  targetField: string;
  fieldOptions: SelectOption[];
  onChange: (value: string) => void;
}

export function MappingRow({
  sourceColumn,
  targetField,
  fieldOptions,
  onChange,
}: MappingRowProps) {
  const { t } = useTranslation();

  const isMapped = Boolean(targetField);
  const rowClass = `mapping-step__row ${isMapped ? 'mapping-step__row--mapped' : ''}`;

  return (
    <div className={rowClass}>
      <span className="mapping-step__col" title={sourceColumn}>
        {sourceColumn}
      </span>
      <Select
        options={fieldOptions}
        value={targetField}
        onChange={onChange}
        placeholder="-"
      />
    </div>
  );
}
