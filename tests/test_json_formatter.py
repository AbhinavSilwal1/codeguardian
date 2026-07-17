import json
from pathlib import Path
from codeguardian.formatters import (
    issue_to_dict,
    issues_to_json,
)
from codeguardian.models import (
    Issue,
    Severity,
)


def test_issue_to_dict():
    issue = Issue(
        category="unused_import",
        severity=Severity.LOW,
        message="Unused import.",
        file=Path("app.py"),
        line=10,
        suggestion="Remove import.",
    )

    result = issue_to_dict(issue)

    assert result["category"] == "unused_import"
    assert result["severity"] == "LOW"
    assert result["line"] == 10


def test_issues_to_json():
    issue = Issue(
        category="unused_import",
        severity=Severity.LOW,
        message="Unused import.",
        file=Path("app.py"),
        line=10,
        suggestion="Remove import.",
    )

    json_output = issues_to_json([issue])

    parsed = json.loads(json_output)

    assert len(parsed) == 1
    assert parsed[0]["category"] == "unused_import"