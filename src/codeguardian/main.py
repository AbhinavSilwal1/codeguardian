import typer
from rich.console import Console
from codeguardian.scanner import find_python_files


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


if __name__ == "__main__":
    app()