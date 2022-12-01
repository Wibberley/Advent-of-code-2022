export const calculate = (input: string, totalElvesToSum: number): number => {
  const sortedElves = getElvesByTotalCalories(input);
  let total = 0;
  for (var i = 0; i < totalElvesToSum; i++) {
    total += sortedElves[i];
  }
  return total;
};

const getElvesByTotalCalories = (input: string): number[] => {
  const calories: string[] = input.split(/\r?\n/);

  let elfIndex = 0;

  const totalCaloriesByElf = calories.reduce<number[]>(
    (totalCaloriesByElf, currentCalorie) => {
      if (currentCalorie.trim() === '') {
        totalCaloriesByElf[++elfIndex] = 0;
        return totalCaloriesByElf;
      }

      totalCaloriesByElf[elfIndex] += parseInt(currentCalorie.trim());

      return totalCaloriesByElf;
    },
    [0]
  );

  return totalCaloriesByElf.sort((a, b) => {
    return b - a;
  });
};
