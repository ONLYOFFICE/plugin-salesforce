export interface SelectableItem {
  name: string;
  label: string;
  type?: string;
}

export type LogicalOperator = 'And' | 'Or';

export interface FilterCondition {
  id: string;
  field: string;
  operator: string;
  value: string;
  connector?: LogicalOperator;
}
