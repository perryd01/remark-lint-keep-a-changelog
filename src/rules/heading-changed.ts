import type { AbstractRule, AbstractCheckFunction } from "./abstract-rule";

const allowedChangeTypes = [
  "Added",
  "Changed",
  "Deprecated",
  "Removed",
  "Fixed",
  "Security",
];

function validChangeHeading(node: any) {
  const element = node.children.at(0);
  const isValid = allowedChangeTypes.includes(element.value);
  return isValid;
}

const checkFunc: AbstractCheckFunction = (items: any[], file?: any) => {
  const changeHeadings = items.filter(
    (node) => node.type === "heading" && node.depth === 3
  );

  const invalidChangeHeadings = changeHeadings.flatMap((node) =>
    validChangeHeading(node) ? [] : [node]
  );

  return invalidChangeHeadings.map((node) => ({
    passed: false,
    node,
  }));
};

const headingChanged: AbstractRule = {
  name: "heading-changed",
  message: `Expected any value of \`${allowedChangeTypes.join(", ")}\``,
  check: checkFunc,
};

export default headingChanged;
