import each from 'jest-each';
import input from './3.input.json';

const tobogganeer = (terrain: string[]) => {
  const sled = (terrainMatrix: string[][], total = 0, position = 0): number => {
    if (terrainMatrix.length === 0) {
      return total;
    }
    const [current, ...rest] = terrainMatrix;
    let newTotal = total;
    const nextPosition = (position + 3) % current.length;
    if (current[nextPosition] === '#') {
      newTotal = newTotal + 1;
    }
    return sled(rest, newTotal, nextPosition);
  };

  const [garbage, ...matrix] = terrain.map(row => row.split(''));
  return sled(matrix);
};

describe('the toboggen router', () => {
  each([
    [['..##.......', '#...#...#..'], 0],
    [['..##.......', '#..##...#..'], 1],
    [['..##.......', '#...#...#..', '.#....#..#.'], 1],
    [
      [
        '..##.......',
        '#...#...#..',
        '.#....#..#.',
        '..#.#...#.#',
        '.#...##..#.',
      ],
      2,
    ],
  ]).it('counts the number of trees in a single move', (terrain, count) => {
    const treencounters = tobogganeer(terrain);
    expect(treencounters).toEqual(count);
  });

  it('calculates the total from the input', () => {
    const total = tobogganeer(input);
    expect(total).toBe(0);
  });
});
