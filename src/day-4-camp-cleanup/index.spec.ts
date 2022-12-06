import {readFileSync} from 'fs';
import DayFourPuzzle from '.';

jest.mock('fs');

const mockReadFileSync = readFileSync as jest.Mock<any>;

describe('day-4-camp-cleanup', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Given 6 section assignments where 2 of the assignments fully contain the other When this is processed by calculateTaskOne Then the result is 2', () => {
    // Given
    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(2);
  });

  it('Given a single section assignments the assignments fully contain the other When this is processed by calculateTaskOne Then the result is 1', () => {
    // Given
    mockReadFileSync.mockReturnValueOnce('6-6,4-6');

    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(1);
  });

  it('Given a single section assignments the assignments does not fully contain the other When this is processed by calculateTaskOne Then the result is 0', () => {
    // Given
    const input = '2-4,6-8';

    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    expect(result).toEqual(0);
  });

  it('Given the game input When this is processed by calculateTaskOne Then the score is returned', () => {
    // Given

    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskOne();

    // Then
    console.log('result', result);
  });

  it('Given 6 section assignments where 4 of the assignments partly contain the other When this is processed by calculateTaskTwo Then the result is 4', () => {
    // Given

    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskTwo();

    // Then
    expect(result).toEqual(4);
  });

  it('Given the game input When this is processed by calculateTaskTwo Then the score is returned', () => {
    // Given

    // When
    const dayFourPuzzle = new DayFourPuzzle();
    const result = dayFourPuzzle.calculateTaskTwo();

    // Then
    console.log('result', result);
  });
});
