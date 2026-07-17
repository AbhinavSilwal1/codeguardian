from pathlib import Path
from codeguardian.analyzers import BaseAnalyzer
from codeguardian.graph import DependencyGraph
from codeguardian.models import Issue, Severity


class CircularDependencyAnalyzer(BaseAnalyzer):
    def __init__(self, graph: DependencyGraph):
        self.graph = graph

    def _dfs(
        self,
        module: str,
        visited: set[str],
        recursion_stack: set[str],
        current_path: list[str],
        issues: list[Issue],
    ):

        visited.add(module)
        recursion_stack.add(module)
        current_path.append(module)

        for dependency in self.graph.get_dependencies(module):
            if dependency not in self.graph.modules():
                continue

            if dependency not in visited:
                self._dfs(dependency, visited, recursion_stack, current_path, issues,)

            elif dependency in recursion_stack:
                cycle_start = current_path.index(dependency)
                cycle = current_path[cycle_start:] + [dependency]
                issues.append(
                    Issue(
                        category="circular_dependency",
                        severity=Severity.HIGH,
                        message=(
                            "Circular dependency detected: "
                            + " -> ".join(cycle)
                        ),
                        file=Path(f"{dependency}.py"),
                        line=0,
                        suggestion=(
                            "Break the dependency cycle by "
                            "moving shared logic into a "
                            "separate module."
                        ),
                    )
                )

        recursion_stack.remove(module)
        current_path.pop()

    def analyze(self):
        visited = set()
        recursion_stack = set()

        issues = []

        for module in self.graph.modules():
            if module not in visited:
                self._dfs(
                    module,
                    visited,
                    recursion_stack,
                    [],
                    issues,
                )

        return issues