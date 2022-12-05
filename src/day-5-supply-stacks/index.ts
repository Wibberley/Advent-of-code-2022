class DayFivePuzzle {
  constructor(private puzzleInput: string) {}

  private getStacks(): string[][] {
    const charArray = [...this.puzzleInput];

    const letterRegex = /[A-Z]/g;
    const newLineRegex = /\r?\n/;
    let stackIndex = 0;

    return charArray.reduce<string[][]>((previous, current) => {
      if (current.match(newLineRegex)) {
        stackIndex = 0;
      }

      if (current.match(letterRegex)) {
        if (!previous[stackIndex]) {
          previous[stackIndex] = [];
        }

        previous[stackIndex].push(current);

        stackIndex++;
      }

      return previous;
    }, []);
  }

  private getTopCrateValueFromStack(stack: string[]): string {
    return stack[0];
  }

  public calculateTaskOne(): string {
    const stacks = this.getStacks();

    console.log('stacks', stacks);

    return stacks.reduce<string>(
      (previous, current) => previous + this.getTopCrateValueFromStack(current),
      ''
    );
  }

  public calculateTaskTwo(): string {
    return '';
  }
}

export default DayFivePuzzle;
