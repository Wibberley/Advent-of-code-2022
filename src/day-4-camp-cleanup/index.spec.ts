import * as fs from 'fs';
import * as path from 'path';
import DayFourPuzzle from '.';

describe('day-4-camp-cleanup', () => {
  it('Given 6 section assignments where 2 of the assignments fully contain the other When this is processed by calculateTaskOne Then the result is 2', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(2);
  });

  it('Given a single section assignments the assignments fully contain the other When this is processed by calculateTaskOne Then the result is 1', () => {
    // Given
    const input = '6-6,4-6';

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(1);
  });

  it('Given a single section assignments the assignments does not fully contain the other When this is processed by calculateTaskOne Then the result is 0', () => {
    // Given
    const input = '2-4,6-8';

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(0);
  });

  it('Given the game input When this is processed by calculateTaskOne Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    console.log('result', result);
  });

  it('Given 6 section assignments where 4 of the assignments partly contain the other When this is processed by calculateTaskTwo Then the result is 4', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskTwo();

    // Then
    expect(result).toEqual(4);
  });

  it('Given the game input When this is processed by calculateTaskTwo Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const dayFourPuzzle = new DayFourPuzzle(input);
    const result = dayFourPuzzle.calculateTaskTwo();

    // Then
    console.log('result', result);
  });
});
