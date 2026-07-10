export type OssCategory =
    | "Frontend"
    | "Backend"
    | "Database"
    | "DevOps"
    | "Testing"
    | "Utilities"
    | "Mobile"
    | "AI/ML"
    | "AI Tools"
    | "Developer Tools"
    | "Data & Search";

export interface OssTool {
    slug: string;
    name: string;
    category: OssCategory;
    githubUrl: string;
    website: string;
    license: string;
    description: string;
    stars: string;
    points: number;
    tags: string[];
    installCommand: string;
    integrationGoal: string;
    steps: string[];
    starterFiles: Record<string, string>;
    commitMessage: string;
    markerFile: string;
}

export interface IntegrationCompletion {
    id: string;
    userId: string;
    toolSlug: string;
    points: number;
    githubRepo: string | null;
    githubCommitSha: string | null;
    githubPushUrl: string | null;
    completedAt: string;
}

export interface UserPointsSummary {
    totalPoints: number;
    completedCount: number;
    completions: IntegrationCompletion[];
}

export interface TestResult {
    id: string;
    label: string;
    pass: boolean;
    detail: string;
}

export interface ValidationResult {
    pass: boolean;
    tests: TestResult[];
    summary: string;
}
