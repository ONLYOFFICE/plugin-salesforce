import { OptionList, SelectOption } from '@components/form/OptionList';

import { useTranslation } from '@hooks';

import './group.css';
import './combobox.css';

interface SearchableSelectProps<T extends SelectOption> {
  label: string;
  value: string;
  options: T[];
  selectedOption: T | null;
  showDropdown: boolean;
  onChange: (value: string) => void;
  onSelect: (option: T) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  loading?: boolean;
}

export function SearchableSelect<T extends SelectOption>({
  label,
  value,
  options,
  selectedOption,
  showDropdown,
  onChange,
  onSelect,
  onFocus,
  onBlur,
  placeholder,
  loading = false,
}: SearchableSelectProps<T>) {
  const { t } = useTranslation();

  const inputClass = loading ? 'combobox__input combobox__input--disabled' : 'combobox__input';

  const placeholderText = placeholder || t('common.enter_or_select');

  const isDropdownOpen = showDropdown && !loading;

  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <div className={`combobox ${isDropdownOpen ? 'combobox--open' : ''}`}>
        <input
          type="text"
          className={inputClass}
          value={value}
          onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholderText}
          disabled={loading}
        />
        {isDropdownOpen && (
        <OptionList
          options={options}
          selectedId={selectedOption?.id ?? null}
          onSelect={onSelect}
        />
        )}
      </div>
    </div>
  );
}
