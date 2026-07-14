from dataclasses import dataclass
from enum import Enum
from pathlib import Path


# Represents the severity level of an issue
class Severity(str, Enum):
    CRITICAL = "CRITICAL"
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"
    INFO = "INFO"


# Represents a CodeGuardian finding
@dataclass
class Issue:
    category: str
    severity: Severity
    message: str
    file: Path
    line: int | None = None
    suggestion: str | None = None

    # Human-readable representation
    def __str__(self):
        location = f"{self.file}"

        if self.line:
            location += f":{self.line}"

        return (
            f"[{self.severity}] "
            f"{self.category}: "
            f"{self.message} "
            f"({location})"
        )