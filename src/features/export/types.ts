export type ExportStep = 'source' | 'object' | 'mapping' | 'loading' | 'success';

export type ExportOperation = 'create' | 'update' | 'upsert';

export interface FieldMapping {
  sourceColumn: string;
  targetField: string;
}

export interface ExportConfig {
  operation: ExportOperation;
  objectName: string;
  mappings: FieldMapping[];
  idColumn?: string;
  externalIdField?: string;
}

export interface ExportResult {
  success: boolean;
  successCount: number;
  errorCount: number;
  errors: { row: number; message: string }[];
}
