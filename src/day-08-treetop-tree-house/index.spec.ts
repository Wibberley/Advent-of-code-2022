import * as fs from 'fs';
import * as path from 'path';
import Puzzle from '.';

describe('day-8', () => {
  it('Given the game input When this is processed by CalculateTaskOne Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new Puzzle(input);
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
    const puzzle = new Puzzle(input);
    const result = puzzle.CalculateTaskTwo();

    // Then
    console.log('Task Two Result:', result);
  });
});
