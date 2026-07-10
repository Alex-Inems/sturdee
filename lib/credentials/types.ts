import type { CourseCategory } from "@/lib/courses";

export interface SimulatedCommit {
    sha: string;
    message: string;
    files: Record<string, string>;
    timestamp: string;
}

export interface WorkspaceState {
    challengeId: string;
    files: Record<string, string>;
    stagedFiles: string[];
    commits: SimulatedCommit[];
}

export interface ChallengeMeta {
    id: string;
    slug: string;
    title: string;
    moduleTitle: string;
    lessonSlug: string;
    category: CourseCategory;
    skill: string;
    description: string;
    instructions: string[];
    starterFiles: Record<string, string>;
    requiredCommitMessage?: RegExp;
    minCommits: number;
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

export interface MicroCertificate {
    id: string;
    userId: string;
    userName: string;
    challengeId: string;
    title: string;
    skill: string;
    category: string;
    commitSha: string;
    verificationCode: string;
    signature: string;
    commitLog: SimulatedCommit[];
    issuedAt: string;
}
