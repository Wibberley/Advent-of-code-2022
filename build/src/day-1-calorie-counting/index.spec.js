"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const fs = require("fs");
const path = require("path");
describe('day-1-calorie-counting-task-one', () => {
    it('Given 1 elf with a single food When calculateTaskOne is called Then the food calorie is returned', () => {
        // Given
        const input = '100';
        // When
        const output = (0, _1.calculateTaskOne)(input);
        // Then
        expect(output).toEqual(100);
    });
    it('Given 1 elf with multiple foods When calculateTaskOne is called Then the sum of each food is returned', () => {
        // Given
        const input = `100
    200`;
        // When
        const output = (0, _1.calculateTaskOne)(input);
        // Then
        expect(output).toEqual(300);
    });
    it('Given 3 elves with one food each When calculateTaskOne is called Then the highest food calories is returned', () => {
        // Given
        const input = `100
    50
    
    200
    500
    
    50
    400`;
        // When
        const output = (0, _1.calculateTaskOne)(input);
        // Then
        expect(output).toEqual(700);
    });
    it('Given the resource input When calculateTaskOne is called with this input Then we get the score!', () => {
        // Given
        const input = fs.readFileSync(path.join(__dirname, 'resources/test_input.txt'), 'utf8');
        // When
        const output = (0, _1.calculateTaskOne)(input);
        // Then
        expect(output).toEqual(11598);
    });
    it('Given the resource input When calculateTaskOne is called with this input Then we get the score!', () => {
        // Given
        const input = fs.readFileSync(path.join(__dirname, 'resources/input.txt'), 'utf8');
        // When
        const output = (0, _1.calculateTaskOne)(input);
        // Then
        console.log(output);
    });
});
describe('day-1-calorie-counting-task-two', () => {
    it('Given 5 elves with multiple foods When calculateTaskTwo is called Then we get the sum of the highest 3 elves', () => {
        // Given
        const input = `100
        50
        
        200
        500
        
        50
        400
        
        100
        
        600`;
        // When
        const output = (0, _1.calculateTaskTwo)(input);
        // Then
        expect(output).toEqual(1750);
    });
    it('Given the resource input When calculateTaskTwo is called with this input Then we get the score!', () => {
        // Given
        const input = fs.readFileSync(path.join(__dirname, 'resources/input.txt'), 'utf8');
        // When
        const output = (0, _1.calculateTaskTwo)(input);
        // Then
        console.log(output);
    });
});
//# sourceMappingURL=index.spec.js.map