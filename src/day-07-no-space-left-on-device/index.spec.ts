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
    expect(result).toEqual('58232');
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
    expect(result).toEqual('900');
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
    expect(result).toEqual('2500');
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

  it('Given a file system that has a 4 directories and 3 files with a total size of 40000001 When this is processed by calculateTaskOne Then the total of the 1 directory with a size greater than 1 is retured', () => {
    // Given
    const input = `$ cd /
$ ls
dir a
dir b
30000000 x.txt
$ cd a
$ ls
9999999 b.txt
$ cd ..
$ cd b
$ ls
2 b.txt`;

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskTwo();

    // Then
    expect(result).toEqual('2');
  });

  it('Given the game input When this is processed by CalculateTaskOne Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskOne();

    // Then
    console.log('Task One Result:', result);
  });

  it('Given the game input When this is processed by CalculateTaskTwo Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySevenPuzzle(input);
    const result = puzzle.CalculateTaskTwo();

    // Then
    console.log('Task Two Result:', result);
  });
});
