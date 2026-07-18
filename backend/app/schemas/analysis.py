from pydantic import BaseModel


class IssueSchema(BaseModel):
    category: str
    severity: str
    message: str
    file: str
    line: int | None = None
    suggestion: str | None = None


class SummarySchema(BaseModel):
    files_scanned: int
    total_issues: int
    severity_counts: dict[str, int]
    category_counts: dict[str, int]


class AnalysisResponse(BaseModel):
    summary: SummarySchema
    issues: list[IssueSchema]