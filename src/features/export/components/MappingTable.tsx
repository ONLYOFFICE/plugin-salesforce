import type { ComponentChildren } from 'preact';

import { useTranslation } from '@hooks';

import './mapping.css';

interface MappingTableProps {
  children: ComponentChildren;
}

export function MappingTable({ children }: MappingTableProps) {
  const { t } = useTranslation();

  return (
    <div className="mapping-step__table">
      <div className="mapping-step__table-header">
        <span>{t('export.column')}</span>
        <span>{t('export.salesforce_field')}</span>
      </div>
      <div className="mapping-step__table-body">
        {children}
      </div>
    </div>
  );
}
