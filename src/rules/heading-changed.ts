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

  const result = invalidChangeHeadings.map((node) => {
    const textFound = node?.children?.at(0)?.value
    return {
      passed: false,
      message: `Expected any value of \`${allowedChangeTypes.join(", ")}\`, but found \`${textFound}\``,
      node,
    }
  })

  return result
}

const headingChanged: AbstractRule = {
  name: "heading-changed",
  check: checkFunc,
};

export default headingChanged;
