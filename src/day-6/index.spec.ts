import * as fs from 'fs';
import * as path from 'path';
import DaySixPuzzle from '.';

describe('day-6', () => {
  it('Given When this is processed via calculateTaskOne Then', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySixPuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    expect(result).toEqual('');
  });
});
