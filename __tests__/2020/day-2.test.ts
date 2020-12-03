import {validator} from '../../src/2020/day-2';
import input from './2.input.json';

describe('the password validator', () => {
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

      expect(correct).toBe(0);
    });
  });
});
