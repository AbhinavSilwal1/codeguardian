import typer
from rich.console import Console
from codeguardian.scanner import find_python_files
from pathlib import Path
from codeguardian.engine import AnalysisEngine


app = typer.Typer()
console = Console()


# Callback function
@app.callback()
def callback():
    pass


# Scan a project directory
@app.command()
def scan(path: str):
    console.print("\n[bold blue]Scanning project...[/bold blue]\n")

    files = find_python_files(path)

    print("Python files discovered:")
    print("------------------------")

    for file in files:
        print(file)

    console.print(f"\n[green]Total Python files: {len(files)}[/green]")

    engine = AnalysisEngine()

    issues = engine.analyze_repository(
        Path(path)
    )

    console.print("\n[bold blue]Scanning project...[/bold blue]\n")
    if not issues:
        console.print("[green]✓ No issues found.[/green]")
    else:
        console.print(f"[yellow]Found {len(issues)} issue(s):[/yellow]\n")
    for issue in issues:
        console.print(issue)


if __name__ == "__main__":
    app()