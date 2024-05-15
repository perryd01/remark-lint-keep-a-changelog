import { lintRule } from "unified-lint-rule";
import type { Root } from "mdast";
import RuleValidator from "./runner/rule-validator.js";

import HeadingChanged from "./rules/heading-changed.js";

const remarkLintKeepAChangelog = lintRule(
  {
    url: "https://github.com/perryd01/remark-lint-keep-a-changelog",
    origin: "remark-lint-keep-a-changelog",
  },
  function (tree: Root, file: any, options: any) {
    const { children } = tree;

    const result = RuleValidator({
      tree: children,
      file,
      rules: [HeadingChanged],
    });

    result.forEach((r) => {
      if (!r.passed) {
        file.message(r.message, r.node.position);
      }
    });
  }
);

export default remarkLintKeepAChangelog;
