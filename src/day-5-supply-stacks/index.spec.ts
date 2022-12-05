import * as fs from 'fs';
import * as path from 'path';
import DayFivePuzzle from '.';

describe('day-5-supply-stacks', () => {
  it('A single stack of crates and no rearrangment procedures When this is processed via calculateTaskOne Then the crate at the top of the stack will be returned', () => {
    // Given
    const input = `[D] 
[N]   
[Z]
 1 `;

    // When
    const puzzle = new DayFivePuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    expect(result).toEqual('D');
  });

  it('A two stack of crates and and a rearrangment procedure to move the left create to the right stack When this is processed via calculateTaskOne Then the crate at the top of the two stacks will be returned', () => {
    // Given
    const input = `[D]  
[N] [B]   
[Z] [C]
 1   2

move 1 from 1 to 2
 `;

    // When
    const puzzle = new DayFivePuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    expect(result).toEqual('ND');
  });

  it('A three stack of crates and and a rearrangment procedure to move the 2 crates from 1 to 3 When this is processed via calculateTaskOne Then the crate at the top of the three stacks will be returned', () => {
    // Given
    const input = `[D] 
[N] [B]   
[Z] [C]
 1   2   3

move 2 from 1 to 3
 `;

    // When
    const puzzle = new DayFivePuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    expect(result).toEqual('ZBN');
  });

  it('A stack of crates and the rearrangement prodedure When this is processed via calculateTaskOne Then this will return the letter of each create at the top of the stack', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/test_input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DayFivePuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    expect(result).toEqual('CMZ');
  });
});
