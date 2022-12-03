import * as fs from 'fs';
import * as path from 'path';
import DayThreePuzzle from '.';

describe('day-3-rucksack-reorganization', () => {
  it('Given 6 rucksacks with items in When this is processed by calculateTaskOne Then the sum of the duplicate items in each component is 157', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const dayThreePuzzle = new DayThreePuzzle(input);
    const result = dayThreePuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(157);
  });

  it('Given 1 rucksack with items in and a single duplicate of "p" When this is processed by calculateTaskOne Then the priority of 16 is returned', () => {
    // Given
    const input = 'vJrwpWtwJgWrhcsFMMfFFhFp';

    // When
    const dayThreePuzzle = new DayThreePuzzle(input);
    const result = dayThreePuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(16);
  });

  it('Given 6 rucksacks with items in AND this is split into 3 groups When this is processed by calculateTaskTwo Then the sum of the common items per group is returned (70)', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const dayThreePuzzle = new DayThreePuzzle(input);
    const result = dayThreePuzzle.calculateTaskTwo();

    // Then
    expect(result).toEqual(70);
  });

  it('Given the puzzle input When this is processed by calculateTaskOne Then we get the result', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const dayThreePuzzle = new DayThreePuzzle(input);
    const result = dayThreePuzzle.calculateTaskOne();

    // Then
    console.log('result', result);
  });

  it('Given the puzzle input When this is processed by calculateTaskTwo Then we get the result', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const dayThreePuzzle = new DayThreePuzzle(input);
    const result = dayThreePuzzle.calculateTaskTwo();

    // Then
    console.log('result', result);
  });
});
