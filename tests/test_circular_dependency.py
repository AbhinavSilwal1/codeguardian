from codeguardian.analyzers.circular_dependency import (
    CircularDependencyAnalyzer,
)
from codeguardian.graph import DependencyGraph


def test_detect_circular_dependency():
    graph = DependencyGraph()
    graph.add_dependency(
        "app",
        "utils",
    )
    graph.add_dependency(
        "utils",
        "database",
    )
    graph.add_dependency(
        "database",
        "app",
    )

    analyzer = CircularDependencyAnalyzer(graph)

    issues = analyzer.analyze()

    assert len(issues) == 1
    assert (
        issues[0].category
        == "circular_dependency"
    )
    assert (
        issues[0].severity.value
        == "HIGH"
    )


def test_no_circular_dependency():
    graph = DependencyGraph()
    graph.add_dependency(
        "app",
        "utils",
    )
    graph.add_dependency(
        "utils",
        "database",
    )

    analyzer = CircularDependencyAnalyzer(graph)

    issues = analyzer.analyze()

    assert len(issues) == 0


def test_multiple_modules_without_cycles():
    graph = DependencyGraph()
    graph.add_dependency(
        "app",
        "utils",
    )
    graph.add_dependency(
        "app",
        "database",
    )
    graph.add_dependency(
        "database",
        "config",
    )

    analyzer = CircularDependencyAnalyzer(graph)

    issues = analyzer.analyze()

    assert len(issues) == 0