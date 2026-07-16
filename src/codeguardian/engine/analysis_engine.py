from pathlib import Path
from codeguardian.analyzers.unused_import import (
    UnusedImportAnalyzer,
)
from codeguardian.analyzers.parser import PythonParser
from codeguardian.scanner import find_python_files


# Coordinates repository analysis
class AnalysisEngine:
    def __init__(self):
        self.parser = PythonParser()

        self.analyzers = [
            UnusedImportAnalyzer(),
        ]

    def analyze_repository(self, directory: Path):
        issues = []

        files = find_python_files(directory)

        for file in files:
            tree = self.parser.parse_file(file)

            if tree is None:
                continue

            for analyzer in self.analyzers:
                issues.extend(
                    analyzer.analyze(
                        tree,
                        file
                    )
                )

        return issues