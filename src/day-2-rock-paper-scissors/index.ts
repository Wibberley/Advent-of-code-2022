export enum GameChoice {
  Rock,
  Paper,
  Scissors,
}

const opponentChoiceMapping = {
  A: GameChoice.Rock,
  B: GameChoice.Paper,
  C: GameChoice.Scissors,
};

const yourChoiceMapping = {
  X: GameChoice.Rock,
  Y: GameChoice.Paper,
  Z: GameChoice.Scissors,
};

const scoreMapping = {
  [GameChoice.Rock]: 1,
  [GameChoice.Paper]: 2,
  [GameChoice.Scissors]: 3,
};

const GameChoiceBeatGameChoiceMapping = {
  [GameChoice.Rock]: GameChoice.Scissors,
  [GameChoice.Paper]: GameChoice.Rock,
  [GameChoice.Scissors]: GameChoice.Paper,
};

export interface GameScoreResult {
  outcome: 'DRAW' | 'WIN' | 'LOSS';
  score: number;
}

export const calculateGameScore = (
  opponentChoice: GameChoice,
  yourChoice: GameChoice
): GameScoreResult => {
  if (opponentChoice === yourChoice) {
    return {
      outcome: 'DRAW',
      score: 3 + scoreMapping[yourChoice],
    };
  }

  if (GameChoiceBeatGameChoiceMapping[opponentChoice] === yourChoice) {
    return {
      outcome: 'LOSS',
      score: 0 + scoreMapping[yourChoice],
    };
  }

  return {
    outcome: 'WIN',
    score: 6 + scoreMapping[yourChoice],
  };
};

export const calculateStrategyResult = (input: string): number => {
  const games: string[] = input.split(/\r?\n/);
  let totalScore = 0;
  games.forEach(game => {
    const choices = game.split(' ');
    const opponentChoice = choices[0].trim();
    const yourChoice = choices[1].trim();

    if (!opponentChoiceMapping.hasOwnProperty(opponentChoice)) {
      console.warn('Invalid Key');
      return;
    }

    if (!yourChoiceMapping.hasOwnProperty(yourChoice)) {
      console.warn('Invalid Key');
      return;
    }

    const opponentGameChoice =
      opponentChoiceMapping[
        opponentChoice as keyof typeof opponentChoiceMapping
      ];

    const yourGameChoice =
      yourChoiceMapping[yourChoice as keyof typeof yourChoiceMapping];

    const gameResult = calculateGameScore(opponentGameChoice, yourGameChoice);

    totalScore += gameResult.score;
  });
  return totalScore;
};
