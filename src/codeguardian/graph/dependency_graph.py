from collections import defaultdict
from pathlib import Path
import ast


class DependencyGraph:
    def __init__(self):
        self.graph = defaultdict(set)

    def add_dependency(self, module: str, dependency: str,):
        self.graph[module].add(dependency)

    def get_dependencies(self, module: str,):
        return self.graph[module]
    
    def modules(self):
        return self.graph.keys()
    

class DependencyGraphBuilder:
    def __init__(self):
        pass

    def build(self, files: list[Path],):
        graph = DependencyGraph()

        for file in files:
            module_name = file.stem

            with open(file, "r", encoding="utf-8") as source:
                tree = ast.parse(source.read())

            for node in ast.walk(tree):
                if isinstance(node, ast.Import):
                    for alias in node.names:
                        graph.add_dependency(module_name, alias.name.split(".")[0],)

                elif isinstance(node, ast.ImportFrom):
                    if node.module:
                        graph.add_dependency(module_name, node.module.split(".")[0],)

        return graph