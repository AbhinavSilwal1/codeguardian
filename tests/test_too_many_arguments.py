import ast
from pathlib import Path
from codeguardian.analyzers.too_many_arguments import (
    TooManyArgumentsAnalyzer,
)


def test_too_many_arguments():
    tree = ast.parse(
        """
def create_user(
    a,
    b,
    c,
    d,
    e,
    f
):
    pass
"""
    )

    analyzer = TooManyArgumentsAnalyzer()

    issues = analyzer.analyze(
        tree,
        Path("test.py")
    )

    assert len(issues) == 1
    assert issues[0].category == "too_many_arguments"