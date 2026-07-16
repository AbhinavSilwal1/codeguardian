import ast
from pathlib import Path
from codeguardian.analyzers import (
    BaseAnalyzer,
    MAX_FUNCTION_LENGTH,
)
from codeguardian.models import (
    Issue,
    Severity,
)
from codeguardian.visitors import BaseVisitor


class LongFunctionVisitor(BaseVisitor):
    def __init__(self):
        super().__init__()
        self.functions = []


    def visit_FunctionDef(self, node):
        self.functions.append(node)
        self.generic_visit(node)


class LongFunctionAnalyzer(BaseAnalyzer):
    def analyze(self, tree: ast.AST, file_path: Path):
        visitor = LongFunctionVisitor()
        visitor.visit(tree)

        issues = []

        for function in visitor.functions:
            length = (function.end_lineno - function.lineno + 1)

            if length > MAX_FUNCTION_LENGTH:
                issues.append(
                    Issue(
                        category="long_function",
                        severity=Severity.MEDIUM,
                        message=(
                            f"Function '{function.name}' "
                            f"has {length} lines."
                        ),
                        file=file_path,
                        line=function.lineno,
                        suggestion=(
                            "Split this function "
                            "into smaller functions."
                        )
                    )
                )

        return issues