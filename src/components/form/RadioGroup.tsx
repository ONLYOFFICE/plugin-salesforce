import './group.css';
import './radio.css';

interface RadioOption<T extends string> {
  value: T;
  label: string;
}

interface RadioGroupProps<T extends string> {
  label: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  name?: string;
  disabled?: boolean;
}

export function RadioGroup<T extends string>({
  label,
  value,
  options,
  onChange,
  name = 'radioGroup',
  disabled = false,
}: RadioGroupProps<T>) {
  const groupClass = disabled ? 'radio-group radio-group--disabled' : 'radio-group';

  return (
    <div className="form-group">
      <label className="form-group__label">{label}</label>
      <div className={groupClass}>
        {options.map((option) => (
          <label key={option.value} className="radio-group__item">
            <input
              type="radio"
              className="radio-group__input"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={disabled}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
}
