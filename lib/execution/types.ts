export interface MemoryCell {
    name: string;
    type: string;
    value: string;
}

export interface ExecutionTreeNode {
    id: string;
    label: string;
    line?: number;
    children: ExecutionTreeNode[];
}

export interface ExecutionStep {
    index: number;
    line: number;
    code: string;
    label: string;
    variables: Record<string, string>;
    heap: MemoryCell[];
    output: string[];
    callStack: string[];
    treeNodeId: string;
}

export interface ExecutionTrace {
    steps: ExecutionStep[];
    tree: ExecutionTreeNode;
    error?: string;
    source: string;
}

export interface TraceOptions {
    maxSteps?: number;
    maxLoopIterations?: number;
}
