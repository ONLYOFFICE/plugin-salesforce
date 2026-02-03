import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks';

import './collapsible.css';

interface FilterToggleProps {
  expanded: boolean;
  onToggle: (expanded: boolean) => void;
  label?: string;
  children?: ComponentChildren;
}

export function FilterToggle({
  expanded,
  onToggle,
  label,
  children,
}: FilterToggleProps) {
  const { t } = useTranslation();

  const displayLabel = label || t('filters.show_filters');
  const hideLabel = t('filters.hide_filters');

  return (
    <>
      <div className="form-group">
        <button
          type="button"
          className="collapsible__toggle"
          onClick={() => onToggle(!expanded)}
        >
          {expanded ? hideLabel : displayLabel}
        </button>
      </div>
      {expanded && children && (
      <div className="collapsible__content">{children}</div>
      )}
    </>
  );
}
