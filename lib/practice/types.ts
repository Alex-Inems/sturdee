export type Difficulty = "Easy" | "Medium" | "Hard";

export type PracticeTopic =
    | "Array"
    | "String"
    | "Hash Table"
    | "Two Pointers"
    | "Sliding Window"
    | "Stack"
    | "Queue"
    | "Linked List"
    | "Tree"
    | "Graph"
    | "Binary Search"
    | "Dynamic Programming"
    | "Backtracking"
    | "Greedy"
    | "Heap"
    | "Math"
    | "Bit Manipulation"
    | "Design"
    | "Sorting";

export interface PracticeExample {
    input: string;
    output: string;
    explanation?: string;
}

export interface PracticeTestCase {
    input: unknown[];
    expected: unknown;
    label?: string;
}

export interface PracticeProblem {
    slug: string;
    number: number;
    title: string;
    difficulty: Difficulty;
    topic: PracticeTopic;
    topics: string[];
    description: string;
    examples: PracticeExample[];
    constraints: string[];
    functionName: string;
    starterCode: { javascript: string; python: string };
    solution: { javascript: string; python: string };
    testCases: PracticeTestCase[];
    acceptanceRate: number;
    seoKeywords: string[];
}

export interface PracticeTestResult {
    index: number;
    pass: boolean;
    input: string;
    expected: string;
    actual: string;
    error?: string;
    hidden?: boolean;
}

export interface PracticeRunSummary {
    passed: number;
    total: number;
    results: PracticeTestResult[];
    runtimeMs: number;
    allPassed: boolean;
}
