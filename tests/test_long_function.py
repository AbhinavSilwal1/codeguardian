import ast
from pathlib import Path
from codeguardian.analyzers.long_function import (
    LongFunctionAnalyzer,
)


def test_long_function():
    code = """
def big_function():
    a = 1
    b = 2
    c = 3
    d = 4
"""

    tree = ast.parse(code)

    analyzer = LongFunctionAnalyzer()

    issues = analyzer.analyze(
        tree,
        Path("test.py")
    )

    assert len(issues) == 0


def test_very_long_function():
    lines = ["def huge_function():"]

    for _ in range(60):
        lines.append("    x = 1")

    tree = ast.parse(
        "\n".join(lines)
    )

    analyzer = LongFunctionAnalyzer()

    issues = analyzer.analyze(
        tree,
        Path("test.py")
    )

    assert len(issues) == 1
    assert issues[0].category == "long_function"