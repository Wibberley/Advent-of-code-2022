import * as fs from 'fs';
import * as path from 'path';
import DaySixPuzzle from '.';

describe('day-6-tuning-trouble', () => {
  const data = [
    {
      datastreamBuffer: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
      expectedMarker: 'jpqm',
      expectedMarkerIndex: 7,
    },
    {
      datastreamBuffer: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
      expectedMarker: 'vwbj',
      expectedMarkerIndex: 5,
    },
    {
      datastreamBuffer: 'nppdvjthqldpwncqszvftbrmjlhg',
      expectedMarker: 'pdvj',
      expectedMarkerIndex: 6,
    },
    {
      datastreamBuffer: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
      expectedMarker: 'rfnt',
      expectedMarkerIndex: 10,
    },
    {
      datastreamBuffer: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
      expectedMarker: 'zqfr',
      expectedMarkerIndex: 11,
    },
  ];

  it.each(data)(
    'Given the following datastream buffer $datastreamBuffer, When this is processed via calculateTaskOne Then the expected marker index is $expectedMarkerIndex and the marker is $expectedMarker',
    ({datastreamBuffer, expectedMarker, expectedMarkerIndex}) => {
      // Given
      const input = datastreamBuffer;

      // When
      const puzzle = new DaySixPuzzle(input);
      const result = puzzle.calculateTaskOne();

      // Then
      expect(result.marker).toEqual(expectedMarker);
      expect(result.index).toEqual(expectedMarkerIndex);
    }
  );

  it('Given the game input When this is processed by calculateTaskOne Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySixPuzzle(input);
    const result = puzzle.calculateTaskOne();

    // Then
    console.log('result', result);
  });

  const taskTwoData = [
    {
      datastreamBuffer: 'mjqjpqmgbljsphdztnvjfqwrcgsmlb',
      expectedMarker: 'qmgbljsphdztnv',
      expectedMarkerIndex: 19,
    },
    {
      datastreamBuffer: 'bvwbjplbgvbhsrlpgdmjqwftvncz',
      expectedMarker: 'vbhsrlpgdmjqwf',
      expectedMarkerIndex: 23,
    },
    {
      datastreamBuffer: 'nppdvjthqldpwncqszvftbrmjlhg',
      expectedMarker: 'ldpwncqszvftbr',
      expectedMarkerIndex: 23,
    },
    {
      datastreamBuffer: 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg',
      expectedMarker: 'wmzdfjlvtqnbhc',
      expectedMarkerIndex: 29,
    },
    {
      datastreamBuffer: 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw',
      expectedMarker: 'jwzlrfnpqdbhtm',
      expectedMarkerIndex: 26,
    },
  ];

  it.each(taskTwoData)(
    'Given the following datastream buffer $datastreamBuffer, When this is processed via calculateTaskTwo Then the expected marker index is $expectedMarkerIndex and the marker is $expectedMarker',
    ({datastreamBuffer, expectedMarker, expectedMarkerIndex}) => {
      // Given
      const input = datastreamBuffer;

      // When
      const puzzle = new DaySixPuzzle(input);
      const result = puzzle.calculateTaskTwo();

      // Then
      expect(result.marker).toEqual(expectedMarker);
      expect(result.index).toEqual(expectedMarkerIndex);
    }
  );

  it('Given the game input When this is processed by calculateTaskTwo Then the score is returned', () => {
    // Given
    const input = fs.readFileSync(
      path.join(__dirname, './resources/input.txt'),
      'utf8'
    );

    // When
    const puzzle = new DaySixPuzzle(input);
    const result = puzzle.calculateTaskTwo();

    // Then
    console.log('result', result);
  });
});
