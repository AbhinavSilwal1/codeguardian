import ast
from pathlib import Path
from codeguardian.analyzers import BaseAnalyzer
from codeguardian.models import Issue, Severity
from codeguardian.visitors import BaseVisitor


class UnusedImportVisitor(BaseVisitor):
    def __init__(self):
        super().__init__()

        self.imports = {}
        self.used_names = set()

    def visit_Import(self, node):
        for alias in node.names:
            name = alias.asname or alias.name
            self.imports[name] = node

        self.generic_visit(node)

    def visit_Name(self, node):
        self.used_names.add(node.id)
        self.generic_visit(node)

    
class UnusedImportAnalyzer(BaseAnalyzer):
    def analyze(self, tree: ast.AST, file_path: Path):
        visitor = UnusedImportVisitor()
        visitor.visit(tree)

        issues = []

        for name, node in visitor.imports.items():
            if name not in visitor.used_names:
                issues.append(
                    Issue(
                        category="unused_import",
                        severity=Severity.LOW,
                        message=f"Import '{name}' is never used.",
                        file=file_path,
                        line=node.lineno,
                        suggestion="Remove the unused import."
                    )
                )

        return issues