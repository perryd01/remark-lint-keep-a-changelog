import type { AbstractRule, AbstractRuleResult } from "../rules/abstract-rule";
import type {TreeNode} from "../types/node"

type RuleValidatorParams = {
  tree: TreeNode[];
  file?: any;
  rules: AbstractRule[];
};

function ruleValidator({
  tree,
  rules,
}: RuleValidatorParams): AbstractRuleResult[] {
  return rules.flatMap((rule) => {
    const result = rule.check(tree);

    const r = result.map((r) => {
      return {
        ...r,
        name: rule.name,
        check: rule.check,
      };
    }) as AbstractRuleResult[];

    return r;
  });
}

export default ruleValidator;
