export const calculateTaskOne = (input: string): number => {
  const sortedElves = getSortedElves(input);
  return sortedElves[0];
};

export const calculateTaskTwo = (input: string): number => {
  const sortedElves = getSortedElves(input);
  return sortedElves[0] + sortedElves[1] + sortedElves[2];
};

const getSortedElves = (input: string): number[] => {
  const calories: string[] = input.split(/\r?\n/);

  let elfIndex = 0;

  const elvesSummedCalories = calories.reduce<number[]>(
    (finalCollection, currentCalorie) => {
      if (currentCalorie.trim() === '') {
        elfIndex++;
        return finalCollection;
      }

      if (!finalCollection[elfIndex]) {
        finalCollection[elfIndex] = 0;
      }

      finalCollection[elfIndex] += parseInt(currentCalorie.trim());

      return finalCollection;
    },
    []
  );

  return elvesSummedCalories.sort((a, b) => {
    return b - a;
  });
};
