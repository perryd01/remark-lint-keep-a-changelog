import type { AbstractRule, AbstractRuleResult } from "../rules/abstract-rule";

type RuleValidatorParams = {
  tree: any;
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
        name: rule.name,
        message: rule.message,
        check: rule.check,
        passed: r.passed,
        node: r.node,
      };
    }) as AbstractRuleResult[];

    return r;
  });
}

export default ruleValidator;
