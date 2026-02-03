import type { SelectableItem } from '@features/import/components/types';

import './checkbox.css';

interface FieldCheckboxProps {
  item: SelectableItem;
  selected: boolean;
  onToggle: () => void;
  showType?: boolean;
}

export function FieldCheckbox({
  item, selected, onToggle, showType = true,
}: FieldCheckboxProps) {
  return (
    <div className="field-item">
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <span>{item.label}</span>
      {showType && item.type && (
      <small>
        (
        {item.type}
        )
      </small>
      )}
    </div>
  );
}
