"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTaskTwo = exports.calculateTaskOne = void 0;
const calculateTaskOne = (input) => {
    const sortedElves = getSortedElves(input);
    return sortedElves[0];
};
exports.calculateTaskOne = calculateTaskOne;
const calculateTaskTwo = (input) => {
    const sortedElves = getSortedElves(input);
    return sortedElves[0] + sortedElves[1] + sortedElves[2];
};
exports.calculateTaskTwo = calculateTaskTwo;
const getSortedElves = (input) => {
    const calories = input.split(/\r?\n/);
    let elfIndex = 0;
    const elvesSummedCalories = calories.reduce((finalCollection, currentCalorie) => {
        if (currentCalorie.trim() === '') {
            elfIndex++;
            return finalCollection;
        }
        if (!finalCollection[elfIndex]) {
            finalCollection[elfIndex] = 0;
        }
        finalCollection[elfIndex] += parseInt(currentCalorie.trim());
        return finalCollection;
    }, []);
    return elvesSummedCalories.sort((a, b) => {
        return b - a;
    });
};
//# sourceMappingURL=index.js.map