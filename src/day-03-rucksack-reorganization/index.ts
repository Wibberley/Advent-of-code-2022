class DayThreePuzzle {
  constructor(private puzzleInput: string) {}

  private getRucksacks(): string[] {
    return this.puzzleInput.split(/\r?\n/);
  }

  private splitRucksackToCompartments(rucksack: string): string[] {
    const splitIndex = rucksack.length / 2;

    return [
      rucksack.slice(0, splitIndex),
      rucksack.slice(splitIndex, rucksack.length),
    ];
  }

  private findDuplicateItems(
    compartmentOne: string,
    compartmentTwo: string
  ): string[] {
    const charArray = [...compartmentOne];
    return charArray.reduce<string[]>((previous, currentValue) => {
      if (
        compartmentTwo.includes(currentValue) &&
        !previous.includes(currentValue)
      ) {
        previous.push(currentValue);
      }

      return previous;
    }, []);
  }

  private getItemPriority(item: string) {
    const possibleItems =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    return possibleItems.indexOf(item) + 1;
  }

  private getElfGroups(rucksacks: string[]): string[][] {
    return rucksacks.reduce<string[][]>((previous, current, index) => {
      if (index % 3 === 0) {
        previous.push([current]);
      } else {
        previous[Math.floor(index / 3)].push(current);
      }

      return previous;
    }, []);
  }

  private findBadge(
    rucksackOne: string,
    rucksackTwo: string,
    rucksackThree: string
  ): string {
    const duplicateItems = this.findDuplicateItems(rucksackOne, rucksackTwo);
    return this.findDuplicateItems(duplicateItems.join(''), rucksackThree)[0];
  }

  public calculateTaskOne(): number {
    const rucksacks = this.getRucksacks();
    const rucksackPriorities = rucksacks.map(rucksack => {
      const compartments = this.splitRucksackToCompartments(rucksack);

      const duplicates = this.findDuplicateItems(
        compartments[0],
        compartments[1]
      );

      return duplicates
        .map(x => this.getItemPriority(x))
        .reduce((previous, current) => previous + current, 0);
    });

    return rucksackPriorities.reduce(
      (previous, current) => previous + current,
      0
    );
  }

  public calculateTaskTwo(): number {
    const rucksacks = this.getRucksacks();
    const groups = this.getElfGroups(rucksacks);
    const badgeValues = groups.map(group => {
      const badge = this.findBadge(group[0], group[1], group[2]);
      return this.getItemPriority(badge);
    });
    return badgeValues.reduce((previous, current) => previous + current, 0);
  }
}

export default DayThreePuzzle;
