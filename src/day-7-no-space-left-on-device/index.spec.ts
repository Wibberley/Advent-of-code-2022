import * as fs from 'fs';
import * as path from 'path';
import DaySevenPuzzle from '.';

describe('day-7-no-space-left-on-device', () => {
  it('Given a file system that has a 2 directories and 1 file under 100000 When this is processed by calculateTaskOne Then the total of the 1 file is returned', () => {
    // Given
    const input = `$ cd /
$ ls
dir a
$ cd a
$ ls
29116 f`;

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskOne();

    // Then
    expect(result).toEqual('29116');
  });

  it('Given a file system that has a 3 directories and 2 files under 100000 When this is processed by calculateTaskOne Then the total of the 2 files is returned', () => {
    // Given
    const input = `$ cd /
$ ls
dir a
500 x.txt
$ cd a
$ ls
200 f`;

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskOne();

    // Then
    expect(result).toEqual('700');
  });

  it('Given a file system that has a 4 directories and 3 files under 100000 When this is processed by calculateTaskOne Then the total of the 3 files is returned', () => {
    // Given
    const input = `$ cd /
$ ls
dir a
dir b
500 x.txt
$ cd a
$ ls
200 f
$ cd ..
$ cd b
$ ls
800 b.txt`;

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskOne();

    // Then
    expect(result).toEqual('1500');
  });

  it('Given a test input that contains 10 files and 4 directories When this is processed by calculateTaskOne Then the total size of files under 100000 is 95437', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskOne();

    // Then
    expect(result).toEqual('95437');
  });

  // it('Given the game input When this is processed by calculateTaskOne Then the score is returned', () => {
  //   // Given
  //   const input = fs.readFileSync(
  //     path.join(__dirname, './resources/input.txt'),
  //     'utf8'
  //   );

  //   // When
  //   const puzzle = new DaySevenPuzzle(input);
  //   const result = puzzle.calculateTaskOne();

  //   // Then
  //   console.log('result', result);
  // });
});
