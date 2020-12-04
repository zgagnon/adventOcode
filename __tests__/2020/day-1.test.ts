import each from 'jest-each';
import input from './1.input.json';

const reporter = (input: number[], sum = 2020): number[] => {
  const sorted = [...input.sort((a, b) => a - b)];
  let min = sorted.shift()!;
  let max = sorted.pop()!;

  while (min + max !== sum && sorted.length > 0) {
    if (min + max > sum) {
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
    const [firstNum, secondNum] = reporter(input)!;
    const sum = firstNum + secondNum;
    expect(sum).toEqual(2020);
  });

  it('finds the correct to numbers from input', () => {
    const [firstNum, secondNum] = reporter(input)!;
    expect(firstNum * secondNum).toEqual(1014624);
  });
});

const triporter = (input: number[]) => {
  const [lowest, ...rest] = input.sort((a, b) => a - b);
  const report = (lowest: number, remainingNumbers: number[]): number[] => {
    if (remainingNumbers.length === 2) {
      return [lowest, ...remainingNumbers];
    }
    const [mid, high] = reporter([...remainingNumbers], 2020 - lowest);
    if (mid + high + lowest === 2020) {
      return [lowest, mid, high];
    }
    const [nextLowest, ...nextRemaining] = remainingNumbers;
    return report(nextLowest, nextRemaining);
  };
  return report(lowest, rest);
};

describe('the expense triporter', () => {
  each([
    [[979, 366, 675]],
    [[979, 675, 555, 366]],
    [[979, 675, 366, 999]],
    [[979, 675, 366, 9]],
  ]).it('To Find the three numbers', (input: number[]) => {
    const [first, second, third] = triporter(input);
    expect(first + second + third).toEqual(2020);
  });

  it('finds the correct number', () => {
    const [first, second, third] = triporter(input);
    expect(first * second * third).toEqual(80072256);
  });
});
