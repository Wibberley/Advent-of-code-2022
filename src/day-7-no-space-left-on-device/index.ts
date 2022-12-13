interface IMemory {
  size: number;
}

class Console {
  private constructor(public fileSystem: FileSystem) {}

  private currentDirectory: Directory | undefined = undefined;

  public RunCommand(commandAndOutput: CommandAndOutput) {
    if (commandAndOutput.command.includes('cd')) {
      if (commandAndOutput.command.includes('/')) {
        this.currentDirectory = this.fileSystem.rootDirectory;
      } else if (commandAndOutput.command.includes('..')) {
        if (!this.currentDirectory) {
          throw new Error('Not event started!');
        }

        const parent = this.currentDirectory.parent;

        if (!parent) {
          throw new Error('At Root!');
        }

        this.currentDirectory = parent;
      } else {
        const directoryPath = commandAndOutput.command.split(' ')[2];

        const foundDirectory = this.currentDirectory?.subDirectories.filter(
          x => x.path === directoryPath
        )[0];

        if (!foundDirectory) {
          throw new Error(`Error finding directory with path ${directoryPath}`);
        }

        this.currentDirectory = foundDirectory;
      }
    }

    if (commandAndOutput.command.includes('ls')) {
      commandAndOutput.output.forEach(output => {
        if (!this.currentDirectory) {
          throw new Error('Nothing to list!!');
        }

        if (output.startsWith('dir')) {
          this.currentDirectory.AddDirectory(output);
        } else {
          this.currentDirectory.AddFile(File.ParseFileData(output));
        }
      });
    }
  }

  static CreateConsole() {
    return new Console(FileSystem.CreateFileSystem());
  }
}

class FileSystem {
  private constructor(public rootDirectory: Directory) {}

  static CreateFileSystem() {
    return new FileSystem(Directory.CreateDirectory('dir /'));
  }
}

class Directory {
  public subDirectories: Directory[] = [];
  public files: File[] = [];

  constructor(public path: string, public parent: Directory | undefined) {}

  get size(): number {
    return (
      this.subDirectories.reduce(
        (previous, current) =>
          previous + current.size < 100000 ? current.size : 0,
        0
      ) +
      this.files.reduce(
        (previous, current) =>
          previous + current.size < 100000 ? current.size : 0,
        0
      )
    );
  }

  public AddDirectory(path: string): Directory {
    this.subDirectories.push(Directory.CreateDirectory(path, this));
    return this;
  }

  public AddFile(file: File): Directory {
    this.files.push(file);
    return this;
  }

  static CreateDirectory(
    path: string,
    parent: Directory | undefined = undefined
  ): Directory {
    const directoryInformation = path.split(' ');
    return new Directory(directoryInformation[1], parent);
  }
}

class File implements IMemory {
  private constructor(public name: string, public size: number) {}

  static ParseFileData(input: string): File {
    const fileInformation = input.split(' ');
    return new File(fileInformation[1], parseInt(fileInformation[0]));
  }
}

interface CommandAndOutput {
  command: string;
  output: string[];
}

class DaySevenPuzzle {
  constructor(private puzzleInput: string) {}

  private getCommandsAndOuput(): CommandAndOutput[] {
    const rows = this.puzzleInput.split(/\r?\n/);
    return rows.reduce<CommandAndOutput[]>((previous, current) => {
      if (current.includes('$')) {
        previous.push({
          command: current,
          output: [],
        });
      } else {
        previous[previous.length - 1].output.push(current);
      }

      return previous;
    }, []);
  }

  public CalculateTaskOne(): string {
    const commandAndOutputs = this.getCommandsAndOuput();
    const consoleObject = Console.CreateConsole();

    for (const commandAndOutput of commandAndOutputs) {
      consoleObject.RunCommand(commandAndOutput);
    }

    console.log(JSON.stringify(consoleObject.fileSystem.rootDirectory));

    return consoleObject.fileSystem.rootDirectory.size.toString();
  }

  public CalculateTaskTwo(): string {
    return '';
  }
}

export default DaySevenPuzzle;
