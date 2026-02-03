import type { ReportResults } from '@features/reports/types';

export interface ParsedReport {
  headers: string[];
  rows: (string | number | boolean | null)[][];
}

export function parseReport(results: ReportResults): ParsedReport {
  const { detailColumns } = results.reportMetadata;
  const { detailColumnInfo } = results.reportExtendedMetadata;

  const headers = detailColumns.map((col) => detailColumnInfo[col]?.label || col);

  const rows: ParsedReport['rows'] = [];

  for (const key of Object.keys(results.factMap)) {
    const section = results.factMap[key];
    if (!section.rows) continue;

    for (const row of section.rows) {
      const rowData = row.dataCells.map((cell) => {
        if (cell.value === null || cell.value === undefined) return cell.label || '';

        return typeof cell.value === 'object'
          ? cell.label
          : (cell.value as string | number | boolean);
      });

      rows.push(rowData);
    }
  }

  return { headers, rows };
}
