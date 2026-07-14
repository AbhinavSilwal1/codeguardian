from pathlib import Path


DEFAULT_EXCLUDED_DIRS = {
    ".venv",
    "venv",
    ".git",
    "__pycache__",
    "node_modules",
    "dist",
    "build",
}


# Recursively find Python files while ignoring unnecessary directories
def find_python_files(directory):
    path = Path(directory)

    if not path.exists():
        raise FileNotFoundError(f"Directory not found: {directory}")

    python_files = []

    for file in path.rglob("*.py"):

        if any(excluded in file.parts for excluded in DEFAULT_EXCLUDED_DIRS):
            continue

        python_files.append(file)

    return python_files