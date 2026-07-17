import json
from codeguardian.models import Issue


def issue_to_dict(issue: Issue):
    return {
        "category": issue.category,
        "severity": issue.severity.value,
        "message": issue.message,
        "file": str(issue.file),
        "line": issue.line,
        "suggestion": issue.suggestion,
    }


def issues_to_json(issues: list[Issue]):
    return json.dumps(
        [
            issue_to_dict(issue)
            for issue in issues
        ],
        indent=4,
    )