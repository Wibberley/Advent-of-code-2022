interface IMemory {
  size: number;
}

class Console {
  private constructor(private readonly fileSystem: FileSystem) {}

  public RunCommand(input: CommandAndOutput) {
    if (input.command.includes('cd')) {
      if (input.command.includes('/')) {
        this.fileSystem.GoToRoot();
      } else if (input.command.includes('..')) {
        this.fileSystem.GoToParent();
      } else {
        this.fileSystem.GoToDirectory(input.command.split(' ')[2]);
      }
    }

    if (input.command.includes('ls')) {
      this.fileSystem.ListFiles(input.output);
    }
  }

  static CreateConsole(fileSystem: FileSystem) {
    return new Console(fileSystem);
  }
}

class FileSystem {
  public readonly capacity: number = 70000000;

  public get availableCapacity(): number {
    return this.capacity - this.rootDirectory.size;
  }

  public currentDirectory: Directory;

  private constructor(private readonly rootDirectory: Directory) {
    this.currentDirectory = rootDirectory;
  }

  GoToRoot() {
    this.currentDirectory = this.rootDirectory;
  }

  GoToParent() {
    if (this.currentDirectory.parent) {
      this.currentDirectory = this.currentDirectory.parent;
      return;
    }

    console.warn('At Root!');
  }

  GoToDirectory(directoryPath: string) {
    const foundDirectory = this.currentDirectory.subDirectories.filter(
      x => x.path === directoryPath
    )[0];

    if (!foundDirectory) {
      throw new Error(`Error finding directory with path ${directoryPath}`);
    }

    this.currentDirectory = foundDirectory;
  }

  ListFiles(output: string[]) {
    output.forEach(output => {
      if (output.startsWith('dir')) {
        this.currentDirectory.AddDirectory(output);
      } else {
        this.currentDirectory.AddFile(File.ParseFileData(output));
      }
    });
  }

  SearchForDirectoriesGreaterThanSize(
    maxSize: number,
    parentDirectory: Directory = this.rootDirectory
  ): Directory[] {
    let directories: Directory[] = [];

    if (parentDirectory.size > maxSize) {
      directories.push(parentDirectory);
    }

    for (const directory of parentDirectory.subDirectories) {
      const foundDirectories = this.SearchForDirectoriesGreaterThanSize(
        maxSize,
        directory
      );

      if (foundDirectories.length > 0) {
        directories = directories.concat(foundDirectories);
      }
    }

    return directories;
  }

  SearchForDirectoriesLessThanSize(
    maxSize: number,
    parentDirectory: Directory = this.rootDirectory
  ): Directory[] {
    let directories: Directory[] = [];

    if (parentDirectory.size < maxSize) {
      directories.push(parentDirectory);
    }

    for (const directory of parentDirectory.subDirectories) {
      const foundDirectories = this.SearchForDirectoriesLessThanSize(
        maxSize,
        directory
      );
      if (foundDirectories.length > 0) {
        directories = directories.concat(foundDirectories);
      }
    }

    return directories;
  }

  static CreateFileSystem() {
    return new FileSystem(Directory.CreateDirectory('dir /'));
  }
}

class Directory implements IMemory {
  public subDirectories: Directory[] = [];
  public files: File[] = [];

  constructor(public path: string, public parent: Directory | undefined) {}

  GetTotalSize(): number {
    return (
      this.subDirectories.reduce(
        (previous, current) => previous + current.GetTotalSize(),
        0
      ) + this.files.reduce((previous, current) => previous + current.size, 0)
    );
  }

  public get size(): number {
    return this.GetTotalSize();
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

    const fileSystem = FileSystem.CreateFileSystem();
    const consoleObject = Console.CreateConsole(fileSystem);

    for (const commandAndOutput of commandAndOutputs) {
      consoleObject.RunCommand(commandAndOutput);
    }

    return fileSystem
      .SearchForDirectoriesLessThanSize(100000)
      .reduce((previous, current) => {
        return previous + current.size;
      }, 0)
      .toString();
  }

  public CalculateTaskTwo(): string {
    const commandAndOutputs = this.getCommandsAndOuput();

    const fileSystem = FileSystem.CreateFileSystem();
    const consoleObject = Console.CreateConsole(fileSystem);

    for (const commandAndOutput of commandAndOutputs) {
      consoleObject.RunCommand(commandAndOutput);
    }

    const requiredSpaceToDelete = 30000000 - fileSystem.availableCapacity;

    const foundDirectories = fileSystem.SearchForDirectoriesGreaterThanSize(
      requiredSpaceToDelete
    );

    return foundDirectories.sort((a, b) => a.size - b.size)[0].size.toString();
  }
}

export default DaySevenPuzzle;
