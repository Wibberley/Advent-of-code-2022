class Assignment {
  constructor(private assignment: string) {}

  private _sectionIds: number[] = [];

  get sectionIds(): number[] {
    if (this._sectionIds.length > 0) {
      return this._sectionIds;
    }

    const range = this.assignment.split('-').map(x => parseInt(x));

    return (this._sectionIds = Array.from<number, number>(
      {length: range[1] - range[0] + 1},
      (v, i) => i + range[0]
    ));
  }

  get minSectionId(): number {
    return this.sectionIds.sort((a, b) => a - b)[0];
  }

  get maxSectionId(): number {
    return this.sectionIds.sort((a, b) => a - b)[this.sectionIds.length - 1];
  }
}

class DayFourPuzzle {
  constructor(private puzzleInput: string) {}

  private getAssignmentsPairs(): Assignment[][] {
    const stringAssignmentPairs = this.puzzleInput.split(/\r?\n/);
    return stringAssignmentPairs.map(stringAssignmentPair => {
      const assignments = stringAssignmentPair.split(',');
      const assignmentOne = new Assignment(assignments[0]);
      const assignmentTwo = new Assignment(assignments[1]);
      return [assignmentOne, assignmentTwo];
    });
  }

  private checkIfAssignmentPairFullyContainsTheOther(
    assignmentOne: Assignment,
    assignmentTwo: Assignment
  ): boolean {
    return (
      (assignmentOne.minSectionId >= assignmentTwo.minSectionId &&
        assignmentOne.maxSectionId <= assignmentTwo.maxSectionId) ||
      (assignmentTwo.minSectionId >= assignmentOne.minSectionId &&
        assignmentTwo.maxSectionId <= assignmentOne.maxSectionId)
    );
  }

  private checkIfAssignmentsOverLap(
    assignmentOne: Assignment,
    assignmentTwo: Assignment
  ): boolean {
    return (
      assignmentOne.minSectionId <= assignmentTwo.maxSectionId &&
      assignmentOne.maxSectionId >= assignmentTwo.minSectionId
    );
  }

  public calculateTaskOne(): number {
    const assignmentPairs = this.getAssignmentsPairs();
    const results: number[] = assignmentPairs.map(x =>
      this.checkIfAssignmentPairFullyContainsTheOther(x[0], x[1]) ||
      this.checkIfAssignmentPairFullyContainsTheOther(x[1], x[0])
        ? 1
        : 0
    );

    return results.reduce((previous, current) => previous + current, 0);
  }

  public calculateTaskTwo(): number {
    const assignmentPairs = this.getAssignmentsPairs();
    const results: number[] = assignmentPairs.map(x =>
      this.checkIfAssignmentsOverLap(x[0], x[1]) ||
      this.checkIfAssignmentsOverLap(x[1], x[0])
        ? 1
        : 0
    );

    return results.reduce((previous, current) => previous + current, 0);
  }
}

export default DayFourPuzzle;
