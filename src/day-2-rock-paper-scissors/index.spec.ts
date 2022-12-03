import * as fs from 'fs';
import * as path from 'path';
import theoretically from 'jest-theories';
import {
  calculateGameScore,
  calculateStrategyResult,
  GameChoice,
  GameOutcome,
} from '.';

describe('day-2-rock-paper-scissors', () => {
  const theories = [
    {
      opponentChoice: GameChoice.Rock,
      yourChoice: GameChoice.Rock,
      expectedOutcome: GameOutcome.DRAW,
      expectedScore: 4,
    },
    {
      opponentChoice: GameChoice.Rock,
      yourChoice: GameChoice.Paper,
      expectedOutcome: GameOutcome.WIN,
      expectedScore: 8,
    },
    {
      opponentChoice: GameChoice.Rock,
      yourChoice: GameChoice.Scissors,
      expectedOutcome: GameOutcome.LOSS,
      expectedScore: 3,
    },
    {
      opponentChoice: GameChoice.Paper,
      yourChoice: GameChoice.Paper,
      expectedOutcome: GameOutcome.DRAW,
      expectedScore: 5,
    },
    {
      opponentChoice: GameChoice.Paper,
      yourChoice: GameChoice.Rock,
      expectedOutcome: GameOutcome.LOSS,
      expectedScore: 1,
    },
    {
      opponentChoice: GameChoice.Paper,
      yourChoice: GameChoice.Scissors,
      expectedOutcome: GameOutcome.WIN,
      expectedScore: 9,
    },
    {
      opponentChoice: GameChoice.Scissors,
      yourChoice: GameChoice.Scissors,
      expectedOutcome: GameOutcome.DRAW,
      expectedScore: 6,
    },
    {
      opponentChoice: GameChoice.Scissors,
      yourChoice: GameChoice.Rock,
      expectedOutcome: GameOutcome.WIN,
      expectedScore: 7,
    },
    {
      opponentChoice: GameChoice.Scissors,
      yourChoice: GameChoice.Paper,
      expectedOutcome: GameOutcome.LOSS,
      expectedScore: 2,
    },
  ];

  theoretically(
    'Given opponent chooses {opponentChoice} and you choose {yourChoice} When calculateGameScore is called Then this is a {expectedOutcome} and the score is {expectedScore}',
    theories,
    theory => {
      // Given
      const opponent: GameChoice = theory.opponentChoice;
      const you: GameChoice = theory.yourChoice;

      // When
      const result = calculateGameScore(opponent, you);

      // Then
      expect(result.outcome).toEqual(theory.expectedOutcome);
      expect(result.score).toEqual(theory.expectedScore);
    }
  );

  it('Given a single game where our desired result is draw When this is processed via calculateStrategyResult Then the score of 4 is returned', () => {
    // Given
    const input = `A Y`;

    // When
    const result = calculateStrategyResult(input);

    // Then
    expect(result).toEqual(4);
  });

  it('Given a single game where our desired result is win When this is processed via calculateStrategyResult Then the score of 7 is returned', () => {
    // Given
    const input = `C Z`;

    // When
    const result = calculateStrategyResult(input);

    // Then
    expect(result).toEqual(7);
  });

  it('Given a single game where our desired result is lose When this is processed via calculateStrategyResult Then the score of 1 is returned', () => {
    // Given
    const input = `B X`;

    // When
    const result = calculateStrategyResult(input);

    // Then
    expect(result).toEqual(1);
  });

  it('Given multiple games When this is processed via calculateStrategyResult Then the total score of each game of 12 is returned', () => {
    // Given
    const input = `A Y
B X
C Z`;

    // When
    const result = calculateStrategyResult(input);

    // Then
    expect(result).toEqual(12);
  });

  it('Given the game input When this is processed via calculateStrategyResult Then the total score is returned!', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const result = calculateStrategyResult(input);

    // Then
    console.log(result);
  });
});
