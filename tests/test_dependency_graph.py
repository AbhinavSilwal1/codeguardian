from codeguardian.graph import DependencyGraph
from codeguardian.graph import DependencyGraphBuilder
from codeguardian.scanner import find_python_files


def test_add_dependency():
    graph = DependencyGraph()

    graph.add_dependency(
        "app",
        "utils",
    )

    assert graph.get_dependencies("app") == {
        "utils",
    }


def test_duplicate_dependency():
    graph = DependencyGraph()

    graph.add_dependency(
        "app",
        "utils",
    )

    graph.add_dependency(
        "app",
        "utils",
    )

    assert len(graph.get_dependencies("app")) == 1


def test_dependency_graph_builder(tmp_path):
    app = tmp_path / "app.py"

    app.write_text(
        "import utils\nimport database\n"
    )

    builder = DependencyGraphBuilder()

    graph = builder.build([app])

    assert graph.get_dependencies("app") == {
        "utils",
        "database",
    }


builder = DependencyGraphBuilder()

graph = builder.build(
    find_python_files("examples/sample_project")
)

print(graph.graph)