from pathlib import Path
from codeguardian.engine import AnalysisEngine


def test_analysis_engine(tmp_path):
    project = tmp_path / "project"
    project.mkdir()

    source = project / "main.py"

    source.write_text("import os\nimport sys\n\nos.getcwd()")

    engine = AnalysisEngine()

    issues = engine.analyze_repository(project)

    assert len(issues) == 1
    assert issues[0].category == "unused_import"