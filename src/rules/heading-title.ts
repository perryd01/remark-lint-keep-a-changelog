import { AbstractCheckFunction, AbstractCheckFunctionResult, AbstractRule } from "./abstract-rule";


function validHeading(node: any) {
    return node.depth === 1 && node.children[0].value === "Changelog";
}

const checkFunc: AbstractCheckFunction = (nodes) => {

    const titleNode = nodes.at(0) as Record<string, any>

    return validHeading(titleNode) ? [] : [
        {
            node: titleNode,
            message: `Expected heading title to be \`Changelog\`, but found \`${titleNode.children.at(0)?.value}\``,
            passed: false
        }
    ]
}

const headingTitle: AbstractRule = {
    name: "heading-title",
    check: checkFunc
}

export default headingTitle;