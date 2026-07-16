import ast
from pathlib import Path
from codeguardian.analyzers import (
    BaseAnalyzer,
    MAX_FUNCTION_ARGUMENTS,
)
from codeguardian.models import (
    Issue,
    Severity,
)
from codeguardian.visitors import BaseVisitor


class TooManyArgumentsVisitor(BaseVisitor):
    def __init__(self):
        super().__init__()

        self.functions = []


    def visit_FunctionDef(self, node):
        self.functions.append(node)
        self.generic_visit(node)


class TooManyArgumentsAnalyzer(BaseAnalyzer):
    def analyze(self, tree: ast.AST, file_path: Path):
        visitor = TooManyArgumentsVisitor()
        visitor.visit(tree)

        issues = []

        for function in visitor.functions:

            arguments = len(function.args.args)

            if arguments > MAX_FUNCTION_ARGUMENTS:
                issues.append(
                    Issue(
                        category="too_many_arguments",
                        severity=Severity.MEDIUM,
                        message=(
                            f"Function '{function.name}' "
                            f"has {arguments} arguments."
                        ),
                        file=file_path,
                        line=function.lineno,
                        suggestion=(
                            "Consider using an object "
                            "or dataclass."
                        )
                    )
                )

        return issues