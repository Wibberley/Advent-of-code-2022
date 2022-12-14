interface IRearrangmentProcedure {
  amount: number;
  fromSection: number;
  toSection: number;
}

enum RearrangementProcedureMode {
  OneByOne,
  MultipleAtATime,
}

class DayFivePuzzle {
  constructor(private puzzleInput: string) {}

  private getRearrangementProcedures(): IRearrangmentProcedure[] {
    const numberRegex = /[0-9]+/g;
    const allProcedures = this.puzzleInput.split(/\r?\n\r?\n/)[1];

    if (!allProcedures) {
      return [];
    }

    const proceduresByLine = allProcedures.split(/\r?\n/);
    return proceduresByLine.map(procedure => {
      const parts = procedure.match(numberRegex);

      if (!parts) {
        throw new Error('Error getting procedure parts');
      }

      return {
        amount: parseInt(parts[0]),
        fromSection: parseInt(parts[1]),
        toSection: parseInt(parts[2]),
      };
    });
  }

  private processProcedure(
    stacks: string[][],
    rearrangmentProcedure: IRearrangmentProcedure,
    mode: RearrangementProcedureMode
  ) {
    console.log('processProcedure - Stacks - START', stacks);
    console.log(
      'processProcedure - rearrangmentProcedure - START',
      rearrangmentProcedure
    );

    const fromStack = stacks[rearrangmentProcedure.fromSection - 1].reverse();
    const toStack = stacks[rearrangmentProcedure.toSection - 1].reverse();

    if (mode === RearrangementProcedureMode.OneByOne) {
      for (let i = 0; i < rearrangmentProcedure.amount; i++) {
        const crate = fromStack.pop();

        if (!crate) {
          break;
        }

        toStack.push(crate);
      }
    } else {
      const crateIndex = fromStack.length - rearrangmentProcedure.amount;
      for (let i = 0; i < rearrangmentProcedure.amount; i++) {
        const crate = fromStack[crateIndex];
        fromStack.splice(crateIndex, 1);

        if (!crate) {
          break;
        }

        toStack.push(crate);
      }
    }

    stacks[rearrangmentProcedure.fromSection - 1] = fromStack.reverse();
    stacks[rearrangmentProcedure.toSection - 1] = toStack.reverse();

    console.log('processProcedure - Stacks - DONE', stacks);

    return stacks;
  }

  private getStacks(): string[][] {
    const stackRows = this.puzzleInput.split(/\r?\n\r?\n/)[0].split(/\r?\n/);

    const letterRegex = /[A-Z]/g;

    return stackRows.reduce<string[][]>((previous, current) => {
      const charArray = [...current];

      const stackLine = charArray.reduce<string[]>(
        (previous, current, index) => {
          if (current.match(letterRegex)) {
            previous[Math.floor(index / 4)] = current;
          }

          return previous;
        },
        []
      );

      stackLine.forEach((value, index) => {
        if (!previous[index]) {
          previous[index] = [];
        }

        previous[index].push(value);
      });

      return previous;
    }, []);
  }

  private getTopCrateValueFromStack(stack: string[]): string {
    return stack[0];
  }

  public calculateTaskOne(): string {
    let stacks = this.getStacks();

    console.log('stacks', stacks);

    const procedures = this.getRearrangementProcedures();

    console.log('procedures', procedures);

    procedures.forEach(
      procedure =>
        (stacks = this.processProcedure(
          stacks,
          procedure,
          RearrangementProcedureMode.OneByOne
        ))
    );

    return stacks.reduce<string>(
      (previous, current) => previous + this.getTopCrateValueFromStack(current),
      ''
    );
  }

  public calculateTaskTwo(): string {
    let stacks = this.getStacks();

    console.log('stacks', stacks);

    const procedures = this.getRearrangementProcedures();

    console.log('procedures', procedures);

    procedures.forEach(
      procedure =>
        (stacks = this.processProcedure(
          stacks,
          procedure,
          RearrangementProcedureMode.MultipleAtATime
        ))
    );

    return stacks.reduce<string>(
      (previous, current) => previous + this.getTopCrateValueFromStack(current),
      ''
    );
  }
}

export default DayFivePuzzle;
