export enum GameChoice {
  Rock,
  Paper,
  Scissors,
}

export enum GameOutcome {
  'DRAW',
  'WIN',
  'LOSS',
}

const opponentChoiceMapping = {
  A: GameChoice.Rock,
  B: GameChoice.Paper,
  C: GameChoice.Scissors,
};

const yourResultMapping = {
  X: GameOutcome.LOSS,
  Y: GameOutcome.DRAW,
  Z: GameOutcome.WIN,
};

const scoreMapping = {
  [GameChoice.Rock]: 1,
  [GameChoice.Paper]: 2,
  [GameChoice.Scissors]: 3,
};

const LosingChoiceMapping = {
  [GameChoice.Rock]: GameChoice.Scissors,
  [GameChoice.Paper]: GameChoice.Rock,
  [GameChoice.Scissors]: GameChoice.Paper,
};

const WinningChoiceMapping = {
  [GameChoice.Rock]: GameChoice.Paper,
  [GameChoice.Paper]: GameChoice.Scissors,
  [GameChoice.Scissors]: GameChoice.Rock,
};

export interface GameScoreResult {
  outcome: GameOutcome;
  score: number;
}

export const calculateGameScore = (
  opponentChoice: GameChoice,
  yourChoice: GameChoice
): GameScoreResult => {
  if (opponentChoice === yourChoice) {
    return {
      outcome: GameOutcome.DRAW,
      score: 3 + scoreMapping[yourChoice],
    };
  }

  if (LosingChoiceMapping[opponentChoice] === yourChoice) {
    return {
      outcome: GameOutcome.LOSS,
      score: 0 + scoreMapping[yourChoice],
    };
  }

  return {
    outcome: GameOutcome.WIN,
    score: 6 + scoreMapping[yourChoice],
  };
};

const getYourGameChoiceFromOpponentChoice = (
  opponentGameChoice: GameChoice,
  expectedOutcome: GameOutcome
): GameChoice => {
  if (expectedOutcome === GameOutcome.DRAW) {
    return opponentGameChoice;
  }

  if (expectedOutcome === GameOutcome.LOSS) {
    return LosingChoiceMapping[opponentGameChoice];
  }

  if (expectedOutcome === GameOutcome.WIN) {
    return WinningChoiceMapping[opponentGameChoice];
  }

  throw 'Invalid expected outcome';
};

export const calculateStrategyResult = (input: string): number => {
  const games: string[] = input.split(/\r?\n/);
  let totalScore = 0;
  games.forEach(game => {
    const choices = game.split(' ');
    const opponentChoice = choices[0].trim();
    const desiredResult = choices[1].trim();

    if (!opponentChoiceMapping.hasOwnProperty(opponentChoice)) {
      console.warn('Invalid Key');
      return;
    }

    if (!yourResultMapping.hasOwnProperty(desiredResult)) {
      console.warn('Invalid Key');
      return;
    }

    const opponentGameChoice =
      opponentChoiceMapping[
        opponentChoice as keyof typeof opponentChoiceMapping
      ];

    const yourGameChoice = getYourGameChoiceFromOpponentChoice(
      opponentGameChoice,
      yourResultMapping[desiredResult as keyof typeof yourResultMapping]
    );

    const gameResult = calculateGameScore(opponentGameChoice, yourGameChoice);

    totalScore += gameResult.score;
  });
  return totalScore;
};
