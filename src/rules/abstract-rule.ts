import { TreeNode } from "types/node";
import { VFile } from "unified-lint-rule/lib";

export type AbstractRule = {
  name: string;
  check: AbstractCheckFunction;
  
}

export type AbstractCheckFunctionResult = {
  node: Record<string, any>;
  passed: boolean;
  message: string;
}
export type AbstractCheckFunction = (
  items: TreeNode[],
  file?: any
) => AbstractCheckFunctionResult[];

export type AbstractRuleResult = AbstractRule & AbstractCheckFunctionResult
