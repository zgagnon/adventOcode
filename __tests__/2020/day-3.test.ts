import each from 'jest-each';
import input from './3.input.json';

const tobogganeer = (
  terrain: string[],
  horzontalSlope: number,
  verticalSlope: number
) => {
  const sled = (terrainMatrix: string[][], total = 0, position = 0): number => {
    if (terrainMatrix.length === 0) {
      return total;
    }
    const [current, ...rest] = terrainMatrix.slice(verticalSlope - 1);
    let newTotal = total;
    const nextPosition = (position + horzontalSlope) % current.length;
    if (current[nextPosition] === '#') {
      newTotal = newTotal + 1;
    }
    return sled(rest, newTotal, nextPosition);
  };

  const [, ...matrix] = terrain.map(row => row.split(''));
  return sled(matrix);
};

describe('the toboggen router', () => {
  const exampleTerrain = [
    '..##.......',
    '#...#...#..',
    '.#....#..#.',
    '..#.#...#.#',
    '.#...##..#.',
    '..#.##.....',
    '.#.#.#....#',
    '.#........#',
    '#.##...#...',
    '#...##....#',
    '.#..#...#.#',
  ];
  each([
    [['..##.......', '#...#...#..'], 3, 1, 0],
    [['..##.......', '#..##...#..'], 3, 1, 1],
    [['..##.......', '#...#...#..', '.#....#..#.'], 3, 1, 1],
    [
      [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
      ],
      3,
      1,
      2,
    ],
    [exampleTerrain, 1, 1, 2],
    [exampleTerrain, 5, 1, 3],
    [exampleTerrain, 7, 1, 4],
    [exampleTerrain, 1, 2, 2],
  ]).it(
    'counts the number of trees in a single move',
    (terrain, horizontalSlope, verticalSlope, count) => {
      const treencounters = tobogganeer(
        terrain,
        horizontalSlope,
        verticalSlope
      );
      expect(treencounters).toEqual(count);
    }
  );

  it('calculates the total from the input', () => {
    const total = tobogganeer(input, 3, 1);
    expect(total).toBe(278);
  });

  it('calculates the product of multiple totals', () => {
    const slopes = [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ];
    const total = slopes.reduce((prod, [horiz, vert]) => {
      return prod * tobogganeer(input, horiz, vert);
    }, 1);
    expect(total).toEqual(0);
  });
});
