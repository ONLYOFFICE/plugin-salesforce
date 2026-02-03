import { OptionItem } from './OptionItem';

export interface SelectOption {
  id: string;
  name: string;
}

interface OptionListProps<T extends SelectOption> {
  options: T[];
  selectedId: string | null;
  onSelect: (option: T) => void;
}

export function OptionList<T extends SelectOption>({
  options,
  selectedId,
  onSelect,
}: OptionListProps<T>) {
  if (options.length === 0) return null;

  return (
    <div className="dropdown__list">
      {options.map((option) => (
        <OptionItem
          key={option.id}
          label={option.name}
          selected={selectedId === option.id}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}
