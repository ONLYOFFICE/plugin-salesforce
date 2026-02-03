import { useTranslation } from '@hooks';

import type { SheetData } from '@api/spreadsheet';

import './object.css';

interface SheetSummaryProps {
  sheetData: SheetData;
  maxHeaders?: number;
}

export function SheetSummary({ sheetData, maxHeaders = 3 }: SheetSummaryProps) {
  const { t } = useTranslation();

  const { headers, rows } = sheetData;
  const headerPreview = headers.slice(0, maxHeaders).join(', ');
  const hasMore = headers.length > maxHeaders;

  return (
    <dl className="sheet-info">
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.columns')}
          :
        </dt>
        <dd className="sheet-info__value">{headers.length}</dd>
      </div>
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.rows')}
          :
        </dt>
        <dd className="sheet-info__value">{rows.length}</dd>
      </div>
      <div className="sheet-info__row">
        <dt className="sheet-info__label">
          {t('export.headers')}
          :
        </dt>
        <dd className="sheet-info__value">
          {headerPreview}
          {hasMore && '...'}
        </dd>
      </div>
    </dl>
  );
}
