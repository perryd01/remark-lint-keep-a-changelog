export interface AbstractRule {
  name: string;
  check: AbstractCheckFunction;
  message: string;
}

export type AbstractCheckFunction = (
  items: any[],
  file?: any
) => Array<{
  passed: boolean;
  node: any;
}>;

export interface AbstractRuleResult extends AbstractRule {
  passed: boolean;
  node: any;
}
