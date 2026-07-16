import ast
from pathlib import Path
from codeguardian.analyzers.unused_import import (
    UnusedImportAnalyzer,
)


def test_unused_import():
    tree = ast.parse(
        """
import os

print("Hello")
"""
    )

    analyzer = UnusedImportAnalyzer()

    issues = analyzer.analyze(tree, Path("example.py"))

    assert len(issues) == 1
    assert issues[0].category == "unused_import"


def test_used_import():
    tree = ast.parse(
        """
import os

os.getcwd()
"""
    )

    analyzer = UnusedImportAnalyzer()

    issues = analyzer.analyze(tree, Path("example.py"))

    assert len(issues) == 0