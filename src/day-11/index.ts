interface IMonkey {
  Number: number;
  Items: number[];
  Operation: string;
  Divisible: number;
  TruthResult: number;
  FalseResult: number;
  InspectCount: number;

  Inspect(): InspectResult | undefined;
  AddItem(item: number): void;
}

interface InspectResult {
  Result: boolean;
  WorryLevel: number;
  MonkeyToThrowTo: number;
}

export class MonkeyFactory {
  /**
   *
   * @param statement - Monkey 0:
   * @returns
   */
  private static GetMonkeyNumber(statement: string): number {
    const matchNumbers = statement.match(/\d+/);
    if (matchNumbers && matchNumbers.length > 0) {
      return parseInt(matchNumbers[0]);
    }

    throw new Error('Error getting monkey number');
  }

  /**
   *
   * @param statement - Starting items: 79, 98
   */
  private static GetStartingItems(statement: string): number[] {
    const items = statement.split(':');
    return items[1].split(',').map(x => parseInt(x));
  }

  /**
   *
   * @param statement - Operation: new = old * 19
   */
  private static GetOperation(statement: string): string {
    return statement.split('=')[1].trim();
  }

  /**
   *
   * @param statement - divisible by 23
   */
  private static GetDivisible(statement: string): number {
    const matchNumbers = statement.match(/\d+/);
    if (matchNumbers && matchNumbers.length > 0) {
      return parseInt(matchNumbers[0]);
    }

    throw new Error('Error getting divisible');
  }

  /**
   *
   * @param statement - If true: throw to monkey 2
   */
  private static GetTrueResult(statement: string): number {
    const matchNumbers = statement.match(/\d+/);
    if (matchNumbers && matchNumbers.length > 0) {
      return parseInt(matchNumbers[0]);
    }

    throw new Error('Error truthy monkey');
  }

  /**
   *
   * @param statement -  If false: throw to monkey 3
   */
  private static GetFalseResult(statement: string): number {
    const matchNumbers = statement.match(/\d+/);
    if (matchNumbers && matchNumbers.length > 0) {
      return parseInt(matchNumbers[0]);
    }

    throw new Error('Error falsy monkey');
  }

  static CreateFromStatement(
    game: MonkeyGame,
    isBrave: boolean,
    statement: string
  ): IMonkey {
    const statements = statement.split(/\r?\n/);

    if (statements.length !== 6) {
      throw new Error('Invalid Monkey Statement');
    }

    const monkeyNumber = this.GetMonkeyNumber(statements[0]);
    const startingItems = this.GetStartingItems(statements[1]);
    const operation = this.GetOperation(statements[2]);
    const divisible = this.GetDivisible(statements[3]);
    const trueResult = this.GetTrueResult(statements[4]);
    const falseResult = this.GetFalseResult(statements[5]);

    if (isBrave) {
      return BraveMonkey.Create(
        game,
        monkeyNumber,
        startingItems,
        operation,
        divisible,
        trueResult,
        falseResult
      );
    } else {
      return WorriedMonkey.Create(
        monkeyNumber,
        startingItems,
        operation,
        divisible,
        trueResult,
        falseResult
      );
    }
  }
}

export class WorriedMonkey implements IMonkey {
  private _inspectCount = 0;

  private constructor(
    public readonly Number: number,
    public readonly Items: number[],
    public readonly Operation: string,
    public readonly Divisible: number,
    public readonly TruthResult: number,
    public readonly FalseResult: number
  ) {}

  get InspectCount() {
    return this._inspectCount;
  }

  AddItem(item: number) {
    this.Items.push(item);
  }

  Inspect(): InspectResult | undefined {
    const item = this.Items.shift();

    if (!item) {
      return undefined;
    }

    this._inspectCount++;

    let calculatedWorryItem = item;
    const match = this.Operation.match(/\d+/);

    if (this.Operation.includes('*')) {
      if (match && match.length > 0) {
        calculatedWorryItem = item * parseInt(match[0]);
      } else {
        calculatedWorryItem = item * item;
      }
    } else if (this.Operation.includes('+')) {
      if (match && match.length > 0) {
        calculatedWorryItem = item + parseInt(match[0]);
      } else {
        calculatedWorryItem = item + item;
      }
    }

    let monkeytoThrowTo = 0;

    calculatedWorryItem = Math.floor(calculatedWorryItem / 3);

    const isDivisible = calculatedWorryItem % this.Divisible === 0;

    if (isDivisible) {
      monkeytoThrowTo = this.TruthResult;
    } else {
      monkeytoThrowTo = this.FalseResult;
    }

    return {
      Result: isDivisible,
      WorryLevel: calculatedWorryItem,
      MonkeyToThrowTo: monkeytoThrowTo,
    };
  }

  static Create(
    number: number,
    items: number[],
    operation: string,
    divisible: number,
    truthResult: number,
    falseResult: number
  ): WorriedMonkey {
    return new WorriedMonkey(
      number,
      items,
      operation,
      divisible,
      truthResult,
      falseResult
    );
  }
}

export class BraveMonkey implements IMonkey {
  private _inspectCount = 0;

  private constructor(
    private readonly _monkeyGame: MonkeyGame,
    public readonly Number: number,
    public readonly Items: number[],
    public readonly Operation: string,
    public readonly Divisible: number,
    public readonly TruthResult: number,
    public readonly FalseResult: number
  ) {}

  get InspectCount() {
    return this._inspectCount;
  }

  AddItem(item: number) {
    this.Items.push(item);
  }

  ProcessOperation(item: number): number {
    const match = this.Operation.match(/\d+/);

    if (this.Operation.includes('*')) {
      if (match && match.length > 0) {
        return (item * parseInt(match[0])) % this._monkeyGame.GetFactor();
      } else {
        return (item * item) % this._monkeyGame.GetFactor();
      }
    } else if (this.Operation.includes('+')) {
      if (match && match.length > 0) {
        return item + parseInt(match[0]);
      } else {
        return item + item;
      }
    }

    throw new Error('Invalid operation');
  }

  Inspect(): InspectResult | undefined {
    const item = this.Items.shift();

    if (!item) {
      return undefined;
    }

    this._inspectCount++;

    const calculatedWorryItem = this.ProcessOperation(item);

    const isDivisible = calculatedWorryItem % this.Divisible === 0;

    return {
      Result: isDivisible,
      WorryLevel: calculatedWorryItem,
      MonkeyToThrowTo: isDivisible ? this.TruthResult : this.FalseResult,
    };
  }

  static Create(
    game: MonkeyGame,
    number: number,
    items: number[],
    operation: string,
    divisible: number,
    truthResult: number,
    falseResult: number
  ): BraveMonkey {
    return new BraveMonkey(
      game,
      number,
      items,
      operation,
      divisible,
      truthResult,
      falseResult
    );
  }
}

export class MonkeyGame {
  constructor(private _monkeys: IMonkey[]) {}

  get Monkeys(): IMonkey[] {
    return this._monkeys;
  }

  private GetMonkeyByNumber(monkeyNumber: number): IMonkey | undefined {
    return this._monkeys.filter(x => x.Number === monkeyNumber)[0];
  }

  /**
   *
   * To reduce the number when checking if we can be divisible
   * We need a common number which each monkey is able to devise their worry score by to reset
   * This in turn would be a max worry score
   */
  GetFactor(): number {
    return this._monkeys
      .map(x => x.Divisible)
      .reduce((i, current) => {
        return i * current;
      });
  }

  PlayRounds(rounds: number): void {
    for (let i = 0; i < rounds; i++) {
      this._monkeys.forEach(monkey => {
        while (monkey.Items.length > 0) {
          const response = monkey.Inspect();

          if (!response) {
            break;
          }

          const foundMonkey = this.GetMonkeyByNumber(response.MonkeyToThrowTo);

          if (!foundMonkey) {
            throw new Error('Issue with finding monkey');
          }

          foundMonkey.AddItem(response.WorryLevel);
        }
      });
    }
  }

  GetMonkeyBusiness(): number {
    const sorted = this._monkeys.map(x => x.InspectCount).sort((a, b) => b - a);
    console.log(sorted);
    return sorted[0] * sorted[1];
  }

  private AddMonkeyToGame(monkey: IMonkey) {
    this._monkeys.push(monkey);
    console.log('monkey', monkey);
  }

  static Create(gameInput: string, braveMonkeys: boolean) {
    const monkeyStatements = gameInput.split(/\r?\n\r?\n/);
    const game = new MonkeyGame([]);

    for (const monkeyStatement of monkeyStatements) {
      game.AddMonkeyToGame(
        MonkeyFactory.CreateFromStatement(game, braveMonkeys, monkeyStatement)
      );
    }

    return game;
  }
}

class Puzzle {
  constructor(private puzzleInput: string) {}

  public calculateTaskOne(): string {
    const game = MonkeyGame.Create(this.puzzleInput, false);
    game.PlayRounds(20);
    return game.GetMonkeyBusiness().toString();
  }

  public calculateTaskTwo(): string {
    const game = MonkeyGame.Create(this.puzzleInput, true);
    game.PlayRounds(10000);
    return game.GetMonkeyBusiness().toString();
  }
}

export default Puzzle;
