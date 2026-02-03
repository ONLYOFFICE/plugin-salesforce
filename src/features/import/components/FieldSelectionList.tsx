import { TextButton } from '@components';

import { FieldCheckbox } from '@features/import/components/FieldCheckbox';
import type { SelectableItem } from '@features/import/components/types';

import './checkbox.css';

interface FieldSelectionListProps {
  items: SelectableItem[];
  selected: string[];
  onToggle: (name: string) => void;
  onSelectAll?: () => void;
  onClear?: () => void;
  showType?: boolean;
  loading?: boolean;
}

export function FieldSelectionList({
  items,
  selected,
  onToggle,
  onSelectAll,
  onClear,
  showType = true,
  loading = false,
}: FieldSelectionListProps) {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {(onSelectAll || onClear) && (
      <div className="checkbox-list__actions">
        {onSelectAll && <TextButton onClick={onSelectAll}>Select All</TextButton>}
        {onClear && <TextButton onClick={onClear}>Clear</TextButton>}
      </div>
      )}
      <div className="fields-list">
        {items.map((item) => (
          <FieldCheckbox
            key={item.name}
            item={item}
            selected={selected.includes(item.name)}
            onToggle={() => onToggle(item.name)}
            showType={showType}
          />
        ))}
      </div>
    </div>
  );
}
