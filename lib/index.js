import { ok as assert } from "devlop";
import { lintRule } from "unified-lint-rule";
import { location } from "vfile-location";
import { visit } from "unist-util-visit";

const allowedChangeTypes = [
  "Added",
  "Changed",
  "Deprecated",
  "Removed",
  "Fixed",
  "Security",
];

function validHeading(node) {
  return node.depth === 1 && node.children[0].value === "Changelog";
}

/**
 *
 * @param {*} node
 * @returns {boolean}
 */
function validVersionHeading(node) {
  return true;
}

/**
 *
 * @param {*} node
 * @returns {boolean}
 */
function validChangeHeading(node) {
  const element = node.children.at(0);
  const isValid = allowedChangeTypes.includes(element.value);
  return isValid;
}

const remarkLintKeepAChangelog = lintRule(
  {
    origin: "remark-lint:keep-a-changelog",
  },
  function (tree, file, options) {
    const items = tree.children || [];

    const versionHeadings = items.filter((node) => {
      return node.type === "heading" && node.depth === 2;
    });

    const changeHeadings = items.filter((node) => {
      return node.type === "heading" && node.depth === 3;
    });

    const invalidChangeHeadings = changeHeadings.flatMap((node) =>
      validChangeHeading(node) ? [] : [node]
    );

    invalidChangeHeadings.forEach((node) => {
      file.message(
        `Expected a level 2 heading with the text \`${allowedChangeTypes.join(
          "|"
        )}\` but found \`${node.children[0].value}\``,
        node.position
      );
    });

    if (!validHeading(tree.children[0])) {
      file.message(
        "Expected a heading with the text `Changelog`",
        tree.children[0].position
      );
    }
  }
);

export default remarkLintKeepAChangelog;
