export type Issue = {
    category: string;
    severity: string;
    message: string;
    file: string;
    line: number | null;
    suggestion: string | null;
};


export type Summary = {
    files_scanned: number;
    total_issues: number;
    severity_counts: Record<string, number>;
    category_counts: Record<string, number>;
};


export type AnalysisResponse = {
    summary: Summary;
    issues: Issue[];
};