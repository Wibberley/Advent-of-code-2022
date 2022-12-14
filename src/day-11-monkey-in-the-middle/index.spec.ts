import * as fs from 'fs';
import * as path from 'path';
import Puzzle, {WorriedMonkey, MonkeyGame, MonkeyFactory} from '.';

describe('day-11', () => {
  const monkeyData = [
    {
      item: 79,
      operation: 'old * 19',
      divisible: 23,
      expectedResult: false,
      expectedMonkeyToThrowTo: 2,
      expectedWorryLevel: 500,
    },
    {
      item: 98,
      operation: 'old * 19',
      divisible: 23,
      expectedResult: false,
      expectedMonkeyToThrowTo: 2,
      expectedWorryLevel: 620,
    },
    {
      item: 54,
      operation: 'old + 6',
      divisible: 19,
      expectedResult: false,
      expectedMonkeyToThrowTo: 2,
      expectedWorryLevel: 20,
    },
    {
      item: 79,
      operation: 'old * old',
      divisible: 13,
      expectedResult: true,
      expectedMonkeyToThrowTo: 1,
      expectedWorryLevel: 2080,
    },
  ];

  it.each(monkeyData)(
    'Given a monkey has an Item with a worry level of $worryLevel AND operation is $operation AND test if divisible by $divisible When it inspects the item Then $expectedResult is returned AND monkey to throw to is $expectedMonkeyToThrowTo',
    ({
      item,
      operation,
      divisible,
      expectedResult,
      expectedMonkeyToThrowTo,
      expectedWorryLevel,
    }) => {
      // Given
      const monkey = WorriedMonkey.Create(
        0,
        [item],
        operation,
        divisible,
        1,
        2
      );

      // When
      const response = monkey.Inspect();

      // Then
      expect(response).not.toBeUndefined();
      expect(response?.Result).toEqual(expectedResult);
      expect(response?.WorryLevel).toEqual(expectedWorryLevel);
      expect(response?.MonkeyToThrowTo).toEqual(expectedMonkeyToThrowTo);
    }
  );

  it('Given a monkey statement When this is supplied to the Monkey Factory Then a monkey object is currectly returned', () => {
    // Given
    const statement = `Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3`;

    // When
    const monkey = MonkeyFactory.CreateFromStatement(
      new MonkeyGame([]),
      false,
      statement
    );

    // Then
    expect(monkey).not.toBeUndefined();
    expect(monkey.Items).toEqual([79, 98]);
    expect(monkey.Operation).toEqual('old * 19');
    expect(monkey.Divisible).toEqual(23);
    expect(monkey.TruthResult).toEqual(2);
    expect(monkey.FalseResult).toEqual(3);
  });

  it('Given a monkey game with 4 monkeys When 1 round of the game has been played Then the monkey items is as expected', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, false);

    // When
    monkeyGame.PlayRounds(1);

    // Then
    expect(monkeyGame.Monkeys[0].Items).toEqual([20, 23, 27, 26]);
    expect(monkeyGame.Monkeys[1].Items).toEqual([
      2080, 25, 167, 207, 401, 1046,
    ]);
    expect(monkeyGame.Monkeys[2].Items).toEqual([]);
    expect(monkeyGame.Monkeys[3].Items).toEqual([]);
  });

  it('Given a monkey game with 4 monkeys When 1 rounds of the game has been played Then the inspect count is expected', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, false);

    // When
    monkeyGame.PlayRounds(1);

    // Then
    expect(monkeyGame.Monkeys[0].InspectCount).toEqual(2);
    expect(monkeyGame.Monkeys[1].InspectCount).toEqual(4);
    expect(monkeyGame.Monkeys[2].InspectCount).toEqual(3);
    expect(monkeyGame.Monkeys[3].InspectCount).toEqual(5);
  });

  it('Given a monkey game with 4 monkeys When 20 rounds of the game has been played Then the Inspect Count is as expected', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, false);

    // When
    monkeyGame.PlayRounds(20);

    // Then
    expect(monkeyGame.Monkeys[0].InspectCount).toEqual(101);
    expect(monkeyGame.Monkeys[1].InspectCount).toEqual(95);
    expect(monkeyGame.Monkeys[2].InspectCount).toEqual(7);
    expect(monkeyGame.Monkeys[3].InspectCount).toEqual(105);
  });

  it('Given a monkey game with 4 monkeys When 20 rounds of the game has been played Then the monkey business value is 10605', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, false);

    // When
    monkeyGame.PlayRounds(20);

    // Then
    expect(monkeyGame.GetMonkeyBusiness()).toEqual(10605);
  });

  it('Given the game input When this is processed by calculateTaskOne Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new Puzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    console.log(result);
  });

  it('Given a monkey game with 4 monkeys When 1 rounds of the game has been played Then the inspect count is expected', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, true);

    // When
    monkeyGame.PlayRounds(1);

    // Then
    expect(monkeyGame.Monkeys[0].InspectCount).toEqual(2);
    expect(monkeyGame.Monkeys[1].InspectCount).toEqual(4);
    expect(monkeyGame.Monkeys[2].InspectCount).toEqual(3);
    expect(monkeyGame.Monkeys[3].InspectCount).toEqual(6);
  });

  it('Given a monkey game with 4 monkeys When 20 rounds of the game has been played Then the Inspect Count is as expected', () => {
    // Given
    const gameInput = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    const monkeyGame = MonkeyGame.Create(gameInput, true);

    // When
    monkeyGame.PlayRounds(20);

    // Then
    expect(monkeyGame.Monkeys[0].InspectCount).toEqual(99);
    expect(monkeyGame.Monkeys[1].InspectCount).toEqual(97);
    expect(monkeyGame.Monkeys[2].InspectCount).toEqual(8);
    expect(monkeyGame.Monkeys[3].InspectCount).toEqual(103);
  });

  it('Given the game input When this is processed by calculateTaskTwo Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new Puzzle(input);
    const result = puzzle.calculateTaskTwo();

    // Then
    console.log(result);
  });
});
