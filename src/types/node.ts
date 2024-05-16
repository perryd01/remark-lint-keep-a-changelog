export type TreeNode = {
    type: string
    ordered?: boolean
    start?: any
    spread?: boolean
    children: any[]
    position: NodePosition
}

type NodePositionElement = {
    line: number,
    column: number,
    offset: number
}

type NodePosition = {
    start: NodePositionElement,
    end: NodePositionElement
}