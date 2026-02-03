import { Select } from '@components';

import { useTranslation } from '@hooks';

interface DropdownOption {
  name: string;
  label: string;
}

interface DropdownProps<T extends DropdownOption> {
  options: T[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export function Dropdown<T extends DropdownOption>({
  options,
  value,
  onChange,
  loading = false,
  placeholder,
}: DropdownProps<T>) {
  const { t } = useTranslation();
  
  const placeholderText = placeholder || t('common.select');
  
  if (loading) {
    return <div>{t('common.loading')}</div>;
  }

  const selectOptions = options.map((opt) => ({
    value: opt.name,
    label: opt.label,
  }));

  return (
    <Select
      value={value}
      onChange={onChange}
      options={selectOptions}
      placeholder={placeholderText}
    />
  );
}
