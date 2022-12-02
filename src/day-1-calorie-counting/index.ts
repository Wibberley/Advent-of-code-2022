export const calculate = (input: string, totalElvesToSum: number): number => {
  const sortedElves = getElvesByTotalCalories(input).splice(0, totalElvesToSum);
  return sortedElves.reduce<number>(
    (previous, current) => previous + current,
    0
  );
};

const getElvesByTotalCalories = (input: string): number[] => {
  const elves: string[] = input.split(/\r?\n\r?\n/);

  const totalCaloriesByElf = elves.map(elf => {
    const elfFood = elf.split(/\r?\n/);
    return elfFood.reduce<number>((previous, current) => {
      return previous + parseInt(current.trim());
    }, 0);
  });

  return totalCaloriesByElf.sort((a, b) => {
    return b - a;
  });
};
