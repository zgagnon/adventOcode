import each from 'jest-each';
import input from './1.input.json';

const reporter = (input: number[]) => {
  const sorted = input.sort((a, b) => a - b);
  let min = sorted.shift()!;
  let max = sorted.pop()!;

  while (min + max !== 2020) {
    if (min + max > 2020) {
      max = sorted.pop()!;
    } else {
      min = sorted.shift()!;
    }
  }

  return [min!, max!];
};

describe('the expense reporter', () => {
  each([
    [[1721, 299]],
    [[1721, 979, 299]],
    [[1721, 299, 1999]],
    [[1721, 299, 1999, 1998]],
    [[1721, 299, 100, 1998]],
  ]).it('finds the two entries which sum to 2020', input => {
    const [firstNum, secondNum] = reporter(input);
    const sum = firstNum + secondNum;
    expect(sum).toEqual(2020);
  });

  it('finds the correct to numbers from input', () => {
    const [firstNum, secondNum] = reporter(input);
    expect(firstNum * secondNum).toEqual(0);
  });
});
