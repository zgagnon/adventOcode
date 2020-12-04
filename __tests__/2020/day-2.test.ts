import input from './2.input.json';
import each from 'jest-each';

const validator = (passwordLine: string) => {
  const [rule, password] = passwordLine.split(':');
  const [constraint, character] = rule.split(' ');
  const [minimum, maximum] = constraint
    .split('-')
    .map(stringNum => parseInt(stringNum));
  const characters = password.split('');
  const characterCount = characters.filter(item => item === character).length;
  return minimum <= characterCount && characterCount <= maximum;
};

const newValidator = (passwordLine: string) => {
  const [rule, password] = passwordLine.split(':');
  const [constraint, character] = rule.split(' ');
  const [firstPosition, secondPosition] = constraint
    .split('-')
    .map(stringNum => parseInt(stringNum) - 1);
  const characters = password.trim().split('');
  const presentInFirst = characters[firstPosition] === character;
  const presentInSecond = characters[secondPosition] === character;

  return (
    (presentInFirst && !presentInSecond) || (presentInSecond && !presentInFirst)
  );
};

describe('the old password validator', () => {
  it('takes a string as input', () => {
    validator('1-3 a: abcde');
  });

  describe('when the password matches the rules', () => {
    it('returns true', () => {
      const matches = validator('1-3 a: abcde');
      expect(matches).toBeTruthy();
    });
  });

  describe('when the password does not match the rules', () => {
    it('returns false if the password does not match the rules', () => {
      const matches = validator('1-3 b: cdefg');
      expect(matches).toBeFalsy();
    });
  });

  describe('the password file', () => {
    it('has the correct number of entries', () => {
      const correct = input.map(validator).filter(correct => correct).length;

      expect(correct).toBe(517);
    });
  });
});

describe('the new password validator', () => {
  each([
    ['1-3 b: cdefg', false],
    ['1-3 c: bcefg', false],
    ['1-3 c: cbcfg', false],
    ['1-3 c: cdefg', true],
  ]).it('matches the password against the rules', (passwordLine, valid) => {
    const correct = newValidator(passwordLine);
    expect(correct).toBe(valid);
  });

  it('counts the total passwords valid under the new rules', () => {
    const correct = input.map(newValidator).filter(correct => correct).length;
    expect(correct).toBe(284);
  });
});
